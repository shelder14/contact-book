<template>
  <form class="field" v-if="edit === 1">
    <div class="field__name">
      <input
        type="text"
        name="name"
        class="field__input"
        maxlength="20"
        v-model="draftName"
      />
    </div>
    <div class="field__value">
      <input
        type="text"
        name="value"
        class="field__input"
        maxlength="20"
        v-model="draftValue"
      />
    </div>
    <div>
      <button class="field__confim" @click.prevent="clickConfirmField">
        &#10004;
      </button>
      <button class="field__cancel" @click.prevent="clickCancelField">
        Отмена
      </button>
      <button class="field__delete" @click.prevent="clickDeleteField">
        &#10006;
      </button>
    </div>
  </form>

  <div class="field" v-else>
    <div class="field__name">
      {{ name }}
    </div>
    <div class="field__value">
      {{ value }}
    </div>
    <div class="field__btns">
      <button class="field__edit" @click="clickEditField">&#9998;</button>
      <button
        class="field__stepback"
        v-if="edited === 1"
        @click="clickStepBackField"
      >
        &#8617;
      </button>
      <button class="field__delete" @click="clickDeleteField">&#10006;</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Field",
  data: function () {
    return {
      draftName: this.name,
      draftValue: this.value,
    };
  },
  props: {
    name: String,
    value: String,
    fieldId: String,
    id: String,
    edit: Number,
    prevName: String,
    prevValue: String,
    edited: Number,
  },
  methods: {
    ...mapMutations([
      "deleteField",
      "editField",
      "confirmField",
      "cancelField",
      "stepBackField",
    ]),
    clickDeleteField() {
      this.deleteField({
        id: this.id,
        fieldId: this.fieldId,
      });
    },
    clickEditField() {
      this.editField({
        id: this.id,
        fieldId: this.fieldId,
      });
    },
    clickConfirmField() {
      this.confirmField({
        id: this.id,
        fieldId: this.fieldId,
        name: this.draftName,
        value: this.draftValue,
        prevName: this.name,
        prevValue: this.value,
      });
    },
    clickCancelField() {
      if (confirm("Отменить изменения?")) {
        this.cancelField({
          id: this.id,
          fieldId: this.fieldId,
        });
        this.draftName = this.name;
        this.draftValue = this.value;
      }
    },
    clickStepBackField() {
      this.stepBackField({
        id: this.id,
        fieldId: this.fieldId,
      });
      this.draftName = this.prevName;
      this.draftValue = this.prevValue;
    },
  },
};
</script>