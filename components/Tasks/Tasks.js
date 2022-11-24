
import { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import s from "./Tasks.module.css"

export default function Tasks({tasks}) {


    if(!tasks){
        return(
            <div className={s.container}>
        <div className={s.labelcontainer}>
            <span className={s.label}>
                Tasks
            </span>
        </div>
        <div className={s.taskscontainer}>
       Nothing to see yet!
        </div>
    </div>
        )
    }
  return (
    <div className={s.container}>
        <div className={s.labelcontainer}>
            <span className={s.label}>
                Tasks
            </span>
        </div>
        <div className={s.taskscontainer}>
        {tasks.map((task)=>(
            <TaskCard
            id={task.id}
            title={task.title}
            status={task.status} />
        ))}
        </div>
    </div>
  )
}
