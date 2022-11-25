import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import HelloBanner from '../../../components/HelloBanner/HelloBanner'
import Layout from '../../../components/Layout/Layout'
import TaskPageCard from '../../../components/TaskPageCard/TaskPageCard'
import s from "../../../styles/TaskPage.module.css"
import { supabase } from '../../../utils/supabaseClient'

export default function TaskPage() {
    const router = useRouter()
    const id = router.query.id
    const [tempId, setTempId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [status, setStatus] = useState('')
  
    async function getTaskId(){
 
        const holdId = router.query.id
      return holdId
      
      
    }

    async function getTaskDetails(){
        try {
            setLoading(true)
            const reqId = await getTaskId();
           if(reqId){
            const {data, error} = await supabase
            .from('tasks')
            .select('title, text, status')
            .eq('id',reqId)
            .single()
            if(data){
                console.log(data)
                setTitle(data.title)
                setText(data.text)
                setStatus(data.status)
            }
            if(error){
                console.log(error)
            }
           }
           
           
        } catch (err) {
            console.error(err.message)
        } finally{
            setLoading(false);
        }
    }

    

    useEffect(()=>{
        getTaskDetails()
    },[id])
  return (
    <Layout>
        <div className={s.container}>
        <HelloBanner
       message={"Task "}
       username={id}


       />
       <Link href="/dashboard">
        back
       </Link>
        {loading ?
        <>fetching...</>
        : <TaskPageCard
        title={title}
        text={text}
        status={status}
        id={id}
        />}
    </div>
    </Layout>
  )
}
