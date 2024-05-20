import { storeToRefs } from "pinia"
import { messageService } from "../services/messages.service"
import { useMessageStore } from "../stores/store"
import type { Message, MessageDataCreate } from "../types/messages.type"

const useMessages = () => {

    const store = useMessageStore()
    const {messages} = storeToRefs(store)

    const getMessagesById = async(idChat:string):Promise<void> => {

        const data = await messageService.getMessagesById(idChat)

        store.setMessages(data)
    
    }

    const createMessage = async(dataMessage:MessageDataCreate):Promise<void> => {
        try {
            const data = await messageService.createMessage(dataMessage)
        } catch (error) {
            console.log(error)
        }
    
    }

    const addMessage = (message:Message) => {
        store.addMessage(message)
    }

    return {
        messages,

        addMessage,
        getMessagesById,
        createMessage
    }
}

export default useMessages