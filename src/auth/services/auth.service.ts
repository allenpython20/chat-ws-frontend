import {authApi} from '../api/auth.api'
import type { Login, UserDataLogin, UserDataRegister, VerifyResponse } from '../types/auth.type';



export const authService = {

    login: async (dataUser:UserDataLogin):Promise<Login> => {
       
        const {data} = await authApi.post<Login,UserDataLogin>('/login',dataUser);
    
        return data
  
    },

    register : async (dataUser:UserDataRegister):Promise<Login> => {
    
        const {data} = await authApi.post<Login,UserDataRegister>('/register',dataUser);
        return data
    

    },

    verifyToken : async() => {
        const {data} = await authApi.get<VerifyResponse>('/verifyToken');
        return data
    }
}

