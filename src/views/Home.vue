<template>
  <div class="container">
    <h1>Книга контактов</h1>
    <Contact v-for="contact in contacts" :key="contact.id" v-bind="contact" />
    <ContactAdd />
  </div>
</template>
<script>
import Contact from "@/components/Contact.vue";
import ContactAdd from "@/components/ContactAdd.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Contact,
    ContactAdd,
  },
  computed: mapState({
    contacts: function (state) {
      return state.contacts;
    },
  }),
};
</script>