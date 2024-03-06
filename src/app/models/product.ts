export interface Product {
    id: number
    title: string
    price: number
    description: number,
    category: string,
    image: string
    rating: Rate,
}
interface Rate {
    rate: number
    count: number
}