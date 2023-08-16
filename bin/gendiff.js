#!/usr/bin/env node
import { Command } from 'commander';
import genfiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const diff = genfiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse();
