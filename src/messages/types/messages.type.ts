export interface MessagesResponse {
    success: boolean;
    data:    Message[];
}

export interface MessageResponse {
    success: boolean;
    data:    Message;
}

export interface ContactMessages {
    [key:string] : Message[]
}

export interface Message {
    id:      string;
    body:    string;
    type:    string;
    msgTime: number;
    idChat:  string;
    author:  string;
}

export interface MessageDataCreate {
    body:    string;
    type:    string;
    idChat:  string;
}