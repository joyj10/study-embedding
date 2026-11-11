/**
 * Ollama 서버를 이용해 텍스트를 임베딩 벡터로 변환하는 함수 클래스.
 * 기본적으로 로컬 Ollama(http://localhost:11434)의 bge-m3 모델을 사용한다.
 */
export class OllamaEmbeddingFunction {
    private url: string;
    private model: string;

    /**
     * @param options.url   Ollama 서버 주소. 생략 시 http://localhost:11434
     * @param options.model 사용할 임베딩 모델 이름. 생략 시 bge-m3
     */
    constructor(options: { url?: string; model?: string } = {}) {
        this.url = options.url ?? "http://localhost:11434";
        this.model = options.model ?? "bge-m3";
    }

    /**
     * 임베딩 함수의 식별자를 반환한다. 모델이 바뀌면 이름도 바뀐다.
     * 예: "ollama-bge-m3"
     */
    name(): string {
        return `ollama-${this.model}`;
    }

    /**
     * 입력 문자열 배열을 Ollama `/api/embed` 엔드포인트로 보내 각 문자열의 임베딩 벡터를 받아온다.
     *
     * @param texts 임베딩할 문자열 배열
     * @returns 입력 순서와 같은 순서로 정렬된 임베딩 벡터 배열 (number[][])
     * @throws Ollama 응답이 실패(HTTP 오류)이면 상태 코드를 담은 Error를 던진다.
     */
    async generate(texts: string[]): Promise<number[][]> {
        const response = await fetch(`${this.url}/api/embed`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: this.model, input: texts }),
        });
        if (!response.ok) throw new Error(`Ollama 요청 실패: ${response.status}`);
        const data = (await response.json()) as { embeddings: number[][] };
        return data.embeddings;
    }
}