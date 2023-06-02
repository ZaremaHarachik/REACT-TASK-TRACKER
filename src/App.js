import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import About from "./Components/About";

const API_URL = "https://zarema-tasks-api.herokuapp.com";

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };

        getTasks();
    }, []);

    //  Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();

        return data;
    };

    //  Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`${API_URL}/tasks/${id}`);
        const data = await res.json();

        return data;
    };

    //  Add Task
    const addTask = async (task) => {
        const res = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const data = await res.json();

        setTasks([...tasks, data]);
    };

    //  Delete Task
    const deleteTask = async (id) => {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task._id !== id));
    };

    //    Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder,
        };

        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updTask),
        });

        const data = await res.json();

        setTasks(
            tasks.map((task) =>
                task._id === id ? { ...task, reminder: data.reminder } : task
            )
        );
    };

    return (
        <BrowserRouter>
            <div className="container">
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                {showAddTask && <AddTask onAdd={addTask} />}
                                {tasks.length > 0 ? (
                                    <Tasks
                                        tasks={tasks}
                                        onDelete={deleteTask}
                                        onToggle={toggleReminder}
                                    />
                                ) : (
                                    "No Tasks :)"
                                )}
                            </>
                        }
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
