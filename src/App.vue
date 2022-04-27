<template>
  <div class="app">
    <lds-roller v-if="isLoaded" />
    <template v-else>
      <the-user-list />
    </template>
  </div>
</template>

<script>
import TheUserList from "@/components/TheUserList.vue";
import api from "./api";
import { computed } from "vue";
import LdsRoller from "@/components/LdsRoller";

export default {
  name: "App",
  components: { TheUserList, LdsRoller },
  data: () => ({
    userRoles: [],
    isLoaded: true,
  }),
  provide() {
    return {
      userRoles: computed(() => this.userRoles),
    };
  },
  methods: {
    async loadMainInfo() {
      this.userRoles = await api.user.loadRoles();
      this.isLoaded = false;
    },
  },
  created() {
    this.loadMainInfo();
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
}
</style>
