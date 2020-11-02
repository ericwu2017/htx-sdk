import { Rest_base, T_rest_opt } from './rest_base';

export class Huobi_spot_rest extends Rest_base {
  opt: T_rest_opt = {
    base_url: 'https://api.huobi.pro/',
  };
}

