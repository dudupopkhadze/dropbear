const { environment } = require('./standard-library');
const last = (collection) => collection[collection.length - 1];

const apply = (node) => {};

const evaluate = (node) => {
  if (node.type === 'CallExpression') return apply(node);
  if (node.value) return node.value;
};

module.exports = { evaluate };
