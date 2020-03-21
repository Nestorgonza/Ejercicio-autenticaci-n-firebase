<template>
  <div id="app" class="container mt-5">
    <div id="nav">
      <router-link :to="{name:'inicio'}" v-if="existeUsuario" class="btn btn-primary mx-2">
        Inicio
      </router-link>
      <router-link :to="{name:'registro'}" v-if="!existeUsuario" class="btn btn-primary mx-2">
        Registro
      </router-link>
      <router-link :to="{name:'ingreso'}" v-if="!existeUsuario" class="btn btn-primary mx-2">
        Ingreso
      </router-link>
      <a @click="cerrarSesion" v-if="existeUsuario" class="btn btn-danger mx-2">
        Cerrar Sesión
      </a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'App',
  methods:{
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['existeUsuario'])
  }
}
</script>
