import 'uno.css';
import '@unocss/reset/tailwind.css';
import InvoiceVO from "./src/mvc/model/VO/InvoiceVO.js";
import WorkItemVO from "./src/mvc/model/VO/WorkItemVO.js";
import DOM from './src/constants/dom';
import {maskForNum} from './src/utils/maskNumber'

const KEY_LOCAL_INVOICE = 'invoice';

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateWorkItems = getDOM(DOM.Template.ITEMS);
const domTableWorkItems = domTemplateWorkItems.parentNode;
domTemplateWorkItems.removeAttribute('id');
domTemplateWorkItems.remove();

const rawInvoice = localStorage.getItem(KEY_LOCAL_INVOICE);

const domInvoiceNum = getDOM(DOM.INVOICE_INPUT.NUMBER);

const invoiceNumberMask = [/\D/, /\D/, /\D/, /\D/];
const invoicePercentMask = [/\D/, /\D/];


const invoice = rawInvoice
  ? JSON.parse(rawInvoice).map((json) => InvoiceVO.fromJSON(json))
  : [];
invoice.forEach((invoiceVO) => renderTask(invoiceVO));
console.log('> invoice:', invoice);


function renderTask(invoiceVO) {
  const domWorkClone = domTemplateWorkItems.cloneNode(true);
  domWorkClone.dataset.id = invoiceVO.id;
  QUERY(domWorkClone, DOM.Template.WORK_ITEM.TITLE).innerText = invoiceVO.title;
  domTableWorkItems.prepend(domWorkClone);
  return domWorkClone;

}


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
