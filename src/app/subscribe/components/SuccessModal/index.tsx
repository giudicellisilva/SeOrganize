'use client';
import styles from "./successModal.module.scss";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>🎉</div>
        <h2 className={styles.title}>Parabéns, PRO!</h2>
        <p className={styles.text}>
          Sua assinatura foi confirmada. Agora você tem acesso total às categorias 
          <strong> STUDY</strong>, <strong>FITNESS</strong> e muito mais.
        </p>
        <button className={styles.button} onClick={onClose}>
          Começar a usar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;