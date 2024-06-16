import { Product } from "./product";

export interface BuyCartItem {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
}
