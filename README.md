# CodeChamp

CodeChamp is a competitive coding platform that allows users to practice coding problems, participate in coding contests, and improve their programming skills. Our mission is to provide an interactive and engaging environment for coders of all levels to challenge themselves and learn from others.

## Architecture behind code submission - System Design
![image](https://github.com/user-attachments/assets/a1543f27-b2d6-419b-8a11-9cd85eabc1c2)


## The site is live at https://app.code-champ.xyz

## Features

- 🏆 **Coding Contests:** Participate in regularly scheduled coding contests.
- 📚 **Practice Problems:** Access a library of coding problems across various difficulty levels.
- 📈 **Leaderboards:** Track your progress and see how you rank against other users.
- 📝 **Detailed Explanations:** Solutions with detailed explanations to help you understand different approaches.
- 👥 **Community:** Engage with the coding community, discuss problems, and share insights.

## Challenges:

- **Code Sandboxing:** Developed a secure server that executes code within isolated containers and returns the output. This involves integrating a Redis queue for task management and Docker for containerization. [Successfully implemented]

- **Boilerplate and Submission Code Generation:** Developed a script that automates the generation of missing components for code submissions. This includes completing the main function, adding test case inputs, and providing outputs to ensure the program is compilable and functional. The script generates these components based on user-defined function signatures and test cases and supports multiple programming languages. It also creates starter code for each language, which appears in the code editor on the problem page. [Successfully implemented for single variables and arrays]


## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm**
- **Git**

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Aayuslad/code-champ.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd code-champ
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The client application will be accessible at `http://localhost:5173` and
   the server application will be accessible at `http://localhost:8080`.

## Contribution
We welcome contributions from the community! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for the process for submitting pull requests and how to get started with development.

