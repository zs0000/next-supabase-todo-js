
import {useMutation, useQueryClient} from 'react-query'
import { supabase } from '../utils/supabaseClient'


const createTask = async (task)=>{
    
    const{data,error} = await supabase
    .from('tasks')
    .insert(task)
    .select()
    
    if(error){
        throw error
    }
    return data
}

export default function useCreateTask(task){
    const queryClient = useQueryClient()
    return useMutation(()=> createTask(task), {
        onSuccess: async(data) =>{
            queryClient.refetchQueries('tasks')
           console.log(data)
           return data
        }
    })

}