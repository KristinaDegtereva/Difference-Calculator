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

test('gendiff', async () => {
  const jsonStylishText = await readFile('json_stylish_test.txt');
  const diffJson = gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish');
  expect(diffJson).toEqual(jsonStylishText);

  const ymlStylishText = await readFile('yml_stylish_test.txt');
  const diffYml = gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'stylish');
  expect(diffYml).toEqual(ymlStylishText);

  const yamlStylishText = await readFile('yaml_stylish_test.txt');
  const diffYaml = gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'stylish');
  expect(diffYaml).toEqual(yamlStylishText);

  const jsonPlainText = await readFile('json_plain_test.txt');
  const diffJson1 = gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain');
  expect(diffJson1).toEqual(jsonPlainText);

  const ymlPlainText = await readFile('yml_plain_test.txt');
  const diffYml1 = gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'plain');
  expect(diffYml1).toEqual(ymlPlainText);

  const yamlPlainText = await readFile('yaml_plain_test.txt');
  const diffYaml1 = gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'plain');
  expect(diffYaml1).toEqual(yamlPlainText);
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

test('getFormat', () => {
  const tree = [
    {
      key: 'follow',
      value: false,
      type: 'new',
    },
  ];
  expect(() => { getFormat(tree, 'table'); }).toThrow();
});

test('getPlain', () => {
  expect(getPlain('text')).toEqual('text');

  const tree = [
    {
      key: 'follow',
      value: false,
      type: 'new',
    },
  ];
  expect(() => { getPlain(tree, 'table'); }).toThrow();
});
