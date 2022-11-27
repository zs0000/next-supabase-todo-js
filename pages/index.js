import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import Link from "next/link"
import s from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Hero/Hero'
import HomeLottie from '../components/HomeLottie/HomeLottie'
import HomeCssAnimation from '../components/HomeCssAnimation/HomeCssAnimation'

export default function Home() {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  
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

  return (
    <Layout>
       <Head>
      <title>new Task: Task list</title>
      <meta name="description" content="A light weight, modern task list. Data persistince and User authentication. Built using serverless technologies Next.js and Supabase."/>
      <link rel="icon" href="https://res.cloudinary.com/repdb/image/upload/v1634675008/testesst.jpg"/>
      
      <meta property="og:image" content="https://res.cloudinary.com/repdb/image/upload/v1669583289/7b64f15e868e1e2e68422a248a045f36.png"></meta>
      
    </Head>
      
      <div className={s.leftcontainer}>
      <HomeCssAnimation/>
      </div>
      {isLoading == false ? <Hero session={session}/> : <></>}
    </Layout>
  )
}
