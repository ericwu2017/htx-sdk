import { merge } from 'lodash';
import { Rest_base, T_rest_opt } from './rest_base';

export class Huobi_spot_rest extends Rest_base {
  constructor(opt?: T_rest_opt) {
    super(merge(opt, {
      api_domain: 'api.huobi.pro',
      api_proto: 'https',
    }));
  }
}



