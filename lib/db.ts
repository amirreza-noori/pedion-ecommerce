import { Client } from '@elastic/elasticsearch';

const db = new Client({
  node: process.env.NEXT_ELASTIC_NODE_URL,
  auth: {
    username: process.env.ELASTIC_USERNAME || '',
    password: process.env.ELASTIC_PASSWORD || '',
  },
});

export default db;
