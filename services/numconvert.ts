export function numberConvert(num: number): string | number {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(0) + " B";
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + " M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + " K";
    }

    return num;
}
