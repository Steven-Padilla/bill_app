import { BillDetails } from './billdetails';
import { Stakeholder } from './stakeholder';

export class Bill {
  id: number;
  invoice: number;
  serialNumber: number;
  date: string;
  paymentType: string;
  total: number;

  receiver: Stakeholder;
  issuing: Stakeholder;
  billDetails: BillDetails[];

  constructor(
    id: number,
    invoice: number,
    serialNumber: number,
    date: string,
    paymentType: string,
    total: number,
    receiver: Stakeholder,
    issuing: Stakeholder,
    billDetails: BillDetails[]
  ) {
    this.id = id;
    this.invoice = invoice;
    this.serialNumber = serialNumber;
    this.date = date;
    this.paymentType = paymentType;
    this.total = total;
    this.receiver = receiver;
    this.issuing = issuing;
    this.billDetails = billDetails;
  }

  public static get getEmtyBill(): Bill {
    return new Bill(
      -1,
      -1,
      -1,
      '',
      '',
      -1,
      new Stakeholder(-1, '', '', ''),
      new Stakeholder(-1, '', '', ''),
      []
    );
  }
}
