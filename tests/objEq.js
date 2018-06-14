const chai = require('chai');
const expect = chai.expect;

const sha256 = require('../src/utils/sha256.js');

const hashGraph = require('../src/hashGraph.js');
const hashGraph256 = hashGraph(sha256);

describe('hashGraph function', () => {
  it('returns the same value for the same primitive', () => {
    const s1 = 'this is great';
    const s2 = 'this is great';
    expect(hashGraph256(s1)).to.equal(hashGraph256(s2));
  });

  it('returns different values for different primitives', () => {
    const s1 = 'this is great';
    const s2 = 'this isnt great';
    expect(hashGraph256(s1)).to.not.equal(hashGraph256(s2));
  });

  it('returns different values for numbers and strings even if they have the same stringified value', () => {
    const s1 = '3';
    const n1 = 3;
    expect(hashGraph256(s1)).to.not.equal(hashGraph256(n1));
  });

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

  it('returns the same value for two flat objects, even with keys in different order', () => {
    const o1 = {
      job: 'Head of Academics',
      name: 'Cassio',
      numPets: 2,
      numChildren: 2,
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
      job: 'Head of Academics',
      name: 'Omri',
      numChildren: 2,
      numPets: 2,
    };

    expect(hashGraph256(o1)).to.not.equal(hashGraph256(o2));
  });

  it('returns the same value for two identical, nested objects', () => {
    const o1 = {
      name: 'Cassio',
      job: 'Head of Academics',
      pets: [{ name: 'Ribs' }, { name: 'Porkchop' }],
    };

    const o2 = {
      name: 'Cassio',
      job: 'Head of Academics',
      pets: [{ name: 'Ribs' }, { name: 'Porkchop' }],
    };

    expect(hashGraph256(o1)).to.equal(hashGraph256(o2));
  });

  it('returns different values for two different, nested objects', () => {
    const o1 = {
      name: 'Cassio',
      job: 'Head of Academics',
      pets: [{ name: 'Ribs' }, { name: 'Porkchop' }],
    };

    const o2 = {
      name: 'Cassio',
      job: 'Head of Academics',
      pets: [{ name: 'Costela' }, { name: 'Porkchop' }],
    };

    expect(hashGraph256(o1)).to.not.equal(hashGraph256(o2));
  });

  it('returns the same value for objects containing the same reference to another object', () => {
    const mel1 = { name: 'Mel' };
    const mel2 = { name: 'Mel' };
    const cassio1 = {
      name: 'Cassio',
      spouse: mel1,
      bff: mel1,
    };
    const cassio2 = {
      name: 'Cassio',
      spouse: mel2,
      bff: mel2,
    };

    expect(hashGraph256(cassio1)).to.equal(hashGraph256(cassio2));
  });

  it('returns different values for objects containing different objects that happen to have the same keys and values', () => {
    const mel1 = { name: 'Mel' };
    const mel2 = { name: 'Mel' };
    const cassio1 = {
      name: 'Cassio',
      spouse: mel1,
      bff: mel1,
    };
    const cassio2 = {
      name: 'Cassio',
      spouse: mel1, // <~ DIFFERENT!
      bff: mel2,
    };

    // const foo = {
    //   bar: {
    //     baz: x,
    //     qux: x,
    //   },
    //   zoo: x,
    // };

    expect(hashGraph256(cassio1)).to.not.equal(hashGraph256(cassio2));
  });
});
