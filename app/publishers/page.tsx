import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';
import { delay } from '@/lib/delay';
import PublishersClient from '@/components/PublishersClient';

export default async function PublishersPage() {
  await delay(800);
  const publishers = getAllPublishers();
  const bookCounts = Object.fromEntries(
    publishers.map((p) => [p.id, getBooksByPublisherId(p.id).length])
  );

  return <PublishersClient publishers={publishers} bookCounts={bookCounts} />;
}
