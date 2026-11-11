import { OllamaEmbeddingFunction } from "./ollama-embedding.js";

// 기본 설정(http://localhost:11434, bge-m3)으로 임베딩 함수를 만든다.
const embedder = new OllamaEmbeddingFunction();

/**
 * 두 벡터의 내적(dot product)을 계산한다.
 * 같은 위치의 원소끼리 곱한 뒤 모두 더한다.
 */
function dot(a: number[], b: number[]): number {
    return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}

/**
 * 벡터의 길이(L2 norm)를 계산한다. 자기 자신과의 내적에 제곱근을 씌운 값이다.
 */
function norm(a: number[]): number {
    return Math.sqrt(dot(a, a));
}

/**
 * 코사인 유사도를 계산한다.
 * 두 벡터 사이 각도의 코사인 값으로, 방향이 같을수록 1에 가깝고 무관할수록 0에 가깝다.
 * 벡터 길이는 나눠서 무시하므로 의미 비교만 남는다.
 */
function cosineSimilarity(a: number[], b: number[]): number {
    return dot(a, b) / (norm(a) * norm(b));
}

// 비교할 문장들. texts[0]이 기준 문장이고, 나머지는 기준과 얼마나 가까운지 비교한다.
// 1,2번은 같은 경제(주식) 주제라 기준과 유사도가 높아야 하고,
// 3번은 먹는 것 이야기라 기준(경제)과는 유사도가 낮아야 한다.
const texts = [
    "기준 금리 인상으로 주식 시장이 하락했다",
    "코스피 지수가 외국인 매도로 크게 떨어졌다",
    "AI가 발전하면서 인공지능 관련 주식이 급등했다",
    "점심으로 김치찌개와 공기밥을 먹었다",
];

// 모든 문장을 한 번의 요청으로 임베딩한다. 결과는 입력 순서와 같은 순서의 벡터 배열이다.
const vectors = await embedder.generate(texts);

// 임베딩 차원 수를 출력한다. bge-m3는 보통 1024차원이다.
console.log("차원:", vectors[0].length);

// 기준 문장(0번)과 나머지 문장들의 코사인 유사도를 소수점 셋째 자리까지 출력한다.
for (let i = 1; i < texts.length; i++) {
    const sim = cosineSimilarity(vectors[0], vectors[i]);
    console.log(`cosine(기준, "${texts[i]}"):`, sim.toFixed(3));
}