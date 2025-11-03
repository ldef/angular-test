import { Injectable } from "@angular/core";

import { Product } from "../features/product/model/product";

@Injectable({
  providedIn: 'root',
})
export class MockService {
createDb() {
    const products: Product[] = [
        { id: 1, name: 'Lego', description: 'Lego Star Wars', price: 10.0 },
        { id: 2, name: 'Action Figure', description: 'Superhero Action Figure', price: 15.5 },
        { id: 3, name: 'Puzzle', description: '1000-piece Jigsaw Puzzle', price: 8.75 },
        { id: 4, name: 'Board Game', description: 'Strategy Board Game', price: 20.0 },
        { id: 5, name: 'Doll', description: 'Fashion Doll', price: 12.0 },
        { id: 6, name: 'RC Car', description: 'Remote Control Car', price: 25.0 },
        { id: 7, name: 'Stuffed Animal', description: 'Plush Teddy Bear', price: 9.5 },
        { id: 8, name: 'Building Blocks', description: 'Wooden Building Blocks Set', price: 14.0 },
        { id: 9, name: 'Educational Toy', description: 'Alphabet Learning Toy', price: 11.0 },
        { id: 10, name: 'Outdoor Toy', description: 'Frisbee', price: 7.0 }
    ];
    return {products};
  }
}