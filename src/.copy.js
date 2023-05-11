import 'uno.css';
import '@unocss/reset/tailwind.css';
import DOM from './src/constants/dom';
import {delay} from './src/utils/timeUtils.js';
import TasksModel from './src/mvc/model/TasksModel';
import TaskVO from './src/mvc/model/VO/TaskVO.js';
import TasksController from './src/mvc/controller/TasksController.js';
import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

const KEY_LOCAL_TASKS = 'tasks';

const Tags = ['Web', 'Update', 'Design', 'Content'];

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(DOM.Template.TASK);
const domTaskColumn = domTemplateTask.parentNode;
domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

const tasksModel = new TasksModel();
const tasksController = new TasksController(tasksModel);

function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, DOM.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
  return domTaskClone;
}

const snowToastWithText = (text) => {
  Toastify({
    text,
    duration: 2000,
    close: true,
  }).showToast();
};

async function main() {
  tasksModel.addUpdateCallback((tasks) => {
    console.log('> UpdateCallback');
    domTaskColumn.innerHTML = '';
    tasks.forEach((taskVO) => renderTask(taskVO));
    console.log('> tasks:', tasks);
  });
  tasksController
    .retrieveTasks()
    .then(() => {
    })
    .catch((e) => {
    });

  const taskOperations = {
    [DOM.Button.CREATE_TASK]: () => {
      renderTaskPopup(
        null,
        'Create task',
        'Create',
        (taskTitle, taskDate, taskTags) => {
          console.log('> Create task -> On Confirm');
          tasksController
            .createTask(taskTitle, taskDate, taskTags)
            .then((taskVO) => {
              console.log('> Create task -> On Confirm: Success');
              snowToastWithText(`Your task "${taskVO.title}" created`);
            })
            .catch((error) => {
              console.log('> Create task -> On Confirm: Error =', error);
              window.alert(`Error on server: ${error.toString()}`);
            });
        },
      );
    },
    [DOM.Template.Task.BTN_DELETE]: (taskId) => {
      const taskVO = tasksModel.getTaskById(taskId);
      renderTaskPopup(
        taskVO,
        'Confirm Delete task',
        'Delete',
        (taskTitle, taskDate, taskTags) => {
          console.log('> Delete task -> On Confirm', {
            taskTitle,
            taskDate,
            taskTag: taskTags,
          });
          tasksController
            .deleteTask(taskId)
            .then(() => {
              console.log('> Delete task -> On Confirm: Deleted');
              snowToastWithText(`Your task "${taskId.title}" deleted`);
            })
            .catch();
        },
      );
    },
    [DOM.Template.Task.BTN_EDIT]: (taskVO, domTask) => {
      renderTaskPopup(
        taskVO,
        'Update task',
        'Update',
        (taskTitle, taskDate, taskTags) => {
          console.log('> Update task -> On Confirm', {
            taskTitle,
            taskDate,
            taskTag: taskTags,
          });
          taskVO.title = taskTitle;
          const domTaskUpdated = renderTask(taskVO);
          domTaskColumn.replaceChild(domTaskUpdated, domTask);
          saveTask();
        },
      );
    },
  };

  domTaskColumn.onclick = (e) => {
    e.stopPropagation();
    console.log('domTaskColumn', e.target);
    const domTaskElement = e.target;
    const taskBtn = domTaskElement.dataset.btn;

    const isNotTaskBtn = !taskBtn;
    if (isNotTaskBtn) return;

    const allowedButtons = [
      DOM.Template.Task.BTN_EDIT,
      DOM.Template.Task.BTN_DELETE,
    ];
    if (!allowedButtons.includes(taskBtn)) return;

    let taskId;
    let domTask = domTaskElement;
    do {
      domTask = domTask.parentNode;
      taskId = domTask.dataset.id;
    } while (!taskId);

    const taskOperation = taskOperations[taskBtn];
    if (taskOperation) {
      taskOperation(taskId);
    }
  };

  getDOM(DOM.Button.CREATE_TASK).addEventListener('click', (e) =>
    taskOperations[DOM.Button.CREATE_TASK](),
  );

  async function renderTaskPopup(
    taskVO,
    popupTitle,
    confirmText,
    processDataCallback,
  ) {
    const domPopupContainer = getDOM(DOM.Popup.CONTAINER);
    const domSpinner = domPopupContainer.querySelector('.spinner');

    domPopupContainer.classList.remove('hidden');

    const onClosePopup = () => {
      domPopupContainer.children[0].remove();
      domPopupContainer.append(domSpinner);
      domPopupContainer.classList.add('hidden');
      document.onkeyup = null;
    };

    const TaskPopup = (await import('./src/mvc/view/popup/TaskPopup')).default;
    const taskPopupInstance = new TaskPopup(
      popupTitle,
      Tags,
      confirmText,
      (taskTitle, taskDate, taskTags) => {
        console.log('Main -> renderTaskPopup: confirmCallback', {
          taskTitle,
          taskDate,
          taskTags,
        });
        processDataCallback(taskTitle, taskDate, taskTags);
        onClosePopup();
      },
      onClosePopup,
    );

    if (taskVO) {
      taskPopupInstance.taskTitle = taskVO.title;
    }

    delay(1000).then(() => {
      console.log('render 1');
      domSpinner.remove();
      document.onkeyup = (e) => {
        if (e.key === 'Escape') {
          onClosePopup();
        }
      };

      domPopupContainer.append(taskPopupInstance.render());
    });
    console.log('render 0');
  }

  function saveTask() {
    localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
  }
}

await main();