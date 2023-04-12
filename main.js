import 'uno.css';
import '@unocss/reset/tailwind.css';
import DOM from './src/constants/dom.js';

const Tags = ['Web', 'Update', 'Design', 'Content', 'Toasty!!!'];

class TaskVO {
  constructor(title, date, tag) {
    this.title = title;
    this.date = date;
    this.tag = tag;
  }
}

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);
const createDOM = (id) => document.createElement(id);

const domTask = getDOM(DOM.Template.TASK);

const tasks = [];

const domListOfTags = getDOM(DOM.Popup.INPUT.LIST_OF_TAGS);
Object.entries(Tags).forEach(([key, value]) => {
  console.log(key, value);
  const option = createDOM('option');
  option.value = key;
  option.textContent = value;
  domListOfTags.appendChild(option);
  console.log(domListOfTags.value);
});

getDOM(DOM.Button.CREATE_TASK).onclick = () => {
  console.log('> domPopupCreateTask.classList');

  const domPopupCreateTask = getDOM(DOM.Popup.CREATE_TASK);
  const domBtnClose = QUERY(
    domPopupCreateTask,
    DOM.Button.CLOSE_POPUP_CREATE_TASK,
  );
  const domBtnConfirm = QUERY(
    domPopupCreateTask,
    DOM.Button.POPUP_CREATE_TASK_CONFIRM,
  );

  domPopupCreateTask.classList.remove('hidden');

  const domPopupTaskTitle = QUERY(
    domPopupCreateTask,
    DOM.Popup.INPUT.TASK_TITLE,
  );
  const domPopupTaskDate = QUERY(
    domPopupCreateTask,
    DOM.Popup.INPUT.TASK_END_DATE,
  );

  const domPopupTaskTags = QUERY(
    domPopupCreateTask,
    DOM.Popup.INPUT.LIST_OF_TAGS,
  );

  const domTaskFields = QUERY(domPopupCreateTask, DOM.Popup.FIELDS_OF_TASK);

  const validateMsg = createDOM('span');
  validateMsg.textContent = 'Task title, end date and tags must be filled';
  validateMsg.classList.add(
    'hidden',
    'text-sm',
    'text-red-600',
    'font-bold',
    'px-1',
  );
  domTaskFields.appendChild(validateMsg);

  const validateMsgHidden = () => validateMsg.classList.add('hidden');

  domPopupTaskTitle.oninput = () => validateMsgHidden();
  domPopupTaskDate.oninput = () => validateMsgHidden();

  console.log('domPopupTaskTags', domPopupTaskTags);

  domPopupTaskTags.onchange = (e) => {
    const option = domPopupTaskTags.querySelector(
      `[value="${domPopupTaskTags.value}"]`,
    );
    console.log(domPopupTaskTags.value, option);
    option.classList.add('bg-red-100');
    console.log(typeof 'domPopupTaskTags.value');
    validateMsgHidden();
  };

  const onClosePopup = () => {
    domPopupCreateTask.classList.add('hidden');
    domBtnClose.onclick = null;
    domBtnConfirm.onclick = null;
  };

  //domBtnClose.onclick = onClosePopup();
  domBtnClose.onclick = () => {
    domPopupCreateTask.classList.add('hidden');
    domBtnClose.onclick = null;
    domBtnConfirm.onclick = null;
    validateMsg.remove();
  };

  domBtnConfirm.onclick = () => {
    console.log('task title', domPopupTaskTitle.value);
    console.log('task date', domPopupTaskDate.value);
    console.log('task tag id', domPopupTaskTags.value);

    if (
      domPopupTaskTitle.value &&
      domPopupTaskDate.value &&
      domPopupTaskTags.value
    ) {
      const tagId = parseInt(domPopupTaskTags.value);
      console.log(typeof tagId);
      const taskVO = new TaskVO(
        domPopupTaskTitle.value,
        domPopupTaskDate.value,
        Tags[tagId],
      );
      const taskView = domTask.cloneNode(true);

      QUERY(taskView, DOM.Template.Task.TITLE).innerText = taskVO.title;
      QUERY(taskView, DOM.Template.Task.DATE).innerText = taskVO.date;
      QUERY(taskView, DOM.Template.Task.TAG).innerText = taskVO.tag;
      domTask.parentNode.prepend(taskView);
      tasks.push(taskVO);
      console.log('confirm', TaskVO);
      onClosePopup();
    } else {
      validateMsg.classList.remove('hidden');
    }
  };
};
