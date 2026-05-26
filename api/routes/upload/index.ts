import { Hono } from 'hono';
import presign from './presign';
import finalize from './finalize';

const upload = new Hono();

upload.get('/presign', presign);
upload.post('/finalize', finalize);

export default upload;
