export const getMaxSection = (dataSumSections) => {
  let maxSum = -1;
  let maxSections = [];

  for (const [section, sum] of Object.entries(dataSumSections)) {
    if (sum > maxSum) {
      maxSum = sum;
      maxSections = [{ section, sum }];
    } else if (sum === maxSum) {
      maxSections.push({ section, sum });
    }
  }

  return maxSections;
};
