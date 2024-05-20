<template>
  <div class="chat-area" v-if="idChatCurrent">
    <!-- <ChatHeaderGroup /> -->
    <div class="chat-area-main" ref="divChatArea">
      <ChatMessage
        :newMessage="newMessage"
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :owner="user?.id === message.author"
        @handle-add-chat-message="onAddChatMessage"
      />
    </div>

    <div class="chat-area-footer">
      <!-- <IconCamera /> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-image"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-plus-circle"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-paperclip"
      >
        <path
          d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        />
      </svg>
      <ChatInput
        :placeholder="'Enviar un mensaje'"
        @send-value-input="onSendValueInput"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-smile"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-thumbs-up"
      >
        <path
          d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch,nextTick  } from "vue";

import ChatInput from "./ChatInput.vue";
import ChatHeaderGroup from "./ChatHeaderGroup.vue";
import ChatMessage from "./ChatMessage.vue";
import IconCamera from "@/shared/components/IconCamera.vue";
import type {MessageDataCreate} from "@/messages/types/messages.type";

import useWebSocket from "@/websocket/composable/useWebSocket";
import useMessages from "@/messages/composables/useMessages";

import { useAuth } from "@/auth/composables/useAuth";
import { useContacts } from "../composables/useContacts";



const { user } = useAuth();
const { messages, createMessage, addMessage } = useMessages();
const { idChatCurrent, updateLastMessageContact } = useContacts();
const divChatArea = ref();
const newMessage = ref<boolean>(false);

const { typeResponse, payloadResponse } = useWebSocket();

watch([payloadResponse], async([newPayload]) => {

  if(newPayload){
    if (typeResponse.value === "on-new-message") {

      updateLastMessageContact({ ...payloadResponse.value });
      if (payloadResponse.value.message.idChat === idChatCurrent.value) {
        addMessage(payloadResponse.value.message);
        if(user.value?.id == payloadResponse.value.message.author){
          newMessage.value = true;
        }
       
      }
    }
  }

  // if(newMessages){
  //   // await nextTick();
  //   // moveToEndScroll()
  // }
  
});

const onAddChatMessage = () => {
  moveToEndScroll()
  newMessage.value = false
};

const onSendValueInput = (text: string) => {
  const data: MessageDataCreate = {
    body: text,
    type: "CHAT",
    idChat: idChatCurrent.value,
  };

  createMessage(data);
};



const moveToEndScroll = () =>{
  divChatArea.value.scrollTop = divChatArea.value.scrollHeight;
}

</script>

<style scoped></style>
