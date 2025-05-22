// src/app/book/[id]/page.tsx
import axios from 'axios';
import Sidebar from '../../../components/Sidebar';
import BookDetail from '@/components/BookDetails';
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  isbn: string;
  publishedYear: number;
}

async function getBook(id: string): Promise<Book> {
  try {
    const response = await axios.get(`http://localhost:3001/api/v1/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    throw new Error('Failed to load book data');
  }
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  try {
    const book = await getBook(params.id);

    return (
      <div className="flex">

        <div className="flex-grow p-4">
          <a
            href="/books"
            className="mb-4 text-blue-600 hover:underline flex items-center"
          >
            ← Back to Books
          </a>
          <BookDetail book={book} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex">
        <div className="flex-grow p-4">
          <a
            href="/books"
            className="mb-4 text-blue-600 hover:underline flex items-center"
          >
            ← Back to Books
          </a>
          <div className="text-red-500">
            <h2 className="text-xl font-bold">Error loading book details</h2>
            <p>{(error as Error).message}</p>
          </div>
        </div>
      </div>
    );
  }
}