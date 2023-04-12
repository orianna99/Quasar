
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/about', component: () => import('src/pages/AboutIndex.vue') },
      { path: '/form', component: () => import('src/pages/FormProduc.vue') },
      { path: '/addVariacion', component: () => import('src/pages/FormVariaciones.vue') },
      { path: '/productVariation', component: () => import('src/pages/ProductVarian.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
