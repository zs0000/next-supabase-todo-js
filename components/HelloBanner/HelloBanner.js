import s from "./HelloBanner.module.css"

export default function HelloBanner({message, username}) {
  return (
    <div className={s.topbar}>
        <h1 className={s.toplabel}>
           {message + " "}<span className={s.username}>{username}</span>
        </h1>
       </div>
  )
}
