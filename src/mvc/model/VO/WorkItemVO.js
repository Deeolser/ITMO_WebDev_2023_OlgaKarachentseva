class WorkItemVO {
  constructor(id, title, description, qty, cost, total) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.qty = qty;
    this.cost = cost;
    this.total = total;
  }

  static fromJSON(json) {
    return new WorkItemVO(
      json.id,
      json.title,
      json.description,
      json.qty,
      json.cost,
      json.total,
    );
  }
}

export default WorkItemVO;
