import CryptoJS from "crypto-js";

export const API_URL = "https://api-thrive.fusionintel.io/api/v1";

export const encode = (value: string) => {
  if (!process.env.SALT) {
    throw new Error("Missing 'SALT'");
  }

  if (!value) {
    throw new Error("Missing value");
  }

  return CryptoJS.AES.encrypt(value, process.env.SALT).toString();
};

export const decode = (value: string) => {
  if (!process.env.SALT) {
    throw new Error("Missing 'SALT'");
  }

  if (!value) {
    throw new Error("Missing value");
  }

  const bytes = CryptoJS.AES.decrypt(value, process.env.SALT);
  return bytes.toString(CryptoJS.enc.Utf8);
};
