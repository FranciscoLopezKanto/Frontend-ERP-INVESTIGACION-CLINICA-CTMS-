export interface IAuthPasswordContext {
    email: string;
    newPassword: string;
    confirmPassword: string;
    token: string;
}

export interface IAuthRegisterContext {
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
}

export interface ISplitName {
    firstName: string;
    lastName: string;
    secondLastName?: string;
}

export interface IResetPassword {
    newPassword: string;
    confirmPassword: string;
    token: string;
}