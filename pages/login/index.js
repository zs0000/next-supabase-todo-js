import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout"
import s from "../../styles/Login.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../../utils/supabaseClient"
import {useRouter }from "next/router"
export default function Login() {

    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const router = useRouter()

    const notify = () => toast("Successfully logged in!")
    const notifyError = () => toast("Error logging in/User might not exist")
    const handleLoginUser = async(e) => {
        try {
            setLoading(true)
            const inputs = {
                email:email,
                password:password
            }
            const {data, error} =  await supabase
            .auth.signInWithPassword(inputs)
            notify();
            router.push('/dashboard')
            if(data){
                console.log(data)
            }

            if(error){
                console.log(error)
                notifyError()
            }
        } catch (err) {
            console.error(err.message)
        } finally{
            setLoading(false)
        }
    }
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
        if(session){
            router.push('/dashboard')
          }
        return session.user
      }
    
    async function getProfile() {
        try {
          setLoading(true)
          const user = await getCurrentUser()
        
       
    
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`username`)
            .eq('id', user.id)
            .single()

            console.log(data)
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
           
            setUsername(data.username)
         
            
           
          }
        } catch (error) {
          alert(error.message)
        } finally {
          
          setLoading(false)
        }
      }
      useEffect(() => {
        getProfile()
      }, [])

    

  return (
    <Layout>
        <div className={s.container}>
            <div className={s.registercontainer}>
                <span className={s.label}>
                    Login
                </span>
            </div>
            <div className={s.form}>
                <div className={s.inputbox}>
                    <input
                    type="text"
                    value={email || ""}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={s.input}
                    />
                </div>
                <div  className={s.inputbox}>
                    <input
                    type="password"
                    value={password || ""}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={s.input}
                    />
                </div>
                <div className={s.buttoncontainer}>
                    <button onClick={(e) => handleLoginUser(e)} className={s.button}>
                        Submit
                    </button>
                    <Link  href="/register" className={s.signinbutton}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </Layout>
  )
}
