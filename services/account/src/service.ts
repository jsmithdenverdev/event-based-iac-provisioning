import { Account } from "./types";

export interface Service {
  create(account: Account): Promise<string>;
}

export function Service(): Service {
  return {
    async create(account) {
      return "";
    },
  };
}
