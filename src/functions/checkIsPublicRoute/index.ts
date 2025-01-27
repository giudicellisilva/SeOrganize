import { APP_ROUTES } from "@/constants/appRoutes";

export function checkIsPublicRoute(asPath: string){
    const appPlublicRoutes = Object.values(APP_ROUTES.public);

    return appPlublicRoutes.includes(asPath);
}