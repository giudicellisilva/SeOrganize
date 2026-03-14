'use client';
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./phrases.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPhrases } from "@/api/phrases/getPhrases";
// Supondo que você criará essas funções na sua API:
// import { updatePhrases } from "@/api/phrases/updatePhrases";

const Phrases = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhrase, setNewPhrase] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  // 1. Busca as frases (Read)
  const { data: phrasesData } = useQuery({
    queryKey: ['phrases', user?.id],
    queryFn: () => getPhrases(user?.id)
  });

  const phrases = phrasesData?.data[0]?.phrases || [];

  // 2. Mutação para atualizar a lista (Create e Delete)
  // No back-end, você pode ter um endpoint que recebe a lista completa atualizada
  const mutation = useMutation({
    mutationFn: (newList: string[]) => {
        // Exemplo: return updatePhrases(user.id, newList);
        return Promise.resolve(newList); // Simulação por enquanto
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phrases'] });
    }
  });

  const handleAddPhrase = () => {
    if (newPhrase.trim()) {
      mutation.mutate([...phrases, newPhrase]);
      setNewPhrase("");
    }
  };

  const handleDeletePhrase = (index: number) => {
    const newList = phrases.filter((_: any, i: number) => i !== index);
    mutation.mutate(newList);
  };

  return (
    <div className={styles.phrasesContainer}>
      <div className={styles.displayArea}>
        {phrases.length > 0 ? phrases[0] : "Nenhuma frase cadastrada."}
      </div>
      
      <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
        Editar Frases
      </button>

      {/* COMPONENTE MODAL INTERNO */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Gerenciar Frases</h2>
            
            <ul className={styles.phraseList}>
              {phrases.map((phrase: string, index: number) => (
                <li key={index}>
                  <span>{phrase}</span>
                  <button 
                    className={styles.deleteBtn} 
                    onClick={() => handleDeletePhrase(index)}
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.addArea}>
              <input 
                type="text" 
                value={newPhrase} 
                onChange={(e) => setNewPhrase(e.target.value)}
                placeholder="Nova frase..."
              />
              <button className={styles.addBtn} onClick={handleAddPhrase}>
                Adicionar
              </button>
            </div>

            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phrases;