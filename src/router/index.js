import { createRouter, createWebHistory } from 'vue-router'

import BlankView from '../layouts/BlankView.vue'
import FullView from '../layouts/FullView.vue'
import KitchenView from '../layouts/KitchenView.vue'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import CategoriasView from '../views/CategoriasView.vue'
import FuncionariosView from '../views/FuncionariosView.vue'
import ItensView from '../views/ItensView.vue'
import CozinhaView from '../views/CozinhaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BlankView,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/kitchen',
      component: KitchenView,
      children: [
        {
          path: '/cozinha',
          name: 'cozinha',
          component: CozinhaView
        },
        {
          path: '/mesa/:id',
          name: 'mesa',
          component: () => import('../views/MesaView.vue')
        }
      ]
    },
    {
      path: '/',
      component: FullView,
      children: [
        {
          path: '/admin',
          name: 'admin',
          component: AdminView
        },
        {
          path: '/categorias',
          name: 'categorias',
          component: CategoriasView
        },
        {
          path: '/funcionarios',
          name: 'funcionarios',
          component: FuncionariosView
        },
        {
          path: '/itens',
          name: 'itens',
          component: ItensView
        }
      ]
    }
  ]
})

export default router
