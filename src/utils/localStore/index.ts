export function getStorageItem(key: string){
    if(typeof window === "undefined") return;

    const data = window.localStorage.getItem(`${process.env.APP_KEY}_${key}`);

    if(data && data != 'undefined'){
        return JSON.parse(data!);
    }else{
        return "";
    }
}

export function setStorageItem(key: string, value: unknown){
    if(typeof window === "undefined") return;

    const data = JSON.stringify(value);

    return window.localStorage.setItem(`${process.env.APP_KEY}_${key}`, data);
}

export function removeStorageItem(key: string){
    if(typeof window === "undefined") return;

    return window.localStorage.removeItem(`${process.env.APP_KEY}_${key}`);
}