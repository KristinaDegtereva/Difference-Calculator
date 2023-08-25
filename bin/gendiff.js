#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', stylish, stylish)
  .action((filepath1, filepath2) => {
    const diff = gendiff(filepath1, filepath2, program.format);
    console.log(diff);
  });

program.parse();
