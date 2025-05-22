// src/components/BookList.tsx
"use client";

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      await axios.delete(`http://localhost:3001/api/v1/books/${id}`);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book Collection</h1>
        <button
          onClick={() => router.push('/book/create')}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span className="mr-2">+</span> Add New Book
        </button>
      </div>
      <table className="bg-white shadow-md rounded-md w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">ISBN</th>
            <th className="p-4 text-left">Published</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id || index} className="border-b">
              <td className="p-4">{book.title}</td>
              <td className="p-4">{book.author}</td>
              <td className="p-4">{book.isbn}</td>
              <td className="p-4">{book.publishedYear}</td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => router.push(`/books/${book.id}`)}
                  className="text-blue-500"
                >
                  📖
                </button>
                <button
                  onClick={() => router.push(`/books/edit/${book.id}`)}
                  className="text-green-500"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;