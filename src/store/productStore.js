import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    PRODUCT_DATA: [],
    IN_CARD: [],
    total: 0,
    qty: 0,
  }),
  actions: {
    addToCard(id) {
      let item = this.PRODUCT_DATA.find((it) => it.id === id);
      console.log('productStore');
      if (item) {
        item.qty = (item.qty ?? 0) + 1;
      } else {
        console.error(`No such item. id = ${id}`);
      }
      this.updateCard();
    },

    deleteFromCard(id) {
      let item = this.PRODUCT_DATA.find((it) => it.id === id);
      if (item) {
        item.qty = Math.max((item.qty ?? 0) - 1, 0);
      } else {
        console.error(`No such item. id = ${id}`);
      }
      this.updateCard();
    },

    updateCard() {
      this.IN_CARD = this.PRODUCT_DATA.filter((el) => el.qty);
      this.saveToLocalStorage('IN_CARD', this.IN_CARD);
    },

    sumTotal() {
      let qty = 0;
      let total = 0;
      for (let item of this.PRODUCT_DATA) {
        qty += item.qty ?? 0;
        total = Math.ceil((total += (item.qty ?? 0) * item.price));
      }
      this.total = total;
      this.qty = qty;
      this.saveToLocalStorage('TOTAL', this.total);
      this.saveToLocalStorage('QTY', this.qty);
    },
    saveToLocalStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  },
  persist: true,
});
