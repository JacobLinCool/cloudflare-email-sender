import { extend } from "./debug";
import { Message } from "./types";

/**
 * Use MailChannels to send emails. Only works on Cloudflare Workers.
 */
export async function send(message: Message): Promise<void> {
	const log = extend("send");

	const payload = {
		personalizations: message.to.map((it) => ({ to: [{ email: it }] })),
		from: {
			name: message.as.name,
			email: message.as.address,
		},
		subject: message.subject,
		content: [
			{
				type: `text/${message.format}`,
				value: message.body,
			},
		],
	};
	log("payload", JSON.stringify(payload, null, 4));

	const req = new Request("https://api.mailchannels.net/tx/v1/send", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const res = await fetch(req);
	if (!res.ok) {
		throw new Error(`Failed to send email: ${res.status} ${await res.text()}`);
	}

	log("done");
}
