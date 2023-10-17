import debug from "debug";

debug.enable("email-sender*");

export const log = debug("email-sender");
export const extend = log.extend.bind(log);
