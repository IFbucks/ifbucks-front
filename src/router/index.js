import { createRouter, createWebHistory } from 'vue-router'

// Importações das páginas
import HomeView from '../views/HomeView.vue'

import AdicionarCategoriaView from '../views/admin/AdicionarCategoriaView.vue'
import AdicionarFuncionarioView from '../views/admin/AdicionarFuncionarioView.vue'
import AdicionarItensView from '../views/admin/AdicionarItensView.vue'
import AdicionarMesaView from '../views/admin/AdicionarMesaView.vue'

import CozinhaView from '../views/cozinha/CozinhaView.vue'
import MesaView from '../views/cozinha/MesaView.vue'

// Importações dos layouts
import BlankLayout from '@/layouts/BlankLayout.vue'
import KitchenLayout from '@/layouts/KitchenLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const routes = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      }
    ]
  },
  {
    path: '/cozinha',
    component: KitchenLayout,
    children: [
      {
        path: '/cozinha',
        name: 'cozinha',
        component: CozinhaView
      },
      {
        path: '/mesa/:id',
        name: 'mesa',
        component: MesaView
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'categorias',
        name: 'categorias',
        component: AdicionarCategoriaView
      },
      {
        path: 'funcionarios',
        name: 'funcionarios',
        component: AdicionarFuncionarioView
      },
      {
        path: 'itens',
        name: 'itens',
        component: AdicionarItensView
      },
      {
        path: 'mesas',
        name: 'mesas',
        component: AdicionarMesaView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
