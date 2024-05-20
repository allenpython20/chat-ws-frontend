import { storeToRefs } from "pinia"
import { authService } from "../services/auth.service"
import { useAuthStore } from "../stores/auth"
import type { Login, UserDataLogin, UserDataRegister } from "../types/auth.type"


export const useAuth = ()=>{

    const store = useAuthStore()
    const {token,user} = storeToRefs(store)

    const setDataAuth = (resp:Login) => {
        store.setToken(resp.data.token)
        store.setUser(resp.data.user)
    }

    const login = async(dataUser:UserDataLogin):Promise<boolean> => {

        try {
            const resp = await authService.login(dataUser)
        
            setDataAuth(resp)

            return resp.success
         
           
        } catch(error:any){
           
            console.log(error?.response.data)
            
            return false
        }
        
    }

    const register = async(dataUser:UserDataRegister):Promise<boolean> => {
      
        try {
            
            const resp = await authService.register(dataUser)
            setDataAuth(resp)

            return resp.success
         
           
        } catch(error:any){
           
            console.log(error?.response.data)
            
            return false
        }
    }

    const verifyToken = async():Promise<boolean> =>{
        try {

            store.loadToken()
            store.loadUser()

            if(!token.value){
                return false
            }

            const data = await authService.verifyToken()

            if(data.success){
                return true
            }
           
           
        } catch (error) {
           
        }

        store.removeToken()
        return false
    }

    const logout = () =>{
        store.removeToken()
        store.removeUser()
    }

    return {
        user,
        
        login,
        register,
        verifyToken,
        logout
    }

}