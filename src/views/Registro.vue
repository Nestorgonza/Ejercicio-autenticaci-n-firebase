<template>
    <div>
        <h1>Registro de usuarios</h1>
        <form @submit.prevent="crearUsuario({email, pass1})">
            <input type="mail" v-model="email" placeholder="Email">
            <input type="password" v-model="pass1" placeholder="Contraseña">
            <input type="password" v-model="pass2" placeholder="Repita contraseña">
            <button type="submit" :disabled="!desactivar">Crear Usuario</button>
        </form>
        <p>{{error}}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
    name: 'Registro',
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed: {
        ...mapState(['error']),
        desactivar() {
            return this.pass1 === this.pass2 && this.pass1 != ''
        }
    }
}
</script>