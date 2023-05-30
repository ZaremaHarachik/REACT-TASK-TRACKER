import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState } from "react"

function App() {
  const [tasks, setTasks] = useState(
    [
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

        //Delete Task
    const deleteTask = (id) => {
      // console.log('delete', id)
      setTasks(tasks.filter((task) => task.id !== id))
    }
    
    //Toggle Reminder
    const toggleReminder = (id) => {
      console.log(id)
    }

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask}
      onToggle={toggleReminder}/>
      ) : (
        "Let's go to the Beach! :)"
      )}
    </div>
  );
}

export default App;
