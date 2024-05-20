<template>
   <div class="app">
 
      <ChatHeader />
      <div class="wrapper">
         <ChatUsers />
         <ChatArea />
         <!-- <ChatDetail /> -->
      </div>
   </div>
</template>

<script setup lang="ts">


import  useWebSocket from '@/websocket/composable/useWebSocket';
import ChatArea from '../components/ChatArea.vue';
import ChatDetail from '../components/ChatDetail.vue';
import ChatHeader from '../components/ChatHeader.vue';
import ChatUsers from '../components/ChatUsers.vue';
import { useContacts } from '../composables/useContacts';
import { onUnmounted } from 'vue';


const {initSocket} = useWebSocket()

initSocket()

document.body.classList.add("dark-mode");




</script>

<style scoped>

</style>