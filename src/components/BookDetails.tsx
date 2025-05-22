// src/components/BookDetail.tsx
import React from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  isbn: string;
  publishedYear: number;
}

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <h2 className="text-lg font-semibold">by {book.author}</h2>
      <p className="mt-2">ISBN: {book.isbn}</p>
      <p className="mt-1">Published Year: {book.publishedYear}</p>
      {book.description && <p className="mt-2">{book.description}</p>}
      <p className="mt-2 text-sm text-gray-500">Book ID: {book.id}</p>
    </div>
  );
};

export default BookDetail;