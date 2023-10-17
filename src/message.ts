import { z } from "zod";
import type { Message } from "./types";

export const MessageSchema: z.Schema<Message> = z.object({
	to: z.array(z.string().email().max(128)).max(16),
	subject: z.string().min(1).max(128),
	body: z
		.string()
		.min(1)
		.max(16 * 1024 * 1024),
	format: z.enum(["plain", "html"]),
	as: z.object({
		name: z.string().max(128),
		address: z.string().email().max(128),
	}),
});
