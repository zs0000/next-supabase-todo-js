import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout"
import s from "../../styles/Register.module.css"
import { toast } from 'react-toastify';

import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
export default function Register() {
    const notify = () => toast("Check your inbox to verify your email!")
    const notifyError = () => toast("Error Signing up/User might already exist")
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [session, setSession] = useState(null)
    const handleRegisterUser = async(e) => {
        try {
            setLoading(true)
            const inputs = {
                email:email,
                password:password
            }
            const {data, error} =  await supabase
            .auth.signUp(inputs)
            notify();
            if(data){
             
                console.log(data)
            }

            if(error){
                console.log(error)
            }
        } catch (err) {
            notifyError()
            console.error(err.message)
        } finally{
            setLoading(false)
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
    
            setLoading(false)
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
  
      if(session){
 
              router.push('/dashboard')
          
      }
  
    

  return (
    <Layout>
        <div className={s.container}>
            <div className={s.registercontainer}>
                <span className={s.label}>
                    Register
                </span>
            </div>
            <div className={s.form}>
            <div className={s.inputlabelcontainer}>
                <label className={s.inputlabel}>
                  Email
                </label>
              </div>
                <div className={s.inputbox}>
                    <input
                    type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={s.input}
                    />
                </div>
                <div className={s.inputlabelcontainer}>
                <label className={s.inputlabel}>
                  Password
                </label>
              </div>
                <div className={s.inputbox}>
                    <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={s.input}
                    />
                </div>
                <div className={s.interactioncontainer}>
                <Link href="/login" className={s.signinbutton}>
                        Sign in
                    </Link>
                    <div className={s.buttoncontainer}>
                    <button onClick={(e) => handleRegisterUser(e)} className={s.button}>
                        Submit
                    </button>
                    
                </div>
                </div>
               
            </div>
            <div className={s.newcontainer}>
             
            
             </div>
        </div>

    </Layout>
  )
}
