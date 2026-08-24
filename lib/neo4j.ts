
import neo4j from "neo4j-driver";

const url = process.env.CONNECTION_URL
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

console.log(url, username, password);

if (!url || !username || !password) {
  throw new Error("Missing CognoDB environment variables");
}

export const driver = neo4j.driver(url, neo4j.auth.basic(username, password), {
  disableLosslessIntegers: true,
});

export async function runQuery<T = unknown>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T[]> {
  const session = driver.session();
  try {
    const result = await session.run(query, params);

    return result.records.map((record) => record.toObject());
  } finally {
    await session.close();
  }
}

