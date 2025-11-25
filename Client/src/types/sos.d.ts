export interface SosContactDTO {
  name: string;
  phone: string;
  relation?: string;
}

export interface SosContactsResDTO {
  userId: string;
  contacts: SosContactDTO[];
}
