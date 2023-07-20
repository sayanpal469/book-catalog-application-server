import { Model } from 'mongoose';

export type IReview = {
  reviewer: string;
  reviewText: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  pdf: string | undefined;
  reviews: IReview;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
}