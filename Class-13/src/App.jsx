import { useActionState, useOptimistic, useRef, useState, useEffect } from "react";
import { useFormStatus } from "react-dom"; // Note: useFormStatus is from react-dom
import { GraduationCap, UserPlus, BookOpen, Loader2, CheckCircle, Smartphone } from "lucide-react";
import { addStudent as addStudentToDB, getStudents } from "./api";
import { motion, AnimatePresence } from "framer-motion";

// --- Async Action ---
async function enrollStudentAction(prevState, formData) {
  const name = formData.get("name");
  const course = formData.get("course");
  
  try {
    const newStudent = await addStudentToDB(name, course);
    return { 
      success: true, 
      message: "Student enrolled successfully!", 
      student: newStudent 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message 
    };
  }
}

// --- Components ---

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Enrolling...
        </>
      ) : (
        <>
          <UserPlus className="w-5 h-5" /> Enroll Student
        </>
      )}
    </button>
  );
}

export default function App() {
  const [students, setStudents] = useState([]);
  
  // React 19: useActionState (manages form state and submission results)
  const [formState, formAction] = useActionState(enrollStudentAction, null);
  
  // React 19: useOptimistic (UI updates immediately before server responds)
  const [optimisticStudents, addOptimisticStudent] = useOptimistic(
    students,
    (currentStudents, newStudent) => [...currentStudents, newStudent]
  );

  const formRef = useRef(null);

  // Load initial data
  useEffect(() => {
    getStudents().then(setStudents);
  }, []);

  // Sync actual state when form succeeds
  useEffect(() => {
    if (formState?.success && formState?.student) {
        setStudents((prev) => [...prev, formState.student]);
        formRef.current?.reset();
    }
  }, [formState]);

  // Wrapper for the action to trigger optimistic update
  const handleAction = async (formData) => {
      const name = formData.get("name");
      const course = formData.get("course");
      
      // Optimistically add to UI
      addOptimisticStudent({
          id: Math.random(), // Temporary ID
          name: name,
          course: course,
          pending: true // Flag to show it's optimizing
      });

      // Call actual server action
      await formAction(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500/30">
        <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Class 13
                        </h1>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Student Portal</p>
                    </div>
                </div>
            </div>
        </header>

        <main className="pt-24 pb-12 px-4 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Form */}
            <section className="space-y-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
                    <div className="relative bg-slate-800/50 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">New Enrollment</h2>
                            <p className="text-slate-400">Register a new student to the class roster.</p>
                        </div>

                        <form ref={formRef} action={handleAction} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Student Name</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="e.g. John Doe"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                    />
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                                        <GraduationCap className="w-5 h-5 text-emerald-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="course" className="text-sm font-medium text-slate-300 ml-1">Selected Course</label>
                                <div className="relative group">
                                    <select
                                        id="course"
                                        name="course"
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                                    >
                                        <option value="">Select a course...</option>
                                        <option value="React 19 Deep Dive">React 19 Deep Dive</option>
                                        <option value="Next.js Architecture">Next.js Architecture</option>
                                        <option value="Tailwind CSS Mastery">Tailwind CSS Mastery</option>
                                        <option value="TypeScript for Pros">TypeScript for Pros</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <BookOpen className="w-5 h-5 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            <SubmitButton />

                            <AnimatePresence>
                                {formState?.success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">{formState.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>

                {/* React 19 Info Card */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 text-blue-500/10">
                         <Smartphone className="w-32 h-32" />
                    </div>
                    <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                        <span className="bg-blue-500/20 px-2 py-0.5 rounded text-xs">NEW</span>
                        React 19 Hooks Used
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300 relative z-10">
                        <li className="flex gap-2">
                            <code className="text-blue-300 font-mono bg-blue-500/10 px-1 rounded">useActionState</code>
                            <span>Manages form submission lifecycle automatically.</span>
                        </li>
                        <li className="flex gap-2">
                            <code className="text-blue-300 font-mono bg-blue-500/10 px-1 rounded">useOptimistic</code>
                            <span>Updates UI immediately while server request is pending.</span>
                        </li>
                         <li className="flex gap-2">
                            <code className="text-blue-300 font-mono bg-blue-500/10 px-1 rounded">useFormStatus</code>
                            <span>Provides loading state for the submit button.</span>
                        </li>
                    </ul>
                </div>
            </section>
            
            {/* Right Column: List */}
            <section className="relative">
                 <div className="mb-6 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Class Roster</h2>
                        <p className="text-slate-400">
                             Total Students: <strong className="text-emerald-400">{optimisticStudents.length}</strong>
                        </p>
                    </div>
                 </div>

                 <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {optimisticStudents.map((student) => (
                            <motion.div
                                key={student.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ 
                                    opacity: student.pending ? 0.7 : 1, 
                                    scale: 1,
                                    x: 0
                                }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`
                                    group relative p-4 rounded-2xl border transition-all
                                    ${student.pending 
                                        ? "bg-slate-800/50 border-emerald-500/30 border-l-4 border-l-emerald-500" 
                                        : "bg-slate-800 border-white/5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                                    }
                                `}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                                            ${student.pending ? "bg-slate-700 text-slate-400" : "bg-slate-700 text-emerald-400"}
                                        `}>
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-200">{student.name}</h3>
                                            <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                {student.course}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {student.pending && (
                                        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full animate-pulse">
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            Adding...
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {optimisticStudents.length === 0 && (
                        <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
                            <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No students enrolled yet.</p>
                        </div>
                    )}
                 </div>
            </section>
        </main>
    </div>
  );
}

