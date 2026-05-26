import { Hono } from 'hono';
import list from './list';
import markRead from './mark-read';

const notifications = new Hono();

notifications.get('/', list);
notifications.post('/mark-read', markRead);

export default notifications;
