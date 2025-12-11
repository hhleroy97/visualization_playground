export type VolumeCell = { x: number; y: number; z: number; value: number };

export const volumeGridSize = 10;
export const volumeSteps = 9;

const cells: VolumeCell[] = [];
for (let z = 0; z < volumeSteps; z++) {
  for (let y = 0; y < volumeSteps; y++) {
    for (let x = 0; x < volumeSteps; x++) {
      const nx = x / (volumeSteps - 1) - 0.5;
      const ny = y / (volumeSteps - 1) - 0.5;
      const nz = z / (volumeSteps - 1) - 0.5;
      const r = Math.sqrt(nx * nx + ny * ny + nz * nz);
      const wave =
        Math.sin((nx + nz) * Math.PI * 3) * 0.4 +
        Math.cos((ny - nz) * Math.PI * 2) * 0.3;
      const value = Math.exp(-r * 3) + wave * 0.4;
      cells.push({ x, y, z, value });
    }
  }
}

export const volumeField = cells;

