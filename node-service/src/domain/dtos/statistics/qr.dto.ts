export class QRDto {

    private constructor(
        public readonly q: number[][],
        public readonly r: number[][],
    ) { }

    static create(object: { [key: string]: any }): [string?, QRDto?] {

        const { q, r } = object;

        if (!q) return ['Missing q matrix'];
        if (!r) return ['Missing r matrix'];

        if (!Array.isArray(q)) return ['Q must be an array'];
        if (!Array.isArray(r)) return ['R must be an array'];

        return [
            undefined,
            new QRDto(q, r)
        ];
    }
}