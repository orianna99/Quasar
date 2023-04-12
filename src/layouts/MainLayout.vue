<template>
  <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item 
            clickable 
            v-ripple 
            active-class="my-menu-link"
            exact
            to="/">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section >
                Home
              </q-item-section>
            </q-item>

            <q-item 
            clickable 
            v-ripple
            active-class="my-menu-link" 
            exact
            to="/about">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Productos
              </q-item-section>
            </q-item>

            <q-item 
            clickable 
            v-ripple
            active-class="my-menu-link" 
            exact
            to="/form">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>

              <q-item-section>
                Agregar Productos
              </q-item-section>
            </q-item>

            <q-item 
            clickable 
            v-ripple
            active-class="my-menu-link" 
            exact
            to="/productVariation">
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>

              <q-item-section>
                 Productos - Variaciones
              </q-item-section>
            </q-item>
            
            <q-item 
            clickable 
            v-ripple
            active-class="my-menu-link" 
            exact
            to="/addVariacion">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>

              <q-item-section>
                Agregar Variacion
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const drawer = ref(false)

    return {
      drawer
    }
  }
})
</script>

<style lang="scss">
  .my-menu-link{
    color: white;
    background: #F2C037
  }
</style>
