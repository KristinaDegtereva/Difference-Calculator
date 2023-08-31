import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import getParsedData from '../src/parser.js';
import makeLines from '../src/formatters/stylish.js';
import getFormat from '../src/formatters/index.js';
import getPlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  const cases = [
    {
      file1: 'file1.json', file2: 'file2.json', formatter: 'stylish', expected: 'json_stylish_test.txt',
    },
    {
      file1: 'file1.yml', file2: 'file2.yml', formatter: 'stylish', expected: 'yml_stylish_test.txt',
    },
    {
      file1: 'file1.yaml', file2: 'file2.yaml', formatter: 'stylish', expected: 'yaml_stylish_test.txt',
    },
    {
      file1: 'file1.json', file2: 'file2.json', formatter: 'plain', expected: 'json_plain_test.txt',
    },
    {
      file1: 'file1.yml', file2: 'file2.yml', formatter: 'plain', expected: 'yml_plain_test.txt',
    },
    {
      file1: 'file1.yaml', file2: 'file2.yaml', formatter: 'plain', expected: 'yaml_plain_test.txt',
    },
  ];

  test.each(cases)(
    'Differences between $file1 and $file2 at $formatter format',
    ({
      file1, file2, formatter, expected,
    }) => {
      const getfilePath1 = getFixturePath(file1);
      const getfilePath2 = getFixturePath(file2);
      const expectedResult = readFile(expected);
      expect(gendiff(getfilePath1, getfilePath2, formatter)).toEqual(expectedResult);
    },
  );
});

// test('getParsedData', () => {
//   expect(() => { getParsedData('data', '.yamsl'); }).toThrow();
// });

// test('makeLines', () => {
//   expect(makeLines('text')).toEqual(`{\n  ${'-text'}\n}`);
//   const tree = [
//     {
//       key: 'common',
//       children: [
//         {
//           key: 'follow',
//           value: false,
//           type: 'new',
//         },
//       ],
//       type: 'nested',
//     },
//   ];
//   expect(() => { makeLines(tree); }).toThrow();
// });

// test('getFormat', () => {
//   const diff = [
//     { key: 'follow', value: false, type: 'deleted' },
//     { key: 'host', value: 'hexlet.io', type: 'unchanged' },
//   ];
//   expect(getFormat(diff, 'json')).toEqual(JSON.stringify(diff));
//   expect(() => { getFormat(diff, 'table'); }).toThrow();
// });

// test('getPlain', () => {
//   expect(getPlain('text')).toEqual('text');

//   const tree = [
//     {
//       key: 'follow',
//       value: false,
//       type: 'new',
//     },
//   ];
//   expect(() => { getPlain(tree, 'table'); }).toThrow();
// });
