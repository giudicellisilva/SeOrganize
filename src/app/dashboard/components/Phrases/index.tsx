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
  
  // Estado para controlar qual frase está sendo exibida
  const [currentIndex, setCurrentIndex] = useState(0);

  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  const { data: phrasesData } = useQuery({
    queryKey: ['phrases'],
    queryFn: async () => await getPhrase()
  });

  const phrases: Phrase[] = phrasesData?.data || [];

  // Lógica para navegar entre as frases
  const nextPhrase = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Volta para a primeira (loop)
    }
  };

  const prevPhrase = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(phrases.length - 1); // Vai para a última (loop)
    }
  };

  const { mutate: mutateSave } = useMutation({
    mutationFn: async (phrase: Phrase) => await postPhrase(phrase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phrases'] });
      resetForm();
    }
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (id: string) => await deletePhrase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phrases'] });
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }
  });

  const { mutate: mutateEdit } = useMutation({
    mutationFn: async (phrase: Phrase) => await putPhrase(phrase),
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
        
        {/* Seta Esquerda - Só aparece se houver mais de uma frase */}
        {phrases.length > 1 && (
          <button className={style.navButton} onClick={prevPhrase}>
            ‹
          </button>
        )}

        <div className={style.phrases__content__div}>
          <span className={style.phrases__content__text}>
            "{phrases[currentIndex]?.phrase || "Sua frase aparecerá aqui"}"
          </span>
          <span className={style.phrases__content__author}>
            - {phrases[currentIndex]?.author || "Autor"}
          </span>
          
          {/* Indicador de página (opcional) */}
          {phrases.length > 1 && (
            <small className={style.counter}>{currentIndex + 1} / {phrases.length}</small>
          )}
        </div>

        {/* Seta Direita - Só aparece se houver mais de uma frase */}
        {phrases.length > 1 && (
          <button className={style.navButton} onClick={nextPhrase}>
            ›
          </button>
        )}

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