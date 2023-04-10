import 'uno.css';
import '@unocss/reset/tailwind.css';
import DOM from './src/constants/dom.js';
import { randomString } from './src/utils/stringUtils.js';

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

  const domPopupTaskTags = getDOM(DOM.Popup.INPUT.SELECTED_TAG);

  const domNewTaskForm = QUERY(domPopupCreateTask, DOM.Popup.VALIDATION);

  const validateMsg = createDOM('span');
  validateMsg.textContent = 'Task title, end date and tags must be filled';
  validateMsg.classList.add(
    'hidden',
    'text-sm',
    'text-red-600',
    'font-bold',
    'px-1',
  );
  domNewTaskForm.appendChild(validateMsg);

  domPopupTaskTitle.oninput = () => {
    validateMsg.classList.add('hidden');
  };
  domPopupTaskDate.oninput = () => {
    validateMsg.classList.add('hidden');
  };
  // domPopupTaskTags.oninput = () => {
  //   console.log(domPopupTaskTags.value);
  //   validateMsg.classList.add('hidden');
  // };

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
  };

  domBtnConfirm.onclick = () => {
    console.log(domPopupTaskTitle.value);
    console.log(domPopupTaskDate.value);
    console.log(domPopupTaskTags);
    if (domPopupTaskTitle.value && domPopupTaskDate.value) {
      const taskVO = new TaskVO(
        domPopupTaskTitle.value,
        domPopupTaskDate.value,
        Tags[0],
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
