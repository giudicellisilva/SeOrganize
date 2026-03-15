'use client';
import Link from "next/link";
import styles from "./homePage.module.scss";
import { APP_ROUTES } from "@/constants/appRoutes";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Organize sua rotina com <span className={styles.highlight}>inteligência</span>.
          </h1>
          <p className={styles.hero__subtitle}>
            A plataforma completa para gerenciar suas tarefas de estudo, trabalho, 
            fitness e música em um só lugar.
          </p>
          
          <div className={styles.hero__actions}>
            <Link href={APP_ROUTES.public.register} className={styles.btnPrimary}>
              Começar Gratuitamente
            </Link>
            <Link href={APP_ROUTES.public.login} className={styles.btnSecondary}>
              Já tenho uma conta
            </Link>
          </div>
        </div>

        <div className={styles.hero__imageContainer}>
          <img src="/assets/hero-illustration.png" alt="Organização" className={styles.heroImage} />
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <span>🎵</span>
          <h3>Música & Trabalho</h3>
          <p>Organize suas playlists e metas profissionais no plano Free.</p>
        </div>
        <div className={styles.featureCard}>
          <span>💎</span>
          <h3>Plano PRO</h3>
          <p>Libere categorias exclusivas de <strong>Study</strong> e <strong>Fitness</strong>.</p>
        </div>
      </section>
    </div>
  );
}
