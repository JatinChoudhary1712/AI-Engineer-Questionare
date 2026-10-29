const topics = [
  {
    "title": "Tensors - creation, operations, GPU",
    "questions": [
      [
        "What is a PyTorch tensor, and how do you create it, perform basic operations, and move it to a GPU?",
        "<p>A PyTorch tensor is a multidimensional array that supports numerical operations, devices, and automatic differentiation.</p><ul><li><strong>Create:</strong> Use tensor, zeros, or rand to construct values with a chosen shape and dtype.</li><li><strong>Operate:</strong> Use arithmetic for element-wise work and @ for matrix multiplication with compatible shapes.</li><li><strong>Device:</strong> Move tensors to an available GPU with .to(device), keeping interacting tensors on compatible devices.</li></ul><pre><code class=\"language-python\">import torch\n\nx = torch.tensor([[1., 2.], [3., 4.]], dtype=torch.float32)\nzeros = torch.zeros(3, 4)\nrandom_values = torch.rand(2, 2)\nelementwise = x * x\nmatrix_product = x @ x\n\ndevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')\nx = x.to(device)\nprint(x.shape, x.dtype, x.device)</code></pre><p><strong>Remember:</strong> A tensor combines values, shape, dtype, and device.</p><p><a href=\"https://docs.pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch tensor tutorial</a></p>"
      ]
    ]
  },
  {
    "title": "torch.nn.Module - building models",
    "questions": [
      [
        "What is torch.nn.Module, and what are the roles of __init__ and forward?",
        "<p>torch.nn.Module is the base class used to define reusable PyTorch model components.</p><ul><li><strong>Initialize:</strong> Call super().__init__() and define learnable layers in __init__.</li><li><strong>Forward:</strong> Describe how inputs flow through those layers in forward.</li><li><strong>Call:</strong> Use model(x) so PyTorch's module call machinery and hooks run normally.</li></ul><pre><code class=\"language-python\">import torch\nfrom torch import nn\n\nclass MLP(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.hidden = nn.Linear(4, 8)\n        self.output = nn.Linear(8, 2)\n\n    def forward(self, x):\n        return self.output(torch.relu(self.hidden(x)))\n\nmodel = MLP()\nprint(model(torch.randn(3, 4)).shape)  # torch.Size([3, 2])</code></pre><p><strong>Remember:</strong> Define layers in __init__; connect them in forward.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.Module.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch Module</a></p>"
      ]
    ]
  },
  {
    "title": "torch.optim - Adam, SGD, etc.",
    "questions": [
      [
        "What is torch.optim, and what do optimizers such as SGD and Adam do?",
        "<p>torch.optim provides algorithms that update model parameters using computed gradients.</p><ul><li><strong>SGD:</strong> Uses gradients directly, optionally with momentum to smooth updates.</li><li><strong>Adam:</strong> Uses running gradient moments to adapt update scales for individual parameters.</li><li><strong>Usage:</strong> Pass model parameters and optimizer settings; call step after computing gradients.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Optimizer</th><th scope=\"col\">Basic update idea</th></tr></thead><tbody><tr><th scope=\"row\">SGD with momentum</th><td>Follow gradients while accumulating a moving update direction</td></tr><tr><th scope=\"row\">Adam</th><td>Adapt updates using running first and second gradient moments</td></tr></tbody></table></div><pre><code class=\"language-python\">import torch\n\nmodel = torch.nn.Linear(4, 2)\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\n# Alternative: torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)</code></pre><p><strong>Remember:</strong> Backward computes gradients; the optimizer applies an update.</p><p><a href=\"https://docs.pytorch.org/docs/stable/optim.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch optimizers</a></p>"
      ]
    ]
  },
  {
    "title": "Custom datasets with torch.utils.data.Dataset",
    "questions": [
      [
        "What is a custom PyTorch Dataset, and what do __len__ and __getitem__ do?",
        "<p>A custom map-style Dataset defines how to retrieve individual examples and targets.</p><ul><li><strong>Length:</strong> __len__ returns the number of examples.</li><li><strong>Indexing:</strong> __getitem__(index) loads or returns the indexed example and its target.</li><li><strong>Scope:</strong> IterableDataset is a different interface, so these two methods describe the usual map-style case.</li></ul><pre><code class=\"language-python\">import torch\nfrom torch.utils.data import Dataset\n\nclass Examples(Dataset):\n    def __init__(self):\n        self.x = torch.tensor([[1., 2.], [3., 4.]])\n        self.y = torch.tensor([0, 1])\n\n    def __len__(self):\n        return len(self.y)\n\n    def __getitem__(self, index):\n        return self.x[index], self.y[index]\n\nsamples = Examples()\nprint(len(samples), samples[0])</code></pre><p><strong>Remember:</strong> Dataset defines one example; DataLoader organizes many examples.</p><p><a href=\"https://docs.pytorch.org/tutorials/beginner/basics/data_tutorial.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch datasets</a></p>"
      ]
    ]
  },
  {
    "title": "DataLoader - batching and shuffling",
    "questions": [
      [
        "What is a DataLoader, and what are batching and shuffling?",
        "<p>A DataLoader turns a dataset into an iterable of batches and can randomize sample order.</p><ul><li><strong>batch_size:</strong> Set how many examples appear in a batch.</li><li><strong>shuffle:</strong> Randomize the order, usually for training; validation commonly keeps a stable order.</li><li><strong>num_workers:</strong> Set the number of loading subprocesses; zero loads in the main process.</li></ul><p><strong>Remember:</strong> Dataset provides samples; DataLoader batches and delivers them.</p><p><a href=\"https://docs.pytorch.org/docs/stable/data.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch DataLoader</a></p>"
      ]
    ]
  },
  {
    "title": "Training loop: forward → loss → backward → step",
    "questions": [
      [
        "What are the main steps in a PyTorch training loop: forward pass, loss, backward pass, and optimizer step?",
        "<p>A training loop repeatedly predicts, measures error, computes gradients, and updates parameters.</p><ol><li><strong>Prepare:</strong> Enable training mode and clear old gradients for the batch.</li><li><strong>Forward and loss:</strong> Compute predictions and compare them with the targets using a loss function.</li><li><strong>Backward and step:</strong> Backpropagate the loss, then let the optimizer update weights.</li></ol><pre><code class=\"language-python\">import torch\nfrom torch import nn\nfrom torch.utils.data import DataLoader, TensorDataset\n\ntorch.manual_seed(0)\nx = torch.randn(32, 4)\ny = (x.sum(dim=1) &gt; 0).long()\nloader = DataLoader(TensorDataset(x, y), batch_size=8, shuffle=True)\nmodel = nn.Linear(4, 2)\nloss_fn = nn.CrossEntropyLoss()\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\n\nfor epoch in range(5):\n    model.train()\n    for inputs, targets in loader:\n        optimizer.zero_grad()\n        logits = model(inputs)\n        loss = loss_fn(logits, targets)\n        loss.backward()\n        optimizer.step()\n\n# This toy training example does not measure generalization.</code></pre><p><strong>Remember:</strong> Clear gradients, predict, measure loss, backpropagate, update.</p><p><a href=\"https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch optimization tutorial</a></p>"
      ]
    ]
  },
  {
    "title": "model.eval() vs model.train()",
    "questions": [
      [
        "What is the difference between model.train() and model.eval()?",
        "<p>model.train() enables training behavior; model.eval() selects evaluation behavior in affected layers.</p><ul><li><strong>Dropout:</strong> Randomly masks activations in training and is disabled during ordinary evaluation.</li><li><strong>BatchNorm:</strong> Standard settings use batch statistics in training and running statistics during evaluation.</li><li><strong>Gradients:</strong> Neither method disables autograd; use no_grad separately when appropriate.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Mode</th><th scope=\"col\">Dropout</th><th scope=\"col\">Standard BatchNorm</th><th scope=\"col\">Autograd</th></tr></thead><tbody><tr><th scope=\"row\">train()</th><td>Active</td><td>Current batch statistics; update running estimates</td><td>Unchanged</td></tr><tr><th scope=\"row\">eval()</th><td>Disabled</td><td>Stored running statistics</td><td>Unchanged</td></tr></tbody></table></div><p><strong>Remember:</strong> Mode controls layer behavior; gradient mode controls tracking.</p><p><a href=\"https://docs.pytorch.org/docs/stable/notes/autograd.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch autograd and evaluation modes</a></p>"
      ]
    ]
  },
  {
    "title": "Saving/loading: torch.save(), torch.load()",
    "questions": [
      [
        "How do you save and load model weights with torch.save(), torch.load(), and state_dict()?",
        "<p>Save a state_dict to store model weights and buffers, then load it into a matching model architecture.</p><ol><li><strong>Save:</strong> Pass model.state_dict() to torch.save.</li><li><strong>Load:</strong> Construct the same architecture and pass loaded weights to load_state_dict.</li><li><strong>Inference:</strong> Use map_location for the destination device and call eval after loading.</li></ol><pre><code class=\"language-python\">import torch\nfrom torch import nn\n\nmodel = nn.Linear(4, 2)  # Replace with your trained model.\ntorch.save(model.state_dict(), 'model_weights.pth')\n\nrestored = nn.Linear(4, 2)  # The architecture must match.\nweights = torch.load('model_weights.pth', map_location='cpu', weights_only=True)\nrestored.load_state_dict(weights)\nrestored.eval()</code></pre><p><strong>Remember:</strong> Recreate the architecture, load the weights, then set evaluation mode.</p><p><a href=\"https://docs.pytorch.org/tutorials/beginner/basics/saveloadrun_tutorial.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch saving and loading</a></p>"
      ]
    ]
  },
  {
    "title": "Moving to GPU: .to(device)",
    "questions": [
      [
        "What does .to(device) do, and why must the model and its data be on the same device?",
        "<p>.to(device) places model parameters or tensor data on a chosen device for compatible computation.</p><ul><li><strong>Model:</strong> Move the model before creating the optimizer.</li><li><strong>Data:</strong> Assign the returned tensors, such as x = x.to(device); a tensor call is not generally in-place.</li><li><strong>Consistency:</strong> Move inputs, targets, and any extra tensors used in the computation to compatible devices.</li></ul><pre><code class=\"language-python\">import torch\n\ndevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')\nmodel = torch.nn.Linear(4, 2).to(device)\ninputs = torch.randn(8, 4).to(device)\ntargets = torch.zeros(8, dtype=torch.long).to(device)\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\nlogits = model(inputs)</code></pre><p><strong>Remember:</strong> Move the model and its data together.</p><p><a href=\"https://docs.pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch device workflow</a></p>"
      ]
    ]
  },
  {
    "title": "Gradient computation: .requires_grad, torch.no_grad()",
    "questions": [
      [
        "What do requires_grad and torch.no_grad() do?",
        "<p>requires_grad controls gradient tracking for tensors; no_grad temporarily disables recording of operations.</p><ul><li><strong>Tracking:</strong> A parameter with requires_grad=True can receive gradients during backpropagation.</li><li><strong>Freezing:</strong> Set a parameter's requires_grad to False to stop computing its parameter gradient; clear stale gradients if changing an active training setup.</li><li><strong>Inference:</strong> Use no_grad to reduce graph-tracking overhead, separately from setting eval mode.</li></ul><pre><code class=\"language-python\">import torch\n\nmodel = torch.nn.Linear(4, 2)\nfor parameter in model.parameters():\n    parameter.requires_grad_(False)\n    parameter.grad = None\n\nmodel.eval()\nwith torch.no_grad():\n    predictions = model(torch.randn(3, 4))</code></pre><p><strong>Remember:</strong> requires_grad selects trainable values; no_grad selects an untracked computation.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.no_grad.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch no_grad</a></p>"
      ]
    ]
  },
  {
    "title": "Custom loss functions",
    "questions": [
      [
        "What is a custom loss function, and why should it use PyTorch tensor operations?",
        "<p>A custom loss is a scalar training objective built to measure task-specific prediction errors.</p><ul><li><strong>Differentiability:</strong> Use supported PyTorch tensor operations so autograd can follow the computation.</li><li><strong>Graph:</strong> Converting to NumPy or using detached numerical results in the loss breaks its connection to model parameters.</li><li><strong>Reduction:</strong> Usually combine per-example errors into one scalar with mean or sum.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>MSE = mean((prediction - target)^2)</code></p><pre><code class=\"language-python\">import torch\n\ndef mse_loss(prediction, target):\n    return ((prediction - target) ** 2).mean()\n\nprediction = torch.tensor([2., 4.], requires_grad=True)\ntarget = torch.tensor([1., 3.])\nloss = mse_loss(prediction, target)\nloss.backward()\nprint(prediction.grad)  # tensor([1., 1.])</code></pre><p><strong>Remember:</strong> A trainable loss must keep a differentiable path back to predictions.</p>"
      ]
    ]
  },
  {
    "title": "Learning rate schedulers",
    "questions": [
      [
        "What is a learning rate scheduler, and why change the learning rate during training?",
        "<p>A learning-rate scheduler changes the optimizer's learning rate according to a schedule or monitored result.</p><ul><li><strong>StepLR:</strong> Reduce the rate after a fixed number of scheduler steps.</li><li><strong>CosineAnnealingLR:</strong> Vary the rate along a cosine schedule over a configured period.</li><li><strong>ReduceLROnPlateau:</strong> Reduce the rate when a monitored metric stops improving sufficiently.</li><li><strong>Timing:</strong> For a per-epoch StepLR or cosine schedule, step after the epoch's optimizer updates; pass the monitored validation metric to ReduceLROnPlateau after validation.</li></ul><p><strong>Remember:</strong> The optimizer changes weights; the scheduler changes the update rate.</p><p><a href=\"https://docs.pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch learning-rate scheduling</a></p>"
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
let number = 28;
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
