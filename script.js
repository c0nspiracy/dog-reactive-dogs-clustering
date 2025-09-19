import { calculateClusterFromData, BEHAVIOURS } from './cluster.js';

const form = document.getElementById('behavior-form');
const resetButton = document.getElementById('reset-button');


function showClusterInfo(cluster) {
    // Hide all cluster info sections
    document.querySelectorAll('.cluster-info').forEach(info => {
        info.classList.remove('active');
    });

    // Show the specific cluster info
    const clusterInfo = document.getElementById(`cluster-${cluster}-info`);
    if (clusterInfo) {
        clusterInfo.classList.add('active');
    }
}

function resetForm() {
    for (const key in BEHAVIOURS) {
        const neverRadio = document.getElementById(`${key}-0`);
        if (neverRadio) {
            neverRadio.checked = true;
        }
    }
    calculateCluster();
}

function calculateCluster() {
    const input = {};
    for (const key in BEHAVIOURS) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        input[key] = selected ? parseInt(selected.value) : 0;
    }

    const assignedCluster = calculateClusterFromData(input);
    showClusterInfo(assignedCluster);
}

form.addEventListener('change', calculateCluster);
resetButton.addEventListener('click', resetForm);

document.addEventListener('DOMContentLoaded', () => {
    calculateCluster();
});