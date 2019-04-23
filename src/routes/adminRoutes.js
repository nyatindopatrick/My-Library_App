const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [

  {
    title: 'War and Peace',
    genre: 'Hstorical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Source Code',
    genre: 'Education',
    author: 'C. Code',
    read: false
  },
  {
    title: 'Eloquent JS',
    genre: 'Education',
    author: 'Marijn Haverbeke',
    read: false
  },
  {
    title: 'Rich Dad Poor Dad',
    genre: 'Education',
    author: 'Robert Kiyosaki',
    read: false
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected correctly to the server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }


        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
