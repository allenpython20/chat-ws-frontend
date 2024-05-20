import AxiosAdapter from "@/config/api.adapter"

import type { Message, MessageDataCreate, MessageResponse, MessagesResponse } from "../types/messages.type";

const messageApi = new AxiosAdapter('/api/messages')

export const messageService = {

    getMessagesById : async(idChat:string):Promise<Message[]> => {
   
        const {data} = await messageApi.get<MessagesResponse>(`/${idChat}`);
      
        return data.data
    },

    createMessage : async(dataMessage:MessageDataCreate):Promise<Message> => {
       
        const {data} = await messageApi.post<MessageResponse,MessageDataCreate>('',dataMessage);

        return data.data
        
    }
}