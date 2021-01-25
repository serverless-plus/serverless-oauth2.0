import { join } from 'path';

const keyPath = join(__dirname, './keys');

const CONFIGS = {
  publicKeyPath: join(keyPath, 'public.pem'),
  privateKeyPath: join(keyPath, 'private.pem'),
};

export { CONFIGS };
