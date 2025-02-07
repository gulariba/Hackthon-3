import { type SchemaTypeDefinition } from 'sanity'
import Product from './Product'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product], // Add the product schema to the types array
}
