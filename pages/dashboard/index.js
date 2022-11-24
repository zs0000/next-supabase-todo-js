import { useEffect, useState } from "react"
import HelloBanner from "../../components/HelloBanner/HelloBanner"
import Layout from "../../components/Layout/Layout"
import Tasks from "../../components/Tasks/Tasks"
import UsernameModal from "../../components/UsernameModal/UsernameModal"
import s from "../../styles/Dashboard.module.css"
import { supabase } from "../../utils/supabaseClient"

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [username, setUsername] = useState('')
 
    const [message, setMessage] = useState("Hello");
    const [tasks, setTasks] = useState([
      {
          id:1,
          title: 'yo this a task',
          status: 'incomplete'
      },
      {
          id:2,
          title: 'a started - but not done',
          status: 'in progress'
      },
      {
          id:3,
          title: 'this is finished',
          status: 'complete'
      }
  ]);
    const [modal, setModal] = useState(<></>);

    const closeModal = () => setModal(<></>);
    const openModal = () => setModal(<UsernameModal closeModal={closeModal} session={session} />);
  
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

    async function getUsername(){
      try {
       
        let{data, error, status} = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single()

        if(status == 406){
          openModal()
        }

        if(data){
          console.log(data)
          setUsername(data.username)
        }
        if(error){
          console.log(error)
        }
      } catch (err) {
        console.error(err.message)
      } 
    }

    useEffect(()=>{
      getUsername()
    },[session])


    if(!session){
        return(
            <Layout>
                <div className={s.container}>
                <HelloBanner
       message={"Sign in to view Dashboard"}
       username={""}
     

       />
            </div>
            </Layout>
        )
    }

  return (
   <Layout>
     <div className={s.container}>
       <HelloBanner
       message={"Hello"}
       username={username}


       />
       <div className={s.todocontainer}>
            <Tasks
            tasks={tasks}
            />
       </div>
       {modal}
    </div>
   </Layout>
  )
}
