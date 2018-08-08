require('babel-core/register')({
  plugins: [
    'transform-react-jsx',
  ],
});

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiReactViews = require('hapi-react-views');
const Webpack = require('webpack');
const WebpackPlugin = require('hapi-webpack-plugin');
const WebpackConfig = require('./webpack.config.js');

const webpackCompiler = Webpack(WebpackConfig);

const provision = async () => {
  const server = Hapi.Server({
    host: 'localhost',
    port: 3000,
    debug: { request: ['error'] },
    routes: { files: { relativeTo: Path.join(__dirname, 'public') } },
  });
  await server.register(Inert); // Static file serving
  await server.register(Vision); // Templating
  await server.register({
    plugin: WebpackPlugin,
    options: { compiler: webpackCompiler },
  });

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: (request) => {
      console.log(`FAVICON GET: ${request.path}`);
      return null;
    },
  });

  // Template engine
  server.views({
    engines: { jsx: HapiReactViews },
    relativeTo: __dirname,
    path: 'templates/.',
  });

  // Assets
  server.route({
    method: 'GET',
    path: '/public/{filepath}',
    handler: {
      file(request) {
        console.log('ASSET GET:', request.path);
        return `${request.params.filepath}`;
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (request, h) => h.view('index', {}),
  });

  server.start();
  console.log(`Server is running at ${server.info.uri}`);
};

provision();
