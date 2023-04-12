<template>
    <ListProduc :productos="productos" />
  </template>
  <script>
  
  import ListProduc from 'src/components/ListProduc.vue';
  import { ref, onMounted } from 'vue';
  
  export default {
    components: { ListProduc },
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