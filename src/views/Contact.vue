<template>
  <div class="container">
    <h1>{{ nameContact }}</h1>
    <Field
      v-for="(item, index) in fields"
      :key="index"
      :id="$route.params.id"
      v-bind="item"
    />
    <form action="" class="form-field">
      <input
        type="text"
        name="name"
        v-model="name"
        maxlength="20"
        class="form-field__input"
        placeholder="Название"
        required
      />
      <input
        type="text"
        name="value"
        v-model="value"
        maxlength="20"
        class="form-field__input"
        placeholder="Значение"
        required
      />
      <button @click.prevent="clickAddField" class="form-field__btn">
        Добавить
      </button>
    </form>
  </div>
</template>
<script>
import Field from "@/components/Field.vue";
import { mapMutations } from "vuex";
export default {
  name: "ContactPage",
  components: {
    Field,
  },
  data: function () {
    return {
      nameContact: "",
      name: "",
      value: "",
    };
  },
  methods: {
    ...mapMutations(["addField"]),
    clickAddField() {
      this.addField({
        id: this.$route.params.id,
        name: this.name,
        value: this.value,
      });
      this.value = "";
      this.name = "";
    },
  },
  computed: {
    fields: function () {
      const { fields } = this.$store.getters.getContact(this.$route.params.id);
      return fields;
    },
  },
  mounted() {
    console.log(this.$store.getters.getContact(this.$route.params.id));
    const { nameContact } = this.$store.getters.getContact(
      this.$route.params.id
    );

    this.nameContact = nameContact;
  },
};
</script>
