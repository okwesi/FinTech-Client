function getUTCDate(dateString: string): string {
    const date = new Date(dateString);
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return utcDate.toISOString().slice(0, 10);
}

export default getUTCDate;