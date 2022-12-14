import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TasksContext";
import s from "./TaskCard.module.css"

export default function TaskCard({id, title, status}) {
    const [toggledToDelete, setToggledToDelete] = useState(false);
    const {tasksToDelete, setTasksToDelete} = useContext(TaskContext);
    const router = useRouter();

    const handleToggleAddedToDelete = () => {
          setToggledToDelete(true)
            setTasksToDelete(tasksToDelete=>[...tasksToDelete, id])
    }
    const handleToggleRemoveFromDelete = () => {  
        setToggledToDelete(false)
          setTasksToDelete(tasksToDelete.filter(item=> item !== id))
        }
    const handleNavigateToTaskPage = async(e) =>{
     e.stopPropagation();
      try {
        router.push(`/task/${id}`)
      } catch (err) {
        console.error(err.message)
      }
        
    }
  return (
    <div className={s.card} >
        <div className={s.statuscontainer}onClickCapture={((e)=>handleNavigateToTaskPage(e))}>
            
            <span className={status == "incomplete" ? s.incomplete : status == "in progress"?  s.inprogress : s.complete }>
                
            </span>
        </div>
        <div  className={s.primarycontainer} onClickCapture={((e)=>handleNavigateToTaskPage(e))}>
            <span className={s.title}>
                {title}
            </span>
        </div>
        <div className={s.rightcontainer}>
           <input
           type="checkbox"
           value={toggledToDelete}
           onChange={ toggledToDelete == true ?()=> handleToggleRemoveFromDelete() : ()=> handleToggleAddedToDelete()}
      
           />
        </div>
    </div>
  )
}
