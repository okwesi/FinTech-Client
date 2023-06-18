const isAnyEmpty = (values: Array<string | Date | null | undefined>): boolean => {
    return values.some((value) => {
        return value === null || value === undefined || value === '';
    });
};

export default isAnyEmpty;