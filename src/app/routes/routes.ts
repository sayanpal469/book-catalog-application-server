import express from 'express';
import { UserRoutes } from '../modules/users/user.router';
import { BookRoutes } from '../modules/books/book.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: BookRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
