'use client';
import { useMutation } from "@tanstack/react-query";
import style from "./phrases.module.scss";
import { getPhrases } from "@/api/phrases/getPhrases";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "@/utils/localStore";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Phrases = () =>{
    const [phrases, setPhrases] = useState([""]);
    const user: {userId: string, email: string}= useSelector((state: RootState) => state.user);

    useEffect(() =>{
        mutate();
    }, []);

    const {status, mutate} = useMutation({
        mutationFn: async ()=>{
            return await getPhrases(user?.userId);
        },
        onSuccess: (res) =>{
            setPhrases(res.data[0].phrases);
        }
    })

    function phrasesDisplay() {
        const today = new Date();
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate()); 
    
        let timeStore = getStorageItem("datePhrases");
        if (timeStore && timeStore != undefined && typeof timeStore === "string") {
            try {
                timeStore = JSON.parse(timeStore);
            } catch (error) {
                console.error("Erro ao converter `datePhrases` para JSON:", error);
                timeStore = null;
            }
        }
    
        let position = getStorageItem("positionPhrases") || 0;
        console.log("timeStore", timeStore);
        if (timeStore && timeStore != undefined) {
            const storedDate = new Date(timeStore.year, timeStore.month - 1, timeStore.day);
    
            console.log("Stored Date:", storedDate);
            console.log("Today's Date:", date);
    
            if (date > storedDate) {
                if(position >= phrases.length){
                    position = 0;
                }else{
                    position++;
                }
                console.log("sssssssssss",position)
                setStorageItem("positionPhrases", position);
                setStorageItem("datePhrases", {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                });
            }
        } else {
            position = 0;
            setStorageItem("positionPhrases", position);
            setStorageItem("datePhrases", {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            });
        }
    
        console.log("Frase escolhida:", phrases[position]);
        return phrases[position];
    }
    
    return(
        <div className={style.phrases}>
            <span className={style.phrases__content}>{phrasesDisplay()}</span>
            <br></br>
            {JSON.stringify(user)}
        </div>
    )
}

export default Phrases;