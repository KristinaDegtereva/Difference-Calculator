import yaml from 'js-yaml';

const getParsedData = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default getParsedData;
