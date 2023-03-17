import cors from 'cors';
import jsonServer from 'json-server';
import auth from 'json-server-auth';
import qs from 'query-string';

const server = jsonServer.create();
const router = jsonServer.router('db.json');

// Set default middlewares (logger, static, cors and no-cache)
server.use(cors());
server.use(auth);
server.db = router.db;

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === 'PUT' || req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];

  if (req.method === 'GET' && totalCountHeader) {
    const qsParams = qs.parse(req._parseUrl.query);
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(qsParams._page) || 1,
        _row: Number.parseInt(qsParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };

    return res.jsonp(result);
  }

  res.jsonp(res.locals.data);
};

// Use default router
server.use(router);
server.listen(9000, () => {
  console.log('>>> JSON Server is running!!! 🎉🎉🎉');
});
