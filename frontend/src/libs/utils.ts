export const toBMK = (num: any) => {
    num = parseInt(num, 10);
    if (isNaN(num)) {
        num = 0
    }
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B'; // Billions
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M'; // Millions
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K'; // Thousands
    }
    return num.toLocaleString(); // For numbers less than 1,000
}
