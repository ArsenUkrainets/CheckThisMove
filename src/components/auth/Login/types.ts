export enum AuthActionTypes {
    LOGIN_AUTH ="LOGIN_AUTH"
}

export interface ILoginModel {
    email: string;
    password: string;
}

export interface ILoginResult {
    access_token: string
}