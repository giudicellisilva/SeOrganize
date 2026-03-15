import api from "../httpCommon";

export async function postPayment(){
    return await api.post("/payment");
}