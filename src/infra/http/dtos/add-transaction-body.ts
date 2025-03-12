import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddTransactionBody {
  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  receiverId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}