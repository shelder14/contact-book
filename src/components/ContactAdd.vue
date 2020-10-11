<template>
  <form action="" class="add-contact">
    <input
      class="add-contact__input"
      type="text"
      maxlength="30"
      placeholder="Имя контакта"
      v-model="nameContact"
    />

    <button @click.prevent="clickAdd" class="add-contact__btn">Добавить</button>
  </form>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "ContactAdd",
  data: function () {
    return { nameContact: "" };
  },
  methods: {
    ...mapMutations(["addContact"]),
    clickAdd() {
      this.addContact(this.nameContact);
      this.nameContact = "";
    },
  },
};
</script>