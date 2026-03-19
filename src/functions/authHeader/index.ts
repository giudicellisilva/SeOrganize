import api from "@/api/httpCommon";

export function setTokenHeader(token: string){
    api.defaults.headers.authorization = `Bearer ${token}`
}

export function clearTokenHeader() {
    delete api.defaults.headers.authorization;
}