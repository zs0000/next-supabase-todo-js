import s from "./TaskCard.module.css"

export default function TaskCard({id, title, status}) {
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
    </div>
  )
}
