import Link from "next/link"
import { toast } from "react-toastify"
import { supabase } from "../../utils/supabaseClient"
import s from "./Hero.module.css"

export default function Hero({session}) {

  const notify = () => toast('Successfully signed out')
  const notifyError = () => toast('Error signing out')

  const handleSignOut = async(e) => {
    e.preventDefault()
    try {
      let {error} = await supabase.auth.signOut();
      notify();
      
    } catch (err) {
      console.error(err.message)
      notifyError()
    }
  }


  if(session){
    return(
      <div className={s.container}>
    
        <span className={s.title}>
         use createTask
        </span>
        <div className={s.links}>
            <Link href="/dashboard" className={s.register}>
                Dashboard
            </Link>
            <button onClick={(e)=>handleSignOut(e)} className={s.login}>
                Sign out
            </button>
        </div>
    </div>
    )
  }

  return (
    <div className={s.container}>
        <h1 className={s.title}>
        new Task
        </h1>
        <div className={s.links}>
            <Link href="/register" className={s.register}>
                Sign up
            </Link>
            <Link href="/login" className={s.login}>
                Sign in
            </Link>
        </div>
    </div>
  )
}
