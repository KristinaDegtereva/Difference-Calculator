import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const makeLines = (tree) => {
  const iter = (node, previousKey) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const lines = node
      .filter((line) => line.type !== 'unchanged')
      .flatMap((line) => {
        const property = previousKey ? `${previousKey}.${line.key}` : line.key;
        switch (line.type) {
          case 'added':
            return `Property '${property}' was added with value: ${stringify(line.value)}`;
          case 'deleted':
            return `Property '${property}' was removed`;
          case 'changed':
            return `Property '${property}' was updated. From ${stringify(line.value)} to ${stringify(line.oldValue)}`;
          case 'nested':
            return `${iter(line.children, property)}`;
          default:
            throw new Error('Unknown type');
        }
      });
    return [...lines].join('\n');
  };
  return iter(tree, 0);
};

export default makeLines;
