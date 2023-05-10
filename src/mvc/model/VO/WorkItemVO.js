class WorkItemVO {
  static fromJSON(json) {
    return new WorkItemVO(
      json.items.id,
      json.items.title,
      json.items.description,
      json.items.qty,
      json.items.cost,
    );
  }

  constructor(id, title, description, qty, cost) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.qty = qty;
    this.cost = cost;
  }
}

export default WorkItemVO;
