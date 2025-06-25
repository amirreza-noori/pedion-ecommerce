/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
const { Client } = require('@elastic/elasticsearch');
const { env } = require('process');

require('dotenv').config({
  path: ['.env', '.env.production', '.env.local'],
  override: true,
});

console.log('ME:', env.NEXT_ELASTIC_NODE_URL);

const client = new Client({
  node: env.NEXT_ELASTIC_NODE_URL,
  auth: {
    username: env.ELASTIC_USERNAME || '',
    password: env.ELASTIC_PASSWORD || '',
  },
});

async function seed() {
  const INDEX_NAME = 'users';

  try {
    const indexExists = await client.indices.exists({ index: INDEX_NAME });

    if (!indexExists) {
      // Index does not exist, create it with mappings
      await client.indices.create({
        index: INDEX_NAME,
        body: {
          mappings: {
            properties: {
              id: { type: 'keyword' }, // For user ID (e.g., from a database or auth provider)
              username: { type: 'text' },
              email: { type: 'keyword' }, // For exact matching and uniqueness
              fullName: { type: 'text' },
              // Add more user-related fields as needed
              createdAt: { type: 'date' },
              updatedAt: { type: 'date' },
            },
          },
        },
      });
      console.log(`Index '${INDEX_NAME}' created successfully.`);

      // Optional: Add some initial data
      await client.index({
        index: INDEX_NAME,
        id: 'user123', // Unique ID for the document
        document: {
          id: 'user123',
          username: 'johndoe',
          email: 'john.doe@example.com',
          fullName: 'John Doe',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        refresh: true, // Make the document immediately searchable
      });
      console.log('Initial user data indexed.');
    } else {
      console.log(`Index '${INDEX_NAME}' already exists.`);
    }
  } catch (error) {
    console.error('Error seeding Elasticsearch:', error);
  }
}

seed();
