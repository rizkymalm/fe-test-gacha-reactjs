interface RandomNumberProps {
    min: number;
    max: number;
}
export function getRandomNumber({ min, max }: RandomNumberProps) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusiv
}

interface FormatCurrencyProps {
    value: number;
    currency: string;
    locale: string;
}

export function formatCurrency({
    value,
    currency,
    locale,
}: FormatCurrencyProps) {
    const formatter = value.toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    });
    return formatter;
}

export function decimalPlaces(number: number) {
    const result = Math.round(number * 100) / 1000;
    return result;
}

export function numberCeil(number: number) {
    const result = Math.ceil(number);
    return result;
}
