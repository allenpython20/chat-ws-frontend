import axios, { type AxiosStatic } from 'axios';

export class AxiosAdapter  {
    // Aquí definirás los métodos para interactuar con tu API
  
    private apiClient;
  
    constructor(url:string){
        this.apiClient = axios.create({
          baseURL :  import.meta.env.VITE_API_URL + url,
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              // 'Access-Control-Allow-Origin': 'http://localhost:3000'
          },
      });

      this.apiClient.interceptors.request.use(
        (config) => {
          // Obtener el token de localStorage u otro lugar
          const token = localStorage.getItem('token');
          
          // Si tenemos un token, configurarlo en el encabezado de Authorization
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          
          return config;
        },
        (error) => {
          // Manejar errores de solicitud
          return Promise.reject(error);
        }
      );
    }
  
    get<T>(resource:string, params?:any) {
      return this.apiClient.get<T>(resource, params);
    }
  
    post<T,U>(resource:string, data:U) {
      return this.apiClient.post<T>(resource, data);
    }
    put<T>(resource:string, data:T) {
      return this.apiClient.put(resource, data);
    }
  
    delete(resource:string) {
      return this.apiClient.delete(resource);
    }
    
  };
  
  export default AxiosAdapter