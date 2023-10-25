import { defineStore } from 'pinia'
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../utils/configs/init'

type IUserForm = {
  email: string
  password: string
}

type IUser = {
  email: string
  name: string
}

type IAuthState = {
  user: IUser | null
}

const state: IAuthState = {
  user: null
}

export const useAuthentication = defineStore({
  id: 'authentication',
  state: () => state,
  getters: {
    isLogged: (state) => !!state.user,
    getEmail: (state) => state.user?.email || '',
    getName: (state) => state.user?.name || ''
  },
  actions: {
    async singIn(userForm: IUserForm) {
      try {
        setPersistence(auth, browserSessionPersistence)

        return signInWithEmailAndPassword(auth, userForm.email, userForm.password)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
