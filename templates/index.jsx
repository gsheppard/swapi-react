/* eslint-disable react/no-danger */
import React, { Component } from 'react';

module.exports = class Index extends Component {
  render() {
    console.log('Render Template');
    return (
      <html lang="en">
        <head>
          <title>SWAPI</title>
          <link rel="stylesheet" href="main.css" />
        </head>
        <body>
          <div id="root" />

          <script type="text/javascript" src="bundle.js" />
        </body>
      </html>
    );
  }
};
