import { Hono } from 'hono';
import upload from './upload';
import stream from './stream';
import react from './react';
import comment from './comment';
import remove from './delete';

const tracks = new Hono();

tracks.post('/upload', upload);
tracks.get('/:id/stream', stream);
tracks.post('/:id/react', react);
tracks.post('/:id/comment', comment);
tracks.delete('/:id', remove);

export default tracks;
