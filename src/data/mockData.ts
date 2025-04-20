import { FoodItem } from '../types';

export const mockFoodItems: FoodItem[] = [
  // reackfast
  
    // === BREAKFAST ===
    {
      "id": "1",
      "name": "Cornflakes, Hot Milk, Banana, Tea",
      "description": "Healthy breakfast with cornflakes, banana, and hot milk.",
      "price": 40,
      "category": "breakfast",
      "type": "veg",
      "available": true,
      "image": "/img/1.jpg"
    },
    {
      "id": "2",
      "name": "Roti, Sabji, Sweet, Tea",
      "description": "Traditional Indian breakfast with chapati, vegetables, sweet and tea.",
      "price": 50,
      "category": "breakfast",
      "type": "veg",
      "available": true,
      "image": "/img/2.jpg"
    },
    {
      "id": "3",
      "name": "Idli, Sambar, Chutney, Tea",
      "description": "South Indian breakfast with idli, sambar, chutney and tea.",
      "price": 45,
      "category": "breakfast",
      "type": "veg",
      "available": true,
      "image": "/img/3.jpg"
    },
  
    // === LUNCH ===
    {
      "id": "4",
      "name": "Khichuri, Labra, Chutney, Papad",
      "description": "Comfort food with khichuri (dal-rice), mixed veg and chutney.",
      "price": 60,
      "category": "lunch",
      "type": "veg",
      "available": true,
      "image": "/img/4.jpg"
    },
    {
      "id": "5",
      "name": "Rice, Tomato Dal, Aloo Jhinge Posto, Fish Curry/Dal Boda Curry",
      "description": "Bengali-style lunch with fish or dal boda curry, rice and sabji.",
      "price": 85,
      "category": "lunch",
      "type": "non-veg",
      "available": true,
      "image": "/img/5.jpg"
    },
    {
      "id": "6",
      "name": "Rice, Dal, Mix Veg, Soyabean Curry",
      "description": "Vegetarian lunch with dal, mix veg, and soyabean curry.",
      "price": 70,
      "category": "lunch",
      "type": "veg",
      "available": true,
      "image": "/img/6.jpg"
    },
    {
      "id": "7",
      "name": "Rice, Dal, Seasonal Veg, Chicken Curry",
      "description": "Hearty lunch with chicken curry, rice and dal.",
      "price": 90,
      "category": "lunch",
      "type": "non-veg",
      "available": true,
      "image": "/img/7.jpg"
    },
    {
      "id": "8",
      "name": "Special Lunch (Paneer/Non-Veg)",
      "description": "Special menu including paneer or non-veg items.",
      "price": 100,
      "category": "lunch",
      "type": "veg",
      "available": true,
      "image": "/img/8.jpg"
    },
  
    // === SNACKS ===
    {
      "id": "9",
      "name": "Veg Sandwich / Chicken Sandwich, Tea",
      "description": "Light snack with a sandwich and tea.",
      "price": 35,
      "category": "snack",
      "type": "veg",
      "available": true,
      "image": "/img/9.jpg"
    },
    {
      "id": "10",
      "name": "Dabeli, Tea",
      "description": "Spicy Gujarati-style potato snack served with tea.",
      "price": 30,
      "category": "snack",
      "type": "veg",
      "available": true,
      "image": "/img/10.jpg"
    },
    {
      "id": "11",
      "name": "Pav Bhaji, Tea",
      "description": "Evening snack of pav bhaji with tea.",
      "price": 40,
      "category": "snack",
      "type": "veg",
      "available": true,
      "image": "/img/11.jpg"
    },
  
    // === DINNER ===
    {
      "id": "12",
      "name": "Rice / Roti, Dal, Seasonal Veg, Egg Curry / Veg Kofta Curry",
      "description": "Dinner combo with rice or roti, dal and a curry.",
      "price": 70,
      "category": "dinner",
      "type": "veg",
      "available": true,
      "image": "/img/12.jpg"
    },
    {
      "id": "13",
      "name": "Special Dinner (Paneer/Non-Veg Special)",
      "description": "Chef’s special dinner combo with seasonal varieties.",
      "price": 100,
      "category": "dinner",
      "type": "veg",
      "available": true,
      "image": "/img/13.jpg"
    }
    

  
];

export const adminUser = {
  id: '2004',
  name: 'Suvanar Pramanik',
  role: 'admin' as const,
};