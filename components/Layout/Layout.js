import s from "./Layout.module.css"
import Head from "next/head"
import TopNavbar from "../TopNavbar/TopNavbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export default function Layout({children}) {
  return <div className={s.container}>
    <Head>
    <title>new Task: Simple Task list</title>
      <meta name="description" content="A light weight, modern task list. Data persistince and User authentication. Built using serverless technologies Next.js and Supabase."/>
      <link rel="icon" href="https://res.cloudinary.com/repdb/image/upload/v1634675008/testesst.jpg"/>
      
      <meta property="og:image" content="https://res.cloudinary.com/repdb/image/upload/v1669583289/7b64f15e868e1e2e68422a248a045f36.png"></meta>
    </Head>
    {children}
  <ToastContainer/>
  </div>
}
