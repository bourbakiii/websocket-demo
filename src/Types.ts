export interface ITrade{
    id: string,
    type: string,
    pair: string,
    price: string,
    quantity: string,
    buyerId: string,
    sellerId: string,
    time: string
}
export interface INonHandledTrade{
    t: string
    e: string,
    s: string,
    p: string,
    q: string,
    b: string,
    a: string,
    T: number
}