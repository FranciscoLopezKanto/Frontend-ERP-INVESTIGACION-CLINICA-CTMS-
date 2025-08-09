export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    age: number;
    rut: string;
    address: string;
    phone: string;
    birthdate: string;
    area: string;
    position: string;
    role: string;
    date_incorporation: string;
    requiredDocuments: RequiredDocument[]; 

}   
export interface RequiredDocument {
  name: string;
  url?: string;
  createdAt?: string;
  expirationDate?: string;
  notApplicable?: boolean;
}

export interface IUpdateUser {
    email?: string;
    password?: string;
    name?: string;
    age?: number;
    rut?: string;
    address?: string;
    phone?: string;
    birthdate?: string;
    area?: string;
    position?: string;
    role?: string;
    date_incorporation?: string;
}   