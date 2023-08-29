import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (diff, formatName) => {
  const cases = {
    plain: plain(diff),
    stylish: stylish(diff),
    json: JSON.stringify(diff),
  };

  if (cases[formatName] !== undefined) {
    return cases[formatName];
  }
  throw new Error('Output format not found');
};

export default formatter;
