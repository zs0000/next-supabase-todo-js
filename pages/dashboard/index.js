import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import s from "../../styles/Dashboard.module.css"
import { supabase } from "../../utils/supabaseClient"

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState(null)
  
    useEffect(() => {
      let mounted = true
  
      async function getInitialSession() {
        const {
          data: { session },
        } = await supabase.auth.getSession()
  
        // only update the react state if the component is still mounted
        if (mounted) {
          if (session) {
            setSession(session)
          }
  
          setIsLoading(false)
        }
      }
  
      getInitialSession()
  
      const { subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session)
        }
      )
  
      return () => {
        mounted = false
  
        subscription?.unsubscribe()
      }
    }, [])

    if(!session){
        return(
            <Layout>
                <div className={s.container}>
                you're not signed in
            </div>
            </Layout>
        )
    }

  return (
   <Layout>
     <div className={s.container}>
       <div className={s.topbar}>
        <h1 className={s.toplabel}>
            Hello beautiful
        </h1>
       </div>
       <div className={s.todocontainer}>
            <h2>
                this will be posts
            </h2>
       </div>
    </div>
   </Layout>
  )
}
