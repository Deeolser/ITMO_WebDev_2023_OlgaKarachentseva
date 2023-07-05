import pg from "pg";

delete pg.native;

const postgresClient = new pg.Client({
  connectionString: process.env.VITE_POSTGRES_CONNECTION,
});

postgresClient.connect();

export default defineEventHandler((event) => {
  // console.log(event.context);
  event.context.postgres = postgresClient;
});
