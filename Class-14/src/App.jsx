import { useState, useEffect } from 'react' // Importing hooks from React
import './App.css'

function App() {
  // --- CONCEPT 1: STATE ---
  // useState allows us to store data that changes over time.
  // [variable, functionToChangeVariable] = useState(initialValue)
  const [count, setCount] = useState(0);

  // --- CONCEPT 2: LISTS ---
  // We can store arrays in state too.
  const [students, setStudents] = useState(["Alice", "Bob", "Charlie"]);
  const [newStudentName, setNewStudentName] = useState("");

  // --- CONCEPT 3: CONDITIONAL RENDERING ---
  const [showSecret, setShowSecret] = useState(false);

  // --- CONCEPT 4: EFFECTS ---
  // useEffect runs code when the component loads or when variables change.
  useEffect(() => {
    // This updates the browser tab title every time 'count' changes
    document.title = `Count: ${count}`;
  }, [count]);


  // Helper function to add a student
  const handleAddStudent = () => {
    if (newStudentName.trim() === "") return; // Don't add empty names
    
    // Spread operator (...) keeps old items and adds the new one
    setStudents([...students, newStudentName]); 
    setNewStudentName(""); // Clear the input
  };

  return (
    <div className="container">
      <header className="header">
        <h1>React Learner's Dashboard</h1>
        <p>A simple playground to understand core React concepts.</p>
      </header>

      {/* SECTION 1: COUNTER (State & Events) */}
      <section className="section">
        <h2>1. The Counter (State)</h2>
        <p>Clicking the button updates the <code>count</code> state variable.</p>
        
        <div style={{ fontSize: '2rem', margin: '20px 0' }}>
          Count: <strong>{count}</strong>
        </div>
        
        <button onClick={() => setCount(count + 1)}>Increment (+)</button>
        <button onClick={() => setCount(count - 1)}>Decrement (-)</button>
        <button onClick={() => setCount(0)} style={{ backgroundColor: '#ff6b6b', color: 'white' }}>Reset</button>

        <div className="tip">
          <strong>Tip:</strong> Look at how the browser tab title changes when you click! (That's useEffect)
        </div>
      </section>

      {/* SECTION 2: LISTS & INPUTS */}
      <section className="section">
        <h2>2. Class List (Lists & Forms)</h2>
        <p>Type a name and add it to the list state.</p>

        <div style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="Enter student name..." 
            value={newStudentName}
            // Update state whenever we type a letter
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <button onClick={handleAddStudent}>Add Student</button>
        </div>

        <ul>
          {/* Map function loops through array and displays a component for each item */}
          {students.map((student, index) => (
            <li key={index}>
              {student}
              <span className="badge">Student #{index + 1}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 3: CONDITIONAL RENDERING */}
      <section className="section">
        <h2>3. Toggle Visibility</h2>
        <p>React can show or hide things based on a boolean (true/false) state.</p>
        
        <button onClick={() => setShowSecret(!showSecret)}>
          {showSecret ? "Hide Secret" : "Show Secret"}
        </button>

        {/* The && logical AND operator: if left is true, render right */}
        {showSecret && (
          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#dff9fb', border: '1px dashed #61dafb' }}>
            <h3>🎉 Surprise!</h3>
            <p>You revealed the secret message. This element is only in the DOM when <code>showSecret</code> is true.</p>
          </div>
        )}
      </section>

    </div>
  )
}

export default App
