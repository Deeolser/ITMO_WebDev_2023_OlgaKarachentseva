import { maskForNum } from '../../../utils/maskNumber.js';

class PopupWorkItem {
  #title;
  #confirmText;
  #processDataCallback;
  #closeCallback;

  constructor(title, confirmText, confirmCallback, closeCallback) {
    this.#title = title;
    this.#confirmText = confirmText;
    this.#processDataCallback = confirmCallback;
    this.#closeCallback = closeCallback;
  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = `
      <section class='absolute top-0 h-full w-full' id='popupWorkItemContainer'>
            <div class='absolute top-0 h-full w-full bg-gray-500/60' data-id='overlayWorkItemPopup'></div>
            <div class='relative h-104 bg-white px-12 py-6 flex flex-col' id='popupWorkItemContainerForm'>
                <header class='flex flex-row justify-between'>
                    <button class='text-red enabled:hover:font-bold disabled:text-gray-300' data-id='btnDeleteWorkItemPopup' disabled=''>
                        Delete
                    </button>
                    <button class='text-gray hover:text-black' data-id='btnCloseWorkItemPopup'>close</button>
                </header>
                <main class='flex flex-row justify-between mt-8'>
                    <h1 class='text-4xl font-bold' id='titleWorkItemContainer'>${
                      this.#title
                    }</h1>
                    <div class='font-bold self-end'>
                        <label for='inputWorkItemQty'>Qty: </label>
                        <input data-id='inputWorkItemQty' class='w-16 input-percentage' id='inputWorkItemQty' pattern='[0-9]{2}' required
                               type='text'
                               value=''/>
                    </div>
                    <div class='font-bold self-end'>
                        <label for='inputWorkItemCost'>Cost: $</label>
                        <input data-id='inputWorkItemCost' class='w-16 input-percentage' id='inputWorkItemCost' pattern='[0-9]{2}' required
                               type='text'
                               value=''/>
                    </div>
                    <div class='font-bold self-end'>
                        Total: <span data-id='workItemTotalContainer' class='text-lg' id='workItemTotalContainer'>0</span>
                    </div>
                    <button class='px-4 bg-dark-200 text-white rounded-2 enabled:hover:bg-dark-900 disabled:opacity-30 disabled:text-gray '
                            data-id='btnCreateWorkItem' disabled=''>
                        ${this.#confirmText}
                    </button>
                </main>
                <footer class='flex flex-row mt-6 w-full'>
                    <div class='flex-col w-full'>
                        <div class='flex-row'>
                            <div class='flex-col'>
                                <div class='font-bold text-xs text-gray-600'>
                                    <label for='inputWorkItemTitle'>Work item:</label>
                                </div>
                                <div class='w-full mt-1'>
                                    <input data-id='inputWorkItemTitle' class='bg-gray-100 border-1 w-full h-full p-2' id='inputWorkItemTitle'
                                           placeholder='Enter title of the work item'/>
                                </div>
                            </div>
                        </div>
                        <div class='flex-row mt-6'>
                            <div class='flex-col'>
                                <div class='font-bold text-xs text-gray-600'>
                                    <label for='inputWorkItemDescription'>Description:</label>
                                </div>
                                <div class='w-full mt-1 h-32'>
                      <textarea data-id= 'inputWorkItemDescription' class='bg-gray-100 border-1 w-full h-full p-2' id='inputWorkItemDescription'
                                placeholder='Write what this work item about' style='resize: none;'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    `;
    console.log('div.firstChild', div.children);

    const popup = div.children[0];

    const domBtnClose = popup.querySelector(
      '[data-id="btnCloseWorkItemPopup"]',
    );
    const domOverlayPopup = popup.querySelector(
      '[data-id="overlayWorkItemPopup"]',
    );

    const domBtnConfirm = popup.querySelector('[data-id="btnCreateWorkItem"]');

    const domInpWorkItemTitle = popup.querySelector(
      '[data-id="inputWorkItemTitle"]',
    );
    const domInpWorkItemDescription = popup.querySelector(
      '[data-id="inputWorkItemDescription"]',
    );
    const domInpWorkItemQty = popup.querySelector(
      '[data-id="inputWorkItemQty"]',
    );
    const domInpWorkItemCost = popup.querySelector(
      '[data-id="inputWorkItemCost"]',
    );
    let domWorkItemTotal = 0;

    domInpWorkItemTitle.addEventListener('input', () => bthConfirmValidation());

    domInpWorkItemQty.addEventListener('input', () => {
      maskForNum(domInpWorkItemQty, 5);
      calcWorkItemTotal();
      renderWorkItemTotal();
      bthConfirmValidation();
    });

    domInpWorkItemCost.addEventListener('input', () => {
      maskForNum(domInpWorkItemCost, 5);
      calcWorkItemTotal();
      renderWorkItemTotal();
      bthConfirmValidation();
    });

    const calcWorkItemTotal = () => {
      if (domInpWorkItemQty.value && domInpWorkItemCost.value) {
        domWorkItemTotal =
          parseInt(domInpWorkItemQty.value) *
          parseInt(domInpWorkItemCost.value);
      } else {
        domWorkItemTotal = 0;
      }
    };
    const renderWorkItemTotal = () =>
      (popup.querySelector('[data-id="workItemTotalContainer"]').innerText =
        domWorkItemTotal);

    domBtnClose.onclick = () => {
      domBtnClose.onclick = null;
      domBtnConfirm.onclick = null;
      domOverlayPopup.onclick = null;
      this.#closeCallback();
    };

    domOverlayPopup.onclick = () => {
      domBtnClose.onclick = null;
      domBtnConfirm.onclick = null;
      domOverlayPopup.onclick = null;
      this.#closeCallback();
    };

    const bthConfirmValidation = () => {
      if (
        domInpWorkItemTitle.value &&
        domInpWorkItemQty.value &&
        domInpWorkItemCost.value
      ) {
        domBtnConfirm.removeAttribute('disabled');
      } else {
        domBtnConfirm.setAttribute('disabled', '');
      }
    };

    domBtnConfirm.onclick = () => {
      const workItemId = Date.now();
      const workItemTitle = domInpWorkItemTitle.value;
      const workItemDescription = domInpWorkItemDescription.value;
      const workItemQty = parseInt(domInpWorkItemQty.value);
      const workItemCost = parseInt(domInpWorkItemCost.value);
      const workItemTotal = domWorkItemTotal;

      this.#processDataCallback(
        workItemId,
        workItemTitle,
        workItemDescription,
        workItemQty,
        workItemCost,
        workItemTotal,
      );
    };

    return div.children[0];
  }
}

export default PopupWorkItem;
