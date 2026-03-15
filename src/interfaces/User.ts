export default interface User{
    id: string;
    name: string;
    surname: string
    email: string;
    birth: Date;
    roles: [{ id: string, name: string }];
}