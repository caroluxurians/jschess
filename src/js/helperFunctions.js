export const getPosFromDivId = (id) => ({ x: Number(id[1]), y: Number(id[2]) });

export const compareCoords = (set1, set2) => set1.x === set2.x && set1.y === set2.y;
