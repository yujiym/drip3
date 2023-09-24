import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const price = searchParams.get('price');
  const image = searchParams.get('image');
  const owner = searchParams.get('owner');
  const cid = searchParams.get('cid');
  const tokenId = searchParams.get('tokenId');

  try {
    await sql`INSERT INTO products (title, description, price, image, cid, tokenId, owner)  VALUES (${title}, ${description}, ${price}, ${image}, ${cid}, ${tokenId}, ${owner});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const products = await sql`SELECT * FROM products;`;
  return NextResponse.json({ products }, { status: 200 });
}
