import React, {useState} from "react";
import From from "./From";
import Filter from "./Filter";
import { nanoid } from "nanoid";
function App(props) {
  const [tasks, setTasks] = useState([])
  const addTask = (name) =>{
    const newTask= {id:`Todo-${nanoid()}`, name:name, complete:false}
    setTasks([...tasks, newTask]);
  }
  const toggleTaskComplete = (id) =>{
    const updateTask= tasks.map((task) =>{
      if(id === task.id){
        return {...task, complete: !task.complete}
      }
      return task
    })

    setTasks(updateTask)
  }
  const deleteTask = (id) =>{
    const updateTask= tasks.filter((task) =>{
      return id !== task.id;
    })
    setTasks(updateTask)
  }
  const editTask = (id, newName) =>{

  }
  const taskList = tasks.map((task) =>{
    return <Todo id={task.id} name={task.name} complete={task.complete} toggleTaskComplete={toggleTaskComplete} deleteTask={deleteTask}/>
  })

  const proper= taskList.length === 1 ? 'Task' : 'Tasks';
  const remain= `${taskList.length} ${proper} Remaining`
  return (
    <>
      <div className="w-screen mt-[5%] flex justify-center">
        <div className="w-[40rem] p-3 bg-white flex flex-col items-center">
          <h1 className="text-[30px]">TODO-MATIC</h1>
          <p className="text-[20px] pt-4">what to be done?</p>
          <div className="flex flex-col w-[100%] gap-5">
            <From addTask={addTask} />
            <div className="flex gap-5 w-[100%] justify-center">
              <Filter />
              <Filter />
              <Filter />
            </div>
            <p className="text-[18px] w-[40%] text-center">{remain}</p>
            <div className="w-[100%] px-4">
              <ul className="w-[100%] flex flex-col items-start gap-5">
                {taskList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

const Todo = (props) =>{
  return(
    <li className="w-[100%] flex flex-col gap-4">
    <div className="flex gap-4 ml-4">
      <input type="checkbox" className="w-[20px]" onChange={() =>props.toggleTaskComplete(props.id)} defaultChecked={props.complete}/>
      <label htmlFor="todo-0" className="text-[20px]">
        {props.name}
      </label>
    </div>
    <div className="flex gap-4 w-[100%]">
      <button className="w-[50%] p-2 px-3 border-[2px] border-black">
        Edit
      </button>
      <button className="w-[50%] p-2 px-3 border-[2px] border-red-400 bg-red-400" onClick={() =>props.deleteTask(props.id)}>
        Delete
      </button>
    </div>
  </li>
  )
}

