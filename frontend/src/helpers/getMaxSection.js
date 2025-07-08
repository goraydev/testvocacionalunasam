export const getMaxSection = (dataSumSections) => {
    let maxSection = null;
    let maxSum = -1;

    for (const [section, sum] of Object.entries(dataSumSections)) {
        if (sum > maxSum) {
            maxSum = sum;
            maxSection = section;
        }
    }

    return {
        section: maxSection,
        sum: maxSum
    };
}
