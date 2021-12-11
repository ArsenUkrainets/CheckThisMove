export interface IRegisterModel {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IRegisterResult {
    access_token: string
}