<template>
    Change Color
    <div class="colors">
        <div 
            v-for="color in colorOptions" 
            :key="color" 
            :class="['color', color, { 'selected': color === selectedColor }]" 
            :data-color="color" @click="selectColor(color)">
        </div>
    </div>
</template>

<script lang='ts' setup>

import { ref } from 'vue';

const colorOptions = ['blue', 'purple', 'green', 'orange']; // opciones de colores
const selectedColor = ref('blue'); // color inicial seleccionado



function selectColor(color:string) {
    selectedColor.value = color;

    document.body.setAttribute('data-theme', color);
}
</script>

<style scoped>

</style>