# Node API wrapper for HTX

## Public API for spot

For public API, access key and secret is not required

```typescript
import {Huobi_spot_rest} from 'htx-sdk';
const spot = new Huobi_spot_rest();
await a.get('/market/tickers'); // You can replace any valid API path here
```

## Private API

For private API, access key and secret is required

```typescript
import { Huobi_spot_rest } from 'htx-sdk';
const a = new Huobi_spot_rest({ auth: { key: 'access_key_here', secret: 'secret_here' } });
await a.get('/v1/account/accounts');
```

## Websocket (Pending)

Websocket is currently not supported yet.
