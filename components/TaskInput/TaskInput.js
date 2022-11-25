import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../utils/supabaseClient";
import s from "./TaskInput.module.css"
import useCreateTask from "../../hooks/useCreateTask";
import { TaskContext } from "../../context/TasksContext";
export default function TaskInput({userID}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('Status');
    const {tasks, setTasks} = useContext(TaskContext)
    const current = new Date();
    const notifyCreatedTask = () => toast('Task created successfully')
    const notifyErrorCreatingTask = () => toast('Task creation returned an error!')
    const createTaskMutation = useCreateTask({
        title:title,
        text:description,
        creator_id: userID,
        status:status
    })



    const handleCreateTask = async(e) =>{
        e.preventDefault()
        try {
            const inputs = {
               
                
               
            }

            console.log(inputs)

            const {data, error} = await supabase
            .from('tasks')
            .insert({ 
                title: title,
                text:description,
                creator_id: userID,
                status:status})
              

            if(data){
                console.log(data)
                
            }
            notifyCreatedTask()
            if(error){
                console.log(error)
                notifyErrorCreatingTask()
            }
        } catch (err) {
            console.error(err.message)       
        }
    }


  return (
    <div className={s.container}>
       <div className={s.form}>
            <div className={s.inputbox}>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={s.input}
                placeholder="title"
                />
            </div>
            <div className={s.largeinputbox}>
                <textarea
           
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={s.largeinput}
                placeholder="description"
                />
            </div>
            
       </div>
       <div className={s.sidecontainer}>
       <div className={s.inputbox}>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className={s.selectinput}>
                <option disabled>Status</option>
                   <option value="incomplete">incomplete</option> 
                   <option value="in progress">in progress</option> 
                   <option value="complete">complete</option> 
            </select>
            </div>
            <div className={s.buttoncontainer}>
                <button className={s.button} onClick={()=> {createTaskMutation.mutate()
                setTasks([...tasks, { 
                    title: title,
                    text:description,
                    status:status}])
                    notifyCreatedTask()
                    setTitle("")
                    setDescription("")
                    setStatus("")
                    }}>
                    Submit
                </button>
            </div>
       </div>
    </div>
  )
}
