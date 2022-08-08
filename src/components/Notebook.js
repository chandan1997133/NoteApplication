import React, {useState, useEffect} from 'react'
import image from '../image/istockphoto-1197901679-612x612.jpg';

import "../App.css"

function Notebook() {
    const [title, setTitle]=useState('');
    const [data, setData]=useState('')
    const [datas, setDatas]=useState([]);
    const [edit, setEdit]=useState('');
  
    useEffect(()=>{
      if(localStorage.getItem("localTasks")){
        const list =JSON.parse(localStorage.getItem("localTasks"));
        setDatas(list)
        
      }
    },[])
 
  
    const addNote=(e)=>{
        if(edit)
        {
          const edited =datas.find((t)=> t.id ===edit);
          edited.data=data;
          edited.id=new Date().toLocaleString();
          alert("your note is updated successfully....")
          setEdit('');
          setTitle('');
          setData('')
        }
        else if(title){
        const newData={ id:new Date().toLocaleString(), title:title,data:data}
        setDatas([...datas,newData]);
        localStorage.setItem("localTasks",JSON.stringify([...datas,newData]))
        setTitle('');
        setData('')
      }
    }
  
    const handleDelete=(id)=>{
      if (!window.confirm('Do you confirm to delete the task?')) {
        return;
       } else {
        const deleted =datas.filter((t)=>t.id !==id);
        setDatas(deleted)
        localStorage.setItem("localTasks",JSON.stringify(deleted));
       }
     
    }
  
    const handleClear=()=>{
      if (!window.confirm('Do you confirm to delete all?')) {
        return;
       } else {
       setDatas([]);
      localStorage.removeItem("localTasks")
       }
    }

    const handleEdit= (id)=>{
      const edited =datas.find((t)=> t.id ===id);
      setTitle(edited.title)
      setData(edited.data)
      setEdit(id)

    }
    return (
      <div className='maindiv'>
          <div className='input-section'>
            <h1>Add Note APP</h1>
            <img src={image} className="App-logo" alt="logo" />
            <input className='Input-text' value={title} type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}></input>
            <input className='Input-text' value={data} type="text" placeholder='contant' onChange={(e)=>setData(e.target.value)}></input>
            <div>
            <button className='addbtn' type='button' onClick={addNote}>{!edit?"Add Note":"Edit Note"}</button>
            </div>
          </div> 
          <div className='show-task'>
            You have  
            {
              !datas.length?" no tasks"
              :datas.length===1?" 1 task"
              :datas.length>1?` ${datas.length} tasks`
              :null
            }
  
          </div>
        
          {
            datas.map((title) =>(
            <React.Fragment key={title.id}>
            <div className="doc">
                <textarea  rows={1} className="t" defaultValue={title.title}></textarea>
                <textarea rows={1} className="doc1" defaultValue={title.data}></textarea>
                <div>
                <button className='deletebtn' onClick={()=>handleDelete(title.id)}>Delete</button>
                <button className='updatebtn' onClick={()=>handleEdit(title.id)}>Update</button>
                </div>
                <div>
                <p id="dates">{title.id}</p>
                </div>
            </div>
            </React.Fragment>
            ))
           }
           {!datas.length?null:(
             <div className='clear'>
              <button className='clrbtn' onClick={()=>handleClear()}>Clear All</button>
             </div> 
            )
           }
        
      </div>
    )
}

export default Notebook
