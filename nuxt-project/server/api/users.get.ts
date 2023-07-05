const query = {
  // give the query a unique name
  text: "SELECT * FROM users",
};

export default defineEventHandler(async (event) => {
  try {
    const res = await event.context.postgres.query(query);
    console.log(res.rows);
    return res.rows;
  } catch (e) {
    console.log(`> users -> get: error = ${e}`);
  }
  return [];
});
