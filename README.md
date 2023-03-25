node version: 18.14.0
npm version: 6.14.15

# local run

// before running
-- npm init -y
-- npm install
// actual run
-- npm run dev ( this command uses "nodemon" package you must have already installed by "npm install".
It runs "nodemon src/index.ts" under the hood //look in package.json - scripts//. After this command
the server will be rerun after each time you save it ( ctrl + s (windows)).In order to
stop server run the command (f.e in Git CLI the command is ctrl+c).
To run the server once run - node index.ts )

// to build the app
--npm run build ( this will compile the ts files to js and create them in /build folder)

NOTE: if you have cloned the app from Gitlab or Github repository, you will not have actual ".env" file and,consequently, can not run the program. (f.e DB will fail to connect)
It is the complete data about your secret credentials. The instance can be found in ".default.env" file.
