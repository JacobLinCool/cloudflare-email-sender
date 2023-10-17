# Cloudflare Email Sender

Use Cloudflare Queues to deliver emails.

## Usage

A **paid worker plan** is required since it uses the [Cloudflare Queues](https://developers.cloudflare.com/queues/).

1. Create a new queue with `pnpm create-queue`.
2. Deploy the comsumer with `pnpm run deploy`.

After the service has been deployed, you can bind it to other services:

```toml
# wrangler.toml of other worker service
services = [
    { binding = "sender", service = "email-sender" }
]
```

```ts
// other worker service
export default {
    async fetch(request: Request, env: Env) {
        // do something ...

        // request email sender to send email
        const { ok } = await env.sender.fetch({
            // ... see Email Message
        });

        // do something ...
    },
};
```

## Email Message

```ts
interface Message {
    to: string[];
    subject: string;
    body: string;
    a: "plain" | "html";
    as: {
        name: string;
        address: string;
    };
}
```

See [src/types.ts](./src/types.ts) for more details.
