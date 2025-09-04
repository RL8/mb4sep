#!/usr/bin/env node

/**
 * Component Convention Checker
 * 
 * This script helps enforce shadcn/ui conventions by:
 * 1. Checking for direct HTML elements where shadcn components should be used
 * 2. Verifying proper import paths
 * 3. Reporting violations
 */

import fs from 'fs';
import path from 'path';

// Components that should use shadcn/ui instead of native HTML
const SHADCN_REPLACEMENTS = {
  'button': '@/components/ui/button',
  'input': '@/components/ui/input',
  'textarea': '@/components/ui/textarea',
  'select': '@/components/ui/select',
  'checkbox': '@/components/ui/checkbox',
  'radio': '@/components/ui/radio',
  'switch': '@/components/ui/switch',
  'slider': '@/components/ui/slider',
  'progress': '@/components/ui/progress',
  'badge': '@/components/ui/badge',
  'avatar': '@/components/ui/avatar',
  'alert': '@/components/ui/alert',
  'dialog': '@/components/ui/dialog',
  'sheet': '@/components/ui/sheet',
  'popover': '@/components/ui/popover',
  'tooltip': '@/components/ui/tooltip',
  'dropdown-menu': '@/components/ui/dropdown-menu',
  'context-menu': '@/components/ui/context-menu',
  'navigation-menu': '@/components/ui/navigation-menu',
  'tabs': '@/components/ui/tabs',
  'accordion': '@/components/ui/accordion',
  'collapsible': '@/components/ui/collapsible',
  'separator': '@/components/ui/separator',
  'scroll-area': '@/components/ui/scroll-area',
  'table': '@/components/ui/table',
  'form': '@/components/ui/form',
  'label': '@/components/ui/label',
  'card': '@/components/ui/card',
  'skeleton': '@/components/ui/skeleton',
  'toast': '@/components/ui/toast',
  'sonner': '@/components/ui/sonner'
};

function findReactFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findReactFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  
  // Check for direct HTML elements that should use shadcn components
  for (const [htmlElement, shadcnPath] of Object.entries(SHADCN_REPLACEMENTS)) {
    const regex = new RegExp(`<${htmlElement}(\\s|>|\\s+[^>]*>)`, 'gi');
    const matches = content.match(regex);
    
    if (matches) {
      violations.push({
        type: 'native-html',
        element: htmlElement,
        replacement: shadcnPath,
        count: matches.length,
        file: filePath
      });
    }
  }
  
  // Check for incorrect import paths
  const importRegex = /import.*from\s+['"](@\/components\/[^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (!importPath.includes('/ui/') && importPath !== '@/components/ui') {
      violations.push({
        type: 'incorrect-import',
        importPath,
        file: filePath
      });
    }
  }
  
  return violations;
}

function main() {
  const srcDir = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('❌ src directory not found');
    process.exit(1);
  }
  
  console.log('🔍 Checking component conventions...\n');
  
  const files = findReactFiles(srcDir);
  const allViolations = [];
  
  for (const file of files) {
    const violations = checkFile(file);
    allViolations.push(...violations);
  }
  
  if (allViolations.length === 0) {
    console.log('✅ All component conventions are being followed!');
    return;
  }
  
  console.log(`❌ Found ${allViolations.length} convention violations:\n`);
  
  // Group violations by type
  const byType = allViolations.reduce((acc, violation) => {
    if (!acc[violation.type]) acc[violation.type] = [];
    acc[violation.type].push(violation);
    return acc;
  }, {});
  
  for (const [type, violations] of Object.entries(byType)) {
    if (type === 'native-html') {
      console.log('🚫 Native HTML elements found (use shadcn/ui instead):');
      violations.forEach(v => {
        console.log(`   ${v.file}:${v.element} → use ${v.replacement}`);
      });
    } else if (type === 'incorrect-import') {
      console.log('📦 Incorrect import paths:');
      violations.forEach(v => {
        console.log(`   ${v.file}: ${v.importPath} → should use @/components/ui/*`);
      });
    }
    console.log('');
  }
  
  console.log('💡 Run "npm run lint" to see ESLint violations');
  console.log('📖 Visit /gallery to see available components');
  
  process.exit(1);
}

// Run main function if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { checkFile, findReactFiles };
