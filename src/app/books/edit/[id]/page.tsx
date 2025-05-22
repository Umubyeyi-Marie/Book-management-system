// src/app/book/edit/[id]/page.tsx
"use client";

import BookForm from '../../../../components/BookForm';
import Sidebar from '../../../../components/Sidebar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from 'react'; // Import use from React

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  isbn: string;
  publishedYear: number;
}

export default function EditBookPage({ params }: { params: { id: Promise<string> } }) {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap the params Promise using React.use
  const id = use(params.id);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async (bookData: any) => {
    await axios.put(`http://localhost:3001/api/v1/books/${id}`, bookData);
    router.push('/book');
  };

  if (loading) return <div className="flex-grow p-4">Loading...</div>;

  return (
    <div className="flex">
      <div className="flex-grow p-4">
        <button
          onClick={() => router.push('/books')}
          className="mb-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back to Books
        </button>
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold">{book?.title}</h1>
          <span className="ml-2 text-sm text-gray-500">Edit</span>
        </div>
        {book && <BookForm onSubmit={handleUpdate} initialData={book} />}
        <p className="text-sm text-gray-500 mt-2">Book ID: {id}</p>
      </div>
    </div>
  );
}