
import { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import s from "./Tasks.module.css"

export default function Tasks({tasks, setTasks}) {


    if(!tasks || tasks.length == 0){
        setTasks( [{
            id:1,
            title: 'Incomplete Task #1',
            status: 'incomplete'
        },
        {
            id:2,
            title: 'Task #2 (in progress)',
            status: 'in progress'
        },
        {
            id:3,
            title: 'Complete Task #3',
            status: 'complete'
        }])
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
