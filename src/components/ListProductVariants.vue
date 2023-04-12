<template>
  <q-list bordered>
      <q-item
          v-for="producto in productos"
          :key="producto.id"
          clickable
          @click="showVariaciones(producto)"
      >
          <q-item-section>
              <h2 class="text-h5">{{ producto.nombre }}</h2>
              <q-item-label>{{ producto.descripcion }}</q-item-label>
          </q-item-section>
      </q-item>
      <q-dialog v-model="modalVisible"> <!-- Actualiza esta línea -->
  <q-card class="modal-card"  style="width: 70%; max-width: 900px;">
    <q-card-section class="modal-header row">
      <div class="col-10">
        <div class="text-h6">{{ productoSeleccionado.nombre }}</div>
      </div>
      <div class="col-2">
        <q-btn label="Eliminar" icon-class="fas fa-trash-alt" v-close-popup @click="eliminarProducto(productoSeleccionado.id)"/>
      </div>
      
    </q-card-section>
      <q-form @submit="submitForm"> <!-- Agregada etiqueta q-form -->
        <q-card-section class="modal-body row no-wrap">
          <div class="col-xs-4">
            <div class="modal-title">Descripción:</div>
            <div class="modal-description">{{ productoSeleccionado.descripcion }}</div>
          </div>
          <div class="col-xs-4">
            <div class="modal-title">Referencia:</div>
            <div class="modal-reference">{{ productoSeleccionado.referencia }}</div>
          </div>
          <div class="col-xs-4">
            <div class="modal-title">Precio:</div>
            <div class="modal-price">{{ productoSeleccionado.precio }}</div>
          </div>
        </q-card-section>
      </q-form>

    <p>Variaciones</p>

    <q-item v-for="variacion in variaciones" :key="variacion.id">
      <q-item-section>
        <h2 class="text-h5">{{ variacion.nombre }}</h2>
        <q-item-label>{{ variacion.descripcion }}</q-item-label>
      </q-item-section>
    </q-item>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <q-card-actions align="right">
      <q-btn label="Cerrar" @click="modalVisible = false" />
      <q-btn type="submit" label="Actualizar" />
    </q-card-actions>
  </q-card>
</q-dialog>

  </q-list>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
      productos: {
          type: Array,
          required: true,
      },
  },

  setup(props) {

      let productoSeleccionado = ref(null);
      let modalVisible = ref(false);
      let variaciones = ref(false);

      const showVariaciones = (producto) => {
          modalVisible.value = true;
          productoSeleccionado.value = producto;
          variaciones.value = productoSeleccionado.value.variaciones
          console.log();
          
      };

      const eliminarProducto = (producto_id) => {
            let url = `http://127.0.0.1:8000/api/productos/${producto_id}`
            let post = {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                }
            }   
            fetch(url, post)
            .then((response) => response.json)
            .then((response => {
              watch()
            }))
      }

      watch(
          () => props.productos,
          (newProductos) => {
              
          }
      );

      return {
          showVariaciones,
          productoSeleccionado,
          modalVisible,
          variaciones,
          eliminarProducto
      };
  },
};
</script>
