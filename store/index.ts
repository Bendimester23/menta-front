export const state = () => ({
    counter: 0
})

const sT = state();

export const mutations = {
    increment(s: typeof sT) {
        s.counter++
    }
}
