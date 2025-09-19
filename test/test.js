import fs from 'fs';
import assert from 'assert';
import { calculateClusterFromData } from './cluster.js';

const csvData = fs.readFileSync('test_data.csv', 'utf8');
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

    const actualCluster = calculateClusterFromData(input);

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
