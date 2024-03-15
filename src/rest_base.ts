import { merge } from 'lodash';
import { T_object, T_res } from './type';
import { sign_rest } from './utility';

const fetch = require('node-fetch');

enum N_status {
  'ok'    = 'ok',
  'error' = 'error'
}

export class Rest_base {
  opt: T_rest_opt = {};

  constructor(opt?: T_rest_opt) {
    this.opt = merge({}, this.opt, opt);
  }

  get host() {
    return `${this.opt.api_proto}://${this.opt.api_domain}`;
  }

  get<T = any>(path: string, params?: T_object): Promise<T_res<T>> {
    return this.call('GET', path, params);
  }

  post<T = any>(path: string, params?: T_object): Promise<T_res<T>> {
    return this.call('POST', path, params);
  }

  call<T = any>(method: 'GET' | 'POST', path: string, params?: T_object): Promise<T_res<T>> {
    if (method !== 'GET' && method !== 'POST') {
      throw 'method only be GET or POST';
    }

    path = this.path_format(path);

    const { qs, query } = this.sign({
      path,
      method,
      params,
    });

    if (method === 'GET') {
      return this.fetch(`${path}?${qs}`, { method });
    }

    return this.fetch(`${path}?${qs}`, {
      method,
      body: JSON.stringify(query as any),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  private sign({
    method, path, params,
  }: {
    method: 'GET' | 'POST';
    path: string;
    params?: T_object;
  }): {
    query: T_object,
    qs: string,
    signature: string
  } {
    if ( ! path.startsWith('/')) {
      throw 'path must starts with \/';
    }

    const need_signature = ! path.startsWith('/market');

    const o = this.opt;
    let query: T_object;
    if (need_signature) {
      query = {
        AccessKeyId: o.auth?.key,
        SignatureMethod: 'HmacSHA256',
        SignatureVersion: '2',
        Timestamp: new Date().toISOString().replace(/\..+/, ''),
        ...params,
      };
    } else {
      query = { ...params };
    }

    const params_arr = [];
    for (const item in query) {
      params_arr.push(`${item}=${encodeURIComponent(query[item])}`);
    }
    const params_str = params_arr.sort().join('&');

    if ( ! need_signature) {
      return {
        query: query,
        signature: '',
        qs: params_str,
      };
    }

    const signature = sign_rest(method, o.api_domain!, path as string, params_str, o.auth?.secret!);

    return {
      signature,
      query: query,
      qs: `${params_str}&Signature=${signature}`,
    };
  }

  private path_format(path: string): string {
    path = path.trim();
    if ( ! path.startsWith('/')) {
      path = `/${path}`;
    }
    if (path.endsWith('/')) {
      path = path.substring(0, path.length - 1);
    }
    return path;
  }

  async fetch<T = any>(path: string, options: RequestInit): Promise<T_res<T>> {
    const url = `${this.host}${path}`;
    const r = await fetch(url, {
      ...options,
    });

    return await r.json();
  }
}

export interface T_rest_opt {
  auth?: { key: string, secret: string }
  api_domain?: string
  api_proto?: string
}
