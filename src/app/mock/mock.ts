import { Injectable } from "@angular/core";
import { RequestInfo } from "angular-in-memory-web-api";

import { Product } from "../features/product/model/product";

/**
 * Generic mock service for angular-in-memory-web-api
 * 
 * Features:
 * - Automatic pagination for all collections via query params (page, pageSize)
 * - Standardized response format: { items: T[], total: number }
 * - Support for requests by ID (default behavior)
 * 
 * To add a new entity:
 * 1. Create the model interface
 * 2. Add the collection in createDb(): return { products, users, orders, ... }
 * 3. Pagination will work automatically
 * 
 * Example usage in a service:
 * ```
 * getItems(page: number, pageSize: number): Observable<Paginated<MyEntity>> {
 *   const params = new HttpParams()
 *     .set('page', page.toString())
 *     .set('pageSize', pageSize.toString());
 *   return this.http.get<Paginated<MyEntity>>('/api/myentities', { params });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class MockService {
createDb() {
    const products: Product[] = [
        { id: 1, name: 'Lego Star Wars', description: 'Ultimate Collector Series', price: 10.0 },
        { id: 2, name: 'Action Figure', description: 'Superhero Action Figure', price: 15.5 },
        { id: 3, name: 'Puzzle', description: '1000-piece Jigsaw Puzzle', price: 8.75 },
        { id: 4, name: 'Board Game', description: 'Strategy Board Game', price: 20.0 },
        { id: 5, name: 'Doll', description: 'Fashion Doll', price: 12.0 },
        { id: 6, name: 'RC Car', description: 'Remote Control Car', price: 25.0 },
        { id: 7, name: 'Stuffed Animal', description: 'Plush Teddy Bear', price: 9.5 },
        { id: 8, name: 'Building Blocks', description: 'Wooden Building Blocks Set', price: 14.0 },
        { id: 9, name: 'Educational Toy', description: 'Alphabet Learning Toy', price: 11.0 },
        { id: 10, name: 'Outdoor Toy', description: 'Frisbee', price: 7.0 },
        { id: 11, name: 'Video Game', description: 'Latest Adventure Game', price: 59.99 },
        { id: 12, name: 'NERF Gun', description: 'Foam Dart Blaster', price: 22.0 },
        { id: 13, name: 'Drone', description: 'Mini Camera Drone', price: 89.99 },
        { id: 14, name: 'Skateboard', description: 'Professional Skateboard', price: 45.0 },
        { id: 15, name: 'Robot Kit', description: 'Programmable Robot', price: 75.0 },
        { id: 16, name: 'Art Set', description: 'Complete Painting Set', price: 28.5 },
        { id: 17, name: 'Science Kit', description: 'Chemistry Lab Set', price: 35.0 },
        { id: 18, name: 'Magic Set', description: 'Beginner Magic Tricks', price: 18.0 },
        { id: 19, name: 'Lego City', description: 'Police Station Set', price: 65.0 },
        { id: 20, name: 'Barbie Dreamhouse', description: 'Luxury Dollhouse', price: 120.0 },
        { id: 21, name: 'Hot Wheels Track', description: 'Ultimate Garage', price: 55.0 },
        { id: 22, name: 'Play-Doh Set', description: 'Creative Color Pack', price: 15.0 },
        { id: 23, name: 'Monopoly', description: 'Classic Board Game', price: 25.0 },
        { id: 24, name: 'Chess Set', description: 'Wooden Chess Board', price: 32.0 },
        { id: 25, name: 'Telescope', description: 'Beginner Astronomy Kit', price: 85.0 },
        { id: 26, name: 'Musical Keyboard', description: 'Electronic Piano', price: 68.0 },
        { id: 27, name: 'Train Set', description: 'Electric Model Train', price: 95.0 },
        { id: 28, name: 'Construction Truck', description: 'Remote Control Excavator', price: 42.0 },
        { id: 29, name: 'Trampoline', description: 'Indoor Mini Trampoline', price: 78.0 },
        { id: 30, name: 'Bicycle', description: 'Kids Mountain Bike', price: 150.0 },
        { id: 31, name: 'Soccer Ball', description: 'Professional Quality', price: 24.0 },
        { id: 32, name: 'Basketball', description: 'Indoor/Outdoor Ball', price: 28.0 },
        { id: 33, name: 'Tennis Racket', description: 'Junior Tennis Set', price: 35.0 },
        { id: 34, name: 'Scooter', description: 'Foldable Kick Scooter', price: 48.0 },
        { id: 35, name: 'Karaoke Machine', description: 'Bluetooth Karaoke Set', price: 62.0 },
        { id: 36, name: 'Digital Camera', description: 'Kids Camera with Filters', price: 38.0 },
        { id: 37, name: 'Tablet for Kids', description: 'Educational Tablet', price: 115.0 },
        { id: 38, name: 'Smartwatch', description: 'Kids Fitness Watch', price: 52.0 },
        { id: 39, name: 'Rubik\'s Cube', description: 'Speed Cube 3x3', price: 12.0 },
        { id: 40, name: 'Card Game Set', description: 'Classic Card Games', price: 16.0 },
        { id: 41, name: 'Dominoes', description: 'Colorful Domino Set', price: 14.0 },
        { id: 42, name: 'Jenga', description: 'Classic Stacking Game', price: 18.0 },
        { id: 43, name: 'Twister', description: 'Party Floor Game', price: 20.0 },
        { id: 44, name: 'Connect 4', description: 'Strategy Drop Game', price: 15.0 },
        { id: 45, name: 'Uno Cards', description: 'Classic Card Game', price: 8.0 },
        { id: 46, name: 'Nerf Arrows', description: 'Bow and Arrow Set', price: 26.0 },
        { id: 47, name: 'Water Gun', description: 'Super Soaker', price: 19.0 },
        { id: 48, name: 'Sandbox Toys', description: 'Beach Toy Set', price: 12.5 },
        { id: 49, name: 'Kite', description: 'Colorful Flying Kite', price: 16.5 },
        { id: 50, name: 'Bubble Machine', description: 'Automatic Bubble Maker', price: 21.0 }
    ];
    return {products};
  }

  get(reqInfo: RequestInfo) {
    const { collectionName, id, query } = reqInfo;
    
    // If a request asks for a specific element (with id), use default behavior
    if (id) {
      return undefined;
    }
    
    // Check if the collection exists in the database
    const db = this.createDb();
    const collection = db[collectionName as keyof typeof db];
    
    if (!collection || !Array.isArray(collection)) {
      return undefined; // Default behavior if the collection doesn't exist
    }
    
    // Generic pagination handling for all collections
    const page = parseInt(query.get('page')?.[0] || '0', 10);
    const pageSize = parseInt(query.get('pageSize')?.[0] || '10', 10);
    
    // Paginate the collection
    const startIndex = page * pageSize;
    const paginatedItems = collection.slice(startIndex, startIndex + pageSize);
    
    // Return paginated data with total
    return reqInfo.utils.createResponse$(() => ({
      body: {
        items: paginatedItems,
        total: collection.length
      },
      status: 200
    }));
  }
}