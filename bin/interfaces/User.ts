export interface IUser {
    "id": string,
    "index": number,
    "guid": string,
    "isActive": boolean,
    "balance": string,
    "picture": string,
    "age": number,
    "eyeColor": string,
    "firstName": string,
    "lastName": string,
    "username": string,
    "encryptedPass"?: string,
    "company": string,
    "email": string,
    "phone": string,
    "address": string,
    "about": string,
    "registered": string,
    "latitude": string,
    "longitude": string,
    "tags": string[],
    "range": number[],
    "friends": IFriend[],
    "greeting": string,
    "favoriteFruit": string
}

export interface IFriend {
    "id": number,
    "name": string
}