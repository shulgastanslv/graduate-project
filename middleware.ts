import NextAuth, { Session } from "next-auth";

import authConfig from "@/auth.config";
import {apiAuthPrefix, apiLiveKitPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes,} from "@/routes";
import { GetServerSidePropsContext } from "next";
import { NextRequest } from "next/server";

const {auth} = NextAuth(authConfig);

//@ts-ignore
export default auth((req : any) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isLiveKitRoute = nextUrl.pathname.startsWith(apiLiveKitPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // Проверяем, является ли запрос API-запросом
    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    if(!isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }


    return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}