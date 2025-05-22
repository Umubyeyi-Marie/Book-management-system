// src/app/book/page.tsx
import axios from 'axios';
import BookList from '../../components/BookList';
import Sidebar from '../../components/Sidebar';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
}

async function getBooks(): Promise<Book[]> {
  const response = await axios.get('http://localhost:3001/api/v1/books');
  return response.data;
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-grow p-4">
        <BookList books={books} />
      </div>
    </div>
  );
}