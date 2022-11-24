import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import Link from "next/link"
import s from '../styles/Home.module.css'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Hero/Hero'

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>
           Home
        </title>
      </Head>
      <Hero/>
    </Layout>
  )
}
