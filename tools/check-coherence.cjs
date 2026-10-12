/**
 * Informa de como se ha traducido cada termino de la lista en todo el pack, para
 * detectar un mismo termino ingles escrito de dos formas distintas.
 *
 * Uso: node check-coherence.cjs <dir de diccionarios>
 */
'use strict';
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const TERMS = ['plugin', 'prompt', 'token', 'commit', 'workspace', 'branch', 'model',
  'subagent', 'settings', 'tool call', 'session', 'skill', 'goal', 'job'];

const found = new Map(TERMS.map((t) => [t, new Map()]));
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  for (const [ns, dict] of Object.entries(data)) {
    for (const [key, value] of Object.entries(dict)) {
      if (typeof value !== 'string') continue;
      for (const term of TERMS) {
        for (const match of value.matchAll(new RegExp('([\\p{L}]+)\\s+(?=' + term + ')', 'giu'))) {
          found.get(term).set(match[1].toLowerCase(), (found.get(term).get(match[1].toLowerCase()) || 0) + 1);
        }
      }
    }
  }
}

for (const [term, words] of found) {
  const list = [...words.entries()].sort((a, b) => b[1] - a[1]).map(([w, n]) => w + '(' + n + ')');
  console.log(term.padEnd(12) + (list.length ? list.join(' ') : '(sin traduccion adyacente)'));
}
