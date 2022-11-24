import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout/Layout"
import s from "../../styles/Register.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
    const notify = () => toast("Check your inbox to verify your email!")
    const notifyError = () => toast("Error Signing up/User might already exist")
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
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

  return (
    <Layout>
        <div className={s.container}>
            <div className={s.registercontainer}>
                <span className={s.label}>
                    Register
                </span>
            </div>
            <div className={s.form}>
                <div className={s.inputbox}>
                    <input
                    type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={s.input}
                    />
                </div>
                <div className={s.inputbox}>
                    <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={s.input}
                    />
                </div>
                <div className={s.buttoncontainer}>
                    <button onClick={(e) => handleRegisterUser(e)} className={s.button}>
                        Submit
                    </button>
                    <Link href="/login" className={s.signinbutton}>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </Layout>
  )
}
