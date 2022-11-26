import { useQuery } from 'react-query'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'


const fetchTasks = async (userId) => {
    console.log(userId)
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, text, status')
    .eq('creator_id', userId)

  if(error) {
    console.log(error.message)
  }

  return data
}

export default function useTasks(userId) {
  
  return useQuery('tasks', () => fetchTasks(userId))
}