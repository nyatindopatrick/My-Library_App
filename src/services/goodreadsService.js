const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app: goodreadsService');
const parser = xml2js.Parser({ explicitArray: false });

function goodReadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.goodreads.com/book/show/656.xml?key=in9TPw9vIpCqH6B6a39Q')
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.goodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return { getBookById };
}

module.exports = goodReadsService();
