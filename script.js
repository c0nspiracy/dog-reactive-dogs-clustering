const BEHAVIOURS = {
    nipping: "Nipping",
    biting: "Biting",
    snapping: "Snapping",
    barking: "Barking",
    lunging: "Lunging",
    whining: "Whining",
    growling: "Growling",
    snarling: "Snarling (lip curled up)",
    stiff_posture: "Stiff posture with raised hackles and intense staring"
};

const PC1_LOADING = {
    nipping: 0.873,
    biting: 0.855,
    snapping: 0.629,
    barking: -0.128,
    lunging: 0.108,
    whining: 0.096,
    growling: -0.038,
    snarling: 0.225,
    stiff_posture: 0.041
};

const PC2_LOADING = {
    nipping: 0.046,
    biting: 0.029,
    snapping: -0.038,
    barking: 0.766,
    lunging: 0.738,
    whining: 0.641,
    growling: 0.06,
    snarling: -0.161,
    stiff_posture: 0.144
};

const PC3_LOADING = {
    nipping: -0.027,
    biting: -0.043,
    snapping: 0.324,
    barking: 0.245,
    lunging: 0.15,
    whining: -0.292,
    growling: 0.822,
    snarling: 0.722,
    stiff_posture: 0.58
};

const MEAN_PC1 = {
    1: 0.3472,
    2: 0.7747,
    3: 1.7016,
    4: 3.2282
};

const MEAN_PC2 = {
    1: 1.8517,
    2: 3.6694,
    3: 1.9332,
    4: 3.5188
};

const MEAN_PC3 = {
    1: 1.1995,
    2: 2.0571,
    3: 2.6665,
    4: 4.1659
};

const form = document.getElementById('behavior-form');
const assignedClusterSpan = document.getElementById('assigned-cluster');
const resetButton = document.getElementById('reset-button');

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

    const pc1 = Object.keys(input).reduce((sum, key) => sum + (PC1_LOADING[key] * input[key]), 0);
    const pc2 = Object.keys(input).reduce((sum, key) => sum + (PC2_LOADING[key] * input[key]), 0);
    const pc3 = Object.keys(input).reduce((sum, key) => sum + (PC3_LOADING[key] * input[key]), 0);

    let minDistance = Infinity;
    let assignedCluster = null;

    for (let i = 1; i <= 4; i++) {
        const distance = Math.sqrt(
            Math.pow(pc1 - MEAN_PC1[i], 2) +
            Math.pow(pc2 - MEAN_PC2[i], 2) +
            Math.pow(pc3 - MEAN_PC3[i], 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            assignedCluster = i;
        }
    }

    assignedClusterSpan.textContent = assignedCluster;
}

form.addEventListener('change', calculateCluster);
resetButton.addEventListener('click', resetForm);

document.addEventListener('DOMContentLoaded', () => {
    calculateCluster();
});