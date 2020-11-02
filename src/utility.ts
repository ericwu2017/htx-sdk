import { createHmac } from 'crypto';

export function sign_rest(method: string, domain: string, path: string, qs: string, secret: string): string {
  const str = method + '\n' + domain + '\n' + path + '\n' + qs;
  return encodeURIComponent(createHmac('sha256', secret).update(str).digest('base64'));
}
