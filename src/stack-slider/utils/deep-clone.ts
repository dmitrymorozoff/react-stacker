export const deepClone = (oldCloner: any[]) => {
    const newCloner = [];
    for (const currentElement of oldCloner) {
        newCloner.push(JSON.parse(JSON.stringify(currentElement)));
    }
    return newCloner;
};
