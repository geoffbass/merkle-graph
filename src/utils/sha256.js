const crypto = require('crypto');

const sha256 = data => {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest();
};

module.exports = sha256;
