export interface Payment{
    payment_id: string
    user_id: string;
    amount: number,
    isSpend: boolean;
    amountError: boolean;
    "tx_id": string;
    course_id: string,
    instructor_account: string,
    created_at: Date,
    updated_at: Date,
}