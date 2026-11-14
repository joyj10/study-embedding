import { corpus } from "./corpus";
import {buildVocab, tokenize} from "./vocab";


console.log("Corpus length:", corpus.length);

const v = buildVocab(tokenize(corpus));
console.log("Vocab size:", v.idx2word.length); // 고유 단어 갯수
console.log("Vocab size:", v.idx2word);