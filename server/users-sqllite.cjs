require('dotenv').config();

const express = require('express');
const fs = require('node:fs/promises');
const app = express();
const sdb = require('./database-users-sqlite.cjs');

async function saveDB() {
  await fs.writeFile('./db.json', JSON.stringify(db));
}

process.on('exit', () => {
  console.log('Goodbay Node');
});

app.use('/site', express.static('public'));

app.get('/', (req, res) => {
  const {name} = req.query;
  res.send(`
    Welcome ${name} to users application!
    ${JSON.stringify(db.users)}
   <form action="/users" method="post">
      <div class="form-example">
        <label for="name">Enter your name: </label>
        <input type="text" name="name" id="name" required>
        <div>
            <label for="email">Email: </label>
            <input type="text" name="email" id="email" required>
        </div>
        <div>
          <label for="password">Password: </label>
          <input type="text" name="password" id="password" required>
        </div>
      </div>
      <div class="form-example">
        <input type="submit" value="Submit!">
      </div>
    </form>
    <script>
      document.getElementById('btnSubmit').onkeyup = () => console.log("Clicked");
    </script>
  `);
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.get('/users', (req, res) => {
  sdb.all('SELECT * FROM user', (err, rows) => {
    console.log('err', err);
    console.log('rows', rows);
    res.status(200).json(rows);
  });
});

app.post('/users', async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const data = {
    name: userData.name || 'unknown',
    email: userData.email || '-',
    password: userData.password || '-',
  };
  const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
  console.log(data);
  sdb.run(sql, [data.name, data.email, data.password], (err) => {
    if (err) {
      console.log('INSERT error:', err);
      res.status(500).json({'error': err.toString()});
    } else {
      res.status(200).json({'ok': true});
    }
  });
  // db.users.push({id: sdb.users.length, ...userData});
  // await saveDB().then(() => {
  //   res.status(200).json(sdb.users);
  // }).catch((e) => {
  //   res.status(500).send('Error: ' + e.toString());
  // });
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log('> userId', userId);
  const user = sdb.users.find((user) => user.id === userId);
  if (user) res.status(200).json(user);
  else res.status(500).json({message: `User with id(${userId}) not found`});
});

// to support URL-encoded bodies
app.use((req, res, next) => {
  res.status(404).send(
    `
      <h1>Wrong URL</h1>
      <a href="/">Home</a>
      `
  );
});

let db;

app.listen(process.env.NODE_PORT || 3001, async () => {
  try {
    db = JSON.parse(await fs.readFile('./db.json', 'utf8'));
  } catch (e) {
    db = {
      users: []
    };
    saveDB();
  }

  console.log(`Example app listening on port ${process.env.NODE_PORT}`, db);
});