<template>
    <input type="text" :placeholder="props.placeholder" v-model="textInput" @keyup.enter="handleSendValueInput"/>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

    
interface Props {
    placeholder: string
}

interface Emits {
    (e:'sendValueInput',value:string) : void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const textInput = ref('')

const handleSendValueInput = () => {
    if(textInput.value.trim()){
        emits('sendValueInput',textInput.value)
    }
  
    textInput.value = ''
}

</script>

<style scoped>

</style>