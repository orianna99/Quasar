<template>
    <q-page>
      <q-container class="q-pt-xl">
        <h5 class="text-h3">Productos y Variaciones</h5>
        <ListProducVariants :productos="productos" ></ListProducVariants>
      </q-container>
    </q-page>
  </template>
  
  <script>
    import { ref, onMounted } from 'vue';
    import ListProducVariants from 'src/components/ListProductVariants.vue';

    export default {
        components: { ListProducVariants }, 
        
        setup() {
        const productos = ref([]);

        const obtenerProductos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/productos');
            const data = await response.json();
            productos.value = data.productos;
            
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
        };

        onMounted(() => {
        obtenerProductos();
        });

        return {
        productos,
        };
    },
};
  </script>
  