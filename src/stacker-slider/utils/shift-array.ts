export const shiftArray = (array: any[], places: number, direction: number) => {
    for (let i = 0; i < places; i++) {
        if (direction > 0) {
            const first: any = array.pop();
            array.unshift(first);
        } else {
            const first: any = array.shift();
            array.push(first);
        }
    }
};
