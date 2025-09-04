#!/usr/bin/env node

/**
 * Root Directory Cleanup Suggester
 * 
 * Suggests moving files from root to dev stuff/ during pre-commit
 * Never deletes - only suggests moves to keep root clean
 */

import fs from 'fs';
import path from 'path';

// Essential files that should stay in root
const ESSENTIAL_FILES = [
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'tsconfig.json',
  'eslint.config.mjs',
  'postcss.config.mjs',
  'README.md',
  'node_modules',
  'src',
  'public',
  'scripts',
  '.husky',
  '.git',
  '.gitignore'
];

// File patterns that are likely temporary/development files
const TEMP_PATTERNS = [
  /\.tmp$/,
  /\.log$/,
  /\.bak$/,
  /\.old$/,
  /\.backup$/,
  /^temp/,
  /^tmp/,
  /^debug/,
  /^test-/,
  /\.md$/,
  /\.txt$/,
  /\.json$/,
  /\.js$/,
  /\.html$/,
  /\.css$/
];

function getRootFiles() {
  try {
    return fs.readdirSync(process.cwd())
      .filter(item => {
        const stat = fs.statSync(path.join(process.cwd(), item));
        return stat.isFile();
      });
  } catch {
    return [];
  }
}

function shouldSuggestMove(filename) {
  // Skip essential files
  if (ESSENTIAL_FILES.includes(filename)) {
    return false;
  }
  
  // Check if it matches temp patterns
  return TEMP_PATTERNS.some(pattern => pattern.test(filename));
}

function main() {
  const rootFiles = getRootFiles();
  const suggestions = rootFiles.filter(shouldSuggestMove);
  
  if (suggestions.length === 0) {
    return; // No suggestions, exit silently
  }
  
  console.log('\n🧹 Root directory cleanup suggestions:');
  console.log('   Consider moving these files to "dev stuff/":\n');
  
  suggestions.forEach(file => {
    console.log(`   📄 ${file}`);
  });
  
  console.log('\n💡 To move files:');
  console.log('   mkdir -p "dev stuff/temp"');
  suggestions.forEach(file => {
    console.log(`   mv "${file}" "dev stuff/temp/"`);
  });
  
  console.log('\n✨ Keep your root directory clean!');
}

// Run main function if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { shouldSuggestMove, getRootFiles };
