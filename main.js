import 'uno.css';
import '@unocss/reset/tailwind.css';
import InvoiceVO from './src/mvc/model/VO/InvoiceVO.js';
import DOM from './src/constants/dom';
import { maskForNum } from './src/utils/maskNumber.js';
import { maskIBAN } from './src/utils/maskIBAN.js';
import WorkItemVO from './src/mvc/model/VO/WorkItemVO.js';

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
const domInvoiceTaxes = getDOM(DOM.INVOICE_INPUT.TAXES);
const domInvoiceIban = getDOM(DOM.INVOICE_INPUT.IBAN);
let domInvoiceSubtotal = getDOM(DOM.INVOICE_RESULTS.SUBTOTAL);
let domInvoiceSubtotalWithDiscount = getDOM(DOM.INVOICE_RESULTS.DISCOUNT);

const invoiceVO = rawInvoice
  ? InvoiceVO.fromJSON(JSON.parse(rawInvoice))
  : InvoiceVO.createEmpty();

console.log(invoiceVO);
const workItems = invoiceVO.items;

workItems.forEach((workItemVO) => renderWorksItems(workItemVO));

domInvoiceId.value = invoiceVO.id;
domInvoiceDiscount.value = invoiceVO.discount;
domInvoiceTaxes.value = invoiceVO.taxes;
domInvoiceIban.value = invoiceVO.iban;
calcResults();

domInvoiceId.addEventListener('input', (e) => maskForNum(domInvoiceId, 4));
domInvoiceId.addEventListener('blur', (e) =>
  setDataToInvoiceVO(domInvoiceId.value, 'id', '№', 'Enter the invoice number'),
);

domInvoiceDiscount.addEventListener('input', (e) => {
  maskForNum(domInvoiceDiscount, 2);
});

domInvoiceDiscount.addEventListener('blur', (e) => {
  setDataToInvoiceVO(
    domInvoiceDiscount.value,
    'discount',
    'discount(%) = ',
    'Enter the discount',
  );
  calcResults();
});

domInvoiceTaxes.addEventListener('input', (e) => {
  maskForNum(domInvoiceTaxes, 2);
  calcResults();
});
domInvoiceTaxes.addEventListener('blur', (e) => {
  setDataToInvoiceVO(
    domInvoiceTaxes.value,
    'taxes',
    'taxes (%) = ',
    'Enter the taxes',
  );
  calcResults();
});

domInvoiceIban.addEventListener('input', () => maskIBAN(domInvoiceIban));
domInvoiceIban.addEventListener('blur', (e) => {
  setDataToInvoiceVO(
    domInvoiceIban.value.split(' ').join(''),
    'iban',
    'IBAN = ',
    'Enter IBAN',
  );
});

getDOM(DOM.BUTTON.ADD_WORK_ITEM).onclick = () => {
  renderWorkItemsPopup(
    null,
    'Add',
    'Create',
    (
      workItemId,
      workItemTitle,
      workItemDescription,
      workItemQty,
      workItemCost,
      workItemTotal,
    ) => {
      console.log('> Create item -> On Confirm');
      const workItemVO = new WorkItemVO(
        workItemId,
        workItemTitle,
        workItemDescription,
        workItemQty,
        workItemCost,
        workItemTotal,
      );
      workItems.push(workItemVO);
      console.log('workItems', workItems);
      invoiceVO.items = workItems;
      console.log('invoiceVO=', invoiceVO);
      saveInvoice(invoiceVO);
      renderWorksItems(workItemVO);
    },
  );
};

function calcResults() {
  let subtotal = workItems
    .map((item) => item.total)
    .reduce((prev, curr) => prev + curr, 0);
  domInvoiceSubtotal.innerText = subtotal;
  domInvoiceSubtotalWithDiscount.innerText = subtotal;
  if (invoiceVO.discount) {
    const discount = parseInt(invoiceVO.discount);
    if (discount !== 0) {
      let subtotalWithDiscount = Math.floor(subtotal * (1 - discount / 100));
      domInvoiceSubtotalWithDiscount.innerText = subtotalWithDiscount;
    }
  }
  return subtotal;
}

function renderWorksItems(workItemVO) {
  const domWorkItemClone = domTemplateWorkItems.cloneNode(true);
  domWorkItemClone.dataset.id = workItemVO.id;
  QUERY(domWorkItemClone, DOM.Template.WORK_ITEM.TITLE).innerText =
    workItemVO.title;
  QUERY(domWorkItemClone, DOM.Template.WORK_ITEM.DESCRIPTION).innerText =
    workItemVO.description;
  QUERY(domWorkItemClone, DOM.Template.WORK_ITEM.QTY).innerText =
    workItemVO.qty;
  QUERY(domWorkItemClone, DOM.Template.WORK_ITEM.COST).innerText =
    workItemVO.cost;
  QUERY(domWorkItemClone, DOM.Template.WORK_ITEM.TOTAL).innerText =
    workItemVO.total;
  domTableWorkItems.append(domWorkItemClone);
  calcResults();
  return domWorkItemClone;
}

async function renderWorkItemsPopup(
  workItemVO,
  popupTitle,
  confirmText,
  processDataCallback,
) {
  const domPopupContainer = getDOM(DOM.Popup.CONTAINER);
  domPopupContainer.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupContainer.children[0].remove();
    domPopupContainer.classList.add('hidden');
  };

  const PopupWorkItem = (await import('./src/mvc/view/popup/PopupWorkItem'))
    .default;
  const popupWorkItemInstance = new PopupWorkItem(
    popupTitle,
    confirmText,
    (
      workItemId,
      workItemTitle,
      workItemDescription,
      workItemQty,
      workItemCost,
      workItemTotal,
    ) => {
      console.log('Main -> renderWorkItemsPopup: confirmCallback', {
        workItemId,
        workItemTitle,
        workItemDescription,
        workItemQty,
        workItemCost,
        workItemTotal,
      });
      processDataCallback(
        workItemId,
        workItemTitle,
        workItemDescription,
        workItemQty,
        workItemCost,
        workItemTotal,
      );
      onClosePopup();
    },
    onClosePopup,
  );
  domPopupContainer.append(popupWorkItemInstance.render());
}

function setDataToInvoiceVO(domElement, paramName, logText, alertText) {
  if (domElement) {
    const invoiceData = domElement;
    console.log(`${logText} ${invoiceData}`);
    invoiceVO[paramName] = invoiceData;
    saveInvoice(invoiceVO);
  } else {
    window.alert(`${alertText}`);
  }
}

function saveInvoice(invoiceData) {
  localStorage.setItem(KEY_LOCAL_INVOICE, JSON.stringify(invoiceData));
  console.log('Invoice written to localStorage ', invoiceData);
}
