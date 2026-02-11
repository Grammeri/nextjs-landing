import fs from 'node:fs';
import path from 'node:path';

const inputFile = 'tree.git.txt';
const outputFile = 'tree.pretty.txt';

if (!fs.existsSync(inputFile)) {
  console.error('❌ tree.git.txt not found in project root');
  process.exit(1);
}

const files = fs.readFileSync(inputFile, 'utf8').split(/\r?\n/).filter(Boolean);

const tree = {};

for (const file of files) {
  const parts = file.split('/');
  let current = tree;

  for (const part of parts) {
    current[part] = current[part] || {};
    current = current[part];
  }
}

const output = [];

function walk(node, prefix = '') {
  const keys = Object.keys(node).sort((a, b) => a.localeCompare(b));

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const connector = isLast ? '└─ ' : '├─ ';
    output.push(prefix + connector + key);

    const nextPrefix = prefix + (isLast ? '   ' : '│  ');
    walk(node[key], nextPrefix);
  });
}

const rootName = path.basename(process.cwd());
output.push(rootName + '/');

walk(tree);

fs.writeFileSync(outputFile, output.join('\n'), 'utf8');

console.log(`✅ Tree generated: ${outputFile}`);
