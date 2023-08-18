import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import getParsedData from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
const __dirname = dirname(__filename);
// console.log(__dirname);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', async () => {
  const text = await readFile('json_test.txt');
  const diff = gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  expect(diff).toEqual(text);
});

test('gendiff', async () => {
  const text = await readFile('yml_test.txt');
  const diff = gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml');
  expect(diff).toEqual(text);
});

test('gendiff', async () => {
  const text = await readFile('yml_test.txt');
  const diff = gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml');
  expect(diff).toEqual(text);
});

test('getParsedData', () => {
  expect(() => { getParsedData('data', '.yamsl'); }).toThrow();
});
