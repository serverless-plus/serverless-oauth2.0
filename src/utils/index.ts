import { createHash } from 'crypto';

function pwdEncrypt(pwd: string): string {
  const md5 = createHash('md5');
  return md5.update(pwd).digest('hex');
}

export { pwdEncrypt };
