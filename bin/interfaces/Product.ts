export interface IProduct {
    "_id": string,
    "index": number,
    "isAvailable": boolean,
    "productName": string,
    "price": string,
    "picture": string,
    "color": string,
    "company": string,
    "address": string,
    "about": string,
    "produced": string,
    "amount": number,
    "reviews": IReview[]
}

export interface IReview {
    "_id": string,
    "review": string,
    "rating": number
}