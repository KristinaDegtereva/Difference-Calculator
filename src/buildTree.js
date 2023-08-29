import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const nested = buildTree(data1[key], data2[key]);
      return { key, children: nested, type: 'nested' };
    }
    if (!_.has(data1, key)) return { key, value: data2[key], type: 'added' };
    if (!_.has(data2, key)) return { key, value: data1[key], type: 'deleted' };
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data2[key], type: 'unchanged' };
    }
    return {
      key, value: data1[key], oldValue: data2[key], type: 'changed',
    };
  });
};

export default buildTree;
