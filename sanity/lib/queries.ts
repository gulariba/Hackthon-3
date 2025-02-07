import { groq } from 'next-sanity';

// Query for all products
export const allProducts = groq`*[_type == "product"]`;

// Query for the first 4 products
export const four = groq`*[_type == "product"][0...4]`; // Adjusted slicing notation for clarity
