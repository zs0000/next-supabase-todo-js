import s from "./Layout.module.css"
import TopNavbar from "../TopNavbar/TopNavbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children}) {
  return <div className={s.container}>
    {children}
  <ToastContainer/>
  </div>
}
