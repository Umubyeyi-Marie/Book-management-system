// src/app/book/create/page.tsx
"use client";

import BookForm from '../../../components/BookForm';
import Sidebar from '../../../components/Sidebar';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateBookPage() {
  const router = useRouter();

  const handleCreate = async (bookData: any) => {
    await axios.post('http://localhost:3001/api/v1/books', bookData);
    router.push('/book');
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-grow p-4">
        <button
          onClick={() => router.push('/book')}
          className="mb-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back to Books
        </button>
        <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
        <BookForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}