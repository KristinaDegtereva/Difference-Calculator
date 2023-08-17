import gendiff from '../src/index.js';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
