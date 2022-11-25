import { useState, useContext, createContext } from "react";

 
export const TaskContext = createContext();

export const TaskContextProvider = props => {
    const [tasks, setTasks] = useState([]);
    const [tasksToDelete, setTasksToDelete] = useState([]);

return(
    <TaskContext.Provider value={{ setTasksToDelete, tasksToDelete,tasks, setTasks}}>
        {props.children}
    </TaskContext.Provider>);
    
}