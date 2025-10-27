
// Simulating a database
let studentsDB = [
  { id: 1, name: "Alice Johnson", course: "React Basics" },
  { id: 2, name: "Bob Smith", course: "Advanced Hooks" },
  { id: 3, name: "Charlie Brown", course: "Next.js Mastery" },
];

export async function getStudents() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...studentsDB];
}

export async function addStudent(name, course) {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate latency
  
  if (!name || !course) {
     throw new Error("Name and Course are required");
  }

  const newStudent = {
    id: Date.now(),
    name,
    course,
  };
  
  studentsDB.push(newStudent);
  return newStudent;
}
