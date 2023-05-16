import WorkItemVO from "./WorkItemVO.js";

class InvoiceVO {
  static fromJSON(json) {
    return new InvoiceVO(
      json.id,
      json.items?.map((raw) => WorkItemVO.fromJSON(raw)) || [],
      json.discount,
      json.taxes,
      json.total,
      json.iban,
    );
  }

  static createEmpty() {
    return new InvoiceVO(
      '',
      [],
      0,
      0,
      0,
      '',
    )
  }

  constructor(id, items, discount, taxes, total, iban) {
    this.id = id;
    this.items = items;
    this.discount = discount;
    this.taxes = taxes;
    this.total = total;
    this.iban = iban;
  }

}

export default InvoiceVO;
