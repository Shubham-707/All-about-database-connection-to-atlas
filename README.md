#All steps used are described below in detail.

1.  npm init -y
2.  npm i express mongoose dotenv
3.  express for creating server, mongoose for connecting to database, dotenv for hiding confidential info.'
4.  create app.js > conn.js > models.js > routes.js > .env > .gitignore
5.  create a basic server in app.js

        const express = require('express');
        const app = express();
        const PORT = process.env.PORT || 3000;

        require('./conn');
        // const User = require('./models'); // no use of requiring this in app.js
        const router = require('./routes');

        app.get('/', (req, res) => {
            res.send('No content to display here, try reaching "localhost:3000/user"!')
        });


        app.use(express.json()); //display result in json
        app.use(router); //to use router

        app.listen(PORT, () => {
            console.log(`server is listening at PORT http://localhost:${PORT}`);
        });

6.  connect database using mongoose in conn.js

        //connecting to database
        const mongoose = require('mongoose');
        require('dotenv').config(); //to use .env

        const uri = process.env.DB_CONNECTION; //DB_CONNECTION is named for the database link stored in .env file


        mongoose.connect(uri).then(() => {
            console.log('connected to database')
        }).catch((e) => {
            console.log('Not connected to database')
        });

7.  create schema in models.js

        const mongoose = require('mongoose');

        const UserSchema = mongoose.Schema({
            name: {
                type: String,
                required: true
            }

        const User = new mongoose.model('User', UserSchema); // User must be Capital and this will be created as a collection in the database.
        module.exports = User;

8.  create the routes in routes.js to perform CRUD operations.

          const express = require('express');
          const router = new express.Router();
          const User = require('./models');

          //POST request handling
          router.post('/user', async (req, res) => {
              try {
                  const addUser = new User(req.body);
                  console.log(req.body);
                  const insertUser = await addUser.save();
                  res.status(201).send(insertUser);
              } catch (e) {
                  res.status(400).send(e)
              }
          });

          //GET request handling
          router.get('/user', async (req, res) => {
              try {
                  const getUsers = await User.find({}).sort({"name":1});
                  res.send(getUsers);
              } catch (e) {
                  res.status(400).send(e)
              }
          });

          //GET request for individual user
          router.get("/user/:id", async (req, res) => {
              try {
                  const _id = req.params.id;
                  const getUser = await User.findById(_id);
                  res.send(getUser);
              } catch (e) {
                  res.status(400).send(e)
              }
          });


          //Update a request for individual user Individual data.
          router.patch("/user/:id", async (req, res) => {
              try {
                  const _id = req.params.id;
                  const getUser = await User.findByIdAndUpdate(_id, req.body, {
                      new: true
                  });
                  res.send(getUser);
              } catch (e) {
                  res.status(500).send(e)
              }
          });


          //Delete a request
          router.delete("/user/:id", async (req, res) => {
              try {
                  const getUser = await User.findByIdAndDelete(req.params.id);
                  res.send(getUser);
              } catch (e) {
                  res.status(500).send(e)
              }
          });

          module.exports = router;

9.  require conn.js in app.js for connecting database and using in server
10. require models.js in routes.js to use the schema for the CRUDs

---

Once you have created the repository and pushed all the files and folders, but due to .gitignore file the database connection details will also be hidden from the person who will clone the repository next time in future.
In conn.js we can see the process.env.DB_CONNECTION, here DB.CONNECTION is named to connect to the mongodb server whose details are in the .env which is ignored by .gitignore file.

After you clone the repository:
1. Open terminal and write "npm i" to insatall all pacakges.
2. Go to your browser and search Atlas, create a database in it and connect the database.
3. While connecting get the mongodb to VS Code link.
4. Create one .env file outside all folders, here write DB_CONNECTION: LINK YOU COPIED FROM ATLAS.
5. Now this link will connect the repo. to database server of Atlas(online), you can use the same link to operate it in compass(local).
6. Then, in the terminal write nodemon app.js to run the app.js file to create the connection.