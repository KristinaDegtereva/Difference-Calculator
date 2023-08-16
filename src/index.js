import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import getParsedData from './parser.js';

const genfiff = (filepath1, filepath2) => {
  const getPath1 = path.resolve(process.cwd(), filepath1);
  const readFilepath1 = fs.readFileSync(getPath1, 'utf-8');
  const getFormat1 = path.extname(filepath1);
  const data1 = getParsedData(readFilepath1, getFormat1);

  const getPath2 = path.resolve(process.cwd(), filepath2);
  const readFilepath2 = fs.readFileSync(getPath2, 'utf-8');
  const getFormat2 = path.extname(filepath2);
  const data2 = getParsedData(readFilepath2, getFormat2);

  const keys = (_.union(Object.keys(data1), Object.keys(data2))).sort();
  const result = [];

  keys.map((key) => {
    if (!_.has(data1, key) && _.has(data2, key)) { // добавлен (нет в первом, есть во втором)
      result.push(`  + ${key}:${data2[key]}`);
    } else if (_.has(data1, key) && _.has(data2, key)) { // есть в двух
      if (data1[key] === data2[key]) { // есть в двух одинаковое значение
        result.push(`    ${key}:${data1[key]}`);
      } else {
        result.push(`  - ${key}:${data1[key]}`);
        result.push(`  + ${key}:${data2[key]}`); //  есть в двух разные значения, пушим оба
      }
    } else if (!Object.hasOwn(data2, key)) { // удален
      result.push(`  - ${key}:${data1[key]}`);
    }
    return result;
  });
  const result1 = result.join('\n');
  return `{\n${result1}\n}`;
};

export default genfiff;
