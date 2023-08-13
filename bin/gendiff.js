#!/usr/bin/env node
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option(' -V, --version', 'output the version number')
  .option('-h, --help', ' output usage information')

program.parse();