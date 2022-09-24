const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const char = input[cursor];

    if (isParenthesis(char)) {
      tokens.push({ type: 'Parenthesis', value: char });
      cursor++;
      continue;
    }

    if (isWhitespace(char)) {
      cursor++;
      continue;
    }

    if (isNumber(char)) {
      let number = char;

      while (isNumber(input[++cursor])) {
        number += input[cursor];
      }

      tokens.push({ type: 'Number', value: parseInt(number, 10) });
      continue;
    }

    if (isLetter(char)) {
      let name = char;

      while (isLetter(input[++cursor])) {
        name += input[cursor];
      }
      tokens.push({ type: 'Name', value: name });

      continue;
    }

    if (isQuote(char)) {
      let string = '';

      while (!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      tokens.push({ type: 'String', value: string });
      cursor++;
      continue;
    }

    throw new Error(`${char} is unknown character `);
  }

  return tokens;
};

module.exports = { tokenize };
