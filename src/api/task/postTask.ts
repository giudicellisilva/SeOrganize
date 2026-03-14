import Task from "@/interfaces/Task";
import api from "../httpCommon";

export async function postTask(task: Task){
    return await api.post("/task", 
      {
        "title": task.title,
        "description": task.description,
        "type": task.type,
        "date": task.date
      }
    );
}