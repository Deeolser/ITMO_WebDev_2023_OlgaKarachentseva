import 'uno.css';
import '@unocss/reset/tailwind.css';
import InvoiceVO from "./src/mvc/model/VO/InvoiceVO.js";
import DOM from './src/constants/dom';
import {maskForNum} from "./src/utils/maskNumber.js";


const KEY_LOCAL_INVOICE = 'invoice';

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateWorkItems = getDOM(DOM.Template.ITEMS);
const domTableWorkItems = domTemplateWorkItems.parentNode;
domTemplateWorkItems.removeAttribute('id');
domTemplateWorkItems.remove();

const rawInvoice = localStorage.getItem(KEY_LOCAL_INVOICE);

const domInvoiceId = getDOM(DOM.INVOICE_INPUT.NUMBER);
const domInvoiceDiscount = getDOM(DOM.INVOICE_INPUT.DISCOUNT);

const invoiceIdMask = [/\D/, /\D/, /\D/, /\D/];
const invoicePercentMask = [/\D/, /\D/];

const invoiceVO = rawInvoice ? InvoiceVO.fromJSON(JSON.parse(rawInvoice)) : InvoiceVO.createEmpty();

console.log(invoiceVO)

if (invoiceVO) {
  domInvoiceId.value = invoiceVO.id
}


domInvoiceId.addEventListener('input', (e) => maskForNum(e, invoiceIdMask));
domInvoiceId.addEventListener("blur", (e) => {
    if (domInvoiceId.value) {
      const invoiceId = domInvoiceId.value
      console.log('invoiceId = ', invoiceId)
      invoiceVO.id = invoiceId;
      saveInvoice(invoiceVO)
    } else {
      window.alert('Enter the invoice number')
    }
  }
);
domInvoiceDiscount.addEventListener('input', (e) => maskForNum(e, invoicePercentMask));
domInvoiceDiscount.addEventListener("blur", (e) => {
    if (domInvoiceDiscount.value) {
      const invoiceDiscount = domInvoiceDiscount.value
      console.log('invoiceDiscount = ', invoiceDiscount)
      invoiceVO.discount = invoiceDiscount;
      saveInvoice(invoiceVO)
    } else {
      window.alert('Enter the Discount')
    }
  }
);

function saveInvoice(invoiceData) {
  localStorage.setItem(KEY_LOCAL_INVOICE, JSON.stringify(invoiceData));
  console.log('Invoice written to localStorage ', invoiceData)
}
