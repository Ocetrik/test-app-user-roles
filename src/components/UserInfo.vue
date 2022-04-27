<template>
  <div class="user-info">
    <div class="user-info__title">Пользователь: {{ user.name }}</div>
    <div class="user-info__body">
      Роли:
      <ul class="user-info__roles-list">
        <li v-for="(role, id) in isViewUser.roles" :key="id">
          {{ role.name }}
          <button @click="deleteRole(role.id)">
            <img src="@/assets/icons/cross.svg" alt="" />
          </button>
        </li>
      </ul>
      <form
        class="user-form"
        v-if="isNotAddedRoles.length"
        @submit.prevent="setRole"
      >
        <label name="roleSelector">Выбрать роль</label>
        <select v-model="form.role" id="roleSelector">
          <option v-for="role in isNotAddedRoles" :key="role" :value="role.id">
            {{ role.name }}
          </option>
        </select>
        <button class="user-form__btn" :disabled="!form.role">
          Добавить роль
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  inject: ["userRoles"],
  data: () => ({
    userInfo: {},
    isLoaded: true,
    form: {
      role: null,
    },
  }),
  methods: {
    async loadUserInfo() {
      this.userInfo = await api.user.loadUserInfo(this.user.id);
      this.isLoaded = false;
    },
    async setRole() {
      const response = await api.user.setRole(this.user.id, this.form.role);
      if (response?.data?.status === 0) {
        this.userInfo.roles.push(this.form.role);
      }
    },
    async deleteRole(roleId) {
      const response = await api.user.deleteRole(this.user.id, roleId);
      if (response?.data?.status === 0) {
        this.userInfo.roles = this.userInfo.roles.filter((i) => i !== roleId);
      }
    },
  },
  created() {
    this.loadUserInfo();
  },
  computed: {
    isViewUser() {
      return {
        name: this.user.name,
        roles:
          this.userInfo?.roles
            ?.map((roleId) => ({
              id: roleId,
              name: this.userRoles.value[roleId - 1].name,
            }))
            .filter((i) => i) || [],
      };
    },
    isNotAddedRoles() {
      const arr = [];
      this.userRoles.value.forEach((i) => {
        if (this.userInfo?.roles?.includes(i.id) === false) {
          arr.push(i);
        }
      });
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding-left: 15px;
}

.user-form {
  display: flex;
  flex-direction: column;
  max-width: 150px;
  padding-top: 15px;
  gap: 5px;
  &__btn {
    border-radius: 10px;
    background-color: aquamarine;
    padding: 10px;
  }
}

.user-info__roles-list {
  img {
    width: 16px;
    height: 16px;
  }

  button {
    padding: 3px;
    border-radius: 5px;
  }
}
</style>