import { defineStore } from "pinia"
import { ref } from "vue"
import type { Contact } from "../../contacts/types/contacts.type"
import type { Message } from "@/messages/types/messages.type"

export const useContactStore = defineStore('contact',()=>{
    
    const contacts = ref<Contact[]>([])
    const idChatCurrent = ref<string>('')


    const setContacts = (data:Contact[]) => {
        contacts.value = data
    }

    const getContacts = () => {
        return contacts.value
    }

    const updateStatusContact = (idContact:string)=>{


    }

    const updateLastMessageContact = ({message,messagesPendings}:{message:Message,messagesPendings:number})=>{
        
        const contactIndex = contacts.value.findIndex(contact => contact.idChat === message.idChat);

        if(contactIndex !==-1 ){
            const contactUpdate:Contact = { ...contacts.value[contactIndex], lastMessage: message,messagesPendings };

            const updatedContacts = [...contacts.value]
            updatedContacts.splice(contactIndex,1)
            updatedContacts.unshift(contactUpdate)

            contacts.value = [...updatedContacts]

            // contacts.value.splice(contactIndex,1)
            // contacts.value.unshift(contactUpdate)
        }

        // const contactSearch =  contacts.value.find( (contact) => contact.idChat === message.idChat )
        // if(contactSearch){
        //     const contactUpdate:Contact = { ...contactSearch,lastMessage:message }
        //     contacts.value = contacts.value.map(contact => ( contact.idChat === message.idChat ? contactUpdate : contact )  )
        // }
    
    }

    const $reset = () => {
        contacts.value = []
        idChatCurrent.value = ''
    };


    return { 
        idChatCurrent,
        contacts,
        
        getContacts,
        setContacts,
        updateLastMessageContact,

        $reset
    } 


})