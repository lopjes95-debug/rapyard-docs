import { Hono } from 'hono';
import health from './health';
import version from './version';

const system = new Hono();

system.get('/health', health);
system.get('/version', version);

export default system;
