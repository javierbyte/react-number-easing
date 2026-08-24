import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const javascriptEntry = readFileSync(packageJson.main, 'utf8');
const declarationEntry = readFileSync(packageJson.types, 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(packageJson.version),
  `Expected a semver version, got ${packageJson.version}`,
);
assert(packageJson.main === 'src/index.js', 'The legacy main entry moved');
assert(packageJson.types === 'src/index.d.ts', 'The types entry moved');
assert(packageJson.typings === packageJson.types, 'types and typings differ');
assert(packageJson.sideEffects === false, 'Package must remain side-effect free');
assert(
  javascriptEntry.startsWith("'use client';"),
  'The JavaScript entry is missing the client directive',
);
assert(
  declarationEntry.includes('export interface NumberEasingProps'),
  'NumberEasingProps is not exported',
);
assert(
  declarationEntry.includes('export type EaseName = TEaseTypes'),
  'EaseName is not exported',
);

const packed = spawnSync(
  'npm',
  ['pack', '--dry-run', '--json', '--ignore-scripts'],
  {
    encoding: 'utf8',
    env: {
      ...process.env,
      npm_config_cache: join(tmpdir(), 'react-number-easing-npm-cache'),
    },
  },
);

if (packed.status !== 0) {
  throw new Error(packed.stderr || 'npm pack --dry-run failed');
}

const packReport = JSON.parse(packed.stdout)[0];
const packedFiles = new Set(packReport.files.map(({ path }) => path));

// The tarball is an exact allowlist: consumers get the entry points and the
// docs, never the demo website, the tooling config, or the README assets.
const expectedFiles = [
  'CHANGELOG.md',
  'LICENSE',
  'README.md',
  'package.json',
  'src/index.d.ts',
  'src/index.js',
];

for (const requiredFile of expectedFiles) {
  assert(packedFiles.has(requiredFile), `${requiredFile} is missing from npm pack`);
}

const unexpectedFiles = [...packedFiles].filter(
  (path) => !expectedFiles.includes(path),
);

assert(
  unexpectedFiles.length === 0,
  `Unexpected files in npm pack: ${unexpectedFiles.join(', ')}`,
);

assert(
  !/\]\(assets\//.test(readFileSync('README.md', 'utf8')),
  'README links a relative asset that npm pack no longer ships',
);

console.log(
  `Package contract valid: ${packReport.entryCount} files, ${packReport.size} bytes`,
);
