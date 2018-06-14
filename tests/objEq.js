const chai = require('chai');
const expect = chai.expect;

const sha256 = require('../src/utils/sha256.js');

const hashGraph = require('../src/hashGraph.js');
const hashGraph256 = hashGraph(sha256);

describe('hashGraph function', () => {
  it('returns the same value for two identical, flat objects', () => {
    const o1 = {
      name: 'Cassio',
      job: 'Head of Academics',
      numChildren: 2,
      numPets: 2,
    };

    const o2 = {
      name: 'Cassio',
      job: 'Head of Academics',
      numChildren: 2,
      numPets: 2,
    };

    expect(hashGraph256(o1)).to.equal(hashGraph256(o2));
  });

  it('returns different values for two different, flat objects', () => {
    const o1 = {
      name: 'Cassio',
      job: 'Head of Academics',
      numChildren: 2,
      numPets: 2,
    };

    const o2 = {
      name: 'Omri',
      job: 'Head of Academics',
      numChildren: 2,
      numPets: 2,
    };

    expect(hashGraph256(o1)).to.not.equal(hashGraph256(o2));
  });
});
