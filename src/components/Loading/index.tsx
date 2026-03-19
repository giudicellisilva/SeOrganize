import style from "./loading.module.scss";

const Loading = () =>{

    return(
        <div className={style.loading}>
            <p className={style.loading__text}>Carregando...</p>
            <span className={style.loading__span}></span>
        </div>
    )
}

export default Loading;