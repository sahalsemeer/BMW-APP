export type Venue = {
  id: string;
  name: string;
  location: string;
  price: number;
  category: string;
  rating: number;
  imageUrl: string;
};

// Mock records for the prototype. Replace this module with the venue API later.
export const mockVenues: Venue[] = [
  {id: 'grand-palace', name: 'Grand Palace Convention Centre', location: 'Kochi', price: 25000, category: 'Convention Hall', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80'},
  {id: 'green-valley', name: 'Green Valley Gardens', location: 'Munnar', price: 15000, category: 'Outdoor Garden', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=80'},
  {id: 'royal-wedding', name: 'Royal Wedding Hall', location: 'Kozhikode', price: 20000, category: 'Wedding Hall', rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80'},
  {id: 'ocean-view', name: 'Ocean View Banquet', location: 'Thiruvananthapuram', price: 18000, category: 'Banquet Hall', rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=80'},
  {id: 'hilltop-resort', name: 'Hilltop Celebration Resort', location: 'Wayanad', price: 22000, category: 'Resort', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'},
  {id: 'elegant-events', name: 'Elegant Events Space', location: 'Thrissur', price: 12000, category: 'Event Space', rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80'},
];
