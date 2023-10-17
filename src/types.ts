/**
 * Message interface to represent an email message.
 */
export interface Message {
	/**
	 * Array of recipient email addresses.
	 * Each of them will receive a separate email, no CC or BCC.
	 * Accepts up to 16 recipients.
	 */
	to: string[];

	/**
	 * The subject of the email message.
	 * Accepts up to 128 characters.
	 */
	subject: string;

	/**
	 * The body content of the email message.
	 * Accepts up to 16MB of data.
	 */
	body: string;

	/**
	 * The format of the email body.
	 * "plain" for plain text, "html" for HTML content.
	 */
	format: "plain" | "html";

	/**
	 * Information about the sender.
	 * - name: The display name of the sender.
	 * - address: The email address of the sender.
	 */
	as: {
		name: string;
		address: string;
	};
}

export interface Env {
	EMAIL_QUEUE: Queue<Message>;
}
