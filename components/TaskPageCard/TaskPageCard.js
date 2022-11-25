import s from "./TaskPageCard.module.css"

export default function TaskPageCard({title, text, status, id}) {
  return (
    <div className={s.card}>
            <div className={s.titlecontainer}>
                    {title}
                    {status}{id}
            </div>
            <div className={s.textcontainer}>
                <span>
                    {text}
                </span>
            </div>
        </div>
  )
}
