export class User {
    public static createFromJSON(jsonStr: string): User {
        let jsonObj = JSON.parse(jsonStr);
        let user = new User(jsonObj.login);
        return user;
    }

    public static serializeToJSON(user: User) {
        return JSON.stringify(user);
    }

    constructor(public login: string) { }
}
