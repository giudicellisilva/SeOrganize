'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/appRoutes";
import styles from "./headerPublic.module.scss";

const HeaderPublic = () => {
  const { push } = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Image 
          src="/assets/logo.png"
          alt="Logo" 
          width={150} 
          height={50} 
          className={styles.header__logo}
          onClick={() => push('/')}
        />

        <div className={styles.header__actions}>
          <button 
            className={styles.header__actions__login} 
            onClick={() => push(APP_ROUTES.public.login)}
          >
            Entrar
          </button>
          <button 
            className={styles.header__actions__register} 
            onClick={() => push(APP_ROUTES.public.register)}
          >
            Começar Agora
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderPublic;