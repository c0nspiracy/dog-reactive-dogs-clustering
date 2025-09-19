# frozen_string_literal: true

require "json"

BEHAVIOURS = {
  nipping: "Nipping",
  biting: "Biting",
  snapping: "Snapping",
  barking: "Barking",
  lunging: "Lunging",
  whining: "Whining",
  growling: "Growling",
  snarling: "Snarling (lip curled up)",
  stiff_posture: "Stiff posture with raised hackles and intense staring"
}.freeze

PC1_LOADING = {
  nipping: 0.873,
  biting: 0.855,
  snapping: 0.629,
  barking: -0.128,
  lunging: 0.108,
  whining: 0.096,
  growling: -0.038,
  snarling: 0.225,
  stiff_posture: 0.041
}.freeze

PC2_LOADING = {
  nipping: 0.046,
  biting: 0.029,
  snapping: -0.038,
  barking: 0.766,
  lunging: 0.738,
  whining: 0.641,
  growling: 0.06,
  snarling: -0.161,
  stiff_posture: 0.144
}.freeze

PC3_LOADING = {
  nipping: -0.027,
  biting: -0.043,
  snapping: 0.324,
  barking: 0.245,
  lunging: 0.15,
  whining: -0.292,
  growling: 0.822,
  snarling: 0.722,
  stiff_posture: 0.58
}.freeze

MEAN_PC1 = {
  1 => 0.3472,
  2 => 0.7747,
  3 => 1.7016,
  4 => 3.2282
}.freeze

MEAN_PC2 = {
  1 => 1.8517,
  2 => 3.6694,
  3 => 1.9332,
  4 => 3.5188
}.freeze

MEAN_PC3 = {
  1 => 1.1995,
  2 => 2.0571,
  3 => 2.6665,
  4 => 4.1659
}

input = JSON.load_file("input.json", symbolize_names: true)
pc1_contribution = input.map { |behaviour, frequency| [behaviour, PC1_LOADING[behaviour] * frequency] }.to_h
pc2_contribution = input.map { |behaviour, frequency| [behaviour, PC2_LOADING[behaviour] * frequency] }.to_h
pc3_contribution = input.map { |behaviour, frequency| [behaviour, PC3_LOADING[behaviour] * frequency] }.to_h

pc1 = pc1_contribution.values.sum
pc2 = pc2_contribution.values.sum
pc3 = pc3_contribution.values.sum

distances = [1, 2, 3, 4].map do |cluster|
  score = Math.sqrt(((pc1 - MEAN_PC1[cluster]) ** 2) + ((pc2 - MEAN_PC2[cluster]) ** 2) + ((pc3 - MEAN_PC3[cluster]) ** 2))
  [cluster, score]
end.to_h

assigned_cluster = distances.min_by(&:last).first
puts "Cluster #{assigned_cluster}"
