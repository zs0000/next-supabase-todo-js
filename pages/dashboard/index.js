import { useContext, useEffect, useState } from "react"
import HelloBanner from "../../components/HelloBanner/HelloBanner"
import Layout from "../../components/Layout/Layout"
import TaskInput from "../../components/TaskInput/TaskInput"
import Tasks from "../../components/Tasks/Tasks"
import UsernameModal from "../../components/UsernameModal/UsernameModal"
import s from "../../styles/Dashboard.module.css"
import { supabase } from "../../utils/supabaseClient"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskContext } from "../../context/TasksContext"
import LoadingBanner from "../../components/LoadingBanner/LoadingBanner"
import Link from "next/link"
export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [loadingBanner, setLoadingBanner] = useState(true)
    const [session, setSession] = useState(null)
    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState(null)
    const [message, setMessage] = useState("Hello");
    const {tasks, setTasks} = useContext(TaskContext)
    const [modal, setModal] = useState(<></>);

    const notifySignedOut = () => toast("Successfully signed out")
    const notifySignedOutError = () => toast("Error signing out")
    
    const closeModal = () => setModal(<></>);
    const openModal = () => setModal(<UsernameModal closeModal={closeModal} session={session} />);
    const handleSignOut = async(e) => {
      e.preventDefault()
      try {
       const {error} = await supabase.auth.signOut()
        notifySignedOut()
      } catch (err) {
        notifySignedOutError()
        console.error(err.message)
      }
    }
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
          setLoadingBanner(false)
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
               <div className={s.topbar}> <HelloBanner
       message={"Sign in to view Dashboard"}
       username={""}
     

       /></div>
       <div className={s.links}>
            <Link href="/register" className={s.register}>
                Sign up
            </Link>
            <Link href="/login" className={s.login}>
                Sign in
            </Link>
            </div>
            </div>
            
            </Layout>
        )
    }

  return (
   <Layout>
     <div className={s.container}>
      <div className={s.topbar}>
      {loadingBanner ==false ?
      <HelloBanner
      message={"Welcome"}
      username={username}/> 
        :
        <LoadingBanner/>


      }
      <div className={s.signoutcontainer}>
        <button onClick={(e) => handleSignOut(e)} className={s.signout}>
          Sign out
        </button>
      </div>
      </div>
       
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
