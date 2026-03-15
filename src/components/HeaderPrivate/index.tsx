'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearStateUser } from "@/redux/user/userSlice";
import { removeStorageItem } from "@/functions/localStore";
import styles from "./headerPrivate.module.scss";

const HeaderPrivate = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  console.log("user", user);
  const handleLogout = () => {
    dispatch(clearStateUser());
    removeStorageItem("token");
    removeStorageItem("user");
    removeStorageItem("refreshToken");
    push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Image 
          src="/assets/logo.png"
          alt="Logo" 
          width={120} 
          height={40} 
          className={styles.header__logo}
          onClick={() => push('/dashboard')}
        />

        <nav className={styles.header__nav}>
          {/* <button onClick={() => push('/tasks')}>Minhas Tasks</button>
          <button onClick={() => push('/phrases')}>Frases</button> */}
          <button onClick={() => push('/dashboard')}>Home</button>
          <button onClick={() => push('/analytics')}>Analytics</button>
          <button onClick={() => push('/subscribe')}>Plano PRO</button>
        </nav>

        <div className={styles.header__profile}>
          <div className={styles.header__profile__info}>
            <span>{user.name}</span>
            {user.roles?.[0]?.name === "SUBSCRIBER" && <small>PRO</small>}
          </div>
          
          <div className={styles.header__avatarWrapper}>
            <Image 
              src="/assets/user.png" 
              alt="User" 
              width={45} 
              height={45} 
              className={styles.header__avatar}
            />
            
            <div className={styles.header__dropdown}>
              <button onClick={() => push('/settings')}>Configurações</button>
              <button onClick={handleLogout} className={styles.logout}>Sair</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPrivate;