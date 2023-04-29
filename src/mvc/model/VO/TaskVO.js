class TaskVO {
  static fromJSON(json) {
    return new TaskVO(
      json.id,
      json.title,
      json.description,
      json.date,
      json.tag,
    );
  }

  constructor(id, title, description, date, tag) {
    this.id = id;
    this.title = title;
    this.description = description || 'no description';
    this.date = date;
    this.tag = tag;
  }
}

export default TaskVO;
