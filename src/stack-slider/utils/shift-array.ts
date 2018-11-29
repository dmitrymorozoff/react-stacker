export const shiftArray = (array: any[], places: number) => {
    for (let i = 0; i < places; i++) {
        const first: any = array.shift();
        array.push(first);
    }
};
