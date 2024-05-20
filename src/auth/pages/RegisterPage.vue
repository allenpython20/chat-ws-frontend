<template>
    <!-- Signup Form -->
    <div class="form signup">
        <div class="form-content">
            <header>Signup</header>
            <form action="#" @submit.prevent>

                <div class="field input-field">
                    <input type="text" v-model="form.name" placeholder="Ingrese su nombre" class="input">
                </div>

                <div class="field input-field">
                    <input type="email" v-model="form.email" placeholder="Ingrese su email" class="input">
                </div>

                <div class="field input-field">
                    <input type="password" v-model="form.password" placeholder="Ingrese su password" class="password">
                </div>

        
                <div class="field button-field">
                    <button @click="handleSubmit">Signup</button>
                </div>
            </form>

            <div class="form-link">
                <span>¿Ya tienes una cuenta? <router-link :to="{name:'auth.login'}" class="link login-link">Login</router-link></span>
            </div>
        </div>

        <!-- <div class="line"></div>

        <div class="media-options">
          <a href="#" class="field facebook">
            <i class="bx bxl-facebook facebook-icon"></i>
            <span>Login with Facebook</span>
          </a>
        </div>

        <div class="media-options">
          <a href="#" class="field google">
            <img src="" alt="" class="google-img">
            <span>Login with Google</span>
          </a>
        </div> -->
    </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';
import type { UserDataRegister } from '../types/auth.type';
import { useAuth } from '../composables/useAuth';
import {  useRouter } from 'vue-router';

    const {register} = useAuth()
    const router = useRouter()
    const form = reactive<UserDataRegister>({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async () => {
        const ok = await register(form)

        if(ok){
            return router.push({name:'chat'})
        }else{
            alert(`Ya existe el usuario con email ${form.email}`)
        }
    }

</script>

<style scoped>

</style>