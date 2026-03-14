import api from "../httpCommon";
import Phrase from "@/interfaces/Phrase";

export async function postPhrase(phrase: Phrase){
    return await api.post("/phrase", 
      {
        "phrase": phrase.phrase,
        "author": phrase.author,
      }
    );
}