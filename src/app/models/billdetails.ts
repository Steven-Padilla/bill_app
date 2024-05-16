export class BillDetails {
  id: number;
  item: string;
  quantity: number;
  singlePrice: number;
  description: string;
  total: number;
  details_id: number;

  constructor(
    id: number,
    item: string,
    quantity: number,
    singlePrice: number,
    description: string,
    total: number,
    details_id: number
  ) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this.singlePrice = singlePrice;
    this.description = description;
    this.total = total;
    this.details_id = details_id;
  }
}

export class BillDetailsDTO {
  item: string;
  quantity: number;
  singlePrice: number;
  description: string;
  total: number;
  details_id: number;

  constructor(
    item: string,
    quantity: number,
    singlePrice: number,
    description: string,
    total: number,
    details_id: number
  ) {
    this.item = item;
    this.quantity = quantity;
    this.singlePrice = singlePrice;
    this.description = description;
    this.total = total;
    this.details_id = details_id;
  }
}
