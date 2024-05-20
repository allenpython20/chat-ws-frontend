import { useContactStore } from "../stores/contact"
import { contactsService } from "../services/contacts.service"
import { storeToRefs } from "pinia"
import type { Message } from "@/messages/types/messages.type"

export const useContacts = () => {

    const store = useContactStore()
    const {contacts,idChatCurrent} = storeToRefs(store)

    const getContacts = async() => {
        
        const contacts = await contactsService.getContacts()
        console.log(contacts)
        store.setContacts(contacts)
        return contacts
    }

    const updateLastMessageContact = (data:{message:Message,messagesPendings:number})  => {
        store.updateLastMessageContact(data)
    }

    const updateStatusContact = (idContact:string)  => {
     
    }

    return {
        contacts,
        idChatCurrent,
        
        getContacts,
        updateLastMessageContact
    }

}