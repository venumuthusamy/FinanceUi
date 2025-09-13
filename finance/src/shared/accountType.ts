export enum AccountType {
  Debit = 1,
  Credit = 2
}
export const AccountTypeList = [
  { value: AccountType.Debit, label: 'Debit(+)' },
  { value: AccountType.Credit, label: 'Credit(-)' }
];