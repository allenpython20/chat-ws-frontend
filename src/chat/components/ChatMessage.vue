<template>

    <div class="chat-msg " :class="{ 'owner' :  $props.owner}">
        <div class="chat-msg-profile">
            <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
            <div class="chat-msg-date">{{lastTime}}</div>
        </div>
        <div class="chat-msg-content">
            <div class="chat-msg-text">{{$props.message.body}}</div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import type { Message } from '@/messages/types/messages.type';
import { computed, onMounted } from 'vue';


interface Props {
    message: Message,
    owner:boolean,
    newMessage:boolean
}

interface Emits {
    (e:'handleAddChatMessage') : void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const lastTime = computed(() => {

const msgTime = props.message.msgTime

  if (!msgTime) return ''; // Si no hay tiempo, devuelve una cadena vacía

  // Crear un objeto Date usando la marca de tiempo
  const date = new Date(msgTime);

  // Obtener las partes de la fecha
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
  const day = String(date.getDate()).padStart(2, '0'); // Añadir ceros a la izquierda si es necesario

  // Obtener las partes de la hora
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Añadir ceros a la izquierda si es necesario

  // Determinar si es AM o PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convertir la hora al formato de 12 horas
  if (hours > 12) {
      hours -= 12;
  } else if (hours === 0) {
      hours = 12;
  }

  // Formatear la fecha y hora en Año/mes/dia Hora:minuto AM/PM
  const formattedTime = `${day}/${month} ${hours}:${minutes} ${period}`;

  return formattedTime;
});

onMounted(()=>{
    if(props.newMessage){
        
        emits('handleAddChatMessage')
    }
    
})

</script>

<style scoped>

</style>