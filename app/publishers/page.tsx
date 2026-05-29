import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';
import PublishersClient from '@/components/PublishersClient';

export default function PublishersPage() {
  const publishers = getAllPublishers();
  const bookCounts = Object.fromEntries(
    publishers.map((p) => [p.id, getBooksByPublisherId(p.id).length])
  );

  return <PublishersClient publishers={publishers} bookCounts={bookCounts} />;
}
