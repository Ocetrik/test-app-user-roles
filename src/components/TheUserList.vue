<template>
  <div class="the-user-list">
    <div
      v-for="user in userList"
      :key="user"
      @click="onOpenFullInfo(user)"
      class="the-user-list__item"
    >
      Пользователь: {{ user.name }}
    </div>
    <div class="app-pagination">
      <button @click="setPage(page - 1)" class="app-pagination__btn">
        Prev page
      </button>
      {{ page + 1}}
      <button
        :disabled="isDisableNextBtn"
        @click="setPage(page + 1)"
        class="app-pagination__btn"
      >
        Next page
      </button>
    </div>
  </div>
  <modal-wrapper @closeModal="onCloseModalWindow" v-if="modalFullInfo.view">
    <!-- <div class="user-info">Пользователь: {{ modalFullInfo.user.name }}</div> -->
    <user-info :user="modalFullInfo.user" />
  </modal-wrapper>
</template>

<script>
import api from "@/api";
import ModalWrapper from "@/components/ModalWrapper.vue";
import UserInfo from "@/components/UserInfo.vue";

export default {
  name: "TheUserList",
  inject: ["userRoles"],
  components: {
    ModalWrapper,
    UserInfo,
  },
  data() {
    return {
      limit: 5,
      userList: [],
      page: 0,
      modalFullInfo: {
        view: false,
        user: {},
      },
    };
  },
  methods: {
    async loadUserList() {
      const userList = await api.user.loadUsers(this.page, this.limit);
      if (!userList.length) {
        this.page = this.page - 1;
        alert("Записей больше нет");
      } else {
        this.userList = userList;
      }
    },
    setPage(page = 0) {
      if (page < 0) return;
      this.page = page;
    },
    onOpenFullInfo(user) {
      this.modalFullInfo.view = true;
      this.modalFullInfo.user = user;
    },
    onCloseModalWindow() {
      this.modalFullInfo.view = false;
      this.modalFullInfo.user = {};
    },
  },
  computed: {
    isDisableNextBtn() {
      return this.userList.length < this.limit;
    },
  },
  watch: {
    page() {
      this.loadUserList();
    },
  },
  async created() {
    this.loadUserList();
  },
};
</script>

<style lang="scss" scoped>
.the-user-list {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;

  max-width: 400px;

  &__item {
    padding: 5px;
    min-width: 300px;

    border-radius: 5px;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: #cccccc;
    }
  }
}
.app-pagination {
  text-align: center;
  font-size: 20px;
}
.app-pagination__btn {
  border-radius: 10px;
  background-color: aquamarine;
  padding: 10px;
}
</style>