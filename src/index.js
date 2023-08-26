import fs from 'fs';
import path from 'path';
import process from 'process';
import getParsedData from './parser.js';
import buildTree from './buildTree.js';
import formater from './formatters/index.js';

const genfiff = (filepath1, filepath2, formatName = 'stylish') => {
  const readFilepath1 = fs.readFileSync((path.resolve(process.cwd(), filepath1)), 'utf-8');
  const data1 = getParsedData(readFilepath1, path.extname(filepath1));

  const readFilepath2 = fs.readFileSync((path.resolve(process.cwd(), filepath2)), 'utf-8');
  const data2 = getParsedData(readFilepath2, path.extname(filepath2));

  const tree = buildTree(data1, data2);
  return formater(tree, formatName);
};

export default genfiff;
