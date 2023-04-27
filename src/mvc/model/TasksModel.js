class TasksModel {
  #tasks = [];
  #updateCallbacks = [];

  constructor() {}

  set tasks(value) {
    this.#tasks = value;
    this.#updateCallbacks.forEach((c) => c(this.#tasks));
  }

  addUpdateCallback(UpdateCallback) {
    if (!UpdateCallback || !(UpdateCallback instanceof Function)) {
      throw new Error(`Wrong callback: ${UpdateCallback}`);
    }
    this.#updateCallbacks.push(UpdateCallback);
  }
}

export default TasksModel;
