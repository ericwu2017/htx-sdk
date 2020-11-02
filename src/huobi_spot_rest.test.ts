import { Huobi_spot_rest } from './huobi_spot_rest';

it('public call', async () => {
  const a = new Huobi_spot_rest();
  const r = await a.get('/market/tickers');
  expect(r.status).toBe('ok');
});

it('private call', async () => {
  const key = process.env.test_huobi_key;
  const secret = process.env.test_huobi_secret;

  if ( ! key || ! secret) {
    return console.warn('Empty testing API key or secret');
  }

  const a = new Huobi_spot_rest({ auth: { key, secret } });
  const r = await a.get('/v1/account/accounts');
  expect(r.status).toBe('ok');
});
