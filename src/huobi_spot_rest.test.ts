import { Huobi_spot_rest } from './huobi_spot_rest';

it('get', async () => {
  const a = new Huobi_spot_rest();
  const r = await a.get('market/tickers');
  expect(r.status).toBe('ok');
});

it('post', async () => {
  const key = process.env.test_huobi_key;
  const secret = process.env.test_huobi_secret;

  if ( ! key || ! secret) {
    return console.warn('Empty testing API key or secret');
  }

  const a = new Huobi_spot_rest({ auth: { key, secret } });
  const r = await a.get('market/tickers');
  expect(r.status).toBe('ok');
});
