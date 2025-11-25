export interface SosContactDTO {
  name: string;
  phone: string;
  relation?: string;
}

export interface SaveSosContactsReqDTO {
  userId: string;
  contact: SosContactDTO;
}

export interface SaveSosContactsResDTO {
  userId: string;
  contacts: SosContactDTO[];
}
