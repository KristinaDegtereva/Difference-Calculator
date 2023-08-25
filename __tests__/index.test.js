import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import getParsedData from '../src/parser.js';
import makeLines from '../src/stylish.js';
// import buildTree from '../src/buildTree.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

test('makeLines', () => {
  expect(makeLines('text')).toEqual(`{\n  ${'-text'}\n}`);
  const tree = [
    {
      key: 'common',
      children: [
        {
          key: 'follow',
          value: false,
          type: 'new',
        },
      ],
      type: 'nested',
    },
  ];
  expect(() => { makeLines(tree); }).toThrow();
});

// test('buildTree', async () => {
//   const data1 = {
//     host: 'hexlet.io',
//     timeout: 50,
//     proxy: '123.234.53.22',
//     follow: false,
//   };
//   const data2 = {
//     timeout: 20,
//     verbose: true,
//     host: 'hexlet.io',
//   };
//   const text = await readFile('buildTree_test.txt');
//   expect((buildTree(data1, data2))).toEqual((text));
// });
