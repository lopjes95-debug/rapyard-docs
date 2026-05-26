import { Hono } from 'hono';
import trending from './trending';
import following from './following';
import foryou from './foryou';

const feed = new Hono();

feed.get('/trending', trending);
feed.get('/following', following);
feed.get('/foryou', foryou);

export default feed;
