import React, { useState } from "react";
import From from "./From";
import Filter from "./Filter";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.complete,
  Completed: (task) => task.complete,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const addTask = (name) => {
    const newTask = { id: `Todo-${nanoid()}`, name: name, complete: false };
    setTasks([...tasks, newTask]);
  };
  const toggleTaskComplete = (id) => {
    const updateTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, complete: !task.complete };
      }
      return task;
    });

    setTasks(updateTask);
  };
  const deleteTask = (id) => {
    const updateTask = tasks.filter((task) => {
      return id !== task.id;
    });
    setTasks(updateTask);
  };
  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };
  const taskList = tasks.filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
        id={task.id}
        name={task.name}
        complete={task.complete}
        key={task.id}
        toggleTaskComplete={toggleTaskComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />
  ))
  ;

  const filterList = FILTER_NAMES.map((name) => (
    <Filter
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const proper = taskList.length === 1 ? "Task" : "Tasks";
  const remain = `${taskList.length} ${proper} Remaining`;
  return (
    <>
      <div className="w-screen mt-[5%] flex justify-center">
        <div className="w-[40rem] p-3 bg-white flex flex-col items-center">
          <h1 className="text-[30px]">TODO-MATIC</h1>
          <p className="text-[20px] pt-4">what to be done?</p>
          <div className="flex flex-col w-[100%] gap-5">
            <From addTask={addTask} />
            <div className="flex gap-5 w-[100%] justify-center">
              {filterList}
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

const Todo = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editTemplate = (
    <>
      <form
        className="w-[100%] p-3 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="">New name for {props.name}</label>
        <input
          type="text"
          id={props.id}
          value={newName}
          onChange={handleChange}
          className="w-[100%] border-[2px] p-3"
        />
        <div className="flex gap-4 w-[100%]">
          <button
            className="w-[50%] p-2 px-3 border-[2px] border-black"
            onClick={(e) => {
              e.preventDefault();
              setEditing(!isEditing);
            }}
          >
            Cancel
          </button>
          <button className="w-[50%] p-2 px-3 border-[2px] border-red-400 bg-red-400">
            Save
          </button>
        </div>
      </form>
    </>
  );

  const viewTemplate = (
    <>
      <div className="flex gap-4 ml-4">
        <input
          type="checkbox"
          className="w-[20px]"
          onChange={() => props.toggleTaskComplete(props.id)}
          defaultChecked={props.complete}
        />
        <label htmlFor="todo-0" className="text-[20px]">
          {props.name}
        </label>
      </div>
      <div className="flex gap-4 w-[100%]">
        <button
          className="w-[50%] p-2 px-3 border-[2px] border-black"
          onClick={() => setEditing(!isEditing)}
        >
          Edit
        </button>
        <button
          className="w-[50%] p-2 px-3 border-[2px] border-red-400 bg-red-400"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </>
  );
  return (
    <li className="w-[100%] flex flex-col gap-4">
      {isEditing ? editTemplate : viewTemplate}
    </li>
  );
};
