import Vue from 'vue'
import Vuex from 'vuex'
import {
  db,
  auth
} from '../main'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
    tareas: [],
    tarea: {
      nombre: '',
      id: ''
    },
    carga: false
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setTareas(state, tareas) {
      state.tareas = tareas
    },
    setTarea(state, tarea) {
      state.tarea = tarea
    },
    eliminarTarea(state, id) {
      state.tareas = state.tareas.filter(doc => {
        return doc.id != id
      })
    },
    cargarFirebase(state, payload) {
      state.carga = payload
    }
  },
  actions: {
    crearUsuario({
      commit
    }, payload) {
      auth.createUserWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          console.log(res.user.email);
          console.log(res.user.uid);
          commit('setUsuario', {
            email: res.user.email,
            uid: res.user.uid
          })

          // Crear una colección
          db.collection(res.user.email).add({
              nombre: 'Tarea de ejemplo'
            })
            .then(() => {
              router.push({
                name: 'inicio'
              })
            })

        })
    },
    ingresoUsuario({
      commit
    }, payload) {
      auth.signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          console.log(res);
          commit('setUsuario', {
            email: res.user.email,
            uid: res.user.uid
          })
          router.push({
            name: 'inicio'
          })
        })
        .catch(err => {
          console.log(err);
          commit('setError', err.message)
        })
    },
    detectarUsuario({
      commit
    }, payload) {
      if (payload != null) {
        commit('setUsuario', {
          email: payload.email,
          uid: payload.uid
        })
      } else {
        commit('setUsuario', null)
      }
    },
    cerrarSesion({
      commit
    }) {
      auth.signOut()
      commit('setUsuario', null)
      router.push({
        name: 'ingreso'
      })
    },
    getTareas({
      commit
    }) {
      // carga firebase
      commit('cargarFirebase', true)

      const usuario = auth.currentUser
      const tareas = []
      db.collection(usuario.email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            // console.log(doc.id);
            // console.log(doc.data());
            let tarea = doc.data();
            tarea.id = doc.id
            tareas.push(tarea)
          })
          // setTimeout(() => {
          //   commit('cargarFirebase', false)
          // }, 2000)
          commit('cargarFirebase', false)
        })

      commit('setTareas', tareas)

    },
    getTarea({
      commit
    }, id) {
      const usuario = auth.currentUser
      db.collection(usuario.email).doc(id).get()
        .then(doc => {
          // console.log(doc.data());
          // console.log(doc.id);
          let tarea = doc.data();
          tarea.id = doc.id
          commit('setTarea', tarea)
        })
    },
    editarTarea({
      commit
    }, tarea) {
      const usuario = auth.currentUser
      db.collection(usuario.email).doc(tarea.id).update({
          nombre: tarea.nombre
        })
        .then(() => {
          router.push({
            name: 'inicio'
          })
        })
    },
    agregarTarea({
      commit
    }, nombre) {
      commit('cargarFirebase', true)
      const usuario = auth.currentUser
      db.collection(usuario.email).add({
          nombre: nombre
        })
        .then(doc => {
          console.log(doc.id);
          router.push({
            name: 'inicio'
          })
          commit('cargarFirebase', false)
        })
    },
    eliminarTarea({
      commit,
      dispatch
    }, id) {
      const usuario = auth.currentUser
      db.collection(usuario.email).doc(id).delete()
        .then(() => {
          console.log('Tarea fue eliminada');
          // dispatch('getTareas')
          commit('eliminarTarea', id)
        })
    }
  },
  getters: {
    existeUsuario(state) {
      if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false
      } else {
        return true
      }
    }
  }
})
