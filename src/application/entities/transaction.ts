import { Replace } from "@helpers/replace"
import { randomUUID } from "node:crypto"
export interface TransactionModel {
  senderId: string
  receiverId: string
  amount: number
  status?: string
  createdAt: Date
}

export class Transaction {
  private _id: string;
  private props: TransactionModel;

  constructor(
    props: Replace<TransactionModel, { status?: string, createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? 'pending',
      amount: props.amount ?? 0,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set senderId(senderId: string) {
    this.props.senderId = senderId;
  }

  public get senderId(): string {
    return this.props.senderId;
  }

  public set receiverId(receiverId: string) {
    this.props.receiverId = receiverId;
  }

  public get receiverId(): string {
    return this.props.receiverId;
  }

  public set amount(amount: number) {
    this.props.amount = amount;
  }

  public get amount() {
    return this.props.amount;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get status(): string {
    return this.props.status ?? "pending";
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
