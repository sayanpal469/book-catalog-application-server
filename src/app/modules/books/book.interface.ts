import { Model } from 'mongoose';

export type IReview = {
  reviewer: string;
  reviewText: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  image: string | undefined;
  reviews: IReview;
  description: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  // title?: string;
  // author?: string;
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
