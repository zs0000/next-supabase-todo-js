import { useEffect, useState } from "react"
import HelloBanner from "../../components/HelloBanner/HelloBanner"
import Layout from "../../components/Layout/Layout"
import TaskInput from "../../components/TaskInput/TaskInput"
import Tasks from "../../components/Tasks/Tasks"
import UsernameModal from "../../components/UsernameModal/UsernameModal"
import s from "../../styles/Dashboard.module.css"
import { supabase } from "../../utils/supabaseClient"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState(null)
    const [message, setMessage] = useState("Hello");
    const [tasks, setTasks] = useState([
     
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
    async function getCurrentUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
  
      if (error) {
        throw error
      }
  
      if (!session?.user) {
        throw new Error('User not logged in')
      }
      setUserID(session.user.id)
      return session.user
    }
    async function getUsername(){
      try {
        const user = await getCurrentUser()
        console.log(user)
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

    async function getTasksByUserId(){
      try {
        const {data, error} = await supabase
        .from('tasks')
        .select('id, title,text, status')
        .eq('creator_id', session.user.id)
        if(data){
          console.log(data)
          setTasks(data)
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
      getTasksByUserId()
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
       <div className={s.inputcontainer}>
        <TaskInput
        userID={userID}
        />
       </div>
       <div className={s.todocontainer}>
            <Tasks
            tasks={tasks}
            setTasks={setTasks}
            />
       </div>
       {modal}
    </div>
    <ToastContainer/>
   </Layout>
  )
}
