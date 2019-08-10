import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/webpack.dev.config.js';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';

const app = express(),
  DIST_DIR = path.join(__dirname, '../dist'),
  OVERVIEW_TEMPLATE = path.join(DIST_DIR, 'overview.pug'),
  LAPTOP_TEMPLATE = path.join(DIST_DIR, 'laptop.pug'),
  compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler));

app.use(express.static(DIST_DIR));

app.set('views', '../dist')
app.set('view engine', 'pug');
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));

var data;

app.get('/', (req, res) => {
  fs.readFile('./data/data.json', 'utf8',
    function (err, contents) {
      if (contents) {
        data = JSON.parse(contents);
        res.render(OVERVIEW_TEMPLATE, {
          props: data
        });
      }

    })
})

app.get('/laptop/:id', (req, res) => {
  let id = req.params.id;
  let laptop = data.find(elem => elem.id === id);
  if (laptop) {
    res.render(LAPTOP_TEMPLATE, {
      props: laptop
    });
  }
})