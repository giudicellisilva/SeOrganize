import Task from "@/interfaces/Task";
import api from "../httpCommon";

export async function postTask(task: Task){
    console.log("Enviando tarefa para API:", task);
    return await api.post("/task", 
      {
        "title": task.title,
        "description": task.description,
        "type": task.type,
        "date": task.date,
        "time": task.time,
        "completed": task.completed,
        "instrument": task.instrument,
        "sheetMusicLink": task.sheetMusicLink,
        "repetitions": task.repetitions,
        "muscleGroup": task.muscleGroup,
        "subject": task.subject,
        "resourceLink": task.resourceLink,
        "durationMinutes": task.durationMinutes,
        "project": task.project,
        "priority": task.priority,
        "deadline": task.deadline
      }
    );
}