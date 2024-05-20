import  { storeToRefs } from "pinia"
import { useWebSocketStore } from "../store/store"

const useWebSocket= () => {

    const store = useWebSocketStore()

    const {socket,payloadResponse,typeResponse} = storeToRefs(store)

    const initSocket = () => {
        store.initSocket()
    }

    return {
        payloadResponse,
        typeResponse,
        socket,
        initSocket
    }
}

export default useWebSocket