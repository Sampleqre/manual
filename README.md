# AI Lab Manual — PyCharm Theme

A static HTML/CSS/JS website styled like the PyCharm IDE, containing all 12 programs from the **Artificial Intelligence and Applications Lab Manual**.

## Programs Included

| # | File | Topic |
|---|------|-------|
| 01 | `bfs.py` | Breadth First Search |
| 02 | `dfs.py` | Depth First Search |
| 03 | `puzzle8.py` | 8-Puzzle Problem |
| 04 | `nqueens.py` | N-Queens Problem |
| 05 | `alphabeta.py` | Alpha-Beta Pruning |
| 06 | `forward_chain.py` | Forward Chaining |
| 07 | `backward_chain.py` | Backward Chaining |
| 08 | `knn_iris.py` | KNN Classifier (Iris) |
| 09 | `linear_reg.py` | Linear Regression |
| 10 | `naive_bayes.py` | Naïve Bayes Classifier |
| 11 | `svm_iris.py` | SVM Classifier |
| 12 | `cat_dog_cnn.py` | Cat vs Dog CNN |

## How to Use

1. Click any program button on the welcome screen **or** click a file in the sidebar
2. View the syntax-highlighted code in the editor
3. Click **▶ Run** to see the expected output
4. Click **Copy** to copy the code to clipboard

## Deploy on GitHub Pages

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and log in
2. Click **New repository**
3. Name it `ai-lab-manual` (or any name you prefer)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload Files
Option A — GitHub Web Upload:
1. Open your new repo
2. Click **Add file → Upload files**
3. Drag and drop all 4 files: `index.html`, `style.css`, `programs.js`, `main.js`
4. Click **Commit changes**

Option B — Git CLI:
```bash
git init
git add .
git commit -m "Initial commit - AI Lab Manual"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-lab-manual.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository → **Settings**
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select `Deploy from a branch`
4. Select branch: **main**, folder: **/ (root)**
5. Click **Save**

### Step 4 — Access Your Live Site
- Your site will be live at: `https://YOUR_USERNAME.github.io/ai-lab-manual`
- It usually takes **1–2 minutes** to go live after enabling Pages

## Files

```
ai-lab-manual/
├── index.html      ← Main HTML structure
├── style.css       ← PyCharm dark theme styles
├── programs.js     ← All 12 programs data
├── main.js         ← Interactivity logic
└── README.md       ← This file
```

## Tech Stack

- Pure **HTML5**, **CSS3**, **Vanilla JS**
- No frameworks, no dependencies
- Fully static — works on GitHub Pages
