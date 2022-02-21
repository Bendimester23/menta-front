import { NuxtAxiosInstance } from "@nuxtjs/axios";

export const state = () => ({
    counter: 0,
    groups: [] as any[],
    groupsFetched: false
})

const sT = state();

export const mutations = {
    increment(s: typeof sT) {
        s.counter++
    },
    setGroups(s: typeof sT, group: any[]) {
        s.groups = group;
        s.groupsFetched = true;
    },
    invalidateGroupsCache(s: typeof sT) {
        s.groupsFetched = false;
    },

}

export const actions = {
    async fetchUserGroups(store: any) {
        const res = await ((this as any).$axios as NuxtAxiosInstance).get(`/api/user/groups`);

        store.commit(`setGroups`, res.data);
    }
}
