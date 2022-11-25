import s from "./TaskPageCard.module.css"

export default function TaskPageCard({title, text, status, id}) {
  return (
    <div className={s.card}>
        <div className={s.statuscontainer}>
        <div className={status == "incomplete" ? s.incomplete : status == "in progress"?  s.inprogress : s.complete }>
                            
                            </div>
                            <span className={status == "incomplete" ? s.incompletestatus : status == "in progress"?  s.inprogressstatus : s.completestatus }>
                                {status}
                            </span>
        </div>
            <div className={s.titlecontainer}>
                    <span className={s.title}>
                        {title} 
                    </span>
                    
            </div>
            <div className={s.textcontainer}>
                <span className={s.tasktext}>
                    {text}
                </span>
            </div>
        </div>
  )
}
