<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({email:email, pass:pass1})">
      <input type="email" 
        v-model="$v.email.$model" 
        class="form-control mb-2" 
        placeholder="Ingrese correo">
      <small class="text-danger d-block" v-if="!$v.email.required">
        Campo requerido
      </small>
      <small class="text-danger d-block" v-if="!$v.email.email">
        Email no valido 
      </small>
      <input type="password" v-model="pass1" class="form-control mb-2" placeholder="Ingrese contraseña">
      <small class="text-danger d-block" v-if="!$v.pass1.minLength">
        Minimo 6 caracteres 
      </small>
      <input type="password" v-model="pass2" class="form-control mb-2" placeholder="repita contraseña">
      <small class="text-danger d-block" v-if="!$v.pass2.sameAs">
        Contraseña no coincide  
      </small>
      <button type="submit" :disabled="!desactivar" class="btn btn-primary btn-block">Crear Usuario</button>
    </form>
    <p class="text-danger d-block" v-if="error === 'auth/email-already-in-use'">
      Email ya registrado!
    </p>
  </div>
</template>

<script>

import { mapActions,mapState } from "vuex";
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

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
  }, 
  validations: {
    email: {required, email},
    pass1: {minLength: minLength(6)},
    pass2: {sameAs: sameAs('pass1')}
  }
}
</script>

