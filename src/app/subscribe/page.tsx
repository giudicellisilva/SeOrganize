'use client';
import { useMutation } from "@tanstack/react-query";
import style from "./subscribe.module.scss";
import { postPayment } from "@/api/payment/postPayment";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "./components/SuccessModal";
import { getStorageItem, setStorageItem } from "@/functions/localStore";
import { postRefreshToken } from "@/api/login/postRefreshToken";
import { setTokenHeader } from "@/functions/authHeader";
import { APP_ROUTES } from "@/constants/appRoutes";
import { useDispatch } from "react-redux";
import { setStateUser } from "@/redux/user/userSlice";

export default function subscribe(){
  const { push } = useRouter();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { mutate: handleSubscribe, isPending } = useMutation({
    mutationFn: async () => {
      return await postPayment();
    },
    onSuccess: () => {
      mutateRefreshToken();
    }
  });
  const handleCloseModal = () => {
    setShowModal(false);
    push("/dashboard"); 
  };

  const refreshToken = getStorageItem("refreshToken");

  const {status: statusRefreshToken, mutate :mutateRefreshToken} = useMutation({
      mutationFn: async () =>{
          return await postRefreshToken(refreshToken);
      },
      onSuccess: (res) => {
        setTokenHeader(res.data.accessToken);
        setStorageItem("token", res.data.accessToken);
        setStorageItem("refreshToken", res.data.refreshToken);
        dispatch(setStateUser(res.data.user)); 
        setShowModal(true);
      },
      onError: () =>{
        push(APP_ROUTES.public.home);
      }
  })
  return (
    <div className={style.subiscriber}>
      <div className={style.subiscriber__card}>
        <h2 className={style.subiscriber__card__title}>Seja um Membro PRO</h2>
        <p className={style.subiscriber__card__description}>
          Libere categorias exclusivas como <strong>STUDY</strong> e <strong>FITNESS</strong>, 
          além de remover todos os limites da plataforma.
        </p>
        
        <div className={style.subiscriber__card__price}>
          <span>R$ 19,90</span>
          <small>/mês</small>
        </div>

        <ul className={style.subiscriber__card__list}>
          <li>✅ Categorias de Estudo e Saúde</li>
          <li>✅ Calendário Avançado</li>
          <li>✅ Suporte Prioritário</li>
        </ul>

        <button 
          className={style.subiscriber__card__button}
          onClick={() => handleSubscribe()}
          disabled={isPending}
        >
          {isPending ? "Processando..." : "Assinar Agora"}
        </button>
        <SuccessModal 
          isOpen={showModal} 
          onClose={handleCloseModal} 
        />
      </div>
    </div>
  );
};