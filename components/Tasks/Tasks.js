
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TaskContext } from "../../context/TasksContext";
import useTasks from "../../hooks/useTasks";
import { supabase } from "../../utils/supabaseClient";
import TaskCard from "../TaskCard/TaskCard";
import s from "./Tasks.module.css"

export default function Tasks({session}) {
    const router = useRouter()
    const {tasksToDelete, setTasksToDelete} = useContext(TaskContext)
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const notify = () => toast('Successfully deleted task(s)!')
    const notifyError = () => toast('Successfully deleted task(s)!')
    const { data, isLoading, isError } = useTasks(session.user.id)
    console.log(data)
   const tempArr = [];
   const tempIdArr = [];
   const constructBatchDeleteRequests = async() =>{
    try {
        for(const atask of tasksToDelete){
            let holder = `'id', ${atask} ,`;
            let holdId = atask;
            tempIdArr.push(holdId);
            tempArr.push(holder);
        }
    } catch (err) {
        console.error(err.message)
    }
    
    return tempArr.join('')
   }

   const handleBatchDelete = async(e) =>{
    e.preventDefault()
    try {
        const completeReqString = await constructBatchDeleteRequests()
        console.log(completeReqString)
       for(const atask of tasksToDelete){
        const {data, error} = await supabase
        .from('tasks')
        .delete()
        .eq('id', atask)
        notify()
        
       


        if(error){
            console.log(error)
            notifyError()
        }
       }
    } catch (err) {
        console.error(err.message)
    } finally{
        window.location.reload()
    }
   }

   //https://www.dofactory.com/html/button/disabled copied script tag, threw in useEffect with dependency

   useEffect(()=>{
    if(isLoading){

    } else{
        let element = document.getElementById('delete_button');
        let disabled = element.getAttribute("disabled");
        
        if(tasksToDelete.length >= 1){
            element.removeAttribute("disabled");
        } else{
             element.setAttribute("disabled", "disabled");
        }
    }
   
   },[isLoading,tasksToDelete])


   if(isLoading){
    return<>
    </>
   }
   
  return (
    <div className={s.container}>
        <div className={s.labelcontainer}>
            <span className={s.label}>
                Tasks
            </span>
           <div className={s.buttoncontainer}>
           <button  id="delete_button" onClick={(e)=>handleBatchDelete(e)} className={s.button}>
                {tasksToDelete.length >1 ? 'Delete Batch' : 'Delete Task'}
            </button>
           </div>
        </div>
        <div className={s.taskscontainer}>
        {isLoading == false ? data.map((task)=>(
            <TaskCard
            id={task.id}
            key={task.id}
            title={task.title}
            status={task.status} />
        )) : <></>}
        </div>
    </div>
  )
}
