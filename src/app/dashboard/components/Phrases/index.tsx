'use client';
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from "./phrases.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Phrase from "@/interfaces/Phrase";
import PhraseModal from "./components/PhraseModal";
import { deletePhrase } from "@/api/phrase/deletePhrase";
import { getPhrase } from "@/api/phrase/getPhrase";
import { putPhrase } from "@/api/phrase/putPhrase";
import { postPhrase } from "@/api/phrase/postPhrase";

const Phrases = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [phrase, setPhrase] = useState<Phrase>({ id: "", phrase: "", author: "" });

  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  const { data: phrasesData } = useQuery({
    queryKey: ['phrases'],
    queryFn: async () => await getPhrase()
  });

  const phrases: Phrase[] = phrasesData?.data || [];

  const { mutate: mutateSave } = useMutation({
    mutationFn: async (phrase: Phrase) => {
      return await postPhrase(phrase);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phrases'] });
      resetForm();
    }
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (id: string) => {
      return await deletePhrase(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['phrases'] })
  });

  const { mutate: mutateEdit } = useMutation({
    mutationFn: async (phrase: Phrase) => {
      return await putPhrase(phrase);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['phrases'] })
  });
  const resetForm = () => {
    setPhrase({ id: "", phrase: "", author: "" });
    setEditingId("");
  };

  const handleEditSetup = (item: Phrase) => {
    setEditingId(item.id);
    setPhrase({ ...item });
  };

  return (
    <div className={style.phrases}>
      <div className={style.phrases__content}>
        <div className={style.phrases__content__div}>
          <span className={style.phrases__content__text}>
          "{phrases[0]?.phrase || "Sua frase aparecerá aqui"}"
          </span>
          <span className={style.phrases__content__author}>- {phrases[0]?.author || "Autor"}</span>
        </div>
        <button className={style.phrases__content__button} onClick={() => setIsModalOpen(true)}>
          <img src="/assets/config.png" alt="Editar Frase"/>
        </button>
      </div>

      <PhraseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        phrases={phrases}
        editingId={editingId}
        phrase={phrase}
        setPhrase={setPhrase}
        onSave={mutateSave}
        handleEditSetup={handleEditSetup}
        onEdit={mutateEdit}
        onDelete={(id) => mutateDelete(id)}
        onReset={resetForm}
      />
    </div>
  );
};

export default Phrases;