import { useState } from "react"
import { supabase } from "../../utils/supabaseClient"
import s from "./UsernameModal.module.css"

export default function UsernameModal({closeModal,session}) {
    const [loading, setLodaing] = useState(false)
    const [username, setUsername] = useState('')

    const handleSubmitUsername =  async(e) =>{
        e.preventDefault()
        try {
            const inputs ={
                id: session.user.id,
                username:username
            }
            
            const {data, error} = await supabase
            .from('profiles')
            .insert(inputs)
            closeModal();

            if(error){
                console.log(error)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

  return (
    <div className={s.container}>
        <div className={s.form}>
            <div className={s.labelcontainer}>
                <span className={s.label}>
                    It looks like you don't have a username! Please set one to start creating tasks
                </span>
            </div>
            <div className={s.inputbox}>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={s.input}
                placeholder="Ex; nannaPelosi23"
                />
            </div>
            <div className={s.buttoncontainer}>
                <button className={s.button} onClick={(e) => handleSubmitUsername(e)}>
                        Submit
                </button>
            </div>
        </div>
    </div>
  )
}
