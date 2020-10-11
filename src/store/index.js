import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    contacts: []
  },
  mutations: {
    //Добавление контакта
    addContact(state, nameContact) {
      if (nameContact) {
        state.contacts.push({
          nameContact,
          id: String(Date.now()),
          fields: []
        })
      }

    },
    //Удаление контакта
    deleteContact(state, id) {
      if (confirm("Удалить контакт?")) {
        state.contacts = state.contacts.filter((item) => item.id !== id)
      }
    },
    //Добавление поля
    addField(state, { id, name, value }) {
      const contact = state.contacts.find((item) => id === item.id)
      if (contact && name) {
        contact.fields.push({
          name,
          value,
          fieldId: String(Date.now()),
          edit: 0,
          prevName: "",
          prevValue: "",
          edited: 0
        })
      }
    },
    //Удаление поля
    deleteField(state, { fieldId, id }) {
      if (confirm("Удалить запись?")) {
        const contact = state.contacts.find((item) => item.id === id);
        contact.fields = contact.fields.filter((item) => item.fieldId !== fieldId);
      }
    },
    //Редактирование поля
    editField(state, { fieldId, id }) {
      const contact = state.contacts.find((item) => item.id === id);
      const editField = contact.fields.find((item) => item.fieldId === fieldId);
      editField.edit = 1;
    },
    //Потдверждение редактирования поля
    confirmField(state, { fieldId, id, name, value, prevName, prevValue }) {
      const contact = state.contacts.find((item) => item.id === id);
      const editField = contact.fields.find((item) => item.fieldId === fieldId);
      editField.prevName = prevName;
      editField.prevValue = prevValue;
      if (editField.name === name && editField.value === value) {
        editField.edited = 0;
      } else {
        editField.edited = 1;
      }
      editField.name = name;
      editField.value = value;
      editField.edit = 0;
    },
    //Отмена редактирования поля
    cancelField(state, { fieldId, id }) {
      const contact = state.contacts.find((item) => item.id === id);
      const editField = contact.fields.find((item) => item.fieldId === fieldId);
      editField.edit = 0;
    },
    //Отменить последние действие
    stepBackField(state, { fieldId, id }) {
      const contact = state.contacts.find((item) => item.id === id);
      const editField = contact.fields.find((item) => item.fieldId === fieldId);
      editField.name = editField.prevName;
      editField.value = editField.prevValue;
      editField.edited = 0;
    }
  },
  getters: {
    getContact: (state) => (id) => {
      return state.contacts.find((item) => id === item.id)
    }
  }
})
export default store