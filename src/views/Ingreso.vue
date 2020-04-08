<template>
  <div>
    <h1>Ingreso de usuarios</h1>
    <form @submit.prevent="ingresoUsuario({email:$v.email.$model,
      pass:$v.pass.$model})">
      <input type="email" v-model="$v.email.$model" class="form-control mb-2" placeholder="Ingrese correo">
      <small class="text-danger d-block" v-if="!$v.email.required">Campo requerido</small>
      <small class="text-danger d-block" v-if="!$v.email.email">Email no valido</small>
      <input type="password" v-model="$v.pass.$model" class="form-control mb-2" placeholder="Ingrese contraseña">
      <small class="text-danger d-block" v-if="!$v.pass.required">Campo requerido</small>     
      <small class="text-danger d-block" v-if="!$v.pass.minLength">
        Mínimo 6 carácteres
      </small>
      <button type="submit" 
        class="btn btn-primary btn-block"
        :disabled="$v.$invalid">
        Acceder
        </button>
    </form>
    <p class="text-danger d-block" 
      v-if="error === 'auth/user-not-found'">
      Usuario incorrecto 
    </p>
    <p class="text-danger d-block" 
      v-if="error === 'auth/wrong-password'">
      Contraseña incorrecta  
    </p>
    <!-- {{$v.email}} -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Ingreso',
  data(){
    return{
      email: '',
      pass: ''
    }
  },
  methods:{
    ...mapActions(['ingresoUsuario'])
  },
  computed:{
    ...mapState(['error'])
  },
  validations: {
    email: {required, email},
    pass: {required, minLength: minLength(6)}
  }
}
</script>
