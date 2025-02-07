import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'koprfd8a', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  apiVersion: '2023-01-01', // Specify the API version you want to use
  useCdn: true,
  token: 'ske6miMVTCpdgBjy8vTl9IBmPBZJ0ykOIWlfby0ycDMOXVq5tRSQJ8aywym7P4P3UyshIMyMLUY1lu2yww9Twlmg13K8wPI7irasbVecsEmDe1j3uLgnjUJ5EwmdLdX6Jwaw8ahP0kuU8atkqPYbV9l2PJ5ijFuq6wOHopiH9Yf1CMq3DOWZ', // Replace with your Sanity API token
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Function to get the image URL from the Sanity image object
export const urlFor = (source: any) => builder.image(source);

export default client;
