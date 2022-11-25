import { useState, useContext, createContext } from "react";

 
export const TaskContext = createContext();

export const TaskContextProvider = props => {
    const [tasksToDelete, setTasksToDelete] = useState([]);

return(
    <TaskContext.Provider value={{ setTasksToDelete, tasksToDelete}}>
        {props.children}
    </TaskContext.Provider>);
    
}