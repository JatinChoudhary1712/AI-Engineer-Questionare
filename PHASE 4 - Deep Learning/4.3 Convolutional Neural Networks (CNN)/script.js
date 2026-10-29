const topics = [
  {
    "title": "Convolution operation - feature detection",
    "questions": [
      [
        "What is a convolution operation, and how does a CNN use it to detect features?",
        "<p>A convolution applies learned filters to local input regions to produce feature maps.</p><ul><li><strong>Local pattern:</strong> Multiply filter weights by nearby input values and sum them, usually adding a bias.</li><li><strong>Weight sharing:</strong> Reuse the same filter across spatial positions.</li><li><strong>Hierarchy:</strong> Early layers often detect edges or textures; deeper layers combine them into task-relevant patterns.</li></ul><p class=\"example\"><strong>Example:</strong> An edge-sensitive filter responds strongly where an image changes sharply from dark to light.</p><p><strong>Remember:</strong> One shared filter scans many positions for a useful pattern.</p>"
      ],
      [
        "What is a convolution filter or kernel?",
        "<p>A convolution filter is a small set of learned weights applied across local input regions.</p><ul><li><strong>Locality:</strong> Inspect a small neighborhood at each position.</li><li><strong>Sharing:</strong> Reuse the same weights across spatial positions.</li><li><strong>Output:</strong> Produce a feature map that records the filter's responses.</li></ul><p><strong>Remember:</strong> One learned filter looks for a pattern in many locations.</p>"
      ],
      [
        "How do early and deeper CNN features differ?",
        "<p>Early CNN layers often learn simple local patterns; deeper layers combine them into task-relevant features.</p><ul><li><strong>Early layers:</strong> Often respond to edges, colors, and textures.</li><li><strong>Deeper layers:</strong> Combine simpler features into more complex structures.</li><li><strong>Task dependence:</strong> The exact features depend on the data and objective.</li></ul><p><strong>Remember:</strong> Simple patterns combine into more useful representations.</p>"
      ]
    ]
  },
  {
    "title": "Pooling layers - spatial downsampling",
    "questions": [
      [
        "What is pooling, and how do max pooling and average pooling reduce spatial size?",
        "<p>Pooling summarizes local feature-map regions, usually reducing their spatial dimensions.</p><ul><li><strong>Max pooling:</strong> Keep the largest value, emphasizing a strong local response.</li><li><strong>Average pooling:</strong> Keep the mean value, summarizing the region's overall response.</li><li><strong>Tradeoff:</strong> Downsampling reduces computation but loses spatial detail; output size depends on the window and stride.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Method</th><th scope=\"col\">Local summary</th><th scope=\"col\">Typical purpose</th></tr></thead><tbody><tr><th scope=\"row\">Max pooling</th><td>Largest value in each window</td><td>Keep a strong local feature response</td></tr><tr><th scope=\"row\">Average pooling</th><td>Mean of values in each window</td><td>Summarize overall activity; global averaging summarizes each feature map</td></tr></tbody></table></div><p class=\"example\"><strong>Example:</strong> For a region [1, 3, 2, 4], max pooling gives 4 and average pooling gives 2.5.</p><p><strong>Remember:</strong> Max keeps the strongest response; average keeps the local mean.</p>"
      ],
      [
        "What is max pooling?",
        "<p>Max pooling keeps the largest value in each local feature-map region.</p><ul><li><strong>Operation:</strong> Select the strongest activation in a window.</li><li><strong>Downsampling:</strong> A stride greater than one usually reduces spatial size.</li><li><strong>Tradeoff:</strong> Keep strong responses while discarding other local details.</li></ul><p><strong>Remember:</strong> Max pooling keeps the strongest local response.</p>"
      ],
      [
        "What is average pooling?",
        "<p>Average pooling replaces each selected region with its mean value.</p><ul><li><strong>Operation:</strong> Average the values in a window.</li><li><strong>Summary:</strong> Represent overall local activity rather than only its strongest response.</li><li><strong>Global version:</strong> Average each entire feature map to obtain one value per channel.</li></ul><p><strong>Remember:</strong> Average pooling keeps the local mean.</p>"
      ]
    ]
  },
  {
    "title": "CNN architectures: LeNet, AlexNet, VGG, ResNet",
    "questions": [
      [
        "What are LeNet, AlexNet, VGG, and ResNet, and what is the main idea of each?",
        "<p>LeNet, AlexNet, VGG, and ResNet are CNN families with different approaches to learning visual features.</p><ul><li><strong>LeNet and AlexNet:</strong> LeNet is an early digit-recognition CNN; AlexNet popularized deeper CNN training with ReLU and GPUs.</li><li><strong>VGG:</strong> Builds deeper networks mainly by stacking small 3-by-3 convolutions.</li><li><strong>ResNet:</strong> Uses residual shortcuts to make very deep networks easier to optimize.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Architecture</th><th scope=\"col\">Main idea</th></tr></thead><tbody><tr><th scope=\"row\">LeNet</th><td>Early convolution-and-pooling network for digit recognition</td></tr><tr><th scope=\"row\">AlexNet</th><td>Large-scale deep CNN with ReLU, dropout, and GPU training</td></tr><tr><th scope=\"row\">VGG</th><td>Deep stacks of small 3-by-3 convolution filters</td></tr><tr><th scope=\"row\">ResNet</th><td>Residual shortcuts improve optimization of very deep networks</td></tr></tbody></table></div><p><strong>Remember:</strong> LeNet: early CNN; AlexNet: deep breakthrough; VGG: small filters; ResNet: shortcuts.</p>"
      ],
      [
        "What is LeNet?",
        "<p>LeNet is an early convolutional neural-network family associated with handwritten digit recognition.</p><ul><li><strong>Convolutions:</strong> Detect local image patterns.</li><li><strong>Downsampling:</strong> Reduce the spatial representation between stages.</li><li><strong>Prediction:</strong> Combine learned features to classify the input.</li></ul><p><strong>Remember:</strong> LeNet is a foundational example of a CNN for digits.</p>"
      ],
      [
        "What is AlexNet known for?",
        "<p>AlexNet helped popularize deep CNNs through strong large-scale image-classification results.</p><ul><li><strong>Depth:</strong> Use multiple convolutional and fully connected layers.</li><li><strong>Training:</strong> Use ReLU activations and GPU computation.</li><li><strong>Regularization:</strong> Use techniques including dropout and data augmentation.</li></ul><p><strong>Remember:</strong> AlexNet demonstrated the practical power of deep CNN training.</p>"
      ],
      [
        "What is VGG's main design idea?",
        "<p>VGG builds deep CNNs mainly by stacking small 3-by-3 convolution filters.</p><ul><li><strong>Small filters:</strong> Reuse a simple convolutional building block.</li><li><strong>Depth:</strong> Stacked layers cover larger effective image regions.</li><li><strong>Non-linearity:</strong> Activations between convolutions enable richer transformations.</li></ul><p><strong>Remember:</strong> VGG favors simple small filters stacked deeply.</p>"
      ],
      [
        "What is ResNet's main design idea?",
        "<p>ResNet uses residual connections to make very deep networks easier to optimize.</p><ul><li><strong>Block:</strong> Add a learned transformation to a shortcut representation.</li><li><strong>Identity:</strong> The shortcut can carry the original input when shapes match.</li><li><strong>Benefit:</strong> Improve information and gradient flow through deep networks.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>output = F(input) + input</code></p><p><strong>Remember:</strong> ResNet learns corrections around shortcut paths.</p>"
      ]
    ]
  },
  {
    "title": "Transfer learning with CNNs",
    "questions": [
      [
        "What is transfer learning with a pretrained CNN?",
        "<p>CNN transfer learning reuses features learned on a source task for a new image task.</p><ol><li><strong>Reuse:</strong> Start with a pretrained feature extractor rather than random weights.</li><li><strong>Adapt:</strong> Replace the prediction head to match the new labels and train it.</li><li><strong>Fine-tune:</strong> Optionally unfreeze some pretrained layers with a smaller learning rate and validate the result.</li></ol><p class=\"example\"><strong>Example:</strong> For a small flower dataset, reuse a pretrained CNN and train a new flower-classification head.</p><p><strong>Remember:</strong> Reuse visual features, then adapt the task-specific head.</p>"
      ],
      [
        "What do you replace when adapting a pretrained CNN to new classes?",
        "<p>Usually keep the pretrained feature extractor and replace the final prediction head.</p><ul><li><strong>Backbone:</strong> Reuse learned visual representations.</li><li><strong>New head:</strong> Set its output size to match the target labels.</li><li><strong>Training:</strong> Fit the head first and optionally fine-tune selected backbone layers.</li></ul><p><strong>Remember:</strong> Reuse the features; adapt the output layer.</p>"
      ]
    ]
  },
  {
    "title": "Applications: image classification, object detection",
    "questions": [
      [
        "What are image classification and object detection, and how do their outputs differ?",
        "<p>Image classification labels an image; object detection identifies individual objects and their locations.</p><ul><li><strong>Classification:</strong> Usually returns image-level labels or scores without object locations.</li><li><strong>Detection:</strong> Returns a class, location such as a bounding box, and confidence for each detected object.</li><li><strong>Use:</strong> Detection supports locating and counting instances; classification alone usually does not.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Task</th><th scope=\"col\">Typical output</th><th scope=\"col\">Example</th></tr></thead><tbody><tr><th scope=\"row\">Classification</th><td>Image-level class scores or labels</td><td>This image contains a dog</td></tr><tr><th scope=\"row\">Detection</th><td>One class, location, and confidence per detected object</td><td>Two dogs with two bounding boxes</td></tr></tbody></table></div><p><strong>Remember:</strong> Classification says what is present; detection also says where.</p>"
      ],
      [
        "What is image classification?",
        "<p>Image classification assigns image-level labels or scores to an input image.</p><ul><li><strong>Input:</strong> Receive an entire image.</li><li><strong>Output:</strong> Predict the category or categories associated with it.</li><li><strong>Limit:</strong> A label alone does not locate each object instance.</li></ul><p><strong>Remember:</strong> Classification answers what is in the image.</p>"
      ],
      [
        "What is object detection?",
        "<p>Object detection predicts the classes and locations of individual objects in an image.</p><ul><li><strong>Class:</strong> Identify what each detected object is.</li><li><strong>Location:</strong> Commonly return a bounding box for each object.</li><li><strong>Confidence:</strong> Report a score for each detection.</li></ul><p><strong>Remember:</strong> Detection answers what objects are present and where they are.</p>"
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
