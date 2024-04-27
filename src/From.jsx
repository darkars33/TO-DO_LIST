import React, {useState} from "react";

const From = (props) => {
          const [name, setName] = useState('')
          const [note, setNote] = useState(false)
           const handleSubmit = (e) =>{
                    e.preventDefault();
                    if(name=== ''){
                              setNote(!note);
                    }else{
                              props.addTask(name)
                              setName('')
                              setNote(false)
                    }
          }
          const handleChange = (e) =>{
                  setName(e.target.value)
          }

  return (
    <form action="" className="w-[100%] flex flex-col pt-4 gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-[2px] border-black w-[100%] p-3 text-[20px]"
        value={name}
        onChange={handleChange}
      />
      {note && <p className="text-red-500">Please enter a task</p>}
      <button className="p-3 bg-black text-white">ADD</button>
    </form>
  );
};

export default From;
