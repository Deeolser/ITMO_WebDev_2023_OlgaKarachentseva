import 'uno.css';
import '@unocss/reset/tailwind.css';
import InvoiceVO from "./src/mvc/model/VO/InvoiceVO.js";
import WorkItemVO from "./src/mvc/model/VO/WorkItemVO.js";
import DOM from './src/constants/dom';
import {maskForNum} from './src/utils/maskNumber'

const KEY_LOCAL_INVOICE = 'invoice';

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const rawInvoice = localStorage.getItem(KEY_LOCAL_INVOICE);


const domInvoiceNum = getDOM(DOM.INVOICE_INPUT.NUMBER);
const invoiceNumberMask = [/\D/, /\D/, /\D/, /\D/];
const invoicePercentMask = [/\D/, /\D/];

domInvoiceNum.addEventListener('input', (e) => {
    maskForNum(e, invoiceNumberMask)
    if (domInvoiceNum.value) {
      console.log(domInvoiceNum.value)

    } else {
      window.alert('Enter the number')
    }
  }
);


function saveInvoice() {
  localStorage.setItem(KEY_LOCAL_INVOICE, JSON.stringify(invoice));
}
