import { defineStore } from "pinia";
import { ref } from "vue";
import type { Message, ContactMessages } from "../types/messages.type";


export const useMessageStore = defineStore('message',()=>{

    const messages = ref<Message[]>([])

    const messages2 = ref<ContactMessages>({})

    const setMessages = (dataMessages:Message[]) => {
        messages.value = dataMessages
    }

    const addMessage = (message:Message) => {
        messages.value = [...messages.value,message]
    }

    const getMessages = () => {
        return  {...messages.value}
    }

    
    const $reset = () => {
        messages.value = []
     
    };

    return {
        messages,

        addMessage,
        setMessages,
        getMessages,

        $reset
    }

})