export interface BaseResponse {
    success: boolean;
    error?:string
}


export interface AuthResponse extends BaseResponse {
    data:    DataLogin;
}

export interface Login extends AuthResponse {}

export interface Register extends AuthResponse {}

export interface VerifyResponse extends BaseResponse {
    data:  User;
}

export interface DataLogin {
    user:  User;
    token: string;
}

export interface User {
    id:    string;
    name:  string;
    email: string;
    role:  string[];
    img?:string
}

export interface UserDataLogin {
    email: string;
    password:string
}

export interface UserDataRegister extends UserDataLogin {
    
    name:  string;
}
