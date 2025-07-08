const sections = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
}

export const sumBySection = (data) => {
    const sectionSums = {};

    for (const [key, value] of Object.entries(data)) {
        const sectionMatch = key.match(/section_(\d+)_/);
        if (sectionMatch) {
            const sectionNumber = parseInt(sectionMatch[1]);
            const sectionKey = `section_${sections[sectionNumber]}`;

            if (!sectionSums[sectionKey]) {
                sectionSums[sectionKey] = 0;
            }

            sectionSums[sectionKey] += parseInt(value);
        }
    }

    return sectionSums;
}
