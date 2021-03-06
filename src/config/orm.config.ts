import { ConnectionOptions } from "typeorm";
import { parse } from "pg-connection-string";

import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, ".env") });

const parsedConnectionString = parse(process.env.DATABASE_URL);

const isDev = process.env.NODE_ENV === "development";

const connectionOptions: ConnectionOptions = {
   type: "postgres",
   host: parsedConnectionString.host,
   username: parsedConnectionString.user,
   password: parsedConnectionString.password,
   database: parsedConnectionString.database,
   synchronize: true,
   logging: false,
   entities: [...(isDev ? ["src/models/**/*.ts"] : ["dist/models/**/*.js"])],
};

export { connectionOptions };
