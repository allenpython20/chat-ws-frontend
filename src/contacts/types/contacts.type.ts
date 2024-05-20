import type { Message } from "@/messages/types/messages.type";

export interface ContactsResponse {
    success: boolean;
    data:    Contact[];
}

export interface Contact {
    id:               string;
    alias:            string;
    lastMessage?:      Message;
    type:             string;
    messagesPendings: number;
    idContact:        string;
    idChat:           string;
    img:string
}
