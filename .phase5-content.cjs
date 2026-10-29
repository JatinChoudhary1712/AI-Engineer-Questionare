const {add,finish}=require('./.phase5-build.cjs');
add(1,'Tokenization - words, subwords, characters',`
What is tokenization in NLP?|Tokenization splits text into units that a model can process.|Words: Use whole words as units when the tokenizer supports them.|Subwords: Split words into reusable pieces to balance vocabulary size and coverage.|Characters: Use individual characters, usually producing longer sequences.|A token is a processing unit, not necessarily a word.
How do word, subword, and character tokenization differ?|They choose different-sized units and therefore different vocabulary and sequence lengths.|Word tokens: Easy to interpret but can leave unfamiliar words outside the vocabulary.|Subword tokens: Reuse pieces to represent many unfamiliar words.|Character tokens: Need a small character inventory but usually create more steps.|Smaller units improve coverage but often lengthen sequences.
`);
add(1,'Lowercasing, punctuation removal, whitespace normalization',`
What is text normalization?|Text normalization makes selected text variations consistent before processing.|Case: Lowercasing can merge words that differ only in capitalization.|Punctuation: Remove it only if the task does not need its information.|Whitespace: Standardize spaces or line breaks when their differences are irrelevant.|Normalize what is irrelevant; preserve what carries meaning.
Should every NLP pipeline lowercase text and remove punctuation?|No; preprocessing must match the task and the model's expected inputs.|Meaning: Capitalization and punctuation can change interpretation.|Pretrained models: Follow the checkpoint's tokenizer rather than cleaning blindly.|Validation: Compare preprocessing choices on representative examples.|Cleaning is a task-dependent choice, not a universal checklist.
`);
add(1,'Stopword removal - when to and when not to',`
What are stopwords, and why might we remove them?|Stopwords are frequent words that some traditional pipelines exclude to reduce unhelpful features.|Examples: Lists often include words such as the, a, and is.|Traditional uses: Removal may help some keyword-search or bag-of-words tasks.|Decision: Frequency alone does not prove a word is irrelevant.|A common word can still carry important information.
When should we keep stopwords?|Keep stopwords when they affect meaning or are expected by the model.|Negation: Removing not can reverse a sentiment statement.|Sequence models: Pretrained language models usually expect natural text with function words.|Tasks: Translation and grammatical analysis depend on words that a stopword list may remove.|Keep small words when the meaning depends on them.
`);
add(1,'Stemming vs Lemmatization',`
What is the difference between stemming and lemmatization?|Stemming applies word-cutting rules; lemmatization aims to return a word's dictionary form.|Stemming: Can produce fragments that are not real words.|Lemmatization: Uses vocabulary and often grammatical information.|Tradeoff: Choose according to language, task, and available linguistic tools.|A stem is a rule-based shortcut; a lemma is a linguistic base form.
Why can grammatical context matter for lemmatization?|The correct dictionary form can depend on the word's grammatical role and meaning.|Part of speech: The same spelling can belong to different grammatical categories.|Ambiguity: Saw can be a noun or a past-tense verb with lemma see.|Tools: A lemmatizer's result depends on its language resources and supplied context.|The right base form may require knowing how the word is used.
`);
add(1,'Sentence segmentation',`
What is sentence segmentation?|Sentence segmentation identifies sentence boundaries within a text.|Purpose: Break documents into units for later processing.|Cues: Use punctuation, abbreviations, and learned or rule-based context.|Uses: Support document analysis, sentence embeddings, and sentence-level evaluation.|Sentence segmentation decides where one sentence ends and the next begins.
Why is splitting on every period unreliable for sentence segmentation?|A period does not always mark the end of a sentence.|Abbreviations: Dr. and similar forms can occur inside a sentence.|Numbers: Decimal points are not sentence boundaries.|Context: Quotations and language-specific conventions need appropriate handling.|A period is a clue, not a complete boundary rule.
`);
add(1,'Handling special tokens: URLs, emails, hashtags',`
How should a preprocessing pipeline handle URLs, emails, and hashtags?|Choose whether to preserve, replace, or split these patterns according to the task.|Preserve: Keep exact values when they carry useful information.|Replace: Use consistent placeholders when only the pattern matters.|Hashtags: Consider whether the marker, text, or both matter for the task.|Handle patterns intentionally instead of deleting them blindly.
Why might we replace a URL with a placeholder?|A placeholder can retain the presence of a link without treating every address as a separate feature.|Generalization: Merge many task-irrelevant link strings.|Information: Keep that a URL occurred in the message.|Limitation: Replacement loses address details that could matter for phishing or domain analysis.|A placeholder keeps the pattern but removes its specific value.
`);
add(1,'Unicode and encoding issues (utf-8)',`
What is the difference between Unicode and UTF-8?|Unicode defines characters and code points; UTF-8 encodes those code points as bytes.|Characters: A visible symbol may involve one or several code points.|Encoding: UTF-8 represents code points with variable-length byte sequences.|Reading: Decode files with the encoding that was actually used to write them.|Unicode describes characters; UTF-8 stores them as bytes.
What causes garbled text or decoding errors?|Encoding mismatches and damaged byte sequences can make text unreadable or invalid.|Mismatch: Decoding bytes with the wrong encoding can produce incorrect characters.|Errors: Invalid byte sequences can raise exceptions instead of yielding text.|Handling: Use the correct encoding and inspect errors rather than silently discarding data.|Decode with the right encoding before cleaning the text.
`);
add(2,'Bag of Words (BoW)',`
What is a Bag of Words representation?|Bag of Words represents text using counts or presence of vocabulary items.|Vocabulary: Assign one feature position to each known term.|Values: Store how often a term appears, or whether it appears.|Limitation: Ordinary unigram BoW does not preserve word order.|BoW counts what appears, not the sequence it appears in.
Can Bag of Words distinguish sentences with the same words in different orders?|Unigram BoW cannot distinguish them when their word counts are identical.|Example: Dog bites man and man bites dog contain the same unigram counts.|Missing information: The representation loses who acted on whom.|Extension: Word n-grams can preserve some local ordering information.|Identical counts can hide different meanings.
`);
add(2,'TF-IDF - formula and intuition',`
What is TF-IDF?|TF-IDF weights a term by its frequency in a document and its rarity across documents.|TF: Measure how strongly the term occurs within the document.|IDF: Give less weight to terms found in many documents.|Variants: Implementations can use smoothing, logarithmic TF, and vector normalization.|Frequent here but rare across documents often means informative.|TF-IDF(term, doc) = TF(term, doc) * IDF(term)
Why does TF-IDF downweight words that appear in nearly every document?|Such words usually help less with distinguishing one document from another.|Document frequency: Count documents containing the term, not all occurrences.|Rarity: Terms in fewer documents receive a larger rarity weight.|Caution: Informative for retrieval does not automatically mean semantically important.|IDF rewards document-level rarity, not raw repetition.
`);
add(2,'N-grams - capturing context',`
What are n-grams?|N-grams are contiguous sequences of n units, such as words or characters.|Unigram: One unit, such as machine.|Bigram: Two consecutive units, such as machine learning.|Context: Larger n captures more local order but can create many sparse features.|N tells you how many adjacent units form one feature.
How do n-grams improve a simple text representation?|They add local word-order patterns that individual-word counts cannot capture.|Phrases: Treat not good differently from the separate words not and good.|Order: Distinguish some phrases with the same individual words.|Cost: More possible features require careful vocabulary and data management.|N-grams add local context at the cost of more features.
`);
add(2,'One-hot encoding - and why it fails at scale',`
What is one-hot encoding for tokens?|One-hot encoding represents a token with a vector containing one active position and zeros elsewhere.|Vocabulary: Give each token a separate coordinate.|Identity: The active position identifies which token occurred.|Limitation: It does not encode graded semantic similarity between different tokens.|One-hot represents identity, not meaning.
Why is a large one-hot vocabulary inconvenient?|Vocabulary-sized representations grow large and provide no shared semantic structure by themselves.|Dimensions: Each additional vocabulary item needs another coordinate.|Semantics: Different token vectors are equally orthogonal in the basic representation.|Storage: Sparse storage saves zeros, but does not create useful semantic relationships.|Sparse storage reduces memory; learned embeddings add shared structure.
`);
add(2,'Sparse vs dense representations',`
What is the difference between sparse and dense text representations?|Sparse vectors contain mostly zero entries; dense vectors typically use many nonzero coordinates.|Sparse: BoW and TF-IDF often have vocabulary-sized feature spaces.|Dense: Embeddings often use a smaller learned coordinate space.|Meaning: Dense does not automatically mean good; usefulness depends on training and the task.|Sparse describes many zeros; dense describes filled coordinates.
Are dense embeddings always better than sparse text features?|No; performance depends on the task, data, and evaluation conditions.|Exact terms: Sparse methods can be strong for keyword matching.|Semantics: Suitable dense models can help with paraphrases and related meanings.|Combination: Hybrid systems can benefit from both types of evidence.|Choose by measured task performance, not by vector type alone.
`);
add(3,'Why embeddings - dense, semantic vectors',`
What is a word embedding?|A word embedding is a learned dense vector representing a word in a numerical space.|Learning: Training determines which relationships the coordinates capture.|Similarity: Related usages may produce nearby vectors.|Use: Supply numerical inputs or similarity features for downstream tasks.|An embedding is a learned representation, not a dictionary definition.
Why use embeddings instead of raw token IDs?|Embeddings provide learned feature values, while token IDs are only arbitrary identifiers.|IDs: A larger integer does not mean a word is more important.|Lookup: An embedding table maps each known ID to a vector.|Relationships: Training can make useful patterns available to the model.|IDs identify tokens; embeddings represent them.
`);
add(3,'Word2Vec - CBOW vs Skip-gram',`
What is Word2Vec, and how do CBOW and Skip-gram differ?|Word2Vec learns word vectors from local word-prediction tasks.|CBOW: Predict a target word using surrounding context words.|Skip-gram: Predict surrounding context words using a target word.|Result: Reuse learned vectors as static word representations.|CBOW uses context to predict a word; Skip-gram uses a word to predict context.
Are Word2Vec vectors contextual embeddings?|Ordinary Word2Vec assigns each vocabulary word one learned vector, regardless of the current sentence.|Static lookup: Reuse the same stored vector for each occurrence.|Ambiguity: Bank has one vector even when used in different senses.|Contrast: Contextual models compute representations that depend on surrounding text.|Word2Vec learns from context but stores static word vectors.
`);
add(3,'GloVe - global co-occurrence statistics',`
What is GloVe?|GloVe learns word vectors using global word co-occurrence statistics from a corpus.|Counts: Record which words appear near one another.|Training: Fit vector relationships to information in the co-occurrence matrix.|Output: Produce reusable static word embeddings.|GloVe turns corpus-wide co-occurrence patterns into vectors.
How does GloVe differ from Word2Vec at a basic level?|GloVe explicitly fits global co-occurrence statistics, while Word2Vec trains local prediction tasks.|GloVe: Learn from a matrix summarizing corpus co-occurrences.|Word2Vec: Learn through context-word prediction objectives.|Common result: Both can yield useful static vectors with context-independent lookup.|Global statistics versus local prediction, both yielding word vectors.
`);
add(3,'FastText - subword embeddings, handles OOV',`
What is FastText's main idea for word embeddings?|FastText represents words using learned character n-gram information as well as word-level information.|Subwords: Reuse patterns inside related word spellings.|Composition: Combine subword vectors to form a word representation.|Coverage: Often construct vectors for words absent from the training vocabulary.|FastText shares information through pieces inside words.
How can FastText represent an out-of-vocabulary word?|It can compose a representation from character n-grams with learned vectors.|Breakdown: Extract the unfamiliar word's character pieces.|Reuse: Combine pieces that received useful training.|Limit: A constructed vector is not guaranteed to capture the word's actual meaning.|Subword coverage helps with unfamiliar spellings, not perfect understanding.
`);
add(3,'Cosine similarity on embeddings',`
What does cosine similarity measure?|Cosine similarity measures how closely two nonzero vectors point in the same direction.|Direction: Compare alignment rather than raw vector length.|Range: Mathematical values lie between minus one and one.|Interpretation: A useful semantic comparison requires embeddings trained for that purpose.|Cosine compares direction, not magnitude.|cosine(a, b) = dot(a, b) / (norm(a) * norm(b))
Does a high cosine similarity guarantee that two texts mean the same thing?|No; similarity reflects the embedding model and may miss important distinctions.|Negation: Similar wording with opposite meaning can still be close.|Task: A retrieval embedding and a word embedding need not encode the same relationships.|Edge case: Cosine is undefined when either vector has zero norm.|A similarity score is evidence to validate, not a semantic guarantee.
`);
add(3,'Analogy tasks: king - man + woman = queen',`
What is a word-embedding analogy task?|An analogy task tests whether vector offsets reflect a relationship between words.|Operation: Subtract one word vector and add another.|Search: Find a nearby vocabulary vector to the resulting vector.|Example: The classic king-minus-man-plus-woman illustration may retrieve queen for some embeddings.|Analogy arithmetic is an empirical pattern, not an exact language law.
Why should we treat embedding analogy results cautiously?|They depend on training data, the evaluation method, and which relationships the model captures.|Reliability: Not every analogy is solved correctly or consistently.|Bias: Learned vector relationships can reflect stereotypes in the corpus.|Meaning: One successful result does not prove broad reasoning ability.|A neat analogy can coexist with errors and bias.
`);
add(3,'Static vs contextual embeddings',`
How do static and contextual embeddings differ?|Static embeddings reuse one vector per word; contextual embeddings vary with surrounding text.|Static: Word2Vec and GloVe usually return fixed vocabulary vectors.|Contextual: A model such as BERT computes position-specific representations.|Benefit: Context can help distinguish different uses of the same word.|Static vectors identify a word; contextual vectors represent its current use.
Why does context matter when representing an ambiguous word?|The same word can express different meanings in different sentences.|Example: Bank in a river description differs from bank in a finance discussion.|Static limit: One stored word vector merges these usages.|Contextual approach: Neighboring words influence the representation of that occurrence.|The sentence helps determine which meaning is relevant.
`);
add(4,'Byte Pair Encoding (BPE) - used in GPT',`
What is Byte Pair Encoding in tokenization?|BPE builds a reusable subword vocabulary by repeatedly merging frequent adjacent pieces during training.|Start: Begin with small units, which may be characters or bytes depending on the tokenizer.|Merge: Add frequent adjacent combinations to the learned vocabulary.|Tokenize: Apply the learned tokenizer to new text using its own rules.|BPE learns useful larger pieces from smaller units.
Why is byte-level BPE useful for text coverage?|Byte-level BPE starts from a byte inventory that can encode arbitrary valid text bytes.|Coverage: Represent unfamiliar words without requiring a whole-word vocabulary entry.|Efficiency: Learned merges compress common byte patterns into fewer tokens.|Limit: An unfamiliar script or spelling may still require many tokens.|Byte coverage avoids missing word entries, not long token sequences.
`);
add(4,'WordPiece - used in BERT',`
What is WordPiece tokenization?|WordPiece is a subword tokenization approach used by the original BERT tokenizers.|Vocabulary: Reuse pieces rather than storing only whole words.|Splitting: A word can map to several vocabulary entries.|Convention: Original BERT-style tokenizers often mark continuation pieces with two hash characters.|WordPiece represents many words using a shared piece vocabulary.
Does WordPiece always guarantee a representation for every word?|Not necessarily; coverage depends on the vocabulary and tokenizer rules.|Unknowns: Some WordPiece tokenizers return an unknown-token marker for an unsegmentable word.|Vocabulary: Learned pieces determine which spellings can be represented.|Comparison: Byte-level tokenizers can offer different coverage behavior.|Subword tokenization reduces unknowns but does not always eliminate them.
`);
add(4,'SentencePiece - used in T5, LLaMA',`
What is SentencePiece?|SentencePiece is a tokenizer toolkit that can train models such as unigram tokenization or BPE directly from raw text.|Toolkit: It is not one single tokenization algorithm.|Text handling: It represents whitespace so segmentation need not depend on splitting at spaces first.|Examples: T5 and earlier LLaMA versions use SentencePiece-based tokenizers.|SentencePiece is a toolkit; the checkpoint determines the actual algorithm.
Do all LLaMA versions use the same tokenizer?|No; tokenizer choices can change across model generations.|Earlier models: LLaMA 1 and 2 use SentencePiece-based tokenization.|LLaMA 3: Uses a different BPE tokenizer based on tiktoken.|Compatibility: Load the tokenizer matching the exact checkpoint.|A model-family name does not guarantee one tokenizer forever.
`);
add(4,'Special tokens: [CLS], [SEP], [PAD], [MASK], <eos>, <bos>',`
What are special tokens?|Special tokens are reserved vocabulary items that signal structure or a model-specific role.|BERT-style markers: CLS, SEP, and MASK have roles defined by the training setup.|Padding: PAD fills unused positions in a batch and is commonly paired with an attention mask.|Boundaries: BOS and EOS can mark sequence starts and ends when the tokenizer uses them.|Special-token meaning depends on the model, not just its spelling.
Why must we handle padding and attention masks together?|Padding makes batch shapes compatible, while the mask tells a model which positions should be ignored.|Batching: Shorter examples may be extended to the batch length.|Mask: Distinguish real input positions from padding according to the API convention.|Loss: Padded target positions may also need exclusion from the training objective.|Padding fills space; masks prevent that space from becoming evidence.
`);
add(4,'Token IDs - how text maps to integers',`
What is a token ID?|A token ID is the integer index assigned to a token in a particular tokenizer's vocabulary.|Mapping: A tokenizer converts text pieces into their corresponding indices.|Embedding: The model looks up vectors using those indices.|Meaning: The numerical size of an ID does not measure semantic importance.|Token IDs are vocabulary addresses, not meanings.
Can the same text have different token IDs in different models?|Yes; different tokenizers can segment text differently and use different vocabulary mappings.|Pieces: One tokenizer may use one token where another uses several.|Indices: Even equivalent pieces can have different IDs.|Rule: Keep model weights and tokenizer configuration compatible.|The IDs belong to the tokenizer, not universally to the text.
`);
add(4,'Vocabulary size tradeoffs',`
What changes when a tokenizer's vocabulary size increases?|A larger vocabulary can shorten token sequences while increasing vocabulary-dependent model costs.|Sequence length: More common strings may fit into single tokens.|Parameters: Embedding and output layers generally grow with vocabulary size.|Coverage: Benefits vary across languages, domains, and the learned vocabulary.|More entries can mean fewer tokens but larger vocabulary layers.
Is the largest possible tokenizer vocabulary always best?|No; vocabulary design balances sequence length, model size, coverage, and training efficiency.|Small vocabulary: Reuse many small units but often create longer sequences.|Large vocabulary: Store more entries, including ones with fewer training examples.|Choice: Evaluate the languages and domains the model must handle.|Choose an effective vocabulary, not simply the biggest one.
`);
add(5,'Why transformers replaced RNNs - parallelism and long-range attention',`
Why did transformers become popular for language modeling?|Transformers allow direct attention across positions and parallel computation across training tokens.|Parallel training: Process many positions together instead of recurrently updating one state at a time.|Connections: Attention can link distant tokens without a long recurrent chain.|Tradeoff: Standard full attention can be expensive for long sequences; RNNs still have useful applications.|Transformers improve training parallelism and direct context access.
Are transformer generation steps all parallel?|Ordinary autoregressive generation still produces new tokens sequentially.|Training: Known target sequences allow parallel token-position computation with causal masks.|Generation: Each next token depends on the previously generated tokens.|Distinction: Parallel work within a step is different from generating all unknown future tokens at once.|Parallel training does not imply fully parallel autoregressive generation.
`);
add(5,'Self-attention - every token attending to every other',`
What is self-attention?|Self-attention updates token representations by combining information from positions in the same sequence.|Queries: Each position asks what information is relevant.|Weights: Scores determine how much each allowed position contributes.|Masks: Causal or padding masks restrict which positions can contribute.|Self-attention lets sequence positions exchange relevant information.
Can every token always attend to every other token?|Only positions allowed by the model's attention pattern and masks can contribute.|Encoder attention: Often lets a real token access both left and right context.|Causal attention: Blocks access to future positions.|Padding: Masks can exclude padded positions from attention.|Attention access is defined by masks, not assumed to be unrestricted.
`);
add(5,'Query, Key, Value (Q, K, V) - intuition and matrix formulation',`
What do queries, keys, and values represent in attention?|Queries ask for information, keys indicate relevance, and values contain the information to combine.|Query: A learned representation of what the current position needs.|Key: A learned representation used to score a candidate position.|Value: A learned representation added to the weighted context.|Query asks, key matches, value supplies.
How are Q, K, and V computed in self-attention?|Learned linear projections transform the input representations into queries, keys, and values.|Shared input: Start with the current sequence representation matrix X.|Parameters: Use different learned projection matrices for the three roles.|Heads: Different heads can use different projected representation spaces.|Same input representations, three learned projections.|Q = X * W_Q; K = X * W_K; V = X * W_V
`);
add(5,'Attention score: softmax(QKᵀ / √d_k) * V',`
How does scaled dot-product attention combine Q, K, and V?|It scores query-key matches, scales and normalizes the scores, then combines value vectors.|Scores: Multiply queries by transposed keys to compare positions.|Scaling: Divide by the square root of key dimension to moderate score magnitudes.|Combination: Apply softmax across allowed key positions and multiply by values.|Match, scale, normalize, then mix values.
Why divide attention scores by the square root of key dimension?|Scaling helps prevent dot-product magnitudes from growing too large as key dimension increases.|Magnitude: More terms in a dot product can increase its variance under common assumptions.|Softmax: Very large differences can make weights excessively concentrated.|Training: Better-scaled scores can make gradients easier to use.|Scaling keeps attention scores in a more manageable range.
`);
add(5,'Multi-head attention - attending to different aspects',`
What is multi-head attention?|Multi-head attention computes several attention outputs using different learned projections and then combines them.|Heads: Learn multiple representation subspaces.|Parallel outputs: Each head can emphasize different relationships.|Combination: Concatenate or otherwise assemble the outputs and apply a learned projection.|Multiple heads provide multiple learned views of the sequence.
Do different attention heads always learn clearly different linguistic roles?|No; separate projections allow specialization but do not guarantee distinct interpretable roles.|Possibility: A head may emphasize position, syntax, or another useful pattern.|Overlap: Different heads can learn similar or redundant behavior.|Interpretation: Inspect behavior instead of assigning fixed meanings to heads.|Separate heads allow diversity; they do not guarantee neat explanations.
`);
add(5,'Positional encoding - injecting order',`
Why does a transformer need positional information?|Attention alone does not provide an intrinsic sequence order, so the model needs position information.|Problem: The same token collection can express different meanings in different orders.|Approaches: Add position embeddings or use relative or rotary position mechanisms.|Use: Let the model distinguish where tokens occur and how positions relate.|Attention supplies content relationships; positional methods supply order.
Are sinusoidal position encodings the only way to represent order?|No; transformers use several positional approaches.|Sinusoidal: Use fixed wave-based patterns, as in the original transformer.|Learned positions: Train position-specific embedding values.|Other approaches: Relative position biases and rotary embeddings encode positional relationships differently.|Position information is essential; its implementation can vary.
`);
add(5,'Feed-forward sublayer',`
What does the transformer feed-forward sublayer do?|It applies a learned non-linear feature transformation to each token representation.|Per position: Process each token separately within this sublayer.|Parameters: Usually share the same feed-forward weights across positions.|Activation: Use a non-linear function or gated construction between projections.|Attention mixes positions; feed-forward layers transform features.
Does the standard feed-forward sublayer directly exchange information between tokens?|No; the standard position-wise sublayer transforms each position independently.|Input: Receive token representations already influenced by earlier layers.|Transformation: Apply the same network to each position.|Contrast: Attention is the sublayer that directly mixes information across allowed positions.|Position-wise means shared computation without direct cross-token mixing.
`);
add(5,'Layer normalization and residual connections',`
Why do transformer blocks use normalization and residual connections?|They help manage representation scales and make deep networks easier to optimize.|Residual path: Add a learned change to a shortcut representation.|Normalization: Stabilize feature scales within a position.|Variants: Placement and normalization type vary; some models use RMSNorm instead of LayerNorm.|Shortcuts help information flow; normalization helps control scales.
Does every transformer place LayerNorm in the same location?|No; pre-normalization and post-normalization designs place it differently.|Pre-norm: Normalize inputs before a block's attention or feed-forward transformation.|Post-norm: Normalize after combining the transformation and residual path.|Model dependence: Follow the architecture definition rather than assuming one universal block order.|The normalization idea is shared; block layout can differ.
`);
add(5,'Encoder-only (BERT-style) - understanding tasks',`
What is an encoder-only transformer?|An encoder-only transformer builds contextual input representations, usually with access to both directions.|Context: Each allowed input position can use left and right information.|Tasks: Add suitable heads for classification, token labeling, or extractive question answering.|Example: BERT is a widely used encoder-only design.|Encoder-only models are a natural fit for input-understanding tasks.
How does an encoder-only model perform classification?|A task head maps a suitable sequence representation to class scores.|Representation: Obtain token-level contextual states from the encoder.|Pooling: Select or combine states according to the model's training design.|Head: Train a classifier on the chosen representation.|An encoder represents the input; a classifier head predicts its label.
`);
add(5,'Decoder-only (GPT-style) - generation tasks',`
What is a decoder-only transformer?|A decoder-only language model uses causal attention to predict tokens from preceding context.|Mask: Prevent a position from accessing future tokens during training.|Prediction: Produce a distribution for the next token.|Generation: Repeatedly select a token and extend the context.|Decoder-only language models generate by continuing a prefix.
Can decoder-only models be used for tasks other than open-ended generation?|Yes; many tasks can be expressed as conditioned outputs or supported by suitable heads.|Prompting: Ask for a label, answer, or structured response.|Training: Adapt the model to a specific task when appropriate.|Limits: Evaluate correctness and output constraints rather than assuming generation guarantees success.|An architecture's common use is not its only possible use.
`);
add(5,'Encoder-Decoder (T5-style) - seq2seq tasks',`
What is an encoder-decoder transformer?|It uses an encoder to represent source input and a decoder to generate a conditioned output sequence.|Encoder: Process the input using its allowed context.|Decoder: Generate target tokens with causal self-attention.|Cross-attention: Let decoder positions access encoder representations.|The encoder reads the source; the decoder writes a conditioned target.
Why is an encoder-decoder model useful for translation or summarization?|It separates source understanding from target generation while linking them through attention.|Source: Encode the document or sentence before producing the target.|Target: Generate an output of a potentially different length.|Conditioning: Revisit useful source representations through cross-attention.|One component represents the input; another generates the requested output.
`);
add(5,'Causal masking in decoders',`
What is a causal attention mask?|A causal mask blocks attention to future sequence positions.|Training: Prevent a position from seeing information it is supposed to predict.|Allowed context: Usually include the current representation and preceding positions under the model's shifted training setup.|Mechanism: Exclude forbidden attention scores before softmax.|Causal masking prevents future-token leakage.
Why is causal masking needed when training positions are computed in parallel?|The full target sequence is present during training, so unrestricted attention would reveal future answers.|Parallel inputs: Many positions are processed together.|Leakage: Future tokens must not become evidence for earlier predictions.|Consistency: Match the left-to-right information available during generation.|Parallel computation still needs a causal information boundary.
`);
add(6,'P(next token | previous tokens)',`
What does next-token probability mean?|It is a model's distribution over the token that follows the current prefix.|Conditioning: Use the previous tokens as context.|Vocabulary: Assign probability mass across candidate next tokens.|Uncertainty: Several continuations can be plausible even when one has the largest score.|A language model predicts a distribution, not one inevitable next word.
Is the next token always a complete word?|No; token boundaries depend on the tokenizer.|Pieces: A token may represent a word, part of a word, punctuation, or other text.|Generation: Append one selected vocabulary item at each ordinary decoding step.|Decoding: Convert the resulting token sequence back into text.|Next-token prediction is not necessarily next-word prediction.
`);
add(6,'Autoregressive language modeling',`
What is autoregressive language modeling?|Autoregressive modeling factors a sequence into predictions conditioned on earlier tokens.|Order: Predict each next token using a prefix.|Training: Learn from examples where the correct next tokens are known.|Generation: Feed generated tokens back as context for following predictions.|Predict, append, and predict again.
How does an autoregressive model generate a sentence?|It repeatedly selects a next token from the distribution conditioned on its growing prefix.|Start: Supply a prompt or beginning-of-sequence context.|Continue: Run the model, choose a token, and append it.|Stop: End on a stopping condition such as EOS or a token limit.|Generation builds the continuation one step at a time.
`);
add(6,'Masked language modeling (MLM)',`
What is masked language modeling?|MLM trains a model to recover selected hidden or corrupted tokens from their surrounding context.|Input: Hide or replace selected token information according to the training recipe.|Context: The model can often use both left and right context.|Objective: Predict the selected original tokens rather than always predicting the next token.|MLM learns by recovering missing information.
How is MLM different from autoregressive next-token training?|MLM recovers selected tokens from context; autoregressive training predicts a continuation from its prefix.|MLM: Commonly support bidirectional representation learning.|Autoregressive: Enforce a causal boundary for prediction.|Evaluation: The objectives differ, so their probability-based metrics are not automatically interchangeable.|Recover hidden tokens versus continue a prefix.
`);
add(6,'Perplexity - evaluating language models',`
What is language-model perplexity?|Perplexity exponentiates average negative log-probability of reference tokens under a probabilistic language model.|Interpretation: Lower perplexity means the model assigns higher likelihood to those reference tokens.|Evaluation: Measure on appropriate held-out data using a stated context and masking protocol.|Comparison: Match tokenizer and evaluation setup; different token units distort direct comparisons.|Perplexity measures reference-token predictability, not overall answer quality.
Does lower perplexity guarantee better factual or helpful answers?|No; predicting reference text well is different from meeting every product-quality goal.|Factuality: A likely continuation can still contain incorrect claims.|Helpfulness: Following a user's needs requires evaluation beyond token likelihood.|Scope: Use perplexity with task metrics and human assessment where appropriate.|Good likelihood is useful evidence, not a complete quality verdict.
`);
add(6,'Temperature, Top-k, Top-p (nucleus) sampling',`
What do temperature, top-k, and top-p control during generation?|They adjust the distribution or candidate set used to select a next token.|Temperature: Rescale logits before sampling to alter concentration.|Top-k: Keep a fixed number of the highest-probability candidates.|Top-p: Keep a high-probability set whose cumulative mass reaches the chosen threshold.|Temperature changes concentration; top-k and top-p restrict candidates.
How do top-k and top-p sampling differ?|Top-k fixes the number of candidates; top-p adapts that number to the distribution.|Fixed count: Top-k can retain many or few probability-mass units depending on the scores.|Adaptive set: Top-p retains enough leading candidates to meet the probability threshold.|Selection: Sample from the retained set after the appropriate normalization.|Top-k fixes a count; top-p fixes a probability-mass target.
`);
add(6,'Greedy vs sampling vs beam search',`
How do greedy decoding, sampling, and beam search differ?|They choose continuations through local maximization, random selection, or a limited sequence search.|Greedy: Pick the highest-scoring next token.|Sampling: Randomly choose from a configured next-token distribution.|Beam search: Keep several high-scoring partial sequences and expand them.|One best local choice, a random choice, or several search paths.
Is beam search or a lower temperature always better?|No; decoding quality depends on the task, model, scoring rule, and desired variation.|Search: Higher sequence scores do not guarantee more useful text.|Variation: Lower temperature usually concentrates sampling but does not make claims true.|Evaluation: Compare decoding settings with representative task examples.|Choose decoding for the task, not a universal quality rule.
`);
add(7,'Model comparison',`
How should we compare the pretrained models in this roadmap?|Compare documented architecture, input-output capabilities, access, and measured task performance rather than assuming one universal best model.|Architecture: Encoder, decoder, and encoder-decoder describe structural patterns, not a complete quality ranking.|Evidence: For proprietary families, distinguish documented capabilities from undisclosed implementation details.|Version: Treat the named models as learning references; availability, licenses, and capabilities vary by version.|Choose using verified model details and representative evaluation.
`);
add(7,'BERT',`
What is BERT commonly used for?|BERT is an encoder-only transformer family used to build contextual representations for language-understanding tasks.|Context: Use bidirectional input context during representation learning.|Tasks: Add suitable heads for classification, named entities, or extractive question answering.|Training: The original BERT uses masked-language-model pretraining among its objectives.|BERT represents an input using context from both directions.
Does a pretrained BERT checkpoint automatically solve every classification task?|No; a task-specific head and appropriate training or adaptation are usually needed.|Backbone: Reuse pretrained language representations.|Head: Match outputs to the target labels and task.|Evaluation: Check performance on held-out target-domain data.|Pretrained representations are a starting point, not a finished custom classifier.
`);
add(7,'GPT-4',`
What does GPT-4 illustrate in this NLP roadmap?|GPT-4 is a historical example of a proprietary GPT-family model used for generative language tasks.|Generation: Produce continuations or responses conditioned on input.|Applications: Study generation, instruction following, and conversational interaction.|Scope: This roadmap reference is not a claim about current API availability or a recommendation to deploy that exact version.|Use GPT-4 as a model-family learning example, not a current availability assumption.
Should we infer a proprietary model's full architecture from its product name?|No; a family label and visible behavior do not establish every internal implementation detail.|Known information: Use the provider's actual technical documentation.|Unknown details: Do not invent layer counts, parameter counts, or exact hidden design choices.|Study pattern: Learn causal decoder-style generation separately from undocumented claims about a product.|Teach the documented concept and label unknown internals as unknown.
`);
add(7,'Claude 3.5/4',`
What are Claude 3.5 and Claude 4 in this roadmap?|They are generations of Anthropic's proprietary model family used for language assistance and related tasks.|Capabilities: Documented releases describe tasks such as writing, analysis, coding, and tool use.|Versions: Context limits and supported features depend on the particular model and deployment.|Evaluation: Safety and long-context quality require explicit tests, not a best-for label.|A family name does not replace a version-specific model card.
Does a safety-focused model guarantee safe and correct outputs?|No; safety training and evaluations reduce some risks but do not guarantee every output is safe or factual.|Model behavior: Performance can vary with inputs and operating conditions.|Application: Product controls and task-specific evaluation still matter.|Claims: Separate documented test results from universal guarantees.|Safety is evaluated behavior, not an absolute model property.
`);
add(7,'Gemini',`
What is Gemini commonly used to illustrate?|Gemini illustrates a multimodal model family that can work with more than text, depending on the version.|Modalities: Particular versions support specified combinations of text, images, audio, or other inputs.|Architecture: The original Gemini report describes transformer-decoder foundations.|Version: Do not assume all releases share identical internals or capabilities.|Multimodal describes supported information types, not automatically an encoder-decoder design.
Is every multimodal model an encoder-decoder transformer?|No; multimodal inputs can be supported by several architectural designs.|Input handling: Images or audio may use specialized representation components.|Language backbone: A system can still use a decoder-style generative transformer.|Evidence: Read the technical report for the specific version instead of guessing from modality.|Multiple modalities do not imply one architecture category.
`);
add(7,'T5',`
What is T5's main idea?|T5 uses an encoder-decoder transformer and expresses many NLP tasks as text-to-text transformations.|Input: Represent a task and its source information as text.|Output: Generate a textual target such as a translation, summary, or label.|Pretraining: Learn reusable representations using a text-corruption objective.|T5 turns many tasks into text in, text out.
How is T5 different from a BERT-style encoder model?|T5 has a generative decoder, while BERT primarily provides encoder representations for suitable heads.|BERT-style setup: Encode input and use a task-specific prediction head.|T5-style setup: Encode source input and generate a target sequence.|Choice: Use the architecture and training objective that suit the task.|T5 includes a decoder for generating conditioned text.
`);
add(7,'LLaMA 3',`
What is LLaMA 3?|LLaMA 3 is a decoder-only language-model family with released weights under Meta's model-specific license.|Base models: Learn general continuation behavior through pretraining.|Instruction variants: Receive additional adaptation for instruction-style interaction.|Access: Weight availability does not imply unrestricted use or identical licensing to every open-source project.|LLaMA 3 offers open weights subject to its license terms.
What is the difference between open weights and open source?|Open weights means model parameters are available; open source makes a broader claim about access and licensing.|Weights: Allow eligible users to run or adapt the released parameter values.|Other materials: Training data, full training code, or processes may remain unavailable.|Terms: Inspect the exact release license rather than treating all weight releases alike.|Available weights are one part of openness, not the whole definition.
`);
add(7,'Mistral 7B',`
What is Mistral 7B?|Mistral 7B is a released decoder-style language model designed to offer strong capability at a relatively modest parameter count.|Scale: The family name refers to roughly seven billion parameters.|Architecture: Its original design uses techniques such as grouped-query and sliding-window attention.|Use: A base checkpoint and an instruction-tuned checkpoint are different starting points.|Check the specific Mistral 7B variant and model card.
Does a smaller model always make inference cheap or fast?|No; parameter count is only one factor in serving cost and latency.|Memory: Precision, context length, and cached attention states affect usage.|Compute: Hardware, batching, and implementation change throughput.|Quality: A smaller model may need different adaptation or fail some tasks.|Size matters, but deployment performance must be measured.
`);
add(7,'Qwen 2.5',`
What is Qwen 2.5?|Qwen 2.5 is a family of causal language models with multilingual capabilities and multiple model sizes.|Family: Distinguish the exact size and checkpoint variant.|Base versus instruct: A pretrained continuation model differs from an instruction-adapted one.|Languages: Evaluate target-language performance rather than assuming equal quality across languages.|A multilingual family still needs language-specific evaluation.
Does multilingual support mean equal performance in every language?|No; quality can differ across languages, scripts, domains, and tasks.|Training: Data coverage can vary across languages.|Tokenization: Some scripts or spellings may use longer token sequences.|Evaluation: Use representative examples in the languages your application needs.|Supported does not mean equally accurate everywhere.
`);
add(8,'Accuracy, Precision, Recall, F1',`
How do accuracy, precision, recall, and F1 apply to NLP tasks?|They measure classification or labeling performance according to defined positive classes or label sets.|Accuracy: Measure the fraction of correct predictions.|Precision and recall: Measure correctness among predicted positives and coverage of actual positives.|F1: Combine precision and recall; specify class averaging and evaluation units.|Define the labels, units, and averaging before reporting a score.
Why can an NLP system have high accuracy but poor useful performance?|Class imbalance and mismatched evaluation units can hide important errors.|Majority class: Predicting the frequent label may produce a high overall score.|Rare classes: Inspect per-class precision, recall, and F1.|NER: Token accuracy is different from exact entity-span evaluation.|A high aggregate score can hide failures on important examples.
`);
add(8,'BLEU - machine translation',`
What is BLEU?|BLEU compares generated translations with reference text using modified n-gram precision and a brevity penalty.|Overlap: Reward matching n-gram occurrences with clipped counts.|Length: Penalize translations that are too short relative to references.|Scope: Corpus BLEU is a traditional comparison measure, not a guarantee of semantic correctness.|BLEU measures reference overlap while discouraging overly short outputs.
Why can BLEU miss a good translation?|Several valid translations can express the same meaning using different wording.|References: A limited reference set cannot list every correct phrasing.|Overlap: Different synonyms or word order may reduce matches.|Assessment: Combine automatic scores with suitable human or semantic evaluation.|Low overlap can reflect different wording rather than wrong meaning.
`);
add(8,'ROUGE - summarization',`
What is ROUGE?|ROUGE is a family of measures comparing generated summaries with reference summaries through overlap patterns.|ROUGE-N: Compare n-gram matches such as unigrams or bigrams.|ROUGE-L: Use a longest-common-subsequence relationship.|Reporting: State the variant and whether precision, recall, or F1 is reported.|ROUGE is a metric family, not one single number with one interpretation.
Does high ROUGE prove a summary is factually correct?|No; overlap with reference wording does not verify every statement in the summary.|Facts: A summary can reuse many reference words yet alter a critical detail.|Coverage: A correct paraphrase may receive lower overlap.|Evaluation: Check factual consistency and usefulness separately.|Reference overlap is different from factual verification.
`);
add(8,'Perplexity - language models',`
How should perplexity be used when evaluating language models?|Use it to measure reference-token likelihood under a clearly defined probabilistic evaluation setup.|Held-out data: Avoid evaluating memorized training examples as generalization evidence.|Comparability: Match tokenizer, dataset, and context-handling protocol.|Limits: Perplexity does not directly measure factuality, safety, or instruction following.|Comparable perplexity needs comparable token units and evaluation conditions.
Can we directly compare perplexities from models with different tokenizers?|Usually not meaningfully without accounting for the different units and evaluation protocol.|Units: One model token may represent a different amount of text from another.|Averaging: Per-token negative log-likelihood changes with segmentation.|Alternatives: Use a stated common normalization when justified and compare task outcomes as well.|Different tokenization changes what one unit of perplexity measures.
`);
add(8,'BERTScore - semantic similarity',`
What is BERTScore?|BERTScore compares candidate and reference text using contextual token-embedding similarities.|Representations: Encode token occurrences using a selected contextual model.|Matching: Align token similarities to summarize candidate-reference agreement.|Variants: Scores depend on the model, settings, and any normalization choices.|BERTScore uses contextual similarity instead of only exact word overlap.
Does BERTScore verify factual correctness?|No; contextual similarity can remain high even when an important fact changes.|Similarity: Measure representational agreement with the reference.|Errors: Negation, quantities, or entity substitutions can need separate checks.|Use: Combine it with task-specific validation and human judgment when needed.|Semantic similarity is not automatic fact checking.
`);
add(8,'Human evaluation',`
Why is human evaluation useful for NLP systems?|People can assess task qualities that a single automatic metric may miss.|Criteria: Define dimensions such as correctness, relevance, clarity, and faithfulness.|Procedure: Use representative examples and clear rating instructions.|Reliability: Compare raters and review disagreements rather than assuming one judgment is universal.|Human evaluation needs a rubric, not just an impression.
How can we make human evaluation more consistent?|Use explicit criteria, calibrated examples, and a controlled comparison procedure.|Rubric: Define what good and bad performance look like.|Blinding: Hide model identities when appropriate to reduce expectation bias.|Agreement: Use multiple raters or adjudication to understand inconsistent judgments.|Consistent instructions make human judgments easier to compare.
`);
add(8,'Exact Match (EM) - QA tasks',`
What is Exact Match in question answering?|Exact Match scores whether a predicted answer matches an accepted reference under the benchmark's normalization rules.|Binary result: Each example commonly receives a match or non-match score.|Normalization: Rules may ignore case, punctuation, or articles, depending on the benchmark.|Aggregation: Average these outcomes across examples.|Exact means exact under the stated evaluation rules.
Why can Exact Match be harsh on a valid answer?|A correct answer can use a different acceptable form not captured by the references or normalization.|Wording: Equivalent paraphrases may differ as strings.|References: Multiple accepted answers improve coverage but cannot cover every case.|Complement: Token-overlap or semantic checks can add context without replacing correctness assessment.|An exact string mismatch is not always a meaning mismatch.
`);
add(9,'NLTK - classic NLP',`
What is NLTK used for?|NLTK provides tools and language resources for classical NLP and education.|Processing: Use tokenization, stemming, tagging, and other linguistic utilities.|Resources: Access corpora and lexical datasets such as WordNet when installed.|Requirements: Some functions need separate resource downloads.|NLTK combines classical NLP algorithms with language-learning resources.
Does installing NLTK include every dataset and model it can use?|No; some resources must be obtained separately.|Library: The package supplies code and interfaces.|Data: Particular tokenizers, taggers, or corpora may need additional files.|Reproducibility: Record resource requirements alongside the code.|Package installation and language-resource installation are different steps.
`);
add(9,'spaCy - production NLP: NER, parsing',`
What is spaCy used for?|spaCy organizes NLP processing into pipelines with components such as tokenization, entity recognition, and parsing.|Pipeline: Process text into a Doc object with token and span annotations.|Models: Trained pipeline packages provide particular language capabilities.|Customization: Add or configure components according to application needs.|spaCy structures NLP as a configurable processing pipeline.
Does a blank spaCy language pipeline automatically perform NER and parsing?|No; a blank language object does not include all trained annotation components.|Tokenizer: Language rules can provide basic tokenization.|Components: NER and dependency parsing need appropriate trained components.|Loading: Select a pipeline package that includes the capabilities you require.|A blank pipeline is a foundation, not a fully trained analyzer.
`);
add(9,'transformers (HuggingFace) - pretrained models',`
What does the transformers library provide?|It provides model architectures, pretrained checkpoint loading, tokenizers, and task-oriented tools.|Checkpoint: Load parameters associated with a specific model release.|Inputs: Use the compatible tokenizer or processor.|Tasks: Pipelines offer convenient inference when the checkpoint supports the requested task.|Match the task, checkpoint, and preprocessing tools.
Can any pretrained checkpoint be used directly for any NLP task?|No; the architecture, training objective, and prediction head must suit the task.|Base checkpoint: May need a task-specific head and adaptation.|Task-tuned checkpoint: Can already include a head trained for a particular label set.|Validation: Check the model card and measure the target task.|Pretrained does not mean already trained for every task.
`);
add(9,'datasets (HuggingFace) - loading datasets',`
What is the datasets library used for?|It provides structured loading, transformation, and iteration over datasets.|Loading: Read supported local files or dataset repositories.|Transformation: Apply processing through methods such as map.|Splits: Preserve train, validation, and test separation during the workflow.|Datasets manages examples and splits; it does not train the model.
Why keep training and evaluation splits separate when using datasets?|Evaluation should measure the selected procedure on examples that did not guide fitting or tuning.|Training: Learn model parameters and learned preprocessing.|Validation: Make configuration and selection decisions.|Test: Reserve suitable untouched examples for the final evaluation.|Convenient data loading does not remove the need for clean evaluation boundaries.
`);
add(9,'sentence-transformers - sentence embeddings',`
What is sentence-transformers used for?|It provides tools and models that embed sentences or passages for tasks such as semantic search.|Encoding: Map texts into fixed-size vector representations.|Comparison: Compare suitable embeddings to retrieve or group related texts.|Choice: Follow the selected model's intended task, language, and input conventions.|Sentence embeddings make whole-text similarity practical.
Should we assume every transformer checkpoint produces useful sentence-search vectors?|No; the representation and training objective must support the intended similarity task.|Pooling: Token states need an appropriate aggregation strategy.|Training: Retrieval-oriented adaptation can make vector similarity more meaningful.|Evaluation: Test retrieval or semantic matching on the target data.|A transformer backbone alone is not a guarantee of a good search embedding.
`);
add(9,'tiktoken - OpenAI tokenizer (BPE)',`
What is tiktoken?|tiktoken is a fast tokenizer library used to encode and decode text with supported OpenAI-style BPE encodings.|Encoding: Convert text to token IDs with a chosen encoding.|Decoding: Reconstruct text from a valid sequence of IDs.|Compatibility: Match the encoding to the intended model or explicitly document the encoding used.|tiktoken converts text and token IDs; it does not run a language model.
Does tokenizing visible text always give the full API request token count?|No; complete requests can include formatting, tools, modalities, and other model-specific input structure.|Plain text: Local tokenization can count tokens for the supplied string.|Request structure: Message boundaries and other fields can add tokens.|Verification: Use the provider's documented counting method for the actual request format.|Visible text tokens are not necessarily the entire request.
`);
add(9,'evaluate - HuggingFace metrics',`
What is the evaluate library used for?|evaluate supplies interfaces for loading and computing evaluation measurements, including supported NLP metrics.|Inputs: Provide predictions and references in the metric's required format.|Computation: Use the selected metric implementation and its configuration.|Reporting: Record the metric, variant, and preprocessing to make results comparable.|A metric interface helps calculate scores; it does not choose the right evaluation for you.
Why must we document metric settings and input normalization?|Different implementations and preprocessing choices can produce different scores for the same outputs.|Settings: Specify averaging, tokenization, smoothing, or metric variants as relevant.|Normalization: State how case, punctuation, and references are handled.|Reproducibility: Keep the evaluation procedure consistent across candidate models.|A score is meaningful only with its evaluation procedure.
`);
const extras={
 '1:1:1':{table:[['Unit','Example idea','Tradeoff'],['Word','Whole vocabulary words','Larger vocabulary, unfamiliar-word issues'],['Subword','Reusable pieces inside words','Balance sequence length and vocabulary'],['Character','Individual characters','Small inventory, longer sequences']]},
 '1:2:2':{example:'Removing punctuation from C++ or lowercasing a named entity can discard information the task needs.'},
 '1:3:2':{example:'I like it and I do not like it should not become equivalent because not was removed.'},
 '1:4:1':{table:[['Method','How it works','Typical output'],['Stemming','Apply string-cutting rules','A stem that may not be a dictionary word'],['Lemmatization','Use linguistic information and vocabulary','A dictionary base form']]},
 '1:7:1':{code:`# Standard-library example: choose the known encoding explicitly.
from pathlib import Path

# text = Path('document.txt').read_text(encoding='utf-8')
text = 'Hello'
raw_bytes = text.encode('utf-8')
assert raw_bytes.decode('utf-8') == text`},
 '2:1:1':{example:'With vocabulary [cat, dog], the document cat cat dog has count vector [2, 1].'},
 '2:2:2':{formula:'One simple unsmoothed choice: IDF(term) = log(N / df(term)); N is document count and df counts documents containing the term.',refs:[['scikit-learn text features','https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction']]},
 '2:4:1':{example:'For vocabulary [cat, dog, bird], the one-hot vector for dog is [0, 1, 0].'},
 '2:5:1':{table:[['Representation','Typical feature space','Examples'],['Sparse','Many zero entries, often vocabulary-sized','BoW, TF-IDF'],['Dense','Learned coordinates, often much smaller','Word and sentence embeddings']]},
 '3:2:1':{table:[['Word2Vec variant','Input signal','Prediction target'],['CBOW','Surrounding context words','A target word'],['Skip-gram','A target word','Surrounding context words']]},
 '3:3:1':{refs:[['GloVe project','https://nlp.stanford.edu/projects/glove/']]},
 '3:4:1':{refs:[['FastText word vectors','https://fasttext.cc/docs/en/unsupervised-tutorial.html']]},
 '3:6:1':{formula:'vector(king) - vector(man) + vector(woman) -> search for a nearby word vector',example:'Queen is a classic illustrative retrieval result for some embeddings, not an identity guaranteed by the formula.'},
 '3:7:1':{table:[['Embedding','Representation of a word','Example family'],['Static','One vocabulary vector reused across occurrences','Word2Vec, GloVe'],['Contextual','A vector computed for the current occurrence','BERT-style encoders']]},
 '4:1:1':{refs:[['Subword tokenization guide','https://huggingface.co/docs/transformers/tokenizer_summary']]},
 '4:2:1':{example:'A BERT-style continuation marker may turn a word into an initial piece plus a piece written with a ## prefix; the exact split depends on the vocabulary.'},
 '4:3:1':{refs:[['SentencePiece project','https://github.com/google/sentencepiece']]},
 '4:3:2':{refs:[['Meta Llama 3 model card','https://huggingface.co/meta-llama/Meta-Llama-3-8B']]},
 '4:4:1':{table:[['Marker','Typical role, when supported'],['[CLS]','Special sequence representation position in BERT-style setups'],['[SEP]','Separate segments or mark an input boundary'],['[PAD]','Fill unused batch positions'],['[MASK]','Mark masked-token input in suitable training or prediction setups'],['<bos>','Beginning-of-sequence marker'],['<eos>','End-of-sequence marker']]},
 '4:5:1':{example:'In a toy vocabulary, cat might have ID 7. That number is only a lookup address; another tokenizer may use a completely different ID.'},
 '5:1:1':{refs:[['Original transformer paper','https://arxiv.org/abs/1706.03762']]},
 '5:3:1':{table:[['Role','Simple intuition'],['Query','What information does this position need?'],['Key','How relevant is this candidate position?'],['Value','What information can this position contribute?']]},
 '5:4:1':{ordered:true,formula:'Attention(Q, K, V) = softmax(Q * transpose(K) / sqrt(d_k) + mask) * V',example:'d_k is the key dimension. The mask excludes forbidden positions; softmax runs across the candidate key positions.'},
 '5:5:1':{formula:'MultiHead(X) = Concat(head_1, ..., head_h) * W_output'},
 '5:7:1':{formula:'PositionWiseFFN(x) = activation(x * W_1 + b_1) * W_2 + b_2'},
 '5:8:1':{formula:'Example pre-norm residual pattern: output = input + Sublayer(Norm(input))'},
 '5:9:1':{refs:[['BERT paper','https://arxiv.org/abs/1810.04805']]},
 '5:11:1':{refs:[['T5 paper','https://arxiv.org/abs/1910.10683']]},
 '6:1:1':{formula:'P(x_t given x_1, ..., x_(t-1))'},
 '6:2:1':{formula:'P(x_1, ..., x_T) = product over t of P(x_t given x_<t)'},
 '6:2:2':{ordered:true},
 '6:3:2':{table:[['Objective','Information available','Prediction target'],['Masked language modeling','Allowed surrounding context, often both directions','Selected hidden or corrupted tokens'],['Autoregressive modeling','A causal prefix','Next token in the sequence']]},
 '6:4:1':{formula:'Perplexity = exp(-(1 / N) * sum(log p(reference_token_t given allowed context)))',example:'N counts scored reference tokens. This form uses natural logarithms and a stated autoregressive evaluation setup.'},
 '6:5:1':{formula:'For temperature T > 0: sampling_probabilities = softmax(logits / T)',table:[['Control','What changes'],['Temperature','Concentration of the probability distribution'],['Top-k','Fixed number of leading candidates retained'],['Top-p','Adaptive set reaching a probability-mass threshold']]},
 '6:6:1':{table:[['Method','Core rule','Typical tradeoff'],['Greedy','Choose the highest-scoring next token','Simple and fast, commits locally'],['Sampling','Draw from a configured distribution','Allows variation; results depend on settings'],['Beam search','Retain several partial sequences','More search and computation, not guaranteed better text']]},
 '7:1:1':{table:[['Model reference','Documented framing','Common uses'],['BERT','Encoder-only transformer','Classification, NER, extractive QA'],['GPT-4','Proprietary GPT-family generative model; full internals not inferred here','Historical generation and instruction-following reference'],['Claude 3.5/4','Proprietary model generations; consult version documentation','Language assistance, analysis, coding; evaluate safety explicitly'],['Gemini','Multimodal transformer family; original report uses decoder foundations','Version-specific multimodal tasks'],['T5','Encoder-decoder transformer','Text-to-text and sequence transformation'],['LLaMA 3','Decoder-only, open weights under a custom license','Adaptation and self-hosted language tasks when permitted'],['Mistral 7B','Decoder-style model; distinguish base and instruct releases','Language-model deployment and adaptation'],['Qwen 2.5','Causal language-model family with multilingual coverage','Multilingual generation and adaptation']],refs:[['GPT-4 official documentation','https://developers.openai.com/api/docs/models/gpt-4'],['Gemini technical report','https://arxiv.org/html/2312.11805v1']]},
 '7:2:1':{refs:[['BERT paper','https://arxiv.org/abs/1810.04805']]},
 '7:3:1':{refs:[['GPT-4 official documentation','https://developers.openai.com/api/docs/models/gpt-4']]},
 '7:4:1':{refs:[['Claude 4 release','https://www.anthropic.com/news/claude-4']]},
 '7:5:1':{refs:[['Gemini technical report','https://arxiv.org/html/2312.11805v1']]},
 '7:6:1':{refs:[['T5 paper','https://arxiv.org/abs/1910.10683']]},
 '7:7:1':{refs:[['Meta Llama 3 model card and license','https://huggingface.co/meta-llama/Meta-Llama-3-8B']]},
 '7:8:1':{refs:[['Mistral 7B v0.1 model card','https://huggingface.co/mistralai/Mistral-7B-v0.1']]},
 '7:9:1':{refs:[['Qwen2.5-7B model card','https://huggingface.co/Qwen/Qwen2.5-7B']]},
 '8:1:1':{formula:'Accuracy = correct / total; Precision = TP / (TP + FP); Recall = TP / (TP + FN); F1 = 2 * Precision * Recall / (Precision + Recall)',example:'For entity extraction, a benchmark may require both the correct entity span and the correct entity type.'},
 '8:2:1':{refs:[['BLEU paper','https://aclanthology.org/P02-1040/']]},
 '8:3:1':{table:[['Variant','Overlap pattern'],['ROUGE-1','Unigram matches'],['ROUGE-2','Bigram matches'],['ROUGE-L','Longest common subsequence']],refs:[['ROUGE paper','https://aclanthology.org/W04-1013/']]},
 '8:4:1':{formula:'Perplexity = exp(average negative log-probability of the evaluated reference tokens)'},
 '8:5:1':{refs:[['BERTScore paper','https://arxiv.org/abs/1904.09675']]},
 '8:7:1':{formula:'EM = mean(match(prediction, any accepted reference after specified normalization))'},
 '9:1:1':{code:`# Requires nltk; this tokenizer does not need a downloaded model.
from nltk.tokenize import wordpunct_tokenize

print(wordpunct_tokenize('NLP is useful!'))`,refs:[['NLTK documentation','https://www.nltk.org/']]},
 '9:2:1':{code:`# Requires spacy. A blank pipeline does not provide trained NER or parsing.
import spacy

nlp = spacy.blank('en')
nlp.add_pipe('sentencizer')
doc = nlp('NLP is useful. Tokenization comes first.')
print([sentence.text for sentence in doc.sents])`,refs:[['spaCy 101','https://spacy.io/usage/spacy-101']]},
 '9:3:1':{code:`# Requires transformers and torch; downloads the checkpoint on first use.
from transformers import pipeline

classifier = pipeline(
    'sentiment-analysis',
    model='distilbert/distilbert-base-uncased-finetuned-sst-2-english',
    device=-1,
)
print(classifier('This lesson is clear.'))`,refs:[['Transformers quickstart','https://huggingface.co/docs/transformers/quicktour']]},
 '9:4:1':{code:`# Requires datasets. This example uses in-memory data without a download.
from datasets import Dataset

data = Dataset.from_dict({'text': ['good lesson', 'unclear lesson'], 'label': [1, 0]})
print(data[0])`,refs:[['Datasets quickstart','https://huggingface.co/docs/datasets/quickstart']]},
 '9:5:1':{code:`# Requires sentence-transformers; downloads this model on first use.
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
vectors = model.encode(['A cat is sleeping.', 'A kitten is resting.'], normalize_embeddings=True)
cosine_similarity = float(vectors[0] @ vectors[1])
print(cosine_similarity)`,refs:[['Sentence Transformers quickstart','https://sbert.net/docs/quickstart.html']]},
 '9:6:1':{code:`# Requires tiktoken; the first use may download encoding data.
import tiktoken

encoding = tiktoken.get_encoding('cl100k_base')  # An explicit encoding, not every model's tokenizer.
token_ids = encoding.encode('Hello, NLP!')
print(token_ids, len(token_ids))
assert encoding.decode(token_ids) == 'Hello, NLP!'`,refs:[['Official tiktoken guide','https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken']]},
 '9:6:2':{refs:[['Official request token-counting guidance','https://developers.openai.com/api/docs/guides/token-counting']]},
 '9:7:1':{code:`# Requires evaluate; the first load may download the selected metric.
import evaluate

metric = evaluate.load('accuracy')
result = metric.compute(predictions=[1, 0, 1], references=[1, 1, 1])
print(result)  # Accuracy is 2 / 3.`,refs:[['Evaluate documentation','https://huggingface.co/docs/evaluate/index']]}
};
finish(extras,{
1:'Prepare text deliberately while preserving the information your task and model need.',
2:'Represent documents with counts, weighting schemes, and useful local text features.',
3:'Understand how learned vectors capture word usage and contextual relationships.',
4:'Learn how modern tokenizers split text, use vocabularies, and create model inputs.',
5:'Build intuition for attention, transformer blocks, and the three main architecture patterns.',
6:'Understand prediction objectives, token generation, sampling, and likelihood-based evaluation.',
7:'Compare the named model families through documented designs, uses, and limitations.',
8:'Evaluate NLP outputs with suitable automatic metrics and clear human criteria.',
9:'Know the Python tools used for linguistic processing, model loading, datasets, and evaluation.'
});
