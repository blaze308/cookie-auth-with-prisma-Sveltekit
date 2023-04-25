import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { db } from "$lib/database";
import bcrypt from "bcrypt"

export const load:PageServerLoad = async () => {
    // todo
}

const login: Action = async ({cookies, request}) => {
    const data = await request.formData()
    const username = data.get("username")
    const password = data.get("password")

    console.log({username, password});
    

    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        !username || !password
    ) {
        return fail(400, {fail: true})
    }

    const user = await db.user.findUnique({
        where: {username}
    }) 

    if (!user){
        return fail(400, {credentials: true})
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash)
    
    if (!userPassword){
        return fail(400, { credentials: true})
    }

    //auth cookie
    const authUser = await db.user.update({
        where: {username: user.username},
        data: {userAuthToken: crypto.randomUUID()}
    })
    cookies.set("session", authUser.userAuthToken, {
        //send cookie for every page
        path: "/",
        //server-side only cookie to avoid document.cookie
        httpOnly: true,
        //only request from same site can send cookies
        // sameSite: "strict",
        //only sent over https to prodcution
        secure: process.env.NODE_ENV === "production",
        //set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30
    })
    throw redirect(302, "/account")
}

export const actions: Actions = { login }