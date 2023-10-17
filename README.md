<p align="center">
    <img alt="Cloudflare Email Sender Icon, by DALL-E" height="128" src="./images/icon.png">
    <h1 align="center">Cloudflare Email Sender</h1>
    <p align="center">Use Cloudflare Queues to deliver emails.</p>
</p>

## Usage

A **paid worker plan** is required since it uses the [Cloudflare Queues](https://developers.cloudflare.com/queues/).

1. Create a new queue with `pnpm create-queue`.
2. Deploy the comsumer with `pnpm run deploy`.

After the service has been deployed, you can bind it to other services:

```toml
# wrangler.toml of other worker service
[[queues.producers]]
binding = "sender"
queue = "emails-to-send"
```

```ts
// other worker service
export default {
    async fetch(request: Request, env: Env) {
        // do something ...

        // request email sender to send email
        await env.sender.send({
            // ... see Email Message
        });

        // do something ...
    },
};

interface Env {
    sender: Queue;
}
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
