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

// const domTemplateWorkItems = getDOM(DOM.Template.ITEMS);
// const domTableWorkItems = domTemplateWorkItems.parentNode;
// domTemplateWorkItems.removeAttribute('id');
// domTemplateWorkItems.remove();

const rawInvoice = localStorage.getItem(KEY_LOCAL_INVOICE);

const domInvoiceId = getDOM(DOM.INVOICE_INPUT.NUMBER);
const domInvoiceDiscount = getDOM(DOM.INVOICE_INPUT.DISCOUNT);
const domInvoiceTaxes = getDOM(DOM.INVOICE_INPUT.TAXES);
const domInvoiceIban = getDOM(DOM.INVOICE_INPUT.IBAN);

const invoiceVO = rawInvoice
  ? InvoiceVO.fromJSON(JSON.parse(rawInvoice))
  : InvoiceVO.createEmpty();

console.log(invoiceVO);
const workItems = invoiceVO.items;

domInvoiceId.value = invoiceVO.id;
domInvoiceDiscount.value = invoiceVO.discount;
domInvoiceTaxes.value = invoiceVO.taxes;
domInvoiceIban.value = invoiceVO.iban;

domInvoiceId.addEventListener('input', (e) => maskForNum(domInvoiceId, 4));
domInvoiceId.addEventListener('blur', (e) =>
  setDataToInvoiceVO(domInvoiceId, 'id', '№', 'Enter the invoice number'),
);

domInvoiceDiscount.addEventListener('input', (e) =>
  maskForNum(domInvoiceDiscount, 2),
);
domInvoiceDiscount.addEventListener('blur', (e) =>
  setDataToInvoiceVO(
    domInvoiceDiscount,
    'discount',
    'discount(%) = ',
    'Enter the discount',
  ),
);

domInvoiceTaxes.addEventListener('input', (e) =>
  maskForNum(domInvoiceTaxes, 2),
);
domInvoiceTaxes.addEventListener('blur', (e) =>
  setDataToInvoiceVO(
    domInvoiceTaxes,
    'taxes',
    'taxes (%) = ',
    'Enter the taxes',
  ),
);
domInvoiceIban.addEventListener('input', () => maskIBAN(domInvoiceIban));
domInvoiceIban.addEventListener('blur', (e) =>
  setDataToInvoiceVO(domInvoiceIban, 'iban', 'IBAN = ', 'Enter IBAN'),
);

getDOM(DOM.BUTTON.ADD_WORK_ITEM).onclick = () => {
  console.log('+ pushed');
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
    ) => {
      console.log('> Create item -> On Confirm');
      const workItemVO = new WorkItemVO(
        workItemId,
        workItemTitle,
        workItemDescription,
        workItemQty,
        workItemCost,
      );
      workItems.push(workItemVO);
      console.log('workItems', workItems);
      invoiceVO.items = workItems;
      console.log('invoiceVO=', invoiceVO);
      localStorage.setItem(KEY_LOCAL_INVOICE, JSON.stringify(invoiceVO));
    },
  );
};

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
    ) => {
      console.log('Main -> renderWorkItemsPopup: confirmCallback', {
        workItemId,
        workItemTitle,
        workItemDescription,
        workItemQty,
        workItemCost,
      });
      processDataCallback(
        workItemId,
        workItemTitle,
        workItemDescription,
        workItemQty,
        workItemCost,
      );
      onClosePopup();
    },
    onClosePopup,
  );
  domPopupContainer.append(popupWorkItemInstance.render());
}

function setDataToInvoiceVO(domElement, paramName, logText, alertText) {
  if (domElement.value) {
    const invoiceData = domElement.value;
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
