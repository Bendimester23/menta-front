<template>
    <div class="flex flex-col p-2 mx-auto">
        <input type="text" class="input input-bordered" v-model="examData.name">
        <textarea type="text" class="textarea textarea-bordered my-2" placeholder="Kérdés" v-model="examData.description"></textarea>
        <p class="whitespace-pre">{{JSON.stringify(examData, 2, 2)}}</p>
        <button class="btn btn-primary" @click="addQuestion">+</button>
        <div class="flex flex-col mx-auto">
            <question-wrapper class="mx-auto" :data="q.data" :id="q.id" :editing="true" v-for="q in examData.questions" v-bind:key="q.id"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionWrapper from '~/components/QuestionWrapper.vue'
export default Vue.extend({
  components: { QuestionWrapper },
    data: () => ({
        examData: {
            name: `Teszt dolgozat 1`,
            description: `Egy nem annyira hosszú leírás arról, hogy miről szól ez a dolgozat`,
            questions: [] as any[],
        }
    }),
    methods: {
        addQuestion() {
            this.examData.questions.push({
                id: this.examData.questions.length,
                data: {
                    name: `Ez egy példa kérdés?`,
                    type: `TRUE_FALSE`
                }
            })
        }
    }
})
</script>
