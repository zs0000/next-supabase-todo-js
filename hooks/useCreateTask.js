
import {useMutation, useQueryClient} from 'react-query'
import { supabase } from '../utils/supabaseClient'


const createTask = async (task)=>{
    console.log(task)
    const{data,error} = await supabase
    .from('tasks')
    .insert(task)
    
    if(error){
        throw error
    }
    return data
}

export default function useCreateTask(task){
    return useMutation(()=> createTask(task), {
        onSuccess: async(data) =>{
           console.log(data)
        }
    })
    return data
}