import { createRouter, createWebHistory } from 'vue-router'

import { useAuth } from '@/auth/composables/useAuth'
import AuthLayout from '@/auth/layouts/AuthLayout.vue'
import LoginPage from '@/auth/pages/LoginPage.vue'
import RegisterPage from '@/auth/pages/RegisterPage.vue'
import ChatLayout from '@/chat/layouts/ChatLayout.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      meta: {requiredAuth:true},
      component: ChatLayout
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthLayout,
      children: [
        {
          path: '',
          redirect : {name:'auth.login'}
        },
        {
          path: 'login',
          name: 'auth.login',
          component : LoginPage
        },
        {
          path: 'register',
          name: 'auth.register',
          component : RegisterPage
        }
      ]
    },
    
  ]
})



router.beforeEach(async(to,from,next)=>{
  const {verifyToken} = useAuth()
  const isValidToken = await verifyToken()

  if(to.name === 'auth.login' && isValidToken){
    next({name:'chat'})
  }else if(to.meta.requiredAuth && !isValidToken){
    next({name:'auth.login'})
  }
  next(); 
})



export default router
