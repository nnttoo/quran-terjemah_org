
export function convertToUri(path: string): string {
    let uri = path.replace(/\\/g, '/');
    return `file:///${uri}`;
} 
