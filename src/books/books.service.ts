import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './types/book.entity';
import { CreateBookDto } from './types/create-book.dto';
import { UpdateBookDto } from './types/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [
    { 
        id: 1, title: '1984', 
        author: 'George Orwell', 
        year: 1949 },
    { id: 2, title: 'Dune', author: 'Frank Herbert', year: 1965 },
  ];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(b => b.id === id);
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  create(dto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.books.length + 1,
      ...dto,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, dto: UpdateBookDto): Book {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException(`Book with id ${id} not found`);

    const updated = { ...this.books[index], ...dto };
    this.books[index] = updated;
    return updated;
  }

  delete(id: number): void {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException(`Book with id ${id} not found`);
    this.books.splice(index, 1);
  }
}