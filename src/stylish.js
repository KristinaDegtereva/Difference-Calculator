import _ from 'lodash';

const replacer = ' ';
const doubleSpace = '  ';

const getSpaces = (depth, spacesCount = 4) => replacer.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const lines = Object.entries(value);
  const result = lines.map(([key, val]) => `${getSpaces(depth + 1)}${doubleSpace}${key}: ${stringify(val, depth + 1)}`).join('\n');

  return `{\n${result}\n${getSpaces(depth)}${doubleSpace}}`;
};

const makeLines = (tree) => {
  const iter = (value, depth = 1) => {
    if (!_.isObject(value)) {
      return `${getSpaces(depth)}-${value}`;
    }

    const lines = value.map((line) => {
      switch (line.type) {
        case 'added':
          return `${getSpaces(depth)}+ ${line.key}: ${stringify(line.value, depth)}`;
        case 'deleted':
          return `${getSpaces(depth)}- ${line.key}: ${stringify(line.value, depth)}`;
        case 'changed':
          return `${getSpaces(depth)}- ${line.key}: ${stringify(line.value, depth)}\n${getSpaces(depth)}+ ${line.key}: ${stringify(line.oldValue, depth)}`;
        case 'unchanged':
          return `${getSpaces(depth)}  ${line.key}: ${stringify(line.value, depth)}`;
        case 'nested':
          return `${getSpaces(depth)}  ${line.key}: {\n${iter(line.children, depth + 1)}\n${getSpaces(depth)}  }`;
        default:
          throw new Error('Unknown type');
      }
    });
    return [...lines].join('\n');
  };
  const result = iter(tree, 1);
  return `{\n${result}\n}`;
};

export default makeLines;
