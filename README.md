#### How to start the project

To build the project run the following commands in terminal inside root directory of the project:

1. `npm install`
2. `npm run build`
3. point your webserver to the *index.html* file inside *dist* folder.

By default the app assumes that the server that serves *index.html* is the same that serves all /api calls. If it's not true you should open *src/config/API.json* and change the following settings:

- change **useSameURL** setting to false;
- edit **baseURL.production** to match your API server.
- run `npm run build` to rebuild the project

To start a development server:

1. `npm install`
2. if needed open *webpack.dev.js* and edit  **target** property of **devServer.proxy** setting so that it points to a working API server;
3. if needed change development server port by editing **port** property of **devServer.proxy**;
4. `npm start` to start a development server and watch for changes
5. open http://localhost:8080 (default port)

To run tests:

1. `npm test` - run all tests;
2. `npm test:watch` - run only changed tests and watch for changes;
3. `npm test:watch-all` - run all tests and watch for changes;
4. `npm test:coverage` - generate code coverage info;
5. `npm test:update` - update test snapshots.



#### Structure of the project

All source code is located in the *src* directory of the project. 

All React components have .jsx extension in their names and reside inside *src/js/components*. 

All components representing a single page (route) are located in *src/js/components/routes* directory grouped by their resource names. Any route can be imported directly (default synchronous import) or through named import from *src/js/components/routes*. In the latter case the import would be asynchronous.

*src/js/components/common* contains standalone components shared across other components.

*src/js/components/partials* contains components used as parts of different parent components. 



