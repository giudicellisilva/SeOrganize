import api from "../httpCommon";

export async function getAllTask(){
    return await api.get("/task/all");
}