import WorkItemVO from "./WorkItemVO.js";

class InvoiceVO {
  static fromJSON(json) {
    return new InvoiceVO(
      json.id,
      json.discount,
      json.taxes,
      json.total,
      json.iban,
    );
  }

  constructor(id, discount, taxes, total, iban) {
    this.id = id;
    // this.items = new WorkItemVO();
    this.discount = discount;
    this.taxes = taxes;
    this.total = total;
    this.iban = iban;
  }
}

export default InvoiceVO;
