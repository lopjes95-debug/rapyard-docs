import { Hono } from 'hono';

import auth from './auth';
import users from './users';
import tracks from './tracks';
import battles from './battles';
import feed from './feed';
import upload from './upload';
import notifications from './notifications';
import ai from './ai';
import system from './system';

const routes = new Hono();

routes.get('/', (c) => c.text('RapYard API is live'));

routes.route('/auth', auth);
routes.route('/users', users);
routes.route('/tracks', tracks);
routes.route('/battles', battles);
routes.route('/feed', feed);
routes.route('/upload', upload);
routes.route('/notifications', notifications);
routes.route('/ai', ai);
routes.route('/system', system);

export default routes;
