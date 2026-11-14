import { corpus } from "./corpus";
import {buildVocab, tokenize, toIndices} from "./vocab";
import { buildPairs, makeNegativeSampler } from './dataset.ts';

console.log("Corpus length:", corpus.length);

const v1 = buildVocab(tokenize(corpus));
console.log("Vocab size:", v1.idx2word.length); // 고유 단어 갯수
console.log("Vocab size:", v1.idx2word);

// 정답 쌍
const v2 = buildVocab(tokenize(corpus));
const idx = toIndices(tokenize(corpus), v2);
console.log('학습 쌍', buildPairs(idx, 2))

const sample = makeNegativeSampler(v2.counts);
const negativeIndex = sample();
console.log("Negative indices:", negativeIndex);