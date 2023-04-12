<template>
    <q-page>
        <h4>Variaciones</h4>
        <q-form 
        class="row q-col-gutter-md"
        @submit.prevent="created"
        @reset="onReset"
        ref="myForm"
        >
            <div class="col-12 col-sm-3">
                <q-input
                type="text"
                label="Referencia"
                v-model="referencia"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor escribe algo']"
                />
            </div>

            <div class="col-12 col-sm-3">
                <q-input
                type="text"
                label="Descripcion"
                v-model="descripcion"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor escribe algo']"
                />
            </div>

            <div class="col-12 col-sm-3">
                <q-input
                label="Precio"
                v-model="precio"
                lazy-rules
                type="number"
                :rules="[ val => val && val.length > 0 || 'Por favor escribe algo']"
                />
            </div>     

            <div class="col-12 col-sm-3">
                <q-select
                label="Producto"
                v-model="producto"
                lazy-rules
                :options="opciones"
                option-label="nombre"
                option-value="id"
                />
            </div> 

            
            <div class="col-12 text-center">
                <q-btn color="positive" label="Submit" type="submit" />
                <q-btn color="negative" label="Reset" type="reset" class="q-ml-sm" />
            </div>
        </q-form>
    </q-page>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</template>
<script>
import {ref, onMounted} from 'vue'
import { useQuasar } from 'quasar'
export default {

    setup(){
        const $q = useQuasar()

        const producto = ref(null)
        const descripcion = ref(null)
        const referencia = ref(null)
        const precio = ref(null)

        const myForm = ref(null)

        const variaciones = ref([])

        const opciones = ref([])

        const provesarFormulario = () =>{
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
            })

            variaciones.value = [...variaciones.value, {
                name: referencia.value,
                descripcion: descripcion.value,
                referencia: referencia.value,
                precio: precio.value
            }]
        } 

        const onReset = () => {
            referencia.value = null
            descripcion.value = null
            precio.value = null
            producto.value = null
        }

        const created = () => {
            let url = 'http://127.0.0.1:8000/api/variaciones/create'
            
            let data = {
                referencia: referencia.value,
                descripcion: descripcion.value,
                precio: precio.value,
                producto: producto.value
            }
            let post = {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                }
            }   
            fetch(url, post)
            .then((response) => response.json)
            .then((response => {
                myForm.value.resetValidation()

                onReset()
            }))
        }
        const obtenerProductos = async () => {
            try {
                
                const response = await fetch('http://127.0.0.1:8000/api/productos');
                const data = await response.json();
                
                opciones.value = data.productos

            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
            };

        onMounted(() => {
            obtenerProductos();
            });
        
        return{
            producto,
            descripcion,
            referencia,
            precio,
            provesarFormulario,
            onReset,
            opciones,
            variaciones,
            created,
            myForm,
        }
    }
}
</script>