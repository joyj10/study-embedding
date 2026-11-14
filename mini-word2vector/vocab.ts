const PARTICLES = ["으로", "에서", "에게", "까지", "부터", "처럼", "마다", "은", "는", "이", "가", "을", "를", "와", "과", "로", "의", "에", "도", "만"].sort((a, b) => b.length - a.length);
// "에서"라는 조사가 "에"

function stripParticle(token: string): string {
    for (const p of PARTICLES) {
        if (token.length > p.length && token.endsWith(p)) return token.slice(0, -p.length);
    }
    return token;
}

export function tokenize(sentences: string[]): string[][] {
    // 150문장 -> string[][]
    return sentences.map((s) => s.trim().split(/\s+/).filter(Boolean).map(stripParticle));
}

export interface Vocab {
    word2idx: Map<string, number>;
    idx2word: string[];
    counts: number[];
}

export function buildVocab(tokenized: string[][], minCount = 1): Vocab {
    const freq = new Map<string, number>();
    for (const sent of tokenized) for (const w of sent) freq.set(w, (freq.get(w) ?? 0) + 1);
    const idx2word: string[] = []; const counts: number[] = []; const word2idx = new Map<string, number>();
    for (const [w, c] of freq) { if (c < minCount) continue; word2idx.set(w, idx2word.length); idx2word.push(w); counts.push(c); }
    return { word2idx, idx2word, counts };
}

export function toIndices(tokenized: string[][], vocab: Vocab): number[][] {
    return tokenized.map((sent) => sent.map((w) => vocab.word2idx.get(w)).filter((i): i is number => i !== undefined));
}

// 이번 예제에서는 150개의 문장이라 토큰 마지막에 붙은 조사(가, 은, 를 등)를 제거하는 간단한 방법정도로 만들 예정
// "고양이가", "고양이를", "고양이와" -> "고양이" 이걸로 통일

// 일반적으로는 한국어는 형태소 분석기를 써서 "고양이"라는 단어를 추출하는게 좋다. (언어적 특성을 알아야 함)