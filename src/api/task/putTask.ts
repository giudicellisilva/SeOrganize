import Task from "@/interfaces/Task";
import api from "../httpCommon";

export async function putTask(task: Task){
    return await api.put(`/task/${task.id}`, 
      {
        "title": task.title,
        "type": task.type,
        "description": task.description,
        "date": task.date
      }
    );
}