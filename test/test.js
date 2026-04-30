import fs from 'fs';
import vm from 'vm';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The production cluster.js attaches its API to `window` so it can be loaded
// via a plain <script> tag in the browser. Replicate that environment here.
const clusterCode = fs.readFileSync(
    path.join(__dirname, '../web/cluster-tool/js/cluster.js'),
    'utf8'
);
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(clusterCode, sandbox);
const { drdCalculate } = sandbox.window;

const csvData = fs.readFileSync('test/test_data.csv', 'utf8');
const rows = csvData.split('\n').slice(1);

let passed = 0;
let failed = 0;

const header = [
    "nipping",
    "biting",
    "snapping",
    "barking",
    "lunging",
    "whining",
    "growling",
    "snarling",
    "stiff_posture"
];

for (const row of rows) {
    if (!row) continue;

    const values = row.split(',');
    const dogId = values[0];
    const expectedCluster = parseInt(values[values.length - 1]);

    const input = {};
    for (let i = 0; i < header.length; i++) {
        input[header[i]] = parseInt(values[i + 1]);
    }

    const actualCluster = drdCalculate(input).cluster;

    try {
        assert.strictEqual(actualCluster, expectedCluster);
        passed++;
    } catch (error) {
        console.error(`Test failed for dog ${dogId}: Expected cluster ${expectedCluster}, but got ${actualCluster}`);
        failed++;
    }
}

console.log(`Tests complete. Passed: ${passed}, Failed: ${failed}`);

if (failed > 0) {
    process.exit(1);
}
