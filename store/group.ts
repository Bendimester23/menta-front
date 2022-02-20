import { NuxtAxiosInstance } from '@nuxtjs/axios'

export const state = () => ({
    groups: {},
})

type sT = {
    groups: any
}

type Group = {
    id              : String
    createdAt       : String
    updatedAt       : String
    name            : String
    codeLogin       : Boolean
    loginCode       : String
    requiresAproval : Boolean
    members         : any[]
}

export const mutations = {
    setGroup(state: sT, data: {id: string, group: Group}) {
        console.log(data);
        
        state.groups[data.id] = data.group
    },
    deleteGroup(state: sT, id: string) {
        delete state.groups[id]
    }
}

export const actions = {
    async fetchGroup(store: any, id: string) {
        console.log(id);
        const resp = await ((this as any).$axios as NuxtAxiosInstance).get(`/api/group/${id}/`)
        console.log(resp.data);
        store.commit(`setGroup`, {id, group: resp.data})
    }
}
