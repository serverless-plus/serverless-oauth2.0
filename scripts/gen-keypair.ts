import { JWK } from 'node-jose';
import { mkdir } from 'shelljs';
import { join } from 'path';
import { writeFileSync } from 'fs';

async function generateCert() {
  const store = JWK.createKeyStore();
  const key = await store.generate('RSA', 2048);
  const keyPath = join(__dirname, '..', 'src/config/keys');
  const publicKeyJson = JSON.stringify(key.toJSON());
  const publicKeyPem = key.toPEM();
  const privateKeyPem = key.toPEM(true);

  mkdir('-p', keyPath);
  writeFileSync(`${keyPath}/public.json`, publicKeyJson);
  writeFileSync(`${keyPath}/public.pem`, publicKeyPem);
  writeFileSync(`${keyPath}/private.pem`, privateKeyPem);

  console.log(`Public Key Json: \n`);
  console.log(publicKeyJson);
}

generateCert();
