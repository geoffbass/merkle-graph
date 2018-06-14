const bufferXOR = require('buffer-xor');

const concatAsBuffers = (...strsOrBuffers) => {
  return Buffer.concat(strsOrBuffers.map(s => Buffer.from(s)));
};

/*
new Map([
  [cassio1, {
    keys: '',
    paths: new Set([
      []
    ])
  }],
  [mel1, new Set([
    ['spouse'],
    ['bff']
  ])]
])
new Map([
  [cassio2, new Set([
    []
  ])],
  [mel1, new Set([
    ['spouse']
  ])],
  [mel2, new Set([
    ['bff']
  ])]
])


*/

const hashGraphBuffer = hashFn => {
  const hashAny = (data, visited = new Map(), path = []) => {
    if (typeof data !== 'object' || data === null) {
      return hashFn(concatAsBuffers(typeof data, hashFn('' + data)));
    }
    if (visited.has(data)) {
      const node = visited.get(data);
      node.paths.add(path);
      if (node.hashResult) return node.hashResult;
      else throw Error('Fuck the cycles');
    }
    visited.set(data, { paths: new Set([path]) });
    const hashResult = Object.keys(data).reduce((buffer, key) => {
      return bufferXOR(
        hashFn(
          concatAsBuffers(
            hashFn(key),
            hashAny(data[key], visited, path.concat(key))
          )
        ),
        buffer
      );
    }, []);
    visited.get(data).hashResult = hashResult;
    return hashResult;
  };
  return hashAny;
};

const hashGraph = hashFn => data =>
  hashGraphBuffer(hashFn)(data).toString('hex');

module.exports = hashGraph;
