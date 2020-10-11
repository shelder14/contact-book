<template>
  <div class="contact">
    <div class="contact__name">
      {{ nameContact }}
    </div>
    <router-link tag="a" :to="'/contact/' + id" class="contact__link">
      Подробнее
    </router-link>
    <button class="contact__delete" @click="clickDelete">Удалить</button>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "Contact",
  props: {
    nameContact: String,
    id: String,
  },

  methods: {
    ...mapMutations(["deleteContact"]),
    clickDelete() {
      this.deleteContact(this.id);
    },
  },
};
</script>