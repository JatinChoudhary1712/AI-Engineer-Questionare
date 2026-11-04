# Activation Functions – Hinglish Interview Revision Notes

Beginner-friendly • Interview-oriented • Short revision notes

## 01. What are activation functions, and why are they needed in neural networks?

Definition: Activation function ek mathematical function hai jo neuron ke weighted sum ko process karke final output generate karta hai.

Why do we need them?

- Neural network mein non-linearity introduce karte hain.
- Complex patterns aur relationships learn karne mein help karte hain.
- Without activation functions, multiple layers bhi ek single linear transformation ki tarah behave karengi.

Interview takeaway: Activation functions allow neural networks to learn complex, non-linear relationships.

## 02. What is the mathematical intuition behind an activation function, and how does it introduce non-linearity?

Ek neuron pehle inputs ka weighted sum calculate karta hai:

\\[ z = w_1x_1+w_2x_2+b \\]

Then activation function apply hota hai:

\\[ a = f(z) \\]

Simple intuition:

- Weighted sum decide karta hai input ka combined influence.
- Activation function decide karta hai output kaise transform hoga.
- Is transformation se network complex patterns learn kar sakta hai.

Example: Agar hum sirf linear transformations use karein, toh network complex curved patterns learn nahi kar payega.

Interview takeaway: Activation functions introduce non-linearity, allowing deep networks to learn beyond simple linear relationships.

## 03. What is the Sigmoid activation function, and what are its mathematical properties and limitations?

Sigmoid

\\[ \sigma(x)=\frac{1}{1+e^{-x}} \\]

[Medium](https://images.openai.com/static-rsc-4/YFJBdDquttwOcH0SuzbxcEyUFJhB46g2fNiHfZWeLbZhu3fJQ0BdTh2CifyxXb80ta-MC8_jrUGjroCtNLk7b2cKDCX95JZqWmQ9yzc2wGGa5DzJz0XWn_hKCMvVMnwJFqNr7Yw9wHlavlbxrfdN0YBIs8F68C0uX-O6656xRsE?purpose=inline)

Properties:

- Output range: 0 to 1.
- S-shaped curve.
- Large positive input → output approaches 1.
- Large negative input → output approaches 0.

Limitations:

- Vanishing gradient problem.
- Not zero-centered.
- Computationally expensive due to exponential calculation.

Where is it used?

- Binary classification output layer.
- Probability prediction.

Interview takeaway: Sigmoid is useful for binary classification because its output can represent probabilities, but it is generally avoided in deep hidden layers due to vanishing gradients.

## 04. What is the Tanh activation function, and how does it differ from Sigmoid?

Tanh

\\[ \tanh(x)=\frac{e^x-e^{-x}}{e^x+e^{-x}} \\]

[Excurse: Activation functions and the vanishing gradient problem - Fabrizio Musacchio](https://images.openai.com/static-rsc-4/exzv0pk__4rHYflbhy4Y-FTVEv-aZi_uJqKBJ1pNpItzPQon1dcnr69ggNpp7cbAGD5E_Pq-Cs6sa2gJO6UYUyZURNaHH3fqHakfyZx3WHgeEPzidoqhepdbM2f11jnFqzXpmdTS4dIAy-ItXMspOWHMh_DL36jEd2YAgr1kew8?purpose=inline)

Properties:

- Output range: -1 to +1.
- Zero-centered.
- Negative inputs produce negative outputs.
- Positive inputs produce positive outputs.

Sigmoid vs Tanh:

| Sigmoid                   | Tanh                    |
| ------------------------- | ----------------------- |
| 0 to 1                    | -1 to +1                |
| Not zero-centered         | Zero-centered           |
| Vanishing gradients       | Vanishing gradients     |
| Binary output probability | Older RNN hidden layers |

Interview takeaway: Tanh is zero-centered, unlike Sigmoid, but both suffer from vanishing gradients.

## 05. What is the ReLU activation function, how does it work, and what is the Dying ReLU problem?

ReLU

\\[ f(x)=\max(0,x) \\]

[The ReLU Activation Function: Powering Modern Neural Networks | CodeSignal Learn](https://images.openai.com/static-rsc-4/SsWK5_KdhRGV8XC8nISLjiljWg9WzEf8aFK0gnu8FkP07DHcwOer8w6DJ6JCpK1ukUnvMiEQTxgXcCq_1iqlms9eh0h7kOL9vTQZrsIPDajoRCBF_l6xL5jbD1BXnluHmBc7RjIIEtfn7nn0wjbjUi9y4a1pFHK6cTou6WYfM1Q?purpose=inline)

How does it work?

- Negative input → 0.
- Positive input → same input.
- Simple and computationally efficient.

Dying ReLU problem:

Jab neuron consistently negative inputs receive karta hai, toh output 0 ho jata hai.

Is situation mein gradient bhi 0 ho sakta hai, jiski wajah se neuron learning stop kar deta hai.

Advantages:

- Computationally fast.
- Positive side par vanishing gradient problem significantly reduce karta hai.
- Deep neural networks mein useful.

Interview takeaway: ReLU is computationally efficient, but neurons can die when they consistently output zero.

## 06. What is GELU, and how does its behaviour differ from ReLU?

GELU

GELU = Gaussian Error Linear Unit.

\\[ GELU(x)=x\Phi(x) \\]

Yahan \\(\Phi(x)\\) standard Gaussian distribution ka CDF hai.

[Encoder Architecture: Bidirectional Transformers for Understanding Tasks - Interactive | Michael Brenndoerfer | Michael Brenndoerfer](https://images.openai.com/static-rsc-4/z7U_y_bZ0IotBcvgMsYFrOWnROr5Rn2MR-AU52N2adnztgJSWymlELrYrNUZMav5VKShDKOu_1Q0-Y1hLR2Sk6Ba1X-eJ4_w6bRuKYG32yfVnV-oQHOnEXmsL645LJJvTJi2UmOSt7glWaOjrYorsYEOVFXC0KdHz72RyZHewBM?purpose=inline)

How does it work?

- ReLU negative values ko completely zero kar deta hai.
- GELU negative values ko smoothly suppress karta hai.
- GELU input magnitude ke basis par values ko weight karta hai.
- Iska transition ReLU ke comparison mein smooth hota hai.

ReLU vs GELU:

| ReLU                    | GELU                           |
| ----------------------- | ------------------------------ |
| Hard zero for negatives | Smooth suppression             |
| Simple max operation    | More computationally expensive |
| Piecewise linear        | Smooth nonlinear               |
| CNNs, MLPs              | Transformers, BERT             |

Interview takeaway: GELU provides a smoother activation than ReLU and is widely used in Transformer architectures.

## 07. What is SwiGLU, and how does its gated mechanism work?

SwiGLU

SwiGLU = Swish + Gated Linear Unit.

Basic intuition:

Normal activation function input ko transform karta hai, whereas SwiGLU mein ek additional gate hota hai jo information control karta hai.

\\[ SwiGLU(x)=(xW_1)\odot Swish(xW_2) \\]

Where:

- \\(W_1,W_2\\) = learnable weight matrices.
- Swish = smooth activation function.
- \\(\odot\\) = element-wise multiplication.

How does it work?

1. Input two different linear transformations se pass hota hai.
2. One branch information generate karta hai.
3. Second branch gate ki tarah behave karta hai.
4. Dono branches element-wise multiply hoti hain.

[T-one — открытая русскоязычная потоковая модель для телефонии / Хабр](https://images.openai.com/static-rsc-4/zD8IEd3dbufY-pMuZJPTR30fsLkXYE0b-vAgQgMkpYRYGqnvGK7DbXZqJznPKXfj3xtgiOjB2Wh1-qMXpzY5r14pyY4-WcQlSeDHX40-LnTC3Sa0103BVbFM0fQCZa7MkHg5J6lCg1SGNr9QToi_ny94n_LOCIA-2WuD6qOqFnU?purpose=inline)

Where is it used?

- Modern Transformer architectures.
- LLaMA-family models.
- Large Language Models.

Interview takeaway: SwiGLU uses a gating mechanism to control information flow and improve the expressive capacity of Transformer feed-forward networks.

## 08. What is the vanishing gradient problem, and how do different activation functions contribute to it?

Definition: Vanishing gradient tab hota hai jab backpropagation ke during gradients bahut small ho jaate hain.

As a result, early layers mein weights effectively update nahi ho paate.

Simple intuition:

Imagine gradient har layer mein 0.1 se multiply ho raha hai:

\\[ 0.1 \times 0.1 \times 0.1 = 0.001 \\]

Multiple layers ke baad gradient extremely small ho sakta hai.

Activation functions ka role:

- Sigmoid: Saturation regions mein gradients almost zero ho jaate hain.
- Tanh: Extreme positive/negative values par gradients small ho jaate hain.
- ReLU: Positive side par gradient 1 hota hai, negative side par 0.
- GELU: Smooth gradients provide karta hai, but vanishing gradients ko completely eliminate nahi karta.
- SwiGLU: Gating aur smooth activation provide karta hai, but vanishing gradients ka complete solution nahi hai.

Interview takeaway: Vanishing gradients make early layers learn slowly. ReLU and modern activation functions help, but do not completely eliminate this problem.

## 09. How do Sigmoid, Tanh, ReLU, GELU, and SwiGLU compare?

| Activation | Output range                 | Gradient behaviour       | Cost        |
| ---------- | ---------------------------- | ------------------------ | ----------- |
| Sigmoid    | (0, 1)                       | Vanishing                | Medium      |
| Tanh       | (-1, 1)                      | Vanishing                | Medium      |
| ReLU       | [0, ∞)                       | Zero for negative inputs | Low         |
| GELU       | Approximately (-0.17, ∞)     | Smooth                   | Medium–High |
| SwiGLU     | Depends on input and weights | Gated, smooth            | High        |

Typical applications:

| Activation | Applications          |
| ---------- | --------------------- |
| Sigmoid    | Binary classification |
| Tanh       | Traditional RNNs      |
| ReLU       | CNNs, MLPs            |
| GELU       | BERT, Transformers    |
| SwiGLU     | LLaMA and modern LLMs |

Interview takeaway: No single activation function is best for every situation. Selection depends on architecture, computational budget and learning requirements.

## 10. Why are GELU and SwiGLU commonly used in modern Transformer architectures instead of traditional activation functions?

GELU:

- Smooth activation.
- Gradually suppresses negative values.
- Works well in Transformer feed-forward networks.
- Used in BERT and other Transformer architectures.

SwiGLU:

- Uses a gating mechanism.
- Controls how much information passes through.
- Provides greater expressive flexibility.
- Used in several modern LLM architectures, including LLaMA.

Why not traditional ReLU everywhere?

ReLU is simple and fast, but GELU and SwiGLU offer smoother or gated transformations that can work better in certain Transformer architectures.

Interview takeaway: GELU and SwiGLU are popular because they provide useful nonlinear transformations, and SwiGLU additionally offers controlled information flow through gating.

## Final Quick Revision – Remember These 5 Things

| Activation | Remember this                 |
| ---------- | ----------------------------- |
| Sigmoid    | Probability between 0 and 1   |
| Tanh       | Zero-centered, -1 to +1       |
| ReLU       | Negative = 0, positive = same |
| GELU       | Smooth ReLU-like activation   |
| SwiGLU     | Gating + Swish                |

## Interview Self-Test

5 MCQs – Test your understanding

0/5 answered

1\. Which activation function is zero-centered?

Sigmoid

Tanh

ReLU

GELU

2\. Which activation function suffers from the Dying ReLU problem?

Sigmoid

Tanh

ReLU

SwiGLU

3\. Which activation function is commonly associated with BERT?

GELU

Sigmoid

Tanh

ReLU

4\. What makes SwiGLU different?

Probability output

Gating mechanism

Only positive outputs

Hard zero threshold

5\. Which activation is most likely to suffer from saturation-based vanishing gradients?

ReLU

Sigmoid

SwiGLU

GELU

Check answers