import { extend } from "./debug";
import { MessageSchema } from "./message";
import { send } from "./send";
import type { Env, Message } from "./types";

const log = extend("consumer");

export async function queue(batch: MessageBatch<Message>, env: Env): Promise<void> {
	for (const message of batch.messages) {
		log(`processing ${message.id}: ${JSON.stringify(message.body)}`);

		try {
			MessageSchema.parse(message.body);
		} catch {
			message.ack();
			log(`invalid message ${message.id}`);
			continue;
		}

		try {
			await send(message.body);
			message.ack();
			log(`processed ${message.id}`);
		} catch (err) {
			log(`failed to process ${message.id}: ${err}`);
			message.retry();
		}
	}
}
