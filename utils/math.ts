export const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
export const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
export const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);
