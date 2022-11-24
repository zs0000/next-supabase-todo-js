import s from "./HelloBanner.module.css"

export default function HelloBanner({message, username}) {
  return (
    <div className={s.topbar}>
        <h1 className={s.toplabel}>
            {message + " " + username + "!"}
        </h1>
       </div>
  )
}
