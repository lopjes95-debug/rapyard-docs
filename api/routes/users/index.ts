import { Hono } from 'hono';
import { authMiddleware } from '../../middleware/auth';

import profile from './profile';
import update from './update';
import search from './search';

const users = new Hono();

// Apply middleware to this router
users.use('*', authMiddleware);

users.get('/:id', profile);
users.put('/:id', update);
users.get('/search', search);

export default users;

