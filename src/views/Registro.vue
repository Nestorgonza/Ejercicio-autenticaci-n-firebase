<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({email:email, pass:pass1})">
      <input type="email" v-model="email" class="form-control mb-2" placeholder="Ingrese correo">
      <input type="password" v-model="pass1" class="form-control mb-2" placeholder="Ingrese contraseña">
      <input type="password" v-model="pass2" class="form-control mb-2" placeholder="repita contraseña">
      <button type="submit" :disabled="!desactivar" class="btn btn-primary btn-block">Crear Usuario</button>
    </form>
    <p>{{error}}</p>
  </div>
</template>

<script>

import { mapActions,mapState } from "vuex";

export default {
  name: 'Registro',
  data(){
    return{
      email: '',
      pass1: '',
      pass2: ''
    }
  },
  methods:{
    ...mapActions(['crearUsuario'])
  },
  computed:{
    ...mapState(['error']),
    desactivar(){
      return this.pass1 === this.pass2 && this.pass1 != ''
    }
  }
}
</script>

