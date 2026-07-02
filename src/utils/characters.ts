export function charSubstr(char: string, start: number, length: number) {
    let result = char;
    if (char.length > length) {
        result = `${char.substring(start, length)}...`;
    }
    return result;
}

export function initialName(fullName: string) {
    const result: string[] = [];
    const splitName: string[] = fullName.split(' ');
    for (let i = 0; i < splitName.length; i++) {
        const name = splitName[i];
        if (name) {
            result.push(name.charAt(0));
        }
    }
    return result;
}
