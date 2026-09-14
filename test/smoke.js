// SEO hygiene smoke test. No deps, no server: reads the static files directly.
// Run: node test/smoke.js
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.join(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

assert.ok((sitemap.match(/<loc>/g) || []).length >= 1, 'sitemap.xml must have >=1 <loc> entry');
assert.ok(robots.includes('Sitemap:'), 'robots.txt must reference a Sitemap:');
assert.ok(/<h1/.test(home), 'index.html must contain an <h1');
assert.ok(home.includes('rel="canonical"'), 'index.html must contain rel="canonical"');

console.log('smoke test passed');
