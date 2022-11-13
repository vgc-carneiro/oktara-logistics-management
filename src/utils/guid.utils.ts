const isHEX = (h) => !isNaN(parseInt(h, 16));
const RFC4122Len = [8, 4, 4, 4, 12];

const isGuidValid = (guid) => {
  const codePointLenght = [...guid].length;
  if (codePointLenght !== 36) return false;

  const groups = guid.split('-');
  if (groups.length !== 5) return false;

  const lenMatch = groups
    .map((gr) => [...gr].length)
    .every((len, i) => len === RFC4122Len[i]);
  if (!lenMatch) return false;

  return [...groups.join('')].every(isHEX);
};

export { isGuidValid };
