const programs = [
  {
    id: 1,
    shortName: "bfs.py",
    title: "Breadth First Search",
    tag: "Graph Search",
    category: "algo",
    desc: "BFS traversal of a graph using adjacency list. Explores nodes level by level using a queue.",
    functions: ["bfs(visited, graph, node)"],
    lines: 22,
    output: `BFS traversal, start from node 'A': \nA B C D E F G H`,
    code: `graph = { 
    'A': ['B', 'C'], 
    'B': ['D','E'],
    'C': ['F','G'],
    'D': ['H'], 
    'E': ['H'],
    'F': ['H'],
    'G': ['H'],
    'H': []
} 

visited = []  # List to keep track of visited nodes
queue = []    # Initialize a queue

def bfs(visited, graph, node): 
    visited.append(node) 
    queue.append(node) 
    print("BFS traversal, start from node 'A': ")
    while queue: 
        s = queue.pop(0) 
        print(s, end=" ") 
        for neighbour in graph[s]: 
            if neighbour not in visited: 
                visited.append(neighbour) 
                queue.append(neighbour) 

# Driver Code
bfs(visited, graph, 'A')`
  },
  {
    id: 2,
    shortName: "dfs.py",
    title: "Depth First Search",
    tag: "Graph Search",
    category: "algo",
    desc: "DFS traversal using recursion and a visited set. Explores as deep as possible before backtracking.",
    functions: ["dfs(visited, graph, node)"],
    lines: 18,
    output: `DFS traversal, start from node 'A': \nA B D H E C F G`,
    code: `graph = { 
    'A': ['B', 'C'], 
    'B': ['D','E'],
    'C': ['F','G'],
    'D': ['H'], 
    'E': ['H'],
    'F': ['H'],
    'G': ['H'],
    'H': []
} 

visited = set()  # Set to keep track of visited nodes

def dfs(visited, graph, node): 
    if node not in visited: 
        print(node, end=" ") 
        visited.add(node) 
        for neighbour in graph[node]: 
            dfs(visited, graph, neighbour) 

# Driver Code
print("DFS traversal, start from node 'A': ")
dfs(visited, graph, 'A')`
  },
  {
    id: 3,
    shortName: "puzzle8.py",
    title: "8-Puzzle Problem",
    tag: "BFS / State Space",
    category: "algo",
    desc: "Solves 8-puzzle using BFS. Explores all reachable states until the goal state is found.",
    functions: ["find_blank(state)", "is_goal(state)", "generate_moves(state)", "bfs(start_state)", "print_state(state)"],
    lines: 52,
    output: `Start State:\n[1, 2, 3]\n[4, 0, 5]\n[7, 8, 6]\n\nSolution found!\n[1, 2, 3]\n[4, 5, 0]\n[7, 8, 6]\n\n[1, 2, 3]\n[4, 5, 6]\n[7, 8, 0]`,
    code: `from collections import deque

# Helper function to find the position of the blank space (0)
def find_blank(state):
    for r in range(3):
        for c in range(3):
            if state[r][c] == 0:
                return r, c

# Check if the current state is the goal state
def is_goal(state):
    return state == goal_state

# Generate possible moves from the current state
def generate_moves(state):
    moves = []
    r, c = find_blank(state)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right
    for dr, dc in directions:
        nr, nc = r + dr, c + dc
        if 0 <= nr < 3 and 0 <= nc < 3:
            new_state = [row[:] for row in state]
            new_state[r][c], new_state[nr][nc] = new_state[nr][nc], new_state[r][c]
            moves.append(new_state)
    return moves

# BFS algorithm to solve the 8-puzzle problem
def bfs(start_state):
    queue = deque([(start_state, [])])
    visited = set()
    visited.add(tuple(map(tuple, start_state)))
    while queue:
        current_state, path = queue.popleft()
        if is_goal(current_state):
            return path
        for move in generate_moves(current_state):
            move_tuple = tuple(map(tuple, move))
            if move_tuple not in visited:
                visited.add(move_tuple)
                queue.append((move, path + [move]))
    return None

# Function to print the state
def print_state(state):
    for row in state:
        print(row)
    print()

# Start state
start_state = [[1, 2, 3], [4, 0, 5], [7, 8, 6]] 
print("Start State:")
print_state(start_state)

# Define the goal state
goal_state = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]

solution = bfs(start_state)
if solution:
    print("Solution found!")
    for step in solution:
        print_state(step)
else:
    print("No solution found!")`
  },
  {
    id: 4,
    shortName: "nqueens.py",
    title: "N-Queens Problem",
    tag: "Backtracking",
    category: "algo",
    desc: "Places N queens on an N×N chessboard so no two queens threaten each other. Uses backtracking.",
    functions: ["print_board(board)", "is_safe(board, row, col, N)", "solve_nqueens(board, row, N)", "nqueens(N)"],
    lines: 44,
    output: `Q * * * * * * * \n* * * * Q * * * \n* * * * * * * Q \n* * * * * Q * * \n* * Q * * * * * \n* * * * * * Q * \n* Q * * * * * * \n* * * Q * * * * `,
    code: `# Function to print the chessboard
def print_board(board):
    for i in range(N):
        for j in range(N):
            if board[i][j] == 1:
                board[i][j] = 'Q'
            else:
                board[i][j] = '*'
            print(board[i][j], end=' ') 
        print()

# Function to check if it's safe to place a queen at board[row][col]
def is_safe(board, row, col, N):
    for i in range(row):
        if board[i][col] == 1:
            return False
    for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
        if board[i][j] == 1:
            return False
    for i, j in zip(range(row-1, -1, -1), range(col+1, N)):
        if board[i][j] == 1:
            return False
    return True

# Function to solve N-Queens using backtracking
def solve_nqueens(board, row, N):
    if row == N:
        return True
    for col in range(N):
        if is_safe(board, row, col, N):
            board[row][col] = 1
            if solve_nqueens(board, row + 1, N):
                return True
            board[row][col] = 0
    return False

# Initialize the chessboard and call the solver
def nqueens(N):
    board = [[0 for _ in range(N)] for _ in range(N)]
    if solve_nqueens(board, 0, N):
        print_board(board)
    else:
        print("No solution exists")

N = 8 
nqueens(N)`
  },
  {
    id: 5,
    shortName: "alphabeta.py",
    title: "Alpha-Beta Pruning",
    tag: "Game Tree / AI",
    category: "ai",
    desc: "Minimax with alpha-beta pruning. Reduces the number of nodes evaluated in the game tree.",
    functions: ["AlphaBeta(depth, nodeIndex, maximizingPlayer, values, alpha, beta)"],
    lines: 20,
    output: `The optimal value is: 3`,
    code: `A, B = -1000, 1000

def AlphaBeta(depth, nodeIndex, maximizingPlayer, values, alpha, beta):
    if depth == 3:
        return values[nodeIndex]
    
    best = A if maximizingPlayer else B
    for i in range(2):
        val = AlphaBeta(
            depth + 1, nodeIndex * 2 + i,
            not maximizingPlayer, values, alpha, beta
        )
        if maximizingPlayer:
            best = max(best, val) 
            alpha = max(alpha, best)
        else:
            best = min(best, val)
            beta = min(beta, best)
        if beta <= alpha:
            break
    return best

values = [2, 3, 5, 9, 0, 1, 7, 5]
print("The optimal value is:", AlphaBeta(0, 0, True, values, A, B))`
  },
  {
    id: 6,
    shortName: "forward_chain.py",
    title: "Forward Chaining",
    tag: "Knowledge Base",
    category: "ai",
    desc: "Forward chaining diagnosis system. Infers disease from symptoms using rule-based reasoning.",
    functions: ["main()"],
    lines: 36,
    output: `Symptoms list: ['fever', 'cough', 'sore throat']\nEnter symptoms (type 'done' when finished):\nSymptom: fever\nSymptom: cough\nSymptom: done\n\nPossible Diagnoses: 'Cold'\nRecommended Medicine: Dolo 650`,
    code: `symptoms = ["fever", "cough", "sore throat"]

diagnosis = {
    "f":   "Flu",
    "fc":  "Cold",
    "fcs": "COVID-19"
}

medicine = {
    "Flu":     "Aspirin",
    "Cold":    "Dolo 650",
    "COVID-19": "Paxlovid"
}

def main():
    print(f"\\nSymptoms list: {symptoms}")
    facts = set()
    print("\\nEnter symptoms in the given list (type 'done' when finished):")
    
    while True:
        symps = input("Symptom: ").lower().strip()
        if symps == 'done':
            break
        facts.add(symps)
    
    if 'fever' in facts:
        if 'cough' in facts and 'sore throat' in facts:
            Dx = diagnosis["fcs"]
        elif 'cough' in facts:
            Dx = diagnosis["fc"]
        else:
            Dx = diagnosis["f"]
    else:
        Dx = None
    
    if Dx:
        print(f"\\nPossible Diagnoses: '{Dx}'")
        print(f"Recommended Medicine: {medicine[Dx]}")
    else:
        print("\\nNo possible diagnosis based on the current symptoms")

if __name__ == "__main__":
    main()`
  },
  {
    id: 7,
    shortName: "backward_chain.py",
    title: "Backward Chaining",
    tag: "Knowledge Base",
    category: "ai",
    desc: "Backward chaining from medicine to disease. Works backward from goal to find supporting facts.",
    functions: ["main()"],
    lines: 30,
    output: `Medicine list: ['Aspirin', 'Dolo 650', 'Paxlovid']\nEnter Medicine name:\nDolo 650\n\nPossible Diagnoses: 'Cold'\nDiagnoses symptoms: Fever, Cough`,
    code: `Medicine = ["Aspirin", "Dolo 650", "Paxlovid"]

diagnosis = {
    "Aspirin":  "Flu",
    "Dolo 650": "Cold",
    "Paxlovid": "COVID-19"
}

symptoms = {
    "Flu":      "Fever",
    "Cold":     "Fever, Cough",
    "COVID-19": "Fever, Cough, Sore throat"
}

def main():
    print(f"\\nMedicine list: {Medicine}")
    print("\\nEnter Medicine name in the given list:")
    x = input()
    
    if x == 'Aspirin':
        Dx = diagnosis["Aspirin"]
    elif x == 'Dolo 650':
        Dx = diagnosis["Dolo 650"]
    elif x == 'Paxlovid':
        Dx = diagnosis["Paxlovid"]
    else:
        Dx = None
    
    if Dx:
        print(f"\\nPossible Diagnoses: '{Dx}'")
        print(f"Diagnoses symptoms: {symptoms[Dx]}")
    else:
        print("\\nNo possible diagnosis based on the specified medicine")

if __name__ == "__main__":
    main()`
  },
  {
    id: 8,
    shortName: "knn_iris.py",
    title: "KNN Classifier",
    tag: "Machine Learning",
    category: "ml",
    desc: "K-Nearest Neighbors classifier on the Iris dataset. Prints both correct and wrong predictions.",
    functions: ["KNeighborsClassifier", "train_test_split", "accuracy_score"],
    lines: 38,
    output: `Accuracy of the KNN classifier: 95.56%\n\n   Actual      Predicted   Result\n0  Versicolor  Versicolor  Correct\n1  Virginica   Virginica   Correct\n7  Versicolor  Virginica   Wrong\n23 Versicolor  Virginica   Wrong\n...`,
    code: `# NOTE: Run in Google Colab with internet
# Step 1: Download dataset
# !wget https://archive.ics.uci.edu/static/public/53/iris.zip
# !unzip iris.zip

import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

result = []

# Load the Iris dataset
iris_data = pd.read_csv('/content/iris.data')
X = iris_data.iloc[:, :-1].values  # Features
y = iris_data.iloc[:, -1].values   # Target variable

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=5
)

# Create and train KNN classifier
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# Make predictions
y_pred = knn.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy of the KNN classifier: {accuracy * 100:.2f}%')

# Print correct and wrong predictions
for i in range(len(y_test)):
    if y_test[i] == y_pred[i]:
        result.append("Correct")
    else:
        result.append("Wrong")

status = pd.DataFrame({
    'Actual': y_test,
    'Predicted': y_pred,
    'Result': result
})
print(status)`
  },
  {
    id: 9,
    shortName: "linear_reg.py",
    title: "Linear Regression",
    tag: "Machine Learning",
    category: "ml",
    desc: "Trains a linear regression model on random data and plots the regression line using matplotlib.",
    functions: ["LinearRegression", "model.fit()", "model.predict()", "plt.scatter()", "plt.plot()"],
    lines: 28,
    output: `[Plots a scatter chart with blue data points\nand a red regression line]\n\nModel Coefficients:\n  Slope:     ~2.0\n  Intercept: ~1.0`,
    code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Generate random data for training
np.random.seed(42)  # Set seed for reproducibility
X = np.random.rand(100, 1) * 10   # 100 random points between 0 and 10
y = 2 * X + 1 + np.random.randn(100, 1) * 2  # Linear relation + noise

# Create a Linear Regression model
model = LinearRegression()

# Train the model
model.fit(X, y)

# Make predictions
y_pred = model.predict(X)

# Plot original data and regression line
plt.scatter(X, y, color='blue', label='Data Points')
plt.plot(X, y_pred, color='red', label='Regression Line')
plt.title('Linear Regression on Random Data')
plt.xlabel('X')
plt.ylabel('y')
plt.legend()
plt.show()`
  },
  {
    id: 10,
    shortName: "naive_bayes.py",
    title: "Naïve Bayes Classifier",
    tag: "Machine Learning",
    category: "ml",
    desc: "Gaussian Naïve Bayes on Iris dataset. Computes accuracy and compares predicted vs actual values.",
    functions: ["GaussianNB", "model.fit()", "model.predict()", "accuracy_score"],
    lines: 30,
    output: `Accuracy of the Naive Bayes classifier: 93.33%\n\nPredictions vs Actual values:\n    Predicted       Actual\n47  Setosa          Setosa\n73  Versicolor      Versicolor\n119 Versicolor      Virginica  ← wrong\n133 Versicolor      Virginica  ← wrong`,
    code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

# Step 1: Load the dataset
data = pd.read_csv('/content/iris.data')

# Step 2: Split features and target
X = data.iloc[:, :-1]  # Features (all columns except last)
y = data.iloc[:, -1]   # Target (last column)

# Step 3: Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=20
)

# Step 4: Initialize and train Naive Bayes
model = GaussianNB()
model.fit(X_train, y_train)

# Step 5: Predict on test data
y_pred = model.predict(X_test)

# Step 6: Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy of the Naive Bayes classifier: {accuracy * 100:.2f}%')

# Display predictions vs actual
print("\\nPredictions vs Actual values:")
comparison = pd.DataFrame({'Predicted': y_pred, 'Actual': y_test})
print(comparison)`
  },
  {
    id: 11,
    shortName: "svm_iris.py",
    title: "SVM Classifier",
    tag: "Machine Learning",
    category: "ml",
    desc: "Support Vector Machine classifier on Iris using a linear kernel. Achieves ~96.67% accuracy.",
    functions: ["SVC", "svm_classifier.fit()", "svm_classifier.predict()", "accuracy_score"],
    lines: 30,
    output: `Accuracy of the SVM classifier: 96.67%\n\nPredictions vs Actual values:\n   Predicted   Actual\n0  Setosa      Setosa\n1  Versicolor  Versicolor\n29 Versicolor  Virginica  ← wrong`,
    code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Load the Iris dataset
iris_data = pd.read_csv('/content/iris.data')

# Separate features and target
X = iris_data.iloc[:, :-1].values  # Features
y = iris_data.iloc[:, -1].values   # Target variable

# Split dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=20
)

# Train the SVM classifier
svm_classifier = SVC(kernel='linear')  # Using a linear kernel
svm_classifier.fit(X_train, y_train)

# Make predictions
y_pred = svm_classifier.predict(X_test)

# Compute accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy of the SVM classifier: {accuracy * 100:.2f}%')

# Display predictions vs actual
print("\\nPredictions vs Actual values:")
comparison = pd.DataFrame({'Predicted': y_pred, 'Actual': y_test})
print(comparison)`
  },
  {
    id: 12,
    shortName: "cat_dog_cnn.py",
    title: "Cat vs Dog CNN",
    tag: "Deep Learning",
    category: "ml",
    desc: "Binary image classifier using TensorFlow/Keras. Trains on cats_and_dogs_filtered dataset.",
    functions: ["ImageDataGenerator", "Sequential", "model.compile()", "model.fit()"],
    lines: 46,
    output: `Found 2000 images belonging to 2 classes.\nFound 1000 images belonging to 2 classes.\n\nEpoch 1/10 — accuracy: 0.5477 — val_accuracy: 0.5746\nEpoch 2/10 — accuracy: 0.4375 — val_accuracy: 0.5706\n...\nEpoch 10/10 — accuracy: 0.5000 — val_accuracy: 0.5212`,
    code: `# NOTE: Run in Google Colab
import tensorflow as tf
import tensorflow_datasets as tfds
from tensorflow.keras.layers import Flatten, Dense
from tensorflow.keras.models import Sequential

# Step 1: Load the dataset directly from TensorFlow's official catalog
(train_ds, validation_ds), info = tfds.load(
    'cats_and_dogs_filtered',
    split=['train', 'validation'],
    as_supervised=True,  # Returns a clean (image, label) tuple
    with_info=True
)

# Constants
batch_size = 32
img_height = 150
img_width = 150
epochs = 10

# Step 2: Preprocessing function (Resizing and Rescaling to 1./255)
def preprocess_image(image, label):
    image = tf.image.resize(image, (img_height, img_width))
    image = image / 255.0  # Normalizes pixel values between 0.0 and 1.0
    return image, label

# Format, shuffle, and batch the pipelines
train_generator = train_ds.map(preprocess_image).shuffle(1000).batch(batch_size).prefetch(buffer_size=tf.data.AUTOTUNE)
validation_generator = validation_ds.map(preprocess_image).batch(batch_size).prefetch(buffer_size=tf.data.AUTOTUNE)

print(f"Dataset successfully loaded via TFDS!")
print(f"Training samples: {info.splits['train'].num_examples}")
print(f"Validation samples: {info.splits['validation'].num_examples}")

# Step 3: Build the Sequential Model
model = Sequential([ 
    Flatten(input_shape=(img_height, img_width, 3)),
    Dense(128, activation='relu'), 
    Dense(1, activation='sigmoid')
])

# Step 4: Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Step 5: Train the model
history = model.fit(
    train_generator,
    epochs=epochs, 
    validation_data=validation_generator
)`
  }
];
