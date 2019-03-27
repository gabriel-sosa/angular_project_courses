export interface User {
    info: {
        headers: {
            Authorization: string
        }
    };
    emailAddress: string;
    firstName: string;
    lastName: string;
    password: string
}