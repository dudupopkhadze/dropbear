const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

const parenthesize = (tokens) => {
  console.log({ tokens });
  const token = pop(tokens);

  if (isOpeningParenthesis(token.value)) {
    const exprs = [];
    while (!isClosingParenthesis(peek(tokens).value)) {
      exprs.push(parenthesize(tokens));
    }
    pop(tokens);

    console.log(exprs);

    return exprs;
  }

  return token;
};

const parse = (tokens) => {
  if (Array.isArray(tokens)) {
    const [first, ...rest] = tokens;
    return {
      type: 'CallExpression',
      name: first.value,
      arguments: rest.map(parse),
    };
  }
  const token = tokens;

  if (token.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: token.value,
    };
  }

  if (token.type === 'String') {
    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }

  if (token.type === 'Name') {
    return {
      type: 'Identifier',
      name: token.value,
    };
  }
};

module.exports = { parse: (tokens) => parse(parenthesize(tokens)) };
