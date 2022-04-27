<template>
  <div class="modal-wrapper">
    <div class="modal-wrapper__body">
      <div class="wrapper-terminal">
        <button @click="onCloseModalWindow">
          <img src="@/assets/icons/cross.svg" alt="Кнопка закрыть" />
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWrapper",
  emits: ['closeModal'],
  methods: {
    onCloseModalWindow() {
       this.$emit("closeModal")
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  &__body {
    width: 60%;
    height: 60%;
    padding: 15px;

    border-radius: 15px;

    background-color: #ffffff;
  }
}

.wrapper-terminal {
  text-align: right;

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