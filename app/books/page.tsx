import { getAllBooks, getAllAuthors } from '@/lib/data';
import { delay } from '@/lib/delay';
import BooksClient from '@/components/BooksClient';

export default async function BooksPage() {
  await delay(800);
  const books = getAllBooks();
  const authors = getAllAuthors();

  return <BooksClient initialBooks={books} authors={authors} />;
}
