import AxiosAdapter from "@/config/api.adapter"
import type { Contact, ContactsResponse } from "../../contacts/types/contacts.type"

const contactsApi = new AxiosAdapter('/api/contacts')

export const contactsService = {

    getContacts: async ():Promise<Contact[]> => {
        const {data} = await contactsApi.get<ContactsResponse>('')
        return data.data
    }
}