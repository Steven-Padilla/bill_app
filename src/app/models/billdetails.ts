export class BillDetails {
  id: number;
  item: string;
  quantity: number;
  singlePrice: number;
  description: string;
  total: number;

  constructor(
    id: number,
    item: string,
    quantity: number,
    singlePrice: number,
    description: string,
    total: number
  ) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this.singlePrice = singlePrice;
    this.description = description;
    this.total = total;
  }
}
