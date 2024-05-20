<template>
    <div class="msg online" :class="{'active':props.selected}" @click="emits('selectContact',props.contact.idChat)">
      <img
        class="msg-profile"
        :src="props.contact.img"
        alt=""
      />
      <div class="msg-detail">
        <div class="msg-username">{{ props.contact.alias }} </div>
        <div class="msg-content">
          <span class="msg-message">{{props.contact.lastMessage?.body}}</span>
          <span v-if="props.contact.lastMessage?.msgTime" class="msg-date">{{lastTime}}</span>
        </div>
    
        <!-- <span class="msg-date">{{lastTime}}</span> -->
        
      </div>
    </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import type { Contact } from '../../contacts/types/contacts.type';

interface Props{
  contact: Contact
  selected: boolean
}

interface Emits{
    (e:'selectContact',idUser:string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const lastTime = computed(() => {

  const msgTime = props.contact.lastMessage?.msgTime;

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
    const formattedTime = `${hours}:${minutes} ${period}`;

    return formattedTime;
});


</script>

<style scoped>

</style>