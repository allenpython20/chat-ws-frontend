<template>
  <div class="conversation-area">
    <ChatUser v-for="contact in contacts" :key="contact.id" :selected="contact.idChat == idContactSelected ? true : false " :contact="contact" @select-contact="onSelectContact" />

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import  ChatUser from './ChatUser.vue';
import { useContacts } from '../composables/useContacts';
import useMessages from '@/messages/composables/useMessages';



const {contacts,idChatCurrent,getContacts} =  useContacts()


const {getMessagesById} = useMessages()


onMounted(async()=>{
  await getContacts()
})

const idContactSelected = ref<string>('')

const onSelectContact = async(idChat:string) => {

  idChatCurrent.value = idChat
  idContactSelected.value = idChat
  
  await getMessagesById(idContactSelected.value)

}


</script>

<style scoped>
</style>
