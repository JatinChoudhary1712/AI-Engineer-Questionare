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
        "<p>Artificial neuron ek computational building block hai. Classical perceptron isi neuron ka threshold-based form hai, jabki MLP kai neurons ko layers mein connect karta hai.</p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Aspect</th><th scope=\"col\">Artificial neuron</th><th scope=\"col\">Perceptron</th><th scope=\"col\">MLP</th></tr></thead><tbody><tr><th scope=\"row\">Structure</th><td>Ek unit: weighted inputs + bias + activation</td><td>Classical model mein ek threshold-based unit</td><td>Input layer, ek ya zyada hidden layers, aur output layer</td></tr><tr><th scope=\"row\">Activation</th><td>Design ke hisaab se ReLU, sigmoid ya threshold ho sakta hai</td><td>Hard threshold / step function</td><td>Hidden layers mein non-linear activations; output activation task par depend karta hai</td></tr><tr><th scope=\"row\">Learning capacity</th><td>Ek weighted sum ko transform karta hai; capability activation par depend karti hai</td><td>Binary classification ke liye linear decision boundary banata hai</td><td>Hidden layers ki help se complex non-linear relationships learn karta hai</td></tr><tr><th scope=\"row\">Training</th><td>Model ka part ban kar train hota hai; method activation par depend karta hai</td><td>Classically perceptron learning rule se train hota hai</td><td>Usually backpropagation aur gradient-based optimizer se train hota hai</td></tr><tr><th scope=\"row\">Example</th><td>Useful feature detect karne wala unit</td><td>AND jaise linearly separable problem ka classifier</td><td>Non-linear hidden layer ki help se XOR learn karne wala network</td></tr></tbody></table></div><p><strong>Yaad rakho:</strong> Perceptron ek specific artificial neuron hai. MLP bahut saare neurons ko layered network mein combine karta hai.</p>"
      ]
    ]
  },
  {
    "title": "Activation functions: Sigmoid, Tanh, ReLU, GELU, SwiGLU",
    "questions": [
      [
        "What are activation functions, and why are they needed in neural networks?",
        "<p>Activation Function ek mathematical function hota hai jo neuron ke weighted sum ko process karke final output generate karta hai.</p><p>Neural network mein pehle weighted sum calculate hota hai:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"z = w_1x_1+w_2x_2+b\"><mrow><mi>z</mi><mo>=</mo><msub><mi>w</mi><mn>1</mn></msub><msub><mi>x</mi><mn>1</mn></msub><mo>+</mo><msub><mi>w</mi><mn>2</mn></msub><msub><mi>x</mi><mn>2</mn></msub><mo>+</mo><mi>b</mi></mrow></math><p>Uske baad activation function apply hota hai:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"a = f(z)\"><mrow><mi>a</mi><mo>=</mo><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo></mrow></math><p><strong>Why are they needed?</strong></p><p>Activation functions ka primary purpose neural networks mein <strong>non-linearity</strong> introduce karna hai.</p><p>Agar hum activation functions use nahi karte, toh chahe kitni bhi hidden layers add kar dein, neural network mathematically ek single linear transformation ki tarah behave karega.</p><p>Is wajah se model complex patterns aur relationships learn nahi kar payega.</p><p>Activation functions model ko complex, non-linear relationships learn karne mein help karte hain.</p>"
      ],
      [
        "What is the mathematical intuition behind an activation function, and how does it introduce non-linearity?",
        "<p>Mathematically, activation function weighted sum <math xmlns=\"http://www.w3.org/1998/Math/MathML\" aria-label=\"z\"><mi>z</mi></math> ko ek different output mein transform karta hai.</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"z=Wx+b\"><mrow><mi>z</mi><mo>=</mo><mi>W</mi><mi>x</mi><mo>+</mo><mi>b</mi></mrow></math><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"a=f(z)\"><mrow><mi>a</mi><mo>=</mo><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo></mrow></math><p><strong>Without Activation Function:</strong></p><p>Multiple layers mein sirf multiplication aur addition hota hai. Ye linear transformations hain.</p><p>Example:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"h_1=w_1x+b_1\"><mrow><msub><mi>h</mi><mn>1</mn></msub><mo>=</mo><msub><mi>w</mi><mn>1</mn></msub><mi>x</mi><mo>+</mo><msub><mi>b</mi><mn>1</mn></msub></mrow></math><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"h_2=w_2h_1+b_2\"><mrow><msub><mi>h</mi><mn>2</mn></msub><mo>=</mo><msub><mi>w</mi><mn>2</mn></msub><msub><mi>h</mi><mn>1</mn></msub><mo>+</mo><msub><mi>b</mi><mn>2</mn></msub></mrow></math><p>Inko combine karne par:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"h_2=w_2w_1x+w_2b_1+b_2\"><mrow><msub><mi>h</mi><mn>2</mn></msub><mo>=</mo><msub><mi>w</mi><mn>2</mn></msub><msub><mi>w</mi><mn>1</mn></msub><mi>x</mi><mo>+</mo><msub><mi>w</mi><mn>2</mn></msub><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub><mi>b</mi><mn>2</mn></msub></mrow></math><p>Notice karo final output abhi bhi linear hai, chahe hum multiple layers use karein.</p><p><strong>With Activation Function:</strong></p><p>Ab weighted sum ko ReLU se pass karte hain:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"ReLU(z)=max(0,z)\"><mrow><mi>ReLU</mi><mo>(</mo><mi>z</mi><mo>)</mo><mo>=</mo><mi>max</mi><mo>(</mo><mn>0</mn><mo>,</mo><mi>z</mi><mo>)</mo></mrow></math><ul><li>Positive input → Same output.</li><li>Negative input → Zero output.</li></ul><p>Example: ReLU(-5) = 0, ReLU(5) = 5.</p><p>Is tarah activation function non-linear transformation introduce karta hai, jisse neural network complex patterns aur relationships learn kar pata hai.</p><p><strong>Key takeaway:</strong> Without activation functions, neural network behaves like a linear model. With activation functions, it can learn non-linear and complex patterns.</p>"
      ],
      [
        "What is the Sigmoid activation function, and what are its mathematical properties and limitations?",
        "<p>Sigmoid input ko zero aur one ke beech map karta hai:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"sigma(x)=frac{1}{1+e^{-x}}\"><mrow><mi>σ</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow></math><figure><img src=\"../../images/Sigmoid-Function.jpg\" alt=\"Sigmoid activation graph showing an S-shaped curve approaching 0 and 1, with output 0.5 at zero input.\" width=\"1024\" height=\"768\" loading=\"lazy\" style=\"display:block;max-width:100%;height:auto;background:#fff;\"></figure><p><strong>Properties:</strong></p><ul><li>Output range <strong>(0, 1)</strong> hoti hai aur curve S-shaped hota hai.</li><li>Bada positive input dene par output 1 ke paas aata hai.</li><li>Bada negative input dene par output 0 ke paas aata hai.</li></ul><p><strong>Limitations:</strong></p><ul><li>vanishing gradient</li></ul><p><strong>Use:</strong> Binary classification ke output layer mein probability represent karne ke liye use hota hai.</p><p><strong>Yaad rakho:</strong> Binary probability ke liye useful hai, lekin deep hidden layers mein saturation aur vanishing gradients ki wajah se generally avoid kiya jata hai.</p><p><a href=\"https://images.openai.com/static-rsc-4/YFJBdDquttwOcH0SuzbxcEyUFJhB46g2fNiHfZWeLbZhu3fJQ0BdTh2CifyxXb80ta-MC8_jrUGjroCtNLk7b2cKDCX95JZqWmQ9yzc2wGGa5DzJz0XWn_hKCMvVMnwJFqNr7Yw9wHlavlbxrfdN0YBIs8F68C0uX-O6656xRsE?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">Medium ↗</a></p>"
      ],
      [
        "What is the Tanh activation function, and how does it differ from Sigmoid?",
        "<p>Tanh input ko minus one aur plus one ke beech map karta hai:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"tanh(x)=frac{e^x-e^{-x}}{e^x+e^{-x}}\"><mrow><mi>tanh</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mfrac><mrow><msup><mi>e</mi><mrow><mi>x</mi></mrow></msup><mo>−</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow><mrow><msup><mi>e</mi><mrow><mi>x</mi></mrow></msup><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow></math><figure><img src=\"../../images/1_tanh_graph.png\" alt=\"Tanh activation graph showing an S-shaped curve centered at zero, approaching -1 and +1.\" width=\"1024\" height=\"564\" loading=\"lazy\" style=\"display:block;max-width:100%;height:auto;background:#fff;\"></figure><ul><li>Output range <strong>(−1, +1)</strong> hoti hai.</li><li>Ye zero-centered hai: zero input par output zero hota hai.</li><li>Negative inputs par negative output aur positive inputs par positive output milta hai.</li></ul><p><strong>Sigmoid se difference:</strong> <mark style=\"background-color:rgba(255, 221, 0, 0.28);color:inherit;border-radius:3px;padding:0.1em 0.2em;box-decoration-break:clone;-webkit-box-decoration-break:clone;\">Tanh ka output −1 se +1 ke beech hota hai, jabki Sigmoid ka output 0 se 1 ke beech hota hai.</mark></p><p><strong>Limitations:</strong></p><ul><li>vanishing gradient</li></ul><p><strong>Yaad rakho:</strong> Tanh zero-centered hai; Sigmoid nahi. Dono saturation regions mein vanishing gradients se affected ho sakte hain.</p><p><a href=\"https://images.openai.com/static-rsc-4/exzv0pk__4rHYflbhy4Y-FTVEv-aZi_uJqKBJ1pNpItzPQon1dcnr69ggNpp7cbAGD5E_Pq-Cs6sa2gJO6UYUyZURNaHH3fqHakfyZx3WHgeEPzidoqhepdbM2f11jnFqzXpmdTS4dIAy-ItXMspOWHMh_DL36jEd2YAgr1kew8?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">Excurse: Activation functions and the vanishing gradient problem - Fabrizio Musacchio ↗</a></p>"
      ],
      [
        "What is the ReLU activation function, how does it work, and what is the Dying ReLU problem?",
        "<p><strong>ReLU (Rectified Linear Unit)</strong> hidden layers mein use hone wala activation function hai. Ye non-linearity introduce karta hai.</p><p>ReLU input ko zero aur positive infinity ke beech map karta hai:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"f(x)=max(0,x)\"><mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>max</mi><mo>(</mo><mn>0</mn><mo>,</mo><mi>x</mi><mo>)</mo></mrow></math><figure style=\"display:flex;flex-wrap:wrap;align-items:center;gap:24px;margin:24px 0;\"><figcaption style=\"flex:1 1 220px;min-width:0;\"><p>Yeh activation function agar input <strong>x &lt; 0</strong> ho, toh usko <strong>0</strong> kar deta hai.</p><p>Aur agar input <strong>x &gt; 0</strong> ho, toh usko <strong>same return</strong> kar deta hai.</p></figcaption><div style=\"flex:2 1 360px;min-width:0;max-width:100%;\"><img src=\"../../images/Relu-activation-function.png\" alt=\"ReLU graph: output is zero for negative inputs and equals the input for positive inputs.\" width=\"846\" height=\"554\" loading=\"lazy\" style=\"display:block;width:100%;max-width:100%;height:auto;background:#fff;\"></div></figure><p><strong>Example:</strong> ReLU(5) = 5, ReLU(0) = 0, ReLU(-3) = 0. Positive side seedhi line hai, lekin negative side ko 0 karne ki wajah se poora function non-linear hai.</p><p><strong>Derivative aur gradient descent:</strong> Backpropagation loss ka gradient calculate karta hai. Ismein aage se aane wala gradient activation ke derivative se multiply hota hai; gradient descent us gradient se weights update karta hai: <code>w_new = w_old - learning_rate * dL/dw</code>.</p><ul><li><strong>x &gt; 0:</strong> Output x hai aur derivative 1. ReLU(5) = 5, lekin derivative 1 hai; ReLU(10) = 10 par bhi derivative 1 hi hai. Gradient bina shrink hue pass hota hai.</li><li><strong>x &lt; 0:</strong> Output constant 0 hai, isliye derivative 0. Gradient * 0 = 0; is neuron ke incoming weights ko us example se learning signal nahi milta.</li></ul><p><strong>Advantages:</strong> Calculation simple aur fast hai. <mark style=\"background-color:rgba(255, 221, 0, 0.28);color:inherit;border-radius:3px;padding:0.1em 0.2em;box-decoration-break:clone;-webkit-box-decoration-break:clone;\">Positive side par derivative 1 rehne se activation ki wajah se vanishing gradient nahi hota.</mark></p><p><strong>Dying ReLU:</strong> Agar neuron ke inputs lagataar negative rahein, toh output aur gradient 0 reh sakte hain. Neuron inactive ho sakta hai; Leaky ReLU negative side par small gradient dekar is risk ko kam karta hai.</p><p style=\"padding:12px 16px;background:rgba(255,221,0,0.22);border-left:4px solid #d4a900;border-radius:6px;\"><strong>Must watch for better clarity:</strong> <a href=\"https://youtu.be/xyo2ELUOpqg\" target=\"_blank\" rel=\"noopener noreferrer\">ReLU aur Leaky ReLU video explanation</a></p>"
      ],
      [
        "What is Leaky ReLU, and how does it help with the Dying ReLU problem?",
        "<p><strong>Leaky ReLU</strong>, ReLU ka variant hai. Positive input same return hota hai; negative input ko 0 karne ki jagah small positive constant <strong>alpha</strong>, jaise 0.01, se multiply karta hai.</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"f(x) = max(alpha x, x), where 0 less than alpha less than 1\"><mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>max</mi><mo>(</mo><mi>alpha</mi><mi>x</mi><mo>,</mo><mi>x</mi><mo>)</mo></mrow></math><ul><li><strong>x &gt; 0:</strong> Output x; derivative 1.</li><li><strong>x &lt; 0:</strong> Output alpha * x; derivative alpha.</li></ul><p><strong>Example:</strong> Alpha = 0.01 ho, toh Leaky ReLU(5) = 5 aur derivative 1; Leaky ReLU(-5) = -0.05 aur derivative 0.01.</p><p><strong>Derivative aur gradient descent:</strong> Negative side par bhi derivative 0 nahi hota. Aage se gradient 2 aaye aur alpha = 0.01 ho, toh backpropagation mein gradient 2 * 0.01 = 0.02 pass hoga; normal ReLU mein yeh 0 hota. Isse incoming weights ko learning signal mil sakta hai aur gradient descent unhe update kar sakta hai.</p><p><strong>Advantage:</strong> Negative side par small slope hone se neuron ke inactive rehne aur Dying ReLU ka risk kam hota hai. Graph negative side par flat hone ki jagah halka slope rakhta hai; output range <strong>(-infinity, +infinity)</strong> hota hai.</p><p><strong>Yaad rakho:</strong> ReLU negative input ko 0 karta hai; Leaky ReLU small negative output aur non-zero gradient deta hai.</p><p style=\"padding:12px 16px;background:rgba(255,221,0,0.22);border-left:4px solid #d4a900;border-radius:6px;\"><strong>Must watch for better clarity:</strong> <a href=\"https://youtu.be/xyo2ELUOpqg\" target=\"_blank\" rel=\"noopener noreferrer\">ReLU aur Leaky ReLU video explanation</a></p>"
      ],
      [
        "What is GELU, and how does its behaviour differ from ReLU?",
        "<p><strong>GELU = Gaussian Error Linear Unit.</strong> Ye input ko standard Gaussian CDF ke basis par smoothly weight karta hai:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"GELU(x)=xPhi(x)\"><mrow><mi>GELU</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>x</mi><mi>Φ</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow></math><p>Yahan <strong>Φ(x)</strong> standard Gaussian distribution ka cumulative distribution function (CDF) hai.</p><ul><li>ReLU negative values ko hard zero karta hai.</li><li>GELU negative values ko smoothly suppress karta hai; kuch negative inputs par output non-zero negative ho sakta hai.</li><li>Iska transition ReLU ke sharp cutoff ke comparison mein smooth hota hai.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">ReLU</th><th scope=\"col\">GELU</th></tr></thead><tbody><tr><th scope=\"row\">Negative input ko hard zero karta hai</th><td>Negative values ko smoothly suppress karta hai</td></tr><tr><th scope=\"row\">Simple max operation; fast</th><td>Calculation comparatively mehengi hoti hai</td></tr><tr><th scope=\"row\">Piecewise linear</th><td>Smooth non-linear</td></tr><tr><th scope=\"row\">CNNs aur MLPs mein common</th><td>BERT aur Transformer feed-forward blocks mein common</td></tr></tbody></table></div><p><strong>Yaad rakho:</strong> GELU input ko smoothly weight karta hai; ye ReLU ki tarah sharp clipping nahi karta.</p><p><a href=\"https://images.openai.com/static-rsc-4/z7U_y_bZ0IotBcvgMsYFrOWnROr5Rn2MR-AU52N2adnztgJSWymlELrYrNUZMav5VKShDKOu_1Q0-Y1hLR2Sk6Ba1X-eJ4_w6bRuKYG32yfVnV-oQHOnEXmsL645LJJvTJi2UmOSt7glWaOjrYorsYEOVFXC0KdHz72RyZHewBM?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">Encoder Architecture: Bidirectional Transformers for Understanding Tasks - Interactive | Michael Brenndoerfer | Michael Brenndoerfer ↗</a></p>"
      ],
      [
        "What is SwiGLU, and how does its gated mechanism work?",
        "<p><strong>SwiGLU = Swish + Gated Linear Unit.</strong> Isme do learned branches ka element-wise multiplication hota hai:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"SwiGLU(x)=(xW<sub>1</sub>)odot Swish(xW<sub>2</sub>)\"><mrow><mi>SwiGLU</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>x</mi><msub><mi>W</mi><mn>1</mn></msub><mo>)</mo><mo>⊙</mo><mi>Swish</mi><mo>(</mo><mi>x</mi><msub><mi>W</mi><mn>2</mn></msub><mo>)</mo></mrow></math><ul><li><strong>W<sub>1</sub>, W<sub>2</sub>:</strong> Learnable weight matrices hain.</li><li><strong>Swish / SiLU:</strong> Smooth activation hai; Swish(z) = z × sigmoid(z).</li><li><strong>⊙:</strong> Element-wise multiplication ko represent karta hai.</li></ul><ol><li>Same input do alag linear transformations se pass hota hai.</li><li>Ek branch learned features banati hai.</li><li>Doosri branch par Swish apply hota hai aur wo gate ki tarah features modulate karti hai.</li><li>Dono branches element-wise multiply hoti hain.</li></ol><p><strong>Use:</strong> Modern Transformer feed-forward networks, including LLaMA-family models, mein use hota hai.</p><p><strong>Yaad rakho:</strong> SwiGLU sirf ek scalar activation nahi; ye learned projections, smooth activation aur gating ka combination hai.</p><p><a href=\"https://images.openai.com/static-rsc-4/zD8IEd3dbufY-pMuZJPTR30fsLkXYE0b-vAgQgMkpYRYGqnvGK7DbXZqJznPKXfj3xtgiOjB2Wh1-qMXpzY5r14pyY4-WcQlSeDHX40-LnTC3Sa0103BVbFM0fQCZa7MkHg5J6lCg1SGNr9QToi_ny94n_LOCIA-2WuD6qOqFnU?purpose=inline\" target=\"_blank\" rel=\"noopener noreferrer\">T-one — открытая русскоязычная потоковая модель для телефонии / Хабр ↗</a></p>"
      ],
      [
        "What is the vanishing gradient problem, and how do different activation functions contribute to it?",
        "<p><strong>Vanishing gradient:</strong> Backpropagation ke dauraan gradients bahut chhote ho jate hain. Isse early layers ke weights bahut dheere update hote hain.</p><p>Agar har layer par gradient 0.1 se multiply ho, toh:</p><math class=\"activation-equation\" xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\" aria-label=\"0.1 times 0.1 times 0.1 = 0.001\"><mrow><mn>0.1</mn><mo>×</mo><mn>0.1</mn><mo>×</mo><mn>0.1</mn><mo>=</mo><mn>0.001</mn></mrow></math><p>Bahut saari layers ke baad learning signal aur chhota ho sakta hai.</p><ul><li><strong>Sigmoid:</strong> Saturation regions mein gradients almost zero ho sakte hain.</li><li><strong>Tanh:</strong> Extreme positive/negative inputs par gradients chhote ho sakte hain.</li><li><strong>ReLU:</strong> Positive side par derivative 1; negative side par 0 hota hai.</li><li><strong>GELU:</strong> Smooth gradients deta hai, lekin vanishing gradients ko completely eliminate nahi karta.</li><li><strong>SwiGLU:</strong> Smooth activation aur gating provide karta hai; ye bhi complete guarantee nahi hai.</li></ul><p><strong>Yaad rakho:</strong> Modern activations help karti hain, lekin initialization, architecture aur training setup bhi gradient flow ke liye important hain.</p>"
      ],
      [
        "How do Sigmoid, Tanh, ReLU, GELU, and SwiGLU compare?",
        "<div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Activation</th><th scope=\"col\">Output range</th><th scope=\"col\">Gradient behaviour</th><th scope=\"col\">Cost</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>(0, 1)</td><td>Saturation mein vanishing ho sakta hai</td><td>Medium</td></tr><tr><th scope=\"row\">Tanh</th><td>(−1, 1)</td><td>Saturation mein vanishing ho sakta hai</td><td>Medium</td></tr><tr><th scope=\"row\">ReLU</th><td>[0, ∞)</td><td>Negative side par zero</td><td>Low</td></tr><tr><th scope=\"row\">GELU</th><td>Approximately (−0.17, ∞)</td><td>Smooth; vanishing ki guarantee nahi hatata</td><td>Medium–High</td></tr><tr><th scope=\"row\">SwiGLU</th><td>Input aur weights par depend karta hai</td><td>Gated aur smooth</td><td>High</td></tr></tbody></table></div><p><strong>Typical applications:</strong></p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Activation</th><th scope=\"col\">Applications</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>Binary classification output probability</td></tr><tr><th scope=\"row\">Tanh</th><td>Traditional RNN hidden states</td></tr><tr><th scope=\"row\">ReLU</th><td>CNNs aur MLPs</td></tr><tr><th scope=\"row\">GELU</th><td>BERT aur Transformers</td></tr><tr><th scope=\"row\">SwiGLU</th><td>LLaMA aur modern LLMs</td></tr></tbody></table></div><p><strong>Yaad rakho:</strong> Koi ek activation har situation mein best nahi hota. Architecture, compute budget aur learning requirements dekh kar choose karo.</p>"
      ],
      [
        "Why are GELU and SwiGLU commonly used in modern Transformer architectures instead of traditional activation functions?",
        "<p><strong>GELU kyun?</strong></p><ul><li>Smooth non-linear transformation provide karta hai.</li><li>Negative values ko gradually suppress karta hai.</li><li>Transformer feed-forward blocks mein useful hai; BERT iska example hai.</li></ul><p><strong>SwiGLU kyun?</strong></p><ul><li>Gating ki help se learned features ka flow modulate karta hai.</li><li>Do projections aur non-linearity model ko expressive flexibility dete hain.</li><li>LLaMA jaise modern LLM architectures mein use hota hai.</li></ul><p><strong>Har jagah ReLU kyun nahi?</strong> ReLU simple aur fast hai. Lekin kuch Transformer architectures mein smooth ya gated transformations better results de sakti hain; choice architecture aur evaluation par depend karti hai.</p><p><strong>Yaad rakho:</strong> GELU smooth transformation deta hai; SwiGLU smooth activation ke saath learned gating bhi add karta hai.</p>"
      ]
    ],
    "extraHTML": "<section class=\"activation-revision\"><button type=\"button\" class=\"activation-revision-toggle\" aria-expanded=\"false\" aria-controls=\"activation-revision-content\">Quick revision & interview self-test <span aria-hidden=\"true\">+</span></button><div id=\"activation-revision-content\" hidden><h3>Final Quick Revision – Remember These 5 Things</h3><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Activation</th><th scope=\"col\">Remember this</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>0 aur 1 ke beech probability</td></tr><tr><th scope=\"row\">Tanh</th><td>Zero-centered; −1 se +1 ke beech</td></tr><tr><th scope=\"row\">ReLU</th><td>Negative = 0; positive unchanged</td></tr><tr><th scope=\"row\">GELU</th><td>ReLU jaisi, lekin smooth activation</td></tr><tr><th scope=\"row\">SwiGLU</th><td>Gating aur Swish ka combination</td></tr></tbody></table></div><form class=\"activation-quiz\"><h3>Interview Self-Test</h3><p>5 MCQs – Test your understanding</p><p class=\"quiz-status\" role=\"status\" aria-live=\"polite\">0/5 answered</p><fieldset data-correct=\"1\"><legend>1. Which activation function is zero-centered?</legend><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"0\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"1\"> Tanh</label><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"2\"> ReLU</label><label><input type=\"radio\" name=\"activation-quiz-0\" value=\"3\"> GELU</label><p class=\"quiz-feedback\" hidden>Tanh zero-centered hai aur output −1 se +1 ke beech hota hai.</p></fieldset><fieldset data-correct=\"2\"><legend>2. Which activation function suffers from the Dying ReLU problem?</legend><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"0\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"1\"> Tanh</label><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"2\"> ReLU</label><label><input type=\"radio\" name=\"activation-quiz-1\" value=\"3\"> SwiGLU</label><p class=\"quiz-feedback\" hidden>Pre-activations negative rehne par ReLU neuron inactive reh sakta hai.</p></fieldset><fieldset data-correct=\"0\"><legend>3. Which activation function is commonly associated with BERT?</legend><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"0\"> GELU</label><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"1\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"2\"> Tanh</label><label><input type=\"radio\" name=\"activation-quiz-2\" value=\"3\"> ReLU</label><p class=\"quiz-feedback\" hidden>BERT ke feed-forward network mein GELU use hota hai.</p></fieldset><fieldset data-correct=\"1\"><legend>4. What makes SwiGLU different?</legend><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"0\"> Probability output</label><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"1\"> Gating mechanism</label><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"2\"> Only positive outputs</label><label><input type=\"radio\" name=\"activation-quiz-3\" value=\"3\"> Hard zero threshold</label><p class=\"quiz-feedback\" hidden>SwiGLU element-wise multiplication se learned features ko gate karta hai.</p></fieldset><fieldset data-correct=\"1\"><legend>5. Which activation is most likely to suffer from saturation-based vanishing gradients?</legend><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"0\"> ReLU</label><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"1\"> Sigmoid</label><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"2\"> SwiGLU</label><label><input type=\"radio\" name=\"activation-quiz-4\" value=\"3\"> GELU</label><p class=\"quiz-feedback\" hidden>Sigmoid ki saturation regions mein derivatives bahut chhote hote hain.</p></fieldset><button type=\"submit\" class=\"primary-button\">Check answers</button><button type=\"reset\" class=\"notebook-secondary\">Reset quiz</button></form></div></section>"
  },
  {
    "title": "Forward pass - how information flows",
    "questions": [
      [
        "What is a forward pass, and how does information flow through a neural network?",
        "<p>Forward pass mein input data network ki layers se hokar prediction tak pahunchta hai.</p><ol><li><strong>Input:</strong> Features ka batch pehli layer ko diya jata hai.</li><li><strong>Layers:</strong> Har layer weights, bias aur activation se inputs transform karti hai.</li><li><strong>Output:</strong> Final layer prediction ya loss calculate karne ke liye values deti hai.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>a_next = activation(W * a_previous + b)</code></p><p><strong>Example:</strong> Image pixels hidden layers se pass hote hain aur end mein class scores milte hain.</p><p><strong>Yaad rakho:</strong> Forward pass = inputs se prediction tak ka flow.</p>"
      ],
      [
        "Does a forward pass update the model's weights?",
        "<p>Nahi. Forward pass normally sirf output calculate karta hai; learned weights ko apne aap update nahi karta.</p><ul><li><strong>Prediction:</strong> Current parameters use karke model evaluate hota hai.</li><li><strong>Loss:</strong> Prediction ko target se compare karke error calculate hota hai.</li><li><strong>Update:</strong> Backpropagation gradients nikalta hai; optimizer weights update karta hai.</li><li><strong>Nuance:</strong> Training forward pass mein kuch layers ka non-parameter state, jaise BatchNorm running statistics, update ho sakta hai.</li></ul><p><strong>Yaad rakho:</strong> Forward predict karta hai; optimizer learned weights update karta hai.</p>"
      ]
    ]
  },
  {
    "title": "Backpropagation - how gradients flow backward",
    "questions": [
      [
        "What is backpropagation, and how do gradients flow backward through a neural network?",
        "<p>Backpropagation chain rule use karke loss ke gradients network mein backward direction mein calculate karta hai.</p><ol><li><strong>Start:</strong> Forward prediction aur target se loss calculate karo.</li><li><strong>Chain rule:</strong> Local derivatives combine karke pata lagao ki har parameter loss ko kitna affect karta hai.</li><li><strong>Update:</strong> Backpropagation gradients deta hai; optimizer unhe use karke parameters change karta hai.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>dL/dw = (dL/da) * (da/dz) * (dz/dw)</code></p><p><strong>Symbols:</strong> L loss hai, w weight hai, z pre-activation value hai, aur a activated output hai.</p><p><strong>Yaad rakho:</strong> Backward gradients nikalta hai; optimizer weights change karta hai.</p>"
      ],
      [
        "What is the difference between backpropagation and an optimizer?",
        "<p>Backpropagation aur optimizer alag kaam karte hain: pehla gradients calculate karta hai, doosra update apply karta hai.</p><ul><li><strong>Backpropagation:</strong> Batata hai ki parameter badalne se loss kaise change hoga.</li><li><strong>Optimizer:</strong> Gradients ke basis par update choose aur apply karta hai.</li><li><strong>Order:</strong> Loss calculate karo → backpropagate karo → optimizer step lo.</li></ul><p><strong>Yaad rakho:</strong> Backprop direction ka signal calculate karta hai; optimizer us signal ke basis par step leta hai.</p>"
      ]
    ]
  },
  {
    "title": "Weight initialization strategies",
    "questions": [
      [
        "What is weight initialization, and what are Xavier and He initialization?",
        "<p>Weight initialization ka matlab training shuru hone se pehle weights ki initial values choose karna hai.</p><ul><li><strong>Symmetry:</strong> Alag random weights hidden neurons ko alag features learn karne mein help karte hain. Identical zero weights se neurons identical reh sakte hain.</li><li><strong>Xavier:</strong> Fan-in aur fan-out ke basis par signal scale balance karta hai; tanh ya roughly linear activations ke liye common hai.</li><li><strong>He:</strong> ReLU-like rectification ko account karta hai, jahan negative inputs suppress hote hain.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Initialization</th><th scope=\"col\">Typical variance</th><th scope=\"col\">Typical match</th></tr></thead><tbody><tr><th scope=\"row\">Xavier / Glorot</th><td>2 / (fan_in + fan_out), optional gain adjustments se pehle</td><td>Tanh ya roughly linear activations</td></tr><tr><th scope=\"row\">He / Kaiming</th><td>ReLU ke liye fan-in mode mein 2 / fan_in</td><td>ReLU-like activations</td></tr></tbody></table></div><p><strong>Symbols:</strong> fan_in incoming connections ki count hai; fan_out outgoing connections ki count hai. Exact scaling activation aur initialization variant par depend karti hai.</p><p><strong>Yaad rakho:</strong> Appropriate scale ke random weights se start karo; identical hidden weights se nahi.</p>"
      ],
      [
        "What is Xavier initialization?",
        "<p>Xavier initialization incoming aur outgoing connections ko dekh kar random weights ka scale choose karta hai.</p><ul><li><strong>Goal:</strong> Layers ke across signal ko bahut zyada grow ya shrink hone se bachana.</li><li><strong>Scale:</strong> Fan-in aur fan-out use karke initial variance set hoti hai.</li><li><strong>Use:</strong> Tanh ya roughly linear activations ke saath, suitable gain ke saath, common hai.</li></ul><p><strong>Yaad rakho:</strong> Xavier layer mein aane aur bahar jaane wali connections ke basis par signal scale balance karta hai.</p>"
      ],
      [
        "What is He initialization?",
        "<p>He initialization random weights ko ReLU jaise rectifying activations ke hisaab se scale karta hai.</p><ul><li><strong>Reason:</strong> ReLU input ka negative part zero karta hai.</li><li><strong>Scale:</strong> Common ReLU fan-in configuration mein weight variance 2 / fan_in hoti hai.</li><li><strong>Purpose:</strong> Bahut saari layers ke across useful signal scale maintain karne mein help karna.</li></ul><p><strong>Yaad rakho:</strong> He initialization ReLU-like rectification ko account karta hai.</p>"
      ]
    ]
  },
  {
    "title": "Vanishing / exploding gradient problem",
    "questions": [
      [
        "What are vanishing and exploding gradients, and how do they affect learning?",
        "<p>Vanishing gradients bahut chhote ho jate hain; exploding gradients bahut bade ho jate hain. Dono learning ko affect karte hain.</p><ul><li><strong>Vanishing:</strong> Early layers ko tiny gradients milte hain, isliye wo bahut slowly learn kar sakti hain.</li><li><strong>Exploding:</strong> Bade gradients unstable updates, huge loss ya NaN/Inf values create kar sakte hain.</li><li><strong>Control:</strong> Suitable initialization aur architecture gradient flow improve karte hain; gradient clipping specifically bade gradients ko limit karta hai.</li></ul><p><strong>Yaad rakho:</strong> Bahut chhota gradient = weak learning signal; bahut bada gradient = unstable learning.</p>"
      ],
      [
        "What is a vanishing gradient?",
        "<p>Vanishing gradient ek backward learning signal hai jo layers ke through propagate hote-hote bahut chhota ho jata hai.</p><ul><li><strong>Cause:</strong> Derivatives ka repeated multiplication signal ko shrink kar sakta hai.</li><li><strong>Effect:</strong> Early layers ya sequence ke distant steps slowly learn kar sakte hain.</li><li><strong>Help:</strong> Suitable activations, initialization, skip connections ya gated architectures gradient flow improve kar sakte hain.</li></ul><p><strong>Yaad rakho:</strong> Tiny gradient ka matlab weak learning signal hai.</p>"
      ],
      [
        "What is an exploding gradient?",
        "<p>Exploding gradient ek backward learning signal hai jo excessively large ho jata hai.</p><ul><li><strong>Cause:</strong> Repeated transformations derivatives ko amplify kar sakti hain.</li><li><strong>Effect:</strong> Bade updates loss ko unstable bana sakte hain ya NaN/Inf values produce kar sakte hain.</li><li><strong>Help:</strong> Gradient clipping, suitable initialization aur training settings stability improve kar sakte hain.</li></ul><p><strong>Yaad rakho:</strong> Oversized gradient se unstable parameter updates ho sakte hain.</p>"
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
