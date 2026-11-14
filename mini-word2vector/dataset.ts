export function buildPairs(indexed: number[][], window = 2): Array<[number, number]> {
    const pairs: Array<[number, number]> = [];

    for (const sent of indexed) {
        for (let i = 0; i < sent.length; i++) {
            for (let j = Math.max(0, i - window); j <= Math.min(sent.length - 1, i + window); j++) {
                if (j === i) continue;
                pairs.push([sent[i], sent[j]]); // [center, context]
            }
        }
    }

    // [센터 인덱스, 컨텍스트 인덱스]
    return pairs;
}

// "를", "이", "은"

export function makeNegativeSampler(counts: number[]): () => number {
    const weights = counts.map((c) => Math.pow(c, 0.75));
    const total = weights.reduce((a, b) => a + b, 0);
    const cumulative: number[] = [];

    // [0.5, 0.3, 0.2] -> [0.5, 0.8, 1.0]

    let acc = 0;

    for (const w of weights) { acc += w / total; cumulative.push(acc); }

    return () => {
        const r = Math.random();
        let lo = 0, hi = cumulative.length - 1;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (cumulative[mid] < r) lo = mid + 1; else hi = mid; }
        return lo;
    };

}