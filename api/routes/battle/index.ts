import { Hono } from 'hono';
import create from './create';
import join from './join';
import vote from './vote';
import results from './results';

const battles = new Hono();

battles.post('/create', create);
battles.post('/:id/join', join);
battles.post('/:id/vote', vote);
battles.get('/:id/results', results);

export default battles;
