import { useContext, useState } from "react";
import { TaskContext } from "../../context/TasksContext";
import s from "./TaskCard.module.css"

export default function TaskCard({id, title, status}) {
    const [toggledToDelete, setToggledToDelete] = useState(false);
    const {tasksToDelete, setTasksToDelete} = useContext(TaskContext);


    const handleToggleAddedToDelete = () => {
          setToggledToDelete(!toggledToDelete)
            setTasksToDelete(tasksToDelete=>[...tasksToDelete, id])
    }
    const handleToggleRemoveFromDelete = () => {  
        setToggledToDelete(!toggledToDelete)
          setTasksToDelete(tasksToDelete.filter(item=> item !== id))
        }
  
  return (
    <div className={s.card}>
        <div className={s.statuscontainer}>
            
            <span className={status == "incomplete" ? s.incomplete : status == "in progress"?  s.inprogress : s.complete }>
                
            </span>
        </div>
        <div className={s.primarycontainer}>
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
