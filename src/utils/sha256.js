const crypto = require('crypto');

const sha256 = data => {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('base64');
};

module.exports = sha256;
