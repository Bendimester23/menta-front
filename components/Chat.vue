<template>
  <div class="card bg-base-200 p-4 m-4 w-[30rem] flex flex-col min-h-[20rem]">
    <h1 class="text-2xl font-bold mb-2">Chat</h1>
    <ul class="flex flex-grow flex-col max-h-96 overflow-scroll" ref="msgView">
      <li v-for="msg in messages" :key="msg.id">
        <b>{{msg.author.username}}:</b>
        {{msg.content}}
      </li>
    </ul>
    <div class="flex flex-row mt-2">
      <input
        type="text"
        placeholder="Kezdj el gépelni..."
        class="input w-full mr-2"
        v-model="message"
        @keypress="chatKeyEvent"
      />
      <button :class="`btn btn-square ${message != `` || `btn-disabled`}`" :disabled="!message" @click="send()">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: `Chat`,
  data: () => ({
    message: ``,
    messages: [{
        id: 0,
        author: {
            username: `Béla`
        },
        content: `Teszt üzenet`
    }]
  }),
  mounted() {
    //If there's on an empty array, typescript assignes it a "never" type, but with this, it works
    this.messages.pop();
    this.$axios.get(`/api/chat/cl7uoouxj0000hedgv2n3uyut/messages?limit=100`).then(res => {
      this.messages.push(...res.data);
      setTimeout(() => {
        (this?.$refs?.msgView as any).scroll(0, 9999999);
      }, 300);
    }).catch(e => {
      this.$toasted.error(`Error loading messages`);
    });
    (this as any).$socket.$on(`msg`, (data: any) => {
        this.messages.push(data);
        (this?.$refs?.msgView as any).scroll(0, 9999999);
    });
    (this as any).$socketManager.send({ event: `setuid`, data: this.$auth?.user?.id });
    (this as any).$socketManager.send({ event: `setroom`, data: `cl7uoouxj0000hedgv2n3uyut` });
  },
  methods: {
    async send() {
        await (this as any).$socketManager.send({ event: "msgin", data: this.message });
        this.message = ``;
        (this?.$refs?.msgView as any).scroll(0, 9999999)
    },
    chatKeyEvent(e: KeyboardEvent) {
        if (this.message.replace(/\s/g, ``) == ``) return;
        if (e.key == `Enter`) this.send();
    }
  },
  props: {
    roomId: String
  }
});
</script>
