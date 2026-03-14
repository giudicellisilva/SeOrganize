import Phrases from "@/app/dashboard/components/Phrases";
import api from "../httpCommon";
import Phrase from "@/interfaces/Phrase";

export async function putPhrases(id: String, phrase: Phrase){
    return await api.put(`/phrases/${id}`, 
      {
        "phrase": phrase.phrase,
        "author": phrase.author,
      }
    );
}