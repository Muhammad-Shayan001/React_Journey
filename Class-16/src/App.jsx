import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle, LayoutDashboard, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review project requirements", status: "completed", date: "2024-02-07" },
    { id: 2, title: "Design database schema", status: "pending", date: "2024-02-08" },
    { id: 3, title: "Setup React environment", status: "completed", date: "2024-02-06" },
    { id: 4, title: "Implement authentication", status: "pending", date: "2024-02-10" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask,
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed" } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    pending: tasks.filter(t => t.status === "pending").length
  };

  return (
    <div className="min-h-screen bg-muted/40 p-8 font-sans text-foreground">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              TaskFlow Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage your projects and tasks efficiently.</p>
          </div>
          <div className="flex items-center gap-2 bg-background p-2 rounded-lg border shadow-sm">
             <div className="text-sm font-medium px-3">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All active and completed tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Circle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Tasks remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-[350px_1fr]">
          
          {/* Add Task Form */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>Create a new task to track your progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addTask} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="task">Task Title</Label>
                    <Input 
                      id="task" 
                      placeholder="e.g. Finish API integration" 
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-semibold text-primary mb-2">Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                    Break down complex tasks into smaller, manageable steps to maintain momentum and track progress effectively.
                </p>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Tasks</h2>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search tasks..." 
                        className="pl-8" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-3">
              {filteredTasks.length === 0 ? (
                 <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                            <LayoutDashboard className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg">No tasks found</h3>
                        <p className="text-muted-foreground text-sm max-w-xs mt-1">
                            Use the form on the left to add a new task or try a different search term.
                        </p>
                    </CardContent>
                 </Card>
              ) : (
                filteredTasks.map((task) => (
                    <Card key={task.id} className="transition-all hover:shadow-md">
                    <div className="flex items-center p-4 gap-4">
                        <button 
                            onClick={() => toggleStatus(task.id)}
                            className={`flex-shrink-0 h-6 w-6 rounded-full border flex items-center justify-center transition-colors ${task.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 hover:border-slate-400'}`}
                        >
                            {task.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                            <h3 className={`font-medium truncate ${task.status === 'completed' ? 'text-muted-foreground line-through' : ''}`}>
                                {task.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Calendar className="h-3 w-3" />
                                <span>{task.date}</span>
                            </div>
                        </div>

                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => deleteTask(task.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
