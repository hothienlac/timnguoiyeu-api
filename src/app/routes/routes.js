const express = require('express');
const path = require('path');

const routes = (modules) => {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // Use Static
  // Do not need authentication for Upload File because
  // all uploaded files are UUID renamed
  const upload = path.join(__dirname, '../../public/upload');
  router.use('/upload', express.static(upload));

  const static = path.join(__dirname, '../../public/static');
  router.use('/static', express.static(static));

  // API Routes
  router.use('/auth', modules.auth.routes);
  router.use('/user', modules.user.routes);
  router.use('/quiz', modules.quiz.routes);
  router.use('/test', modules.test.routes);

  return router;
};

module.exports = routes;
