import { Provider } from "react-redux";
import store from "@/redux/store";
import { ReactNode } from "react";


interface ProviderReduxProps{
    children: ReactNode;
}
const ProviderRedux = (props: ProviderReduxProps) =>{
    return(
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default ProviderRedux;