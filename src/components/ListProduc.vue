<template>
  <q-table
    title="Productos"
    :columns="columns"
    :rows="productos"
    row-key="name"
  >
  </q-table>
</template>

<script>
import { watch } from 'vue';



export default {
  props: {
    productos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const columns = [
      {
        name: 'producto',
        required: true,
        label: 'Producto',
        align: 'left',
        field: row => row.nombre,
        format: val => `${val}`,
        sortable: true,
      },
      {
        name: 'descripcion',
        align: 'center',
        label: 'Descripcion',
        field: 'descripcion',
        sortable: true,
      },
      {
        name: 'referencia',
        label: 'refencia',
        field: 'referencia',
        sortable: true,
      },
      {
        name: 'precio',
        label: 'Precio',
        field: 'precio',
        sortable: true,
      },
    ];

    watch(
      () => props.productos,
      (newProductos) => {
        //console.log('Nuevos productos:', newProductos);
      }
    );

    return {
      columns,
    };
  },
};
</script>