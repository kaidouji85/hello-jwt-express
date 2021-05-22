const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {JWT_ACCESS_TOKEN_SECRET} = require('./access-token-secret');

const JWT_REFRESH_TOKEN_SECRET = 'yourrefreshtokensecrethere';
const refreshTokens = [];

const users = [
  {
    username: 'john',
    password: 'password123admin',
    role: 'admin'
  }, {
    username: 'anna',
    password: 'password123member',
    role: 'member'
  }
];

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Authentication service started on port 3000');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
    const accessToken = jwt.sign({ username: user.username, role: user.role }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
    const refreshToken = jwt.sign({ username: user.username, role: user.role }, JWT_REFRESH_TOKEN_SECRET);

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken
    });
  } else {
    res.send('Username or password incorrect');
  }
});

app.post('/token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '20m' });

    res.json({
      accessToken
    });
  });
});

app.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);

  res.send("Logout successful");
});
