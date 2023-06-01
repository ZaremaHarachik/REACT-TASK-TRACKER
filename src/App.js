import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState } from "react"
import AddTask from "./Components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'July 5th at 3:00pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Meeting at school',
            day: 'July 7th at 1:00pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Food Shopping',
            day: 'Today',
            reminder: false,
        },
        ])

        //Add Task
        const addTask =(task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        console.log(id)
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
        }

        //Delete Task
    const deleteTask = (id) => {
     
      setTasks(tasks.filter((task) => task.id !== id))
  }
    
    //Toggle Reminder
    const toggleReminder = (id) => {
      setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder:
        !task.reminder } : task
      )
    )
      
  }

  return (
    <div className="container">
      <Header 
      onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask}
         onToggle={toggleReminder}/>
      ) : (
        "Let's go to the Beach! :)"
      )}
    </div>
  );
}


export default App
