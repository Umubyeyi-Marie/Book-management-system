// src/components/Sidebar.tsx
"use client";

import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-600 text-white flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <div className="bg-white p-2 rounded">
          <span className="text-blue-600 font-bold">📚</span>
        </div>
        <span className="font-bold text-xl">Book Manager</span>
      </div>

      <nav className="mt-8 space-y-4">
        <Link href="/books" className="pl-4 py-3 block hover:bg-blue-700 flex items-center gap-2">
          📖 All Books
        </Link>
        <Link href="/books/create" className="pl-4 py-3 block hover:bg-blue-700 flex items-center gap-2">
          ➕ Add New Book
        </Link>
      </nav>

      <div className="mt-auto p-4 text-sm text-blue-200">
        © 2025 Book Management System
      </div>
    </div>
  );
}