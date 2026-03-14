'use client';
import Phrase from "@/interfaces/Phrase";
import style from "./phrasesModal.module.scss";

interface PhraseModalProps {
  isOpen: boolean;
  onClose: () => void;
  phrases: Phrase[];
  editingId: string | null;
  phrase: Phrase;
  handleEditSetup: (item: Phrase) => void;
  setPhrase: (phrase: Phrase) => void;
  onSave: (phrase: Phrase) => void;
  onEdit: (item: Phrase) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
}

const PhraseModal = ({
  isOpen, onClose, phrases, editingId, phrase, setPhrase, onSave, onEdit, handleEditSetup, onDelete, onReset
}: PhraseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modal__container}>
        <h2 className={style.modal__container__title}>Gerenciar Frases</h2>

        <div className={style.modal__container__list}>
          {phrases.map((item) => (
            <div key={item.id} className={style.phraseItem}>
              <span>"{item.phrase}"</span>
              <small>{item.author}</small>
              <div className={style.phraseItem__actions}>
                <button className={style.edit} onClick={() => handleEditSetup(item)}>Editar</button>
                <button className={style.delete} onClick={() => onDelete(item.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>

        <div className={style.modal__container__form}>
          <strong>{editingId ? "Editando Frase" : "Nova Frase"}</strong>
          <input
            className={style.modal__container__form__input}
            placeholder="Frase..."
            value={phrase.phrase}
            onChange={(e) => setPhrase({ ...phrase, phrase: e.target.value })}
          />
          <input
            className={style.modal__container__form__input}
            placeholder="Autor..."
            value={phrase.author}
            onChange={(e) => setPhrase({ ...phrase, author: e.target.value })}
          />
          <button className={style.modal__container__form__saveBtn} onClick={() =>  editingId ? onEdit(phrase) : onSave(phrase)}>
            {editingId ? "Atualizar" : "Adicionar"}
          </button>
          {editingId && <button onClick={onReset}>Cancelar Edição</button>}
        </div>

        <button className={style.modal__container__close} onClick={() => { onClose(); onReset(); }}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default PhraseModal;