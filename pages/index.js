import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import Link from "next/link"
import s from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Hero/Hero'

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
        <title>
           Home
        </title>
      </Head>
      {isLoading == false ? <Hero session={session}/> : <></>}
    </Layout>
  )
}
