# Shared Base Library

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/organization-ai-projects/shared-base/actions/workflows/ci.yml/badge.svg)](https://github.com/organization-ai-projects/shared-base/actions)

The Shared Base Library is a TypeScript-based utility library designed to simplify and accelerate development by providing common utility functions and robust abstractions. This project is open-source and available under the MIT License.

---

## 🌟 Features

- **TypeScript-first:** Fully typed, ensuring better developer experience and code safety.
- **Common utilities:** Includes string manipulation, date formatting, object merging, and more.
- **Customizable:** Designed to integrate seamlessly with diverse projects.
- **Extensively tested:** High test coverage ensures robust and reliable utilities.
- **Open-source:** Community-driven and accessible to everyone.

---

## 🚀 Installation

To add Shared Base Library to your project, use:

```bash
npm install @organization-ai-projects/shared-base
```

Or with Yarn:

```bash
yarn add @organization-ai-projects/shared-base
```

Or with PNPM:

```bash
pnpm add @organization-ai-projects/shared-base
```

---

## 📚 Usage

Import the functions you need:

```typescript
import { capitalize, deepMerge, logInfo } from '@organization-ai-projects/shared-base';

const capitalized = capitalize('hello world'); // "Hello world"
logInfo('Application started');

const merged = deepMerge({ a: 1 }, { b: 2 });
console.log(merged); // { a: 1, b: 2 }
```

Refer to the [API Documentation](docs/USAGE.md) for more details.

---

## 🛠️ Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📜 Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Created and maintained by **Rémi Bezot**.
- Hosted under the organization [Organization AI Projects](https://github.com/organization-ai-projects).

---

## 📣 Feedback

If you encounter any issues or have suggestions, feel free to open an issue on GitHub: [Issues](https://github.com/organization-ai-projects/shared-base/issues).

## 🌐 Other Languages

This file is also available in French: [README.fr.md](README.fr.md).
