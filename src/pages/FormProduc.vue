<template>
    <q-page>
        <h4>Productos</h4>
        <q-form 
        class="row q-col-gutter-md"
        @submit.prevent="created"
        @reset="onReset"
        ref = "myForm"
        >
            <div class="col-12 col-sm-3">
                <q-input
                type="text"
                label="Name"
                v-model="producto"
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
                type="text"
                label="Referencia"
                v-model="referencia"
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
            
            <div class="col-12 text-center">
                <q-btn color="positive" label="Submit" type="submit" />
                <q-btn color="negative" label="Reset" type="reset" class="q-ml-sm" />
            </div>
        </q-form>
    </q-page>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</template>
<script>
import {ref} from 'vue'
import { useQuasar } from 'quasar'
import { createTemplateLiteral } from '@vue/compiler-core'
export default {

    setup(){
        const $q = useQuasar()

        const myForm = ref(null)

        const producto = ref(null)
        const descripcion = ref(null)
        const referencia = ref(null)
        const precio = ref(null)

        const productos = ref([])

        const provesarFormulario = () =>{
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
            })

            productos.value = [...productos.value, {
                name: producto.value,
                descripcion: descripcion.value,
                referencia: referencia.value,
                precio: precio.value
            }]

        } 

        const onReset = () => {
            producto.value = null
            descripcion.value = null
            referencia.value = null
            precio.value = null
        }
        const created = () => {
            let url = 'http://127.0.0.1:8000/api/productos/create'
            let data = {
                name: producto.value,
                descripcion: descripcion.value,
                referencia: referencia.value,
                precio: precio.value
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
            .then((reponse => {

                myForm.value.resetValidation()

                onReset()
            }))
        }

        return{
            producto,
            descripcion,
            referencia,
            precio,
            created,
            onReset,
            productos,
            myForm
        }
       
    },
    
}
</script>