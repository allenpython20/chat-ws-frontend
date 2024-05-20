import useMessages from "@/messages/composables/useMessages";
import { defineStore } from "pinia"
import  { ref } from "vue";

export const useWebSocketStore = defineStore('webSocket',()=>{
    
    
    const socket = ref();
    const payloadResponse = ref()
    const typeResponse = ref()

    const initSocket = () => {

        socket.value = new WebSocket( 'ws://localhost:3000/ws' )

        socket.value.onopen = ( event:any ) => {
            console.log( 'Conectado' );
        };
    
        socket.value.onmessage = (event:any) => {
            const {type,payload} = JSON.parse(event.data)
          
            payloadResponse.value = payload
            typeResponse.value = type
        }

        socket.value.onclose = ( event:any ) => {
            console.log( 'Desconectado' );
        };
    
    
    }
   
    const $reset = () => {
        socket.value = null
        payloadResponse.value = null,
        typeResponse.value = ''
    }

    return { 
        initSocket,

        typeResponse,
        payloadResponse,
        socket,

        $reset
    } 

    


})