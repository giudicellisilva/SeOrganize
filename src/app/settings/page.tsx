'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import style from './settings.module.scss';
import { useRouter } from 'next/navigation';
import { clearStateUser } from "@/redux/user/userSlice";
import { removeStorageItem, setStorageItem, getStorageItem } from "@/functions/localStore";
import { clearTokenHeader } from "@/functions/authHeader";

const Settings = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [profile, setProfile] = useState({ name: user.name, surname: user.surname });

  useEffect(() => {
    const savedTheme = getStorageItem("theme") as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLogout = () => {
    dispatch(clearStateUser());
    removeStorageItem("token");
    removeStorageItem("user");
    removeStorageItem("refreshToken");
    clearTokenHeader();
    push("/");
  };

  const toggleTheme = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
    setStorageItem("theme", selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
  };

  return (
    <div className={style.settings}>
      <h1 className={style.settings__title}>Configurações</h1>

      <div className={style.settings__container}>
        
        {/* Seção de Perfil */}
        <section className={style.section}>
          <h2 className={style.section__title}>Perfil</h2>
          <div className={style.section__content}>
            <div className={style.inputGroup}>
              <label>Nome</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div className={style.inputGroup}>
              <label>Sobrenome</label>
              <input 
                type="text" 
                value={profile.surname}
                onChange={(e) => setProfile({...profile, surname: e.target.value})}
              />
            </div>
            <button className={style.saveBtn}>Atualizar Dados</button>
          </div>
        </section>

        {/* Seção de Aparência */}
        <section className={style.section}>
          <h2 className={style.section__title}>Aparência</h2>
          <div className={style.section__content}>
            <div className={style.themeToggle}>
              <span>Tema do Aplicativo</span>
              <div className={style.toggleWrapper}>
                <button 
                  className={theme === 'light' ? style.active : ''} 
                  onClick={() => toggleTheme('light')}
                >
                  Claro
                </button>
                <button 
                  className={theme === 'dark' ? style.active : ''} 
                  onClick={() => toggleTheme('dark')}
                >
                  Escuro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Conta */}
        <section className={style.section}>
          <h2 className={style.section__title}>Conta</h2>
          <div className={style.section__content}>
             <p className={style.emailText}>Logado como: <strong>{user?.email}</strong></p>
             <button className={style.logoutBtn} onClick={handleLogout}>
                Sair da Conta
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;