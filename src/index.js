import fs from 'fs';
import path from 'path';
import process from 'process';
import getParsedData from './parser.js';
import buildTree from './buildTree.js';
import formater from './formatters/index.js';

const readFilepath = (filepath) => fs.readFileSync((path.resolve(process.cwd(), filepath)), 'utf-8');

const genfiff = (filepath1, filepath2, formatName = 'stylish') => {
  const readFilepath1 = readFilepath(filepath1);
  const data1 = getParsedData(readFilepath1, path.extname(filepath1));

  const readFilepath2 = readFilepath(filepath2);
  const data2 = getParsedData(readFilepath2, path.extname(filepath2));

  const tree = buildTree(data1, data2);
  return formater(tree, formatName);
};

export default genfiff;
