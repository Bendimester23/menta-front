import { NuxtAxiosInstance } from '@nuxtjs/axios'

export const state = () => ({
    groups: {},
})

type sT = {
    groups: any
}

export type Group = {
    id              : String
    createdAt       : String
    updatedAt       : String
    name            : String
    codeLogin       : Boolean
    loginCode       : String
    requiresAproval : Boolean
    members         : any[]
    exams           : any[]
}

export const mutations = {
    setGroup(state: sT, data: {id: string, group: Group}) {
        state.groups[data.id] = data.group
    },
    deleteGroup(state: sT, id: string) {
        delete state.groups[id]
    }
}

export const actions = {
    async fetchGroup(store: any, id: string) {
        try {
            const { data } = await ((this as any).$axios as NuxtAxiosInstance).get(`/api/group/${id}/`)
            let g = data;
            const res = await ((this as any).$axios as NuxtAxiosInstance).get(`/api/group/${id}/exams`)
            g.exams = res.data;
            store.commit(`setGroup`, {id, group: g})
        } catch(e) {
            (this as any).$toast.error(`Hiba történt!`)
        }
    }
}
