import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const nested = buildTree(data1[key], data2[key]);
      return { key, children: nested, type: 'nested' };
    }

    if (!_.has(data1, key) && _.has(data2, key)) return { key, value: data2[key], type: 'added' };
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return { key, value: data2[key], type: 'unchanged' };
      }
      if (data1[key] !== data2[key]) {
        return {
          key, value: data1[key], oldValue: data2[key], type: 'changed',
        };
      }
    }
    return { key, value: data1[key], type: 'deleted' };
  });
};

export default buildTree;
