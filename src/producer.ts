import { extend } from "./debug";
import { MessageSchema } from "./message";
import type { Env } from "./types";

const log = extend("producer");

export async function fetch(req: Request, env: Env): Promise<Response> {
	const body = await req.json().catch(() => null);
	if (!body) {
		return new Response("Invalid JSON", { status: 400 });
	}

	const message = MessageSchema.safeParse(body);
	if (!message.success) {
		return new Response(`Invalid payload: ${JSON.stringify(message.error, null, 4)}`, {
			status: 400,
		});
	}

	await env.EMAIL_QUEUE.send(message.data, { contentType: "json" });
	log("queued new message", message.data);
	return new Response("Send request accepted", { status: 200 });
}
