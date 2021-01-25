import { join } from 'path';
import { cp } from 'shelljs';

// copy views to dist
cp('-R', join(__dirname, '..', 'src/views'), join(__dirname, '..', 'dist/src'));

// copy keypair to dist
cp('-R', join(__dirname, '..', 'src/configs/keys'), join(__dirname, '..', 'dist/src/configs'));
