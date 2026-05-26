import { Hono } from 'hono';
import login from './login';
import register from './register';
import refresh from './refresh';
import logout from './logout';

const auth = new Hono();

auth.post('/login', login);
auth.post('/register', register);
auth.post('/refresh', refresh);
auth.post('/logout', logout);

export default auth;
