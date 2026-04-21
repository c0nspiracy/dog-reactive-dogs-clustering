// Ported from c0nspiracy/dog-reactive-dogs-clustering — original cluster math
window.DRD_BEHAVIOURS = {
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

window.DRD_BEHAVIOUR_GROUPS = {
    oral: { label: "Oral attack", keys: ["nipping", "biting", "snapping"] },
    frustration: { label: "Frustration", keys: ["barking", "lunging", "whining"] },
    posturing: { label: "Posturing", keys: ["growling", "snarling", "stiff_posture"] },
};

window.DRD_CLUSTERS = {
    1: {
        name: "Low risk signallers",
        tag: "Cluster 1",
        severity: 1,
        profile: "Moderate frustration and posturing, low risk of oral attack. These dogs tend to avoid escalation and may prefer avoidance.",
        focus: "Give them time to process the situation, without making it more intense. Teach and reinforce turning away and looking back towards owner in order to disengage. Reward avoidance behaviours to build confidence in safer responses. Ensure your dog has a secure attachment to you.",
    },
    2: {
        name: "Frustrated escalators",
        tag: "Cluster 2",
        severity: 2,
        profile: "High frustration, moderate-to-high posturing, moderate risk of oral attack. Dogs in this group are more likely to escalate when arousal levels are high — this may be more likely if they are restrained e.g., on a lead.",
        focus: "Increase frustration tolerance by ensuring they have an effective coping strategy. Work may include counterconditioning (teaching an alternative response to other dogs) and desensitisation (gradual exposure to reduce arousal).",
    },
    3: {
        name: "Impulsive escalators",
        tag: "Cluster 3",
        severity: 3,
        profile: "Moderate frustration, but high posturing and risk of oral attack. These dogs are more willing to make physical contact, even without high frustration. This may relate to traits such as impulsivity, poor risk assessment, or reinforcement history.",
        focus: "Reduce impulsivity and encourage healthy decision making to reduce the risk of putting themselves in a dangerous situation. Long-term work may include consistent reinforcement of self-control (appropriate uncued responses) and ultimately appropriate behaviours when seeing other dogs at a distance.",
    },
    4: {
        name: "Risky rapid escalators",
        tag: "Cluster 4",
        severity: 4,
        profile: "Very high frustration, posturing, and risk of oral attack. These dogs escalate rapidly and represent the highest risk group.",
        focus: "We suggest professional assessment and treatment for this group.",
    },
};

const PC1_LOADING = { nipping: 0.873, biting: 0.855, snapping: 0.629, barking: -0.128, lunging: 0.108, whining: 0.096, growling: -0.038, snarling: 0.225, stiff_posture: 0.041 };
const PC2_LOADING = { nipping: 0.046, biting: 0.029, snapping: -0.038, barking: 0.766, lunging: 0.738, whining: 0.641, growling: 0.06, snarling: -0.161, stiff_posture: 0.144 };
const PC3_LOADING = { nipping: -0.027, biting: -0.043, snapping: 0.324, barking: 0.245, lunging: 0.15, whining: -0.292, growling: 0.822, snarling: 0.722, stiff_posture: 0.58 };
const MEAN_PC1 = { 1: 0.3472, 2: 0.7747, 3: 1.7016, 4: 3.2282 };
const MEAN_PC2 = { 1: 1.8517, 2: 3.6694, 3: 1.9332, 4: 3.5188 };
const MEAN_PC3 = { 1: 1.1995, 2: 2.0571, 3: 2.6665, 4: 4.1659 };

window.DRD_PC_LOADINGS = { PC1_LOADING, PC2_LOADING, PC3_LOADING };
window.DRD_PC_MEANS = { MEAN_PC1, MEAN_PC2, MEAN_PC3 };

window.drdCalculate = function(input) {
    const pc1 = Object.keys(input).reduce((s, k) => s + (PC1_LOADING[k] * input[k]), 0);
    const pc2 = Object.keys(input).reduce((s, k) => s + (PC2_LOADING[k] * input[k]), 0);
    const pc3 = Object.keys(input).reduce((s, k) => s + (PC3_LOADING[k] * input[k]), 0);
    let min = Infinity, assigned = 1;
    for (let i = 1; i <= 4; i++) {
        const d = Math.sqrt(
            Math.pow(pc1 - MEAN_PC1[i], 2) +
            Math.pow(pc2 - MEAN_PC2[i], 2) +
            Math.pow(pc3 - MEAN_PC3[i], 2)
        );
        if (d < min) { min = d; assigned = i; }
    }
    return { cluster: assigned, pc1, pc2, pc3, distance: min };
};

window.drdEmptyInput = function() {
    const o = {};
    for (const k of Object.keys(window.DRD_BEHAVIOURS)) o[k] = 0;
    return o;
};
