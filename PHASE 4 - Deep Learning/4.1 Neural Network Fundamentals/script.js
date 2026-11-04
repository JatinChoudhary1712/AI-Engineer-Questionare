const topics = [
  {
    "title": "Neuron, Perceptron, MLP",
    "questions": [
      [
        "What is an artificial neuron?",
        "<ul><li>Artificial neuron neural network ki basic building block hai.</li><li>Ye multiple inputs leta hai, unhe weights ke saath multiply karta hai aur bias add karta hai.</li><li>Uske baad activation function decide karta hai ki output kya hoga.</li><li>Biological neuron se inspired mathematical model hai.</li></ul><p><strong>Formula:</strong></p><math class=\"neuron-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"z equals the sum from i equals one to n of w i times x i, plus b\"><mrow><mi>z</mi><mo>=</mo><munderover><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msub><mi>w</mi><mi>i</mi></msub><msub><mi>x</mi><mi>i</mi></msub><mo>+</mo><mi>b</mi></mrow></math><math class=\"neuron-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"Output equals f of z\"><mrow><mi mathvariant=\"italic\">Output</mi><mo>=</mo><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo></mrow></math><p><strong>Yaad rakho:</strong> Inputs + Weights + Bias + Activation = Artificial Neuron.</p>"
      ],
      [
        "What is a perceptron?",
        "<ul><li>Perceptron artificial neuron ka simplest form hai.</li><li>Ye binary classification karta hai, jaise Yes/No, 0/1.</li><li>Isme generally step activation function use hota hai.</li><li>Ye sirf linearly separable data ko correctly classify kar sakta hai.</li></ul><p><strong>Example:</strong> Email spam hai ya not spam?</p><p><strong>Yaad rakho:</strong> Perceptron = Single-layer binary classifier.</p>"
      ],
      [
        "What is a multilayer perceptron (MLP)?",
        "<ul><li>MLP ek feedforward neural network hai.</li><li>Isme input layer, one or more hidden layers aur output layer hoti hain.</li><li>Har layer neurons se bani hoti hai.</li><li>Non-linear activation functions ki help se complex patterns learn karta hai.</li></ul><p><strong>Example:</strong> Image mein cat hai ya dog?</p><p><strong>Yaad rakho:</strong> MLP = Multiple layers + Non-linearity + Complex pattern learning.</p>"
      ],
      [
        "What is the difference between an artificial neuron, a perceptron, and an MLP?",
        "<p>An artificial neuron is a computational building block; a classical perceptron is a threshold-based neuron used for binary classification; an MLP is a network of neurons arranged in layers.</p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Aspect</th><th scope=\"col\">Artificial neuron</th><th scope=\"col\">Perceptron</th><th scope=\"col\">MLP</th></tr></thead><tbody><tr><th scope=\"row\">Structure</th><td>One unit: weighted inputs, bias, and activation</td><td>A single threshold-based unit in the classical model</td><td>Input, one or more hidden layers, and an output layer</td></tr><tr><th scope=\"row\">Activation</th><td>Depends on the design: for example, ReLU, sigmoid, or a threshold</td><td>Hard threshold or step function</td><td>Non-linear hidden activations; the output activation depends on the task</td></tr><tr><th scope=\"row\">What it can represent</th><td>A transformation of one weighted sum; capacity depends on its activation</td><td>A linear decision boundary for binary classification</td><td>Complex non-linear relationships through hidden layers</td></tr><tr><th scope=\"row\">Learning</th><td>Learned as part of a model; the training method depends on the activation</td><td>Classically trained with the perceptron learning rule</td><td>Usually trained with backpropagation and a gradient-based optimizer</td></tr><tr><th scope=\"row\">Example</th><td>A unit that detects a useful feature</td><td>A classifier for a linearly separable problem such as AND</td><td>A network that can learn XOR using a non-linear hidden layer</td></tr></tbody></table></div><p><strong>Remember:</strong> A perceptron is a specific kind of artificial neuron. An MLP combines many neurons into a layered network.</p>"
      ]
    ]
  },
  {
    "title": "Activation functions: Sigmoid, Tanh, ReLU, GELU, SwiGLU",
    "questions": [
      [
        "What are activation functions, and why are they needed in neural networks?",
        "<p><strong>Definition:</strong> Activation function ek mathematical function hai jo neuron ke weighted sum ko process karke final output generate karta hai.</p><p>Why do we need them?</p><ul><li>Neural network mein non-linearity introduce karte hain.</li><li>Complex patterns aur relationships learn karne mein help karte hain.</li><li>Without activation functions, multiple layers bhi ek single linear transformation ki tarah behave karengi.</li></ul><p><strong>Interview takeaway:</strong> Activation functions allow neural networks to learn complex, non-linear relationships.</p>"
      ],
      [
        "What is the mathematical intuition behind an activation function, and how does it introduce non-linearity?",
        "<p><strong>Ek neuron pehle inputs ka weighted sum calculate karta hai:</strong></p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"z = w_1x_1+w_2x_2+b\"><mrow><mi>z</mi><mo>=</mo><msub><mi>w</mi><mn>1</mn></msub><msub><mi>x</mi><mn>1</mn></msub><mo>+</mo><msub><mi>w</mi><mn>2</mn></msub><msub><mi>x</mi><mn>2</mn></msub><mo>+</mo><mi>b</mi></mrow></math><p><strong>Then activation function apply hota hai:</strong></p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"a = f(z)\"><mrow><mi>a</mi><mo>=</mo><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo></mrow></math><p><strong>Simple intuition:</strong></p><ul><li>Weighted sum decide karta hai input ka combined influence.</li><li>Activation function decide karta hai output kaise transform hoga.</li><li>Is transformation se network complex patterns learn kar sakta hai.</li></ul><p><strong>Example:</strong> Agar hum sirf linear transformations use karein, toh network complex curved patterns learn nahi kar payega.</p><p><strong>Interview takeaway:</strong> Activation functions introduce non-linearity, allowing deep networks to learn beyond simple linear relationships.</p>"
      ],
      [
        "What is the Sigmoid activation function, and what are its mathematical properties and limitations?",
        "<p>Sigmoid</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"sigma(x)=frac{1}{1+e^{-x}}\"><mrow><mi>σ</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow></math><p><a href=\"https://images.openai.com/static-rsc-4/YFJBdDquttwOcH0SuzbxcEyUFJhB46g2fNiHfZWeLbZhu3fJQ0BdTh2CifyxXb80ta-MC8_jrUGjroCtNLk7b2cKDCX95JZqWmQ9yzc2wGGa5DzJz0XWn_hKCMvVMnwJFqNr7Yw9wHlavlbxrfdN0YBIs8F68C0uX-O6656xRsE?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">Medium ↗</a></p><p><strong>Properties:</strong></p><ul><li>Output range: 0 to 1.</li><li>S-shaped curve.</li><li>Large positive input → output approaches 1.</li><li>Large negative input → output approaches 0.</li></ul><p><strong>Limitations:</strong></p><ul><li>Vanishing gradient problem.</li><li>Not zero-centered.</li><li>Computationally expensive due to exponential calculation.</li></ul><p>Where is it used?</p><ul><li>Binary classification output layer.</li><li>Probability prediction.</li></ul><p><strong>Interview takeaway:</strong> Sigmoid is useful for binary classification because its output can represent probabilities, but it is generally avoided in deep hidden layers due to vanishing gradients.</p>"
      ],
      [
        "What is the Tanh activation function, and how does it differ from Sigmoid?",
        "<p>Tanh</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"tanh(x)=frac{e^x-e^{-x}}{e^x+e^{-x}}\"><mrow><mi>tanh</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mfrac><mrow><msup><mi>e</mi><mrow><mi>x</mi></mrow></msup><mo>−</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow><mrow><msup><mi>e</mi><mrow><mi>x</mi></mrow></msup><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow></math><p><a href=\"https://images.openai.com/static-rsc-4/exzv0pk__4rHYflbhy4Y-FTVEv-aZi_uJqKBJ1pNpItzPQon1dcnr69ggNpp7cbAGD5E_Pq-Cs6sa2gJO6UYUyZURNaHH3fqHakfyZx3WHgeEPzidoqhepdbM2f11jnFqzXpmdTS4dIAy-ItXMspOWHMh_DL36jEd2YAgr1kew8?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">Excurse: Activation functions and the vanishing gradient problem - Fabrizio Musacchio ↗</a></p><p><strong>Properties:</strong></p><ul><li>Output range: -1 to +1.</li><li>Zero-centered.</li><li>Negative inputs produce negative outputs.</li><li>Positive inputs produce positive outputs.</li></ul><p><strong>Sigmoid vs Tanh:</strong></p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Sigmoid</th><th scope=\"col\">Tanh</th></tr></thead><tbody><tr><th scope=\"row\">0 to 1</th><td>-1 to +1</td></tr><tr><th scope=\"row\">Not zero-centered</th><td>Zero-centered</td></tr><tr><th scope=\"row\">Vanishing gradients</th><td>Vanishing gradients</td></tr><tr><th scope=\"row\">Binary output probability</th><td>Older RNN hidden layers</td></tr></tbody></table></div><p><strong>Interview takeaway:</strong> Tanh is zero-centered, unlike Sigmoid, but both suffer from vanishing gradients.</p>"
      ],
      [
        "What is the ReLU activation function, how does it work, and what is the Dying ReLU problem?",
        "<p>ReLU</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"f(x)=max(0,x)\"><mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>max</mi><mo>(</mo><mn>0</mn><mo>,</mo><mi>x</mi><mo>)</mo></mrow></math><p><a href=\"https://images.openai.com/static-rsc-4/SsWK5_KdhRGV8XC8nISLjiljWg9WzEf8aFK0gnu8FkP07DHcwOer8w6DJ6JCpK1ukUnvMiEQTxgXcCq_1iqlms9eh0h7kOL9vTQZrsIPDajoRCBF_l6xL5jbD1BXnluHmBc7RjIIEtfn7nn0wjbjUi9y4a1pFHK6cTou6WYfM1Q?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">The ReLU Activation Function: Powering Modern Neural Networks | CodeSignal Learn ↗</a></p><p>How does it work?</p><ul><li>Negative input → 0.</li><li>Positive input → same input.</li><li>Simple and computationally efficient.</li></ul><p><strong>Dying ReLU problem:</strong></p><p>Jab neuron consistently negative inputs receive karta hai, toh output 0 ho jata hai.</p><p>Is situation mein gradient bhi 0 ho sakta hai, jiski wajah se neuron learning stop kar deta hai.</p><p><strong>Advantages:</strong></p><ul><li>Computationally fast.</li><li>Positive side par vanishing gradient problem significantly reduce karta hai.</li><li>Deep neural networks mein useful.</li></ul><p><strong>Interview takeaway:</strong> ReLU is computationally efficient, but neurons can die when they consistently output zero.</p>"
      ],
      [
        "What is GELU, and how does its behaviour differ from ReLU?",
        "<p>GELU</p><p>GELU = Gaussian Error Linear Unit.</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"GELU(x)=xPhi(x)\"><mrow><mi>GELU</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>x</mi><mi>Φ</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow></math><p>Yahan ?(x) standard Gaussian distribution ka CDF hai.</p><p><a href=\"https://images.openai.com/static-rsc-4/z7U_y_bZ0IotBcvgMsYFrOWnROr5Rn2MR-AU52N2adnztgJSWymlELrYrNUZMav5VKShDKOu_1Q0-Y1hLR2Sk6Ba1X-eJ4_w6bRuKYG32yfVnV-oQHOnEXmsL645LJJvTJi2UmOSt7glWaOjrYorsYEOVFXC0KdHz72RyZHewBM?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">Encoder Architecture: Bidirectional Transformers for Understanding Tasks - Interactive | Michael Brenndoerfer | Michael Brenndoerfer ↗</a></p><p>How does it work?</p><ul><li>ReLU negative values ko completely zero kar deta hai.</li><li>GELU negative values ko smoothly suppress karta hai.</li><li>GELU input magnitude ke basis par values ko weight karta hai.</li><li>Iska transition ReLU ke comparison mein smooth hota hai.</li></ul><p><strong>ReLU vs GELU:</strong></p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">ReLU</th><th scope=\"col\">GELU</th></tr></thead><tbody><tr><th scope=\"row\">Hard zero for negatives</th><td>Smooth suppression</td></tr><tr><th scope=\"row\">Simple max operation</th><td>More computationally expensive</td></tr><tr><th scope=\"row\">Piecewise linear</th><td>Smooth nonlinear</td></tr><tr><th scope=\"row\">CNNs, MLPs</th><td>Transformers, BERT</td></tr></tbody></table></div><p><strong>Interview takeaway:</strong> GELU provides a smoother activation than ReLU and is widely used in Transformer architectures.</p>"
      ],
      [
        "What is SwiGLU, and how does its gated mechanism work?",
        "<p>SwiGLU</p><p>SwiGLU = Swish + Gated Linear Unit.</p><p><strong>Basic intuition:</strong></p><p>Normal activation function input ko transform karta hai, whereas SwiGLU mein ek additional gate hota hai jo information control karta hai.</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"SwiGLU(x)=(xW<sub>1</sub>)odot Swish(xW<sub>2</sub>)\"><mrow><mi>SwiGLU</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>x</mi><msub><mi>W</mi><mn>1</mn></msub><mo>)</mo><mo>⊙</mo><mi>Swish</mi><mo>(</mo><mi>x</mi><msub><mi>W</mi><mn>2</mn></msub><mo>)</mo></mrow></math><p><strong>Where:</strong></p><ul><li>W<sub>1</sub>,W<sub>2</sub> = learnable weight matrices.</li><li>Swish = smooth activation function.</li><li>? = element-wise multiplication.</li></ul><p>How does it work?</p><ol><li>Input two different linear transformations se pass hota hai.</li><li>One branch information generate karta hai.</li><li>Second branch gate ki tarah behave karta hai.</li><li>Dono branches element-wise multiply hoti hain.</li></ol><p><a href=\"https://images.openai.com/static-rsc-4/zD8IEd3dbufY-pMuZJPTR30fsLkXYE0b-vAgQgMkpYRYGqnvGK7DbXZqJznPKXfj3xtgiOjB2Wh1-qMXpzY5r14pyY4-WcQlSeDHX40-LnTC3Sa0103BVbFM0fQCZa7MkHg5J6lCg1SGNr9QToi_ny94n_LOCIA-2WuD6qOqFnU?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">T-one — открытая русскоязычная потоковая модель для телефонии / Хабр ↗</a></p><p>Where is it used?</p><ul><li>Modern Transformer architectures.</li><li>LLaMA-family models.</li><li>Large Language Models.</li></ul><p><strong>Interview takeaway:</strong> SwiGLU uses a gating mechanism to control information flow and improve the expressive capacity of Transformer feed-forward networks.</p>"
      ],
      [
        "What is the vanishing gradient problem, and how do different activation functions contribute to it?",
        "<p><strong>Definition:</strong> Vanishing gradient tab hota hai jab backpropagation ke during gradients bahut small ho jaate hain.</p><p>As a result, early layers mein weights effectively update nahi ho paate.</p><p><strong>Simple intuition:</strong></p><p><strong>Imagine gradient har layer mein 0.1 se multiply ho raha hai:</strong></p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"0.1 times 0.1 times 0.1 = 0.001\"><mrow><mn>0.1</mn><mo>×</mo><mn>0.1</mn><mo>×</mo><mn>0.1</mn><mo>=</mo><mn>0.001</mn></mrow></math><p>Multiple layers ke baad gradient extremely small ho sakta hai.</p><p><strong>Activation functions ka role:</strong></p><ul><li>Sigmoid: Saturation regions mein gradients almost zero ho jaate hain.</li><li>Tanh: Extreme positive/negative values par gradients small ho jaate hain.</li><li>ReLU: Positive side par gradient 1 hota hai, negative side par 0.</li><li>GELU: Smooth gradients provide karta hai, but vanishing gradients ko completely eliminate nahi karta.</li><li>SwiGLU: Gating aur smooth activation provide karta hai, but vanishing gradients ka complete solution nahi hai.</li></ul><p><strong>Interview takeaway:</strong> Vanishing gradients make early layers learn slowly. ReLU and modern activation functions help, but do not completely eliminate this problem.</p>"
      ],
      [
        "How do Sigmoid, Tanh, ReLU, GELU, and SwiGLU compare?",
        "<div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Activation</th><th scope=\"col\">Output range</th><th scope=\"col\">Gradient behaviour</th><th scope=\"col\">Cost</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>(0, 1)</td><td>Vanishing</td><td>Medium</td></tr><tr><th scope=\"row\">Tanh</th><td>(-1, 1)</td><td>Vanishing</td><td>Medium</td></tr><tr><th scope=\"row\">ReLU</th><td>[0, ∞)</td><td>Zero for negative inputs</td><td>Low</td></tr><tr><th scope=\"row\">GELU</th><td>Approximately (-0.17, ∞)</td><td>Smooth</td><td>Medium–High</td></tr><tr><th scope=\"row\">SwiGLU</th><td>Depends on input and weights</td><td>Gated, smooth</td><td>High</td></tr></tbody></table></div><p><strong>Typical applications:</strong></p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Activation</th><th scope=\"col\">Applications</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>Binary classification</td></tr><tr><th scope=\"row\">Tanh</th><td>Traditional RNNs</td></tr><tr><th scope=\"row\">ReLU</th><td>CNNs, MLPs</td></tr><tr><th scope=\"row\">GELU</th><td>BERT, Transformers</td></tr><tr><th scope=\"row\">SwiGLU</th><td>LLaMA and modern LLMs</td></tr></tbody></table></div><p><strong>Interview takeaway:</strong> No single activation function is best for every situation. Selection depends on architecture, computational budget and learning requirements.</p>"
      ],
      [
        "Why are GELU and SwiGLU commonly used in modern Transformer architectures instead of traditional activation functions?",
        "<p><strong>GELU:</strong></p><ul><li>Smooth activation.</li><li>Gradually suppresses negative values.</li><li>Works well in Transformer feed-forward networks.</li><li>Used in BERT and other Transformer architectures.</li></ul><p><strong>SwiGLU:</strong></p><ul><li>Uses a gating mechanism.</li><li>Controls how much information passes through.</li><li>Provides greater expressive flexibility.</li><li>Used in several modern LLM architectures, including LLaMA.</li></ul><p>Why not traditional ReLU everywhere?</p><p>ReLU is simple and fast, but GELU and SwiGLU offer smoother or gated transformations that can work better in certain Transformer architectures.</p><p><strong>Interview takeaway:</strong> GELU and SwiGLU are popular because they provide useful nonlinear transformations, and SwiGLU additionally offers controlled information flow through gating.</p>"
      ]
    ],
    "extraHTML": "<section class=\"activation-revision\"><button type=\"button\" class=\"activation-revision-toggle\" aria-expanded=\"false\" aria-controls=\"activation-revision-content\">Quick revision & interview self-test <span aria-hidden=\"true\">+</span></button><div id=\"activation-revision-content\" hidden><h3>Final Quick Revision – Remember These 5 Things</h3><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Activation</th><th scope=\"col\">Remember this</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>Probability between 0 and 1</td></tr><tr><th scope=\"row\">Tanh</th><td>Zero-centered, -1 to +1</td></tr><tr><th scope=\"row\">ReLU</th><td>Negative = 0, positive = same</td></tr><tr><th scope=\"row\">GELU</th><td>Smooth ReLU-like activation</td></tr><tr><th scope=\"row\">SwiGLU</th><td>Gating + Swish</td></tr></tbody></table></div><form class=\"activation-quiz\"><h3>Interview Self-Test</h3><p>5 MCQs – Test your understanding</p><p class=\"quiz-status\" role=\"status\" aria-live=\"polite\">0/5 answered</p><fieldset data-correct=\"1\"><legend>1. Which activation function is zero-centered?</legend><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"0\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"1\"> Tanh</label><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"2\"> ReLU</label><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"3\"> GELU</label><p class=\"quiz-feedback\" hidden>Tanh is zero-centered, with outputs from −1 to +1.</p></fieldset><fieldset data-correct=\"2\"><legend>2. Which activation function suffers from the Dying ReLU problem?</legend><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"0\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"1\"> Tanh</label><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"2\"> ReLU</label><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"3\"> SwiGLU</label><p class=\"quiz-feedback\" hidden>ReLU can remain inactive when pre-activations stay negative.</p></fieldset><fieldset data-correct=\"0\"><legend>3. Which activation function is commonly associated with BERT?</legend><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"0\"> GELU</label><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"1\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"2\"> Tanh</label><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"3\"> ReLU</label><p class=\"quiz-feedback\" hidden>BERT uses GELU in its feed-forward network.</p></fieldset><fieldset data-correct=\"1\"><legend>4. What makes SwiGLU different?</legend><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"0\"> Probability output</label><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"1\"> Gating mechanism</label><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"2\"> Only positive outputs</label><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"3\"> Hard zero threshold</label><p class=\"quiz-feedback\" hidden>SwiGLU uses element-wise multiplication to gate learned features.</p></fieldset><fieldset data-correct=\"1\"><legend>5. Which activation is most likely to suffer from saturation-based vanishing gradients?</legend><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"0\"> ReLU</label><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"1\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"2\"> SwiGLU</label><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"3\"> GELU</label><p class=\"quiz-feedback\" hidden>Sigmoid has very small derivatives in its saturation regions.</p></fieldset><button type=\"submit\" class=\"primary-button\">Check answers</button><button type=\"reset\" class=\"notebook-secondary\">Reset quiz</button></form></div></section>"
  },
  {
    "title": "Forward pass - how information flows",
    "questions": [
      [
        "What is a forward pass, and how does information flow through a neural network?",
        "<p>A forward pass computes predictions by sending inputs through the network's layers.</p><ol><li><strong>Input:</strong> Feed a batch of feature values into the first layer.</li><li><strong>Layers:</strong> Each layer transforms its inputs using weights, bias, and any activation.</li><li><strong>Output:</strong> The final layer produces values used for prediction or loss calculation.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>a_next = activation(W * a_previous + b)</code></p><p class=\"example\"><strong>Example:</strong> Image pixels pass through hidden layers to produce class scores.</p><p><strong>Remember:</strong> Forward means inputs become predictions.</p>"
      ],
      [
        "Does a forward pass update the model's weights?",
        "<p>A forward pass computes outputs; it does not normally update learned weights by itself.</p><ul><li><strong>Prediction:</strong> Evaluate the model using its current parameters.</li><li><strong>Training:</strong> Compare the prediction with a target to obtain a loss.</li><li><strong>Update:</strong> An optimizer changes parameters after gradients are computed; some layers can update non-parameter state during a training forward pass.</li></ul><p><strong>Remember:</strong> Forward predicts; the optimizer updates weights.</p>"
      ]
    ]
  },
  {
    "title": "Backpropagation - how gradients flow backward",
    "questions": [
      [
        "What is backpropagation, and how do gradients flow backward through a neural network?",
        "<p>Backpropagation computes loss gradients by applying the chain rule backward through the network.</p><ol><li><strong>Start:</strong> Compute a loss from the forward-pass prediction and target.</li><li><strong>Chain rule:</strong> Combine local derivatives to find how each parameter affects the loss.</li><li><strong>Update:</strong> Backpropagation computes gradients; the optimizer uses them to change parameters.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>dL/dw = (dL/da) * (da/dz) * (dz/dw)</code></p><p><strong>Symbols:</strong> L is the loss, w is a weight, z is a pre-activation value, and a is its activated output.</p><p><strong>Remember:</strong> Backward finds gradients; the optimizer changes weights.</p>"
      ],
      [
        "What is the difference between backpropagation and an optimizer?",
        "<p>Backpropagation computes gradients; an optimizer uses them to update parameters.</p><ul><li><strong>Backpropagation:</strong> Find how changes in parameters affect the loss.</li><li><strong>Optimizer:</strong> Choose and apply an update using those gradients.</li><li><strong>Order:</strong> Compute the loss, backpropagate, then take the optimizer step.</li></ul><p><strong>Remember:</strong> Backward calculates the direction; the optimizer takes the step.</p>"
      ]
    ]
  },
  {
    "title": "Weight initialization strategies",
    "questions": [
      [
        "What is weight initialization, and what are Xavier and He initialization?",
        "<p>Weight initialization chooses starting parameter values before training.</p><ul><li><strong>Symmetry:</strong> Different random weights help hidden neurons learn different features; identical zero weights can keep them identical.</li><li><strong>Xavier:</strong> Balances signal scale using fan-in and fan-out; commonly suits tanh or roughly linear activations.</li><li><strong>He:</strong> Accounts for rectification and commonly suits ReLU-like activations.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Initialization</th><th scope=\"col\">Typical variance</th><th scope=\"col\">Typical match</th></tr></thead><tbody><tr><th scope=\"row\">Xavier / Glorot</th><td>2 / (fan_in + fan_out), before optional gain adjustments</td><td>Tanh or roughly linear activations</td></tr><tr><th scope=\"row\">He / Kaiming</th><td>2 / fan_in for ReLU, fan-in mode</td><td>ReLU-like activations</td></tr></tbody></table></div><p><strong>Symbols:</strong> fan_in counts incoming connections; fan_out counts outgoing connections. Exact scaling depends on the activation and initialization variant.</p><p><strong>Remember:</strong> Start with appropriately scaled random weights, not identical hidden weights.</p>"
      ],
      [
        "What is Xavier initialization?",
        "<p>Xavier initialization chooses random weight scales based on the incoming and outgoing connections.</p><ul><li><strong>Goal:</strong> Keep signals from growing or shrinking too quickly across layers.</li><li><strong>Scale:</strong> Use fan-in and fan-out to set the initial variance.</li><li><strong>Match:</strong> Commonly used with tanh or roughly linear activations, with appropriate gain settings.</li></ul><p><strong>Remember:</strong> Xavier balances the connections entering and leaving a layer.</p>"
      ],
      [
        "What is He initialization?",
        "<p>He initialization scales random weights to suit rectifying activations such as ReLU.</p><ul><li><strong>Reason:</strong> ReLU removes the negative part of its input.</li><li><strong>Scale:</strong> A common fan-in configuration uses weight variance 2 divided by fan-in.</li><li><strong>Purpose:</strong> Help maintain useful signal scales through many layers.</li></ul><p><strong>Remember:</strong> He initialization accounts for ReLU-like rectification.</p>"
      ]
    ]
  },
  {
    "title": "Vanishing / exploding gradient problem",
    "questions": [
      [
        "What are vanishing and exploding gradients, and how do they affect learning?",
        "<p>Vanishing gradients become too small to learn effectively; exploding gradients become excessively large.</p><ul><li><strong>Vanishing:</strong> Earlier layers may learn very slowly because their gradients are tiny.</li><li><strong>Exploding:</strong> Large gradients can cause unstable updates, huge losses, or non-finite values.</li><li><strong>Control:</strong> Suitable initialization and architecture help; clipping specifically limits large gradients.</li></ul><p><strong>Remember:</strong> Too small means weak learning; too large means unstable learning.</p>"
      ],
      [
        "What is a vanishing gradient?",
        "<p>A vanishing gradient is a backward learning signal that becomes very small.</p><ul><li><strong>Cause:</strong> Repeated derivative multiplications can shrink the signal.</li><li><strong>Effect:</strong> Earlier layers or distant sequence steps may learn slowly.</li><li><strong>Help:</strong> Suitable activations, initialization, shortcuts, or gated architectures can improve gradient flow.</li></ul><p><strong>Remember:</strong> A tiny gradient gives a weak learning signal.</p>"
      ],
      [
        "What is an exploding gradient?",
        "<p>An exploding gradient is a backward learning signal that becomes excessively large.</p><ul><li><strong>Cause:</strong> Repeated transformations can amplify derivatives.</li><li><strong>Effect:</strong> Large updates can make loss unstable or non-finite.</li><li><strong>Help:</strong> Gradient clipping and suitable initialization or training settings can improve stability.</li></ul><p><strong>Remember:</strong> An oversized gradient can produce an unstable update.</p>"
      ]
    ]
  }
];

function escapeText(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const questions = document.querySelector('#questions');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
let activeTopic = 'All topics';
let number = 0;
const entries = [];

for (const [index, topic] of topics.entries()) {
  const section = document.createElement('section');
  section.className = 'topic';
  const heading = document.createElement('h2');
  heading.id = `topic-${index}`;
  heading.innerHTML = `<span class="topic-number">${String(index + 1).padStart(2, '0')}</span>${escapeText(topic.title)}`;
  section.setAttribute('aria-labelledby', heading.id);
  section.append(heading);
  for (const [question, answer] of topic.questions) {
    const detail = document.createElement('details');
    number++;
    detail.innerHTML = `<summary><span class="q-number">${String(number).padStart(2, '0')}</span><span>${escapeText(question)}</span></summary><div class="answer">${answer}</div>`;
    section.append(detail);
    entries.push({ detail, section, topic: topic.title, text: `${topic.title} ${detail.textContent}`.toLowerCase() });
  }
  if (topic.extraHTML) section.insertAdjacentHTML('beforeend', topic.extraHTML);
  questions.append(section);
}

for (const title of ['All topics', ...topics.map(topic => topic.title)]) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = title;
  button.setAttribute('aria-pressed', String(title === activeTopic));
  button.addEventListener('click', () => {
    activeTopic = title;
    for (const item of filters.children) item.setAttribute('aria-pressed', String(item === button));
    updateResults();
  });
  filters.append(button);
}

function updateResults() {
  const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const entry of entries) {
    entry.detail.hidden = !(activeTopic === 'All topics' || entry.topic === activeTopic) || !terms.every(term => entry.text.includes(term));
    if (!entry.detail.hidden) visible++;
  }
  for (const section of questions.children) {
    section.hidden = !entries.some(entry => entry.section === section && !entry.detail.hidden);
  }
  document.querySelector('#count').textContent = `${visible} of ${entries.length} questions`;
  document.querySelector('#empty').hidden = visible !== 0;
}

search.addEventListener('input', updateResults);
document.querySelector('#expand').addEventListener('click', () => {
  for (const { detail } of entries) if (!detail.hidden) detail.open = true;
});
document.querySelector('#collapse').addEventListener('click', () => {
  for (const { detail } of entries) if (!detail.hidden) detail.open = false;
});
updateResults();

// Activation revision interactions
const revisionToggle=document.querySelector('.activation-revision-toggle');
if(revisionToggle)revisionToggle.addEventListener('click',()=>{const content=document.getElementById('activation-revision-content');content.hidden=!content.hidden;revisionToggle.setAttribute('aria-expanded',String(!content.hidden));revisionToggle.querySelector('span').textContent=content.hidden?'+':'−';});
const activationQuiz=document.querySelector('.activation-quiz');
if(activationQuiz){
  const items=[...activationQuiz.querySelectorAll('fieldset')],status=activationQuiz.querySelector('.quiz-status');
  const clear=()=>items.forEach(item=>{item.querySelector('.quiz-feedback').hidden=true;item.removeAttribute('data-result');});
  activationQuiz.addEventListener('change',()=>{clear();status.textContent=items.filter(item=>item.querySelector('input:checked')).length+'/5 answered';});
  activationQuiz.addEventListener('submit',event=>{event.preventDefault();const answered=items.filter(item=>item.querySelector('input:checked')).length;if(answered<5){status.textContent=answered+'/5 answered. Answer all five questions before checking.';const missing=items.find(item=>!item.querySelector('input:checked'));missing.querySelector('input').focus();return;}let score=0;for(const item of items){const correct=item.querySelector('input:checked').value===item.dataset.correct;if(correct)score++;item.dataset.result=correct?'correct':'incorrect';const feedback=item.querySelector('.quiz-feedback');feedback.hidden=false;feedback.textContent=(correct?'Correct. ':'Incorrect. ')+feedback.textContent.replace(/^(Correct|Incorrect)\. /,'');}status.textContent=score+'/5 correct';});
  activationQuiz.addEventListener('reset',()=>{clear();status.textContent='0/5 answered';});
}
