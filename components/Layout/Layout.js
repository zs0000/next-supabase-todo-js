import s from "./Layout.module.css"
import TopNavbar from "../TopNavbar/TopNavbar"

export default function Layout({children}) {
  return <div className={s.container}>{children}</div>
}
