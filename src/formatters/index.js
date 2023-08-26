import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error('Output format not found');
  }
};

export default formatter;
