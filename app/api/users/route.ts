import db from '@/lib/db';

export async function GET() {
  const INDEX_NAME = 'users';
  const id = 'user123';

  const response = await db.get({
    index: INDEX_NAME,
    id: id,
  });

  if (response.found) {
    // eslint-disable-next-line no-underscore-dangle
    return new Response(JSON.stringify(response._source), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: `User with ID '${id}' not found.`, status: 404 }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
