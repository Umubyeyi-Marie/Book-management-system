// src/components/BookForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BookFormProps {
  onSubmit: (bookData: { title: string; author: string; description: string; isbn: string; publishedYear: number }) => void;
  initialData?: { title: string; author: string; description: string; isbn: string; publishedYear: number };
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState<number | "">("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setDescription(initialData.description || "");
      setIsbn(initialData.isbn || "");
      setPublishedYear(initialData.publishedYear || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !isbn || !publishedYear) {
      alert("Please fill in all required fields");
      return;
    }
    const isbnRegex = /^(?:\d{10}|\d{13})$/;
    if (!isbnRegex.test(isbn)) {
      alert("Please enter a valid ISBN (10 or 13 digits)");
      return;
    }
    const currentYear = new Date().getFullYear();
    if (publishedYear < 1000 || publishedYear > currentYear) {
      alert(`Please enter a valid published year (1000-${currentYear})`);
      return;
    }
    onSubmit({ title, author, description, isbn, publishedYear: Number(publishedYear) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter book title"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="Enter author name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ISBN</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
          placeholder="Enter ISBN number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Published Year</label>
        <input
          type="number"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value ? Number(e.target.value) : "")}
          required
          placeholder="E.g., 2023"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter book description"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => router.push('/book')}
          className="w-full mt-4 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          {initialData ? "Update Book" : "Add Book"}
        </button>
      </div>
    </form>
  );
};

export default BookForm;