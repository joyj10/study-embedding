// 두 벡터의 내적(dot product): 대응하는 원소끼리 곱한 뒤 모두 더한 값
// 예) a=[1,2], b=[3,4] → 1*3 + 2*4 = 11
function dot(a: number[], b: number[]): number {
    return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}

// 벡터의 크기(L2 norm, 유클리드 노름): 자기 자신과의 내적에 제곱근을 씌운 값
// 원점에서 벡터 끝까지의 직선 거리와 같다. 예) [3,4] → 5
function norm(a: number[]): number {
    return Math.sqrt(dot(a, a));
}

// 유클리드 거리: 두 점 사이의 직선 거리
// 차이 벡터(a - b)의 크기를 구하는 것과 같다.
function euclideanDistance(a: number[], b: number[]): number {
    // 각 차원별 차이를 구한다. 예) a=[1,2], b=[4,6] → diff=[-3,-4]
    const diff = a.map((ai, i) => ai - b[i]);
    // 차이 벡터의 크기 = 두 점 사이 거리
    return Math.sqrt(dot(diff, diff));
}

// 코사인 유사도: 두 벡터가 가리키는 '방향'이 얼마나 비슷한지를 -1 ~ 1 사이 값으로 표현
// 값이 1에 가까우면 같은 방향, 0이면 직교(무관), -1이면 반대 방향.
// 벡터의 길이는 나눗셈으로 상쇄되므로 크기와 무관하게 방향만 비교한다.
// 공식: cos(θ) = (a·b) / (|a|·|b|)
function cosineSimilarity(a: number[], b: number[]): number {
    return dot(a, b) / (norm(a) * norm(b));
}

const v1 = [1, 2, 3];
const v2 = [2, 4, 6]; // v1과 같은 방향, 길이만 2배
const v3 = [-1, 0, 1];

// 유클리드 거리: v1과 v2는 값이 많이 다르므로 거리가 크게 나온다 (길이 차이 반영)
console.log("euclidean(v1, v2):", euclideanDistance(v1, v2).toFixed(3));
// 코사인 유사도: 방향이 완전히 같으므로 1이 나온다 (길이 차이는 무시됨)
console.log("cosine(v1, v2):", cosineSimilarity(v1, v2).toFixed(3));
// v1과 v3: 방향이 많이 다르므로 유사도가 낮게 나온다
console.log("cosine(v1, v3):", cosineSimilarity(v1, v3).toFixed(3));
// 코사인 유사도는 1에 가까울수록 방향이 비슷하고, 0에 가까울수록 직교, -1에 가까울수록 반대 방향임을 확인할 수 있음