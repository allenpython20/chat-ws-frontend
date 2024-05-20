<template>
    
    <div class="form login">
        <div class="form-content">
            <header>Login</header>
            <form action="#" @submit.prevent>
                <div class="field input-field">
                    <input type="email" v-model="form.email" placeholder="Email" class="input">
                </div>

                <div class="field input-field">
                    <input type="password" v-model="form.password" placeholder="Password" class="password">
                    <i class="bx bx-hide eye-icon"></i>
                </div>

                <!-- <div class="form-link">
                    <a href="#" class="forgot-pass">Forgot password?</a>
                </div> -->

                <div class="field button-field">
                    <button @click="handleSubmit">Login</button>
                </div>
               
            </form>

            <div class="form-link">
                <span>¿No tienes una cuenta? <router-link :to="{name:'auth.register'}" class="link signup-link">Registrarse</router-link></span>
            </div>
        </div>

        <!-- <div class="line"></div> -->

        <!-- <div class="media-options">
            <a href="#" class="field facebook">
            <i class="bx bxl-facebook facebook-icon"></i>
            <span>Login with Facebook</span>
            </a>
        </div>

        <div class="media-options">
            <a href="#" class="field google">
            <img src="/images/google.png" alt="" class="google-img">
            <span>Login with Google</span>
            </a>
        </div> -->
    </div>

   
  
</template>

<script lang='ts' setup>
import { reactive } from 'vue';


import type { UserDataLogin } from '../types/auth.type';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

    const router = useRouter()
    const {login} = useAuth()
    
    const form = reactive<UserDataLogin>({
        email: '',
        password: '',
    })

    const handleSubmit = async() => {
        const ok = await login(form)
        if(ok){
            return router.push({name:'chat'})
        }else{
            alert("Credenciales incorrectas")
        }
    }



</script>

<style scoped>

</style>