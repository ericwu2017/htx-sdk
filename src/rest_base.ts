import { merge } from 'lodash';
import { T_res } from './type';

const fetch = require('node-fetch');

export class Rest_base {
  opt: T_rest_opt = {};

  constructor(opt?: T_rest_opt) {
    this.opt = merge({}, this.opt, opt);
  }

  async call<T = any>(url: string, method: 'GET' | 'POST', opt?: RequestInit): Promise<T_res<T>> {
    const a = await fetch(url, { method, ...opt });
    return await a.json();
  }

  async post<T = any>(action: string, body: any): Promise<T_res<T>> {
    return this.call(this.opt.base_url + action, 'POST', { body: JSON.stringify(body) });
  }

  async get<T = any>(action: string): Promise<T_res<T>> {
    return this.call(this.opt.base_url + action, 'GET');
  }
}

export interface T_rest_opt {
  auth?: { key: string, secret: string }
  base_url?: string
}
