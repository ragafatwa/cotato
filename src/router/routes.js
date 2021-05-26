
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
      path: '', 
      component: () => import('src/pages/PageHome.vue'), 
      name: 'Cotato'
      },
      { 
      path: '/profile', 
      component: () => import('src/pages/PageProfile.vue'), 
      name: 'Profile'
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
