export interface Review {
  stars: number;
  text: string;
}

export interface Dorm {
  id: string;
  name: string;
  barangay: string;
  distance: string;
  price: string;
  score: string;
  featured?: boolean;
  wifi: "green" | "yellow" | "red";
  noise: "green" | "yellow" | "red";
  safety: "green" | "yellow" | "red";
  cost: "green" | "yellow" | "red";
  wifiScore: string;
  noiseScore: string;
  safetyScore: string;
  costScore: string;
  image: string;
  lat: number;
  lng: number;
  reviews: Review[];
}

export const dorms: Dorm[] = [
  {
    id: "1",
    name: "LTMPC Boarding House",
    barangay: "Sta. Cruz",
    distance: "0.2 km",
    price: "₱1,500/mo",
    score: "4.9",
    featured: true,
    wifi: "green",
    noise: "green",
    safety: "green",
    cost: "green",
    wifiScore: "4.8",
    noiseScore: "4.7",
    safetyScore: "4.9",
    costScore: "4.9",
    image: "https://lirp.cdn-website.com/f787941c/dms3rep/multi/opt/Single+-+3-1920w.jpg",
    lat: 8.6531,
    lng: 123.4198,
    reviews: [
      { stars: 5, text: "Best boarding house near JRMSU. Very affordable and the management is super helpful. Highly recommended!" },
      { stars: 5, text: "Clean rooms, stable WiFi, and very safe. The landlord responds quickly to all concerns." }
    ]
  },
  {
    id: "2",
    name: "Bagting Residences",
    barangay: "Bagting",
    distance: "0.4 km",
    price: "₱1,400/mo",
    score: "4.5",
    wifi: "green",
    noise: "green",
    safety: "green",
    cost: "green",
    wifiScore: "4.5",
    noiseScore: "4.3",
    safetyScore: "4.6",
    costScore: "4.8",
    image: "https://mommybloggersphilippines.com/wp-content/uploads/2022/06/boardinghouse.jpg",
    lat: 8.6548,
    lng: 123.4212,
    reviews: [
      { stars: 5, text: "Very close to campus and extremely affordable. Perfect for freshmen." },
      { stars: 4, text: "Good value for money. Clean and quiet environment every day." }
    ]
  },
  {
    id: "3",
    name: "Potol Boarding House",
    barangay: "Potol",
    distance: "0.5 km",
    price: "₱2,000/mo",
    score: "4.3",
    wifi: "green",
    noise: "yellow",
    safety: "green",
    cost: "green",
    wifiScore: "4.4",
    noiseScore: "3.8",
    safetyScore: "4.5",
    costScore: "4.2",
    image: "https://i.pinimg.com/originals/ef/7b/db/ef7bdbf873e4cfaaf09abc83de6eb6c6.jpg",
    lat: 8.6512,
    lng: 123.4225,
    reviews: [
      { stars: 4, text: "Nice area near JRMSU. Rooms are spacious and very clean." },
      { stars: 4, text: "Landlady is friendly and accommodating. Great community feel." }
    ]
  },
  {
    id: "4",
    name: "Tagoloan View Dormitory",
    barangay: "Tagoloan",
    distance: "0.6 km",
    price: "₱1,400/mo",
    score: "4.2",
    wifi: "green",
    noise: "green",
    safety: "green",
    cost: "green",
    wifiScore: "4.1",
    noiseScore: "4.3",
    safetyScore: "4.2",
    costScore: "4.5",
    image: "https://i.pinimg.com/originals/73/1b/2d/731b2d2eef652286388a932ff7b22682.jpg",
    lat: 8.6492,
    lng: 123.4178,
    reviews: [
      { stars: 4, text: "Super affordable and quiet. I can study without distractions here." },
      { stars: 4, text: "Safe and clean. Landlord is always available when needed." }
    ]
  },
  {
    id: "5",
    name: "San Pedro Student Residence",
    barangay: "San Pedro",
    distance: "0.7 km",
    price: "₱1,800/mo",
    score: "4.0",
    wifi: "green",
    noise: "yellow",
    safety: "green",
    cost: "yellow",
    wifiScore: "4.3",
    noiseScore: "3.7",
    safetyScore: "4.2",
    costScore: "3.8",
    image: "https://lirp.cdn-website.com/f787941c/dms3rep/multi/opt/triple+-+1-1920w.jpg",
    lat: 8.6562,
    lng: 123.4148,
    reviews: [
      { stars: 4, text: "Rooms are comfortable. WiFi is strong enough for online classes." },
      { stars: 4, text: "Good location. Close to the market and JRMSU campus." }
    ]
  },
  {
    id: "6",
    name: "Polo Dormitory",
    barangay: "Polo",
    distance: "0.8 km",
    price: "₱1,500/mo",
    score: "3.9",
    wifi: "yellow",
    noise: "green",
    safety: "green",
    cost: "green",
    wifiScore: "3.6",
    noiseScore: "4.2",
    safetyScore: "4.0",
    costScore: "4.5",
    image: "https://i.pinimg.com/originals/9d/e2/ac/9de2ac168a7d2b78bf3aba41b1318ca4.jpg",
    lat: 8.6476,
    lng: 123.4203,
    reviews: [
      { stars: 4, text: "Peaceful neighborhood. Great for students who want a quiet study space." },
      { stars: 3, text: "WiFi is average but everything else is good for the price." }
    ]
  },
  {
    id: "7",
    name: "Linabo Boarding House",
    barangay: "Linabo",
    distance: "0.9 km",
    price: "₱2,000/mo",
    score: "4.4",
    wifi: "green",
    noise: "green",
    safety: "green",
    cost: "yellow",
    wifiScore: "4.5",
    noiseScore: "4.4",
    safetyScore: "4.6",
    costScore: "3.9",
    image: "https://img.lamudi.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMTk3NjM3NC1mOTc0LTdhYTktYjIxMC0wNWE4OGZjZjE5NzAvOGEwMzdhYjkzMmE3NTkxZTExNjQ2NGJmMWIzODJmZmJiMTg0NDJjYzAzNTljN2E4NDAwMDBjZTg3NmEzMzY3ZS5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwiZml0IjoiY292ZXIifX19",
    lat: 8.6540,
    lng: 123.4165,
    reviews: [
      { stars: 5, text: "Modern rooms at a reasonable price. Fast WiFi and good security." },
      { stars: 4, text: "Very clean and well-maintained. Management is very professional." }
    ]
  },
  {
    id: "8",
    name: "Miputak Boarding House",
    barangay: "Sicayab",
    distance: "1.1 km",
    price: "₱1,500/mo",
    score: "3.5",
    wifi: "yellow",
    noise: "green",
    safety: "yellow",
    cost: "green",
    wifiScore: "3.2",
    noiseScore: "4.0",
    safetyScore: "3.4",
    costScore: "4.7",
    image: "https://i.pinimg.com/originals/62/c9/84/62c984784dba3437226cadc8e6f62306.jpg",
    lat: 8.6605,
    lng: 123.4128,
    reviews: [
      { stars: 3, text: "Cheapest option near campus. Basic amenities but gets the job done." },
      { stars: 4, text: "Very quiet at night. Good for students who need to focus on studies." }
    ]
  },
  {
    id: "9",
    name: "Sunrise Dormitory",
    barangay: "Banonong",
    distance: "1.2 km",
    price: "₱1,400/mo",
    score: "3.7",
    wifi: "yellow",
    noise: "yellow",
    safety: "green",
    cost: "green",
    wifiScore: "3.4",
    noiseScore: "3.6",
    safetyScore: "4.0",
    costScore: "4.6",
    image: "https://www.hostelz.com/pics/imported/listings/thumbnails/82/5782782.jpg",
    lat: 8.6460,
    lng: 123.4232,
    reviews: [
      { stars: 3, text: "Very budget-friendly. Good enough for a student on a tight budget." },
      { stars: 4, text: "Safe area. Landlord is understanding with payment schedules." }
    ]
  },
  {
    id: "10",
    name: "Rizal Heritage Dormitory",
    barangay: "Tagoloan II",
    distance: "1.4 km",
    price: "₱2,400/mo",
    score: "4.6",
    wifi: "green",
    noise: "green",
    safety: "green",
    cost: "yellow",
    wifiScore: "4.7",
    noiseScore: "4.5",
    safetyScore: "4.8",
    costScore: "4.1",
    image: "https://images.adsttc.com/media/images/6250/3bbc/8e20/9c20/c2cc/ea69/medium_jpg/1-view-of-building.jpg?1649425461",
    lat: 8.6480,
    lng: 123.4172,
    reviews: [
      { stars: 5, text: "Premium boarding house near JRMSU. Worth every peso for the quality." },
      { stars: 4, text: "Modern building, great security, and fast internet. Highly recommended." }
    ]
  }
];
