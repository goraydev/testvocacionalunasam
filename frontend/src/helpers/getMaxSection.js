export const getMaxSection = (sectionScores) => {
  let maxSum = -1;
  let maxSections = [];

  for (const { section_id, score } of sectionScores) {
    if (score > maxSum) {
      maxSum = score;
      maxSections = [{ section_id, score }];
    } else if (score === maxSum) {
      maxSections.push({ section_id, score });
    }
  }

  return maxSections;
};
