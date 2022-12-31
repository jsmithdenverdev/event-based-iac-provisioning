export type Config = {
  TABLE_NAME: string;
  INFRASTRUCTURE_QUEUE_URL: string;
};

export function loadConfigFromProcessEnv(): Config {
  const TABLE_NAME = process.env.TABLE_NAME;
  const INFRASTRUCTURE_QUEUE_URL = process.env.INFRASTRUCTURE_QUEUE_URL;

  const missingKeys = [];

  if (!TABLE_NAME) {
    missingKeys.push("TABLE_NAME");
  }

  if (!INFRASTRUCTURE_QUEUE_URL) {
    missingKeys.push("INFRASTRUCTURE_QUEUE_URL");
  }

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missingKeys.join(", ")}`
    );
  }

  return {
    // @ts-ignore: explicitly checked above
    TABLE_NAME,
    // @ts-ignore: explicitly checked above
    INFRASTRUCTURE_QUEUE_URL,
  };
}
