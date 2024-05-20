import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types/auth.type";

export const useAuthStore = defineStore('auth',()=>{

    const token = ref('');
    const user = ref<User>();

    const setToken = (tokenValue:string) => {
        token.value = tokenValue
        localStorage.setItem('token',token.value)
    }

    const setUser = (userData:User) => {
        user.value = userData
        localStorage.setItem('user',JSON.stringify(userData))
    }

    const removeToken = () => {
 
        localStorage.removeItem('token')
    }

    const removeUser = () => {
 
        localStorage.removeItem('user')
    }

    const loadToken = () => {
        if(localStorage.getItem('token')){
            token.value = localStorage.getItem('token')!
        }
    }

    const loadUser = () => {
        if(localStorage.getItem('user')){
            user.value = JSON.parse(localStorage.getItem('user')!)
        }
    }

    const $reset = () => {
        token.value = '',
        user.value = undefined
    }

    return {
        token,
        user,

        removeToken,
        removeUser,
        setToken,
        loadToken,

        setUser,
        loadUser,

        $reset
    }

})