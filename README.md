# Docker CLI Generator 🐳

A command-line tool to generate Dockerfiles for various applications with customizable configurations.

## Features ✨

- Interactive CLI interface with colorful prompts
- Supports multiple application types:
  - Frontend: React, Angular, Vue
  - Backend: Next.js, NestJS, Spring-Boot, .NET
- Environment configuration (development/production)
- Node.js version selection
- Custom port configuration
- Environment variables setup (for Next.js)
- Automatic Dockerfile generation

## Installation 📦

### 1. Clone the repository:
```bash

git clone https://github.com/your-username/docker-cli-generator.git
cd docker-cli-generator

```

### 2. Install Dependencies
``` bash
npm install

```
### 3. Run the tool
``` bash
node index.js

```
### Follow the interactive prompts to configure your Dockerfile.

#### Options 🛠️
The tool will guide you through:

- Selecting your application type
- Choosing environment (development/production)
- Selecting Node.js version
- Setting exposed port
- Configuring environment variables (for Next.js)
- Generating the Dockerfile

#### Output 📂
Generated Dockerfiles are saved in:
./generated/

### Dependencies 📦
- inquirer - Interactive prompts
- chalk - Terminal styling
- nanospinner - Loading indicators
- chalk-animation - Animated text

### Contributing 🤝
Contributions are welcome! Please open an issue or submit a pull request.
