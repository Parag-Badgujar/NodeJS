// const crypto = require("crypto");
import { CRYPTO_CONFIG } from "configs/app.config";
import crypto from "crypto";

const KEY = crypto.randomBytes(32); // 256-bit key
const IV = crypto.randomBytes(16);

function encryptPayload(payload: any) {
    const cipher = crypto.createCipheriv(CRYPTO_CONFIG.algorithm, KEY, IV);

    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(payload), "utf8"),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    // pack iv + encrypted + tag into one Base64 string
    return Buffer.concat([IV, tag, encrypted]).toString("base64");
}

function decryptPayload(data: any) {
    const buffer = Buffer.from(data, "base64");

    const iv = Buffer.from(buffer.subarray(0, 16));
    const tag = Buffer.from(buffer.subarray(16, 32));
    const content = Buffer.from(buffer.subarray(32));         // remaining

    const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
        decipher.update(content),
        decipher.final()
    ]);

    return JSON.parse(decrypted.toString("utf8"));
}