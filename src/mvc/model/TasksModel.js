import taskVO from './VO/TaskVO.js';

class TasksModel {
  #tasks = [];
  #updateCallbacks = [];

  constructor() {
  }

  set tasks(value) {
    this.#tasks = value;
    this.#notify();
  }

  #notify() {
    this.#updateCallbacks.forEach((c) => c(this.#tasks));
  }

  addUpdateCallback(UpdateCallback) {
    if (!UpdateCallback || !(UpdateCallback instanceof Function)) {
      throw new Error(`Wrong callback: ${UpdateCallback}`);
    }
    this.#updateCallbacks.push(UpdateCallback);
  }

  getTaskById(id) {
    const taskId = parseInt(id);
    const taskVO = this.#tasks.find((task) => task.id === taskId);
    console.log('> TaskModel > taskVO:', taskVO);
    return taskVO;
  }

  deleteTaskById(taskId) {
    console.log('> TaskModel -> deleteTaskById', taskId);
    const index = this.#tasks.findIndex((taskVO) => taskVO.id === taskId);
    this.#tasks.splice(index, 1);
    this.#notify();
    // this.tasks = this.#tasks.filter((taskVO) => taskVO.id !== taskId);
  }

  addTask(taskVO) {
    console.log('> TaskModel > addTask:', taskVO);
    this.#tasks.push(taskVO);
    this.#notify();
  }

  updateTaskById(taskId, data) {
    console.log('> TaskModel > updateTaskById:', { taskId, data });
    const taskVO = this.getTaskById(taskId);
    Object.assign(taskVO, data);
    this.#notify();
  }
}

export default TasksModel;
