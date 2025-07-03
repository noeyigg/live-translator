const http = require('http');

const defaultCorsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

const server = http.createServer((req, res) => {
  let body = [];

  if (req.method === 'OPTIONS') {
    res.writeHead(204, defaultCorsHeader);
    res.end();
  }

  if (req.method === 'POST') {
    req
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);        
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
      });
  } else {
    // POST요청 외 req.method일 때 로직
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server Running On Port : ${PORT}`);
});
