export default function sumArrayObject(array: any[], field: string) {
    const result = array.reduce((total, value) => total + value[field], 0);
    return result;
}
