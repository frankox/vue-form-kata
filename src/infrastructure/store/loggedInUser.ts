import { defineStore } from 'pinia'
import type { LoggedInUser } from '@/infrastructure/models/loggedInUser'

export interface LoggedInUserModule {
  user: LoggedInUser | undefined
}

const resetState = (): LoggedInUserModule => ({
  user: undefined,
})

export const useLoggedInUserStore = defineStore('loggedInUser', {
  state: (): LoggedInUserModule => resetState(),

  getters: {
    getLoggedInUser: (state) => state.user,
  },

  actions: {
    setLoggedInUser(user: LoggedInUser) {
      this.user = user
    },

    clearState() {
      Object.assign(this, resetState())
    },
  },
})
