import api from "../httpCommon";
import Phrase from "@/interfaces/Phrase";

export async function putPhrase(phrase: Phrase){
    return await api.put(`/phrase/${phrase.id}`, 
      {
        "phrase": phrase.phrase,
        "author": phrase.author,
      }
    );
}