# Bibliothèque de Base Partagée

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/organization-ai-projects/shared-base/actions/workflows/ci.yml/badge.svg)](https://github.com/organization-ai-projects/shared-base/actions)

La Bibliothèque de Base Partagée est une bibliothèque utilitaire basée sur TypeScript conçue pour simplifier et accélérer le développement en fournissant des fonctions utilitaires courantes et des abstractions robustes. Ce projet est open-source et disponible sous licence MIT.

---

## 🌟 Fonctionnalités

- **TypeScript-first :** Entièrement typée, assurant une meilleure expérience de développement et une plus grande sécurité du code.
- **Utilitaires courants :** Inclut la manipulation de chaînes, le formatage des dates, la fusion d'objets, et plus encore.
- **Personnalisable :** Conçue pour s'intégrer parfaitement à divers projets.
- **Testée en profondeur :** Une couverture de tests élevée garantit des utilitaires robustes et fiables.
- **Open-source :** Pilotée par la communauté et accessible à tous.

---

## 🚀 Installation

Pour ajouter la Bibliothèque de Base Partagée à votre projet, utilisez :

```bash
npm install @organization-ai-projects/shared-base
```

Ou avec Yarn :

```bash
yarn add @organization-ai-projects/shared-base
```

Ou avec PNPM :

```bash
pnpm add @organization-ai-projects/shared-base
```

---

## 📚 Utilisation

Importez les fonctions dont vous avez besoin :

```typescript
import { capitalize, deepMerge, logInfo } from '@organization-ai-projects/shared-base';

const capitalized = capitalize('bonjour le monde'); // "Bonjour le monde"
logInfo('Application démarrée');

const merged = deepMerge({ a: 1 }, { b: 2 });
console.log(merged); // { a: 1, b: 2 }
```

Consultez la [documentation API](docs/USAGE.md) pour plus de détails.

---

## 🛠️ Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le dépôt.
2. Créez une nouvelle branche pour votre fonctionnalité ou correctif.
3. Soumettez une pull request.

Veuillez lire notre [CONTRIBUTING.md](CONTRIBUTING.md) pour des directives détaillées.

---

## 📜 Code de Conduite

Ce projet adhère à un [Code de Conduite](CODE_OF_CONDUCT.md). En participant, vous êtes censé respecter ce code.

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- Créé et maintenu par **Rémi Bezot**.
- Hébergé sous l'organisation [Organization AI Projects](https://github.com/organization-ai-projects).

---

## 📣 Retour d'information

Si vous rencontrez des problèmes ou avez des suggestions, n'hésitez pas à ouvrir une issue sur GitHub : [Issues](https://github.com/organization-ai-projects/shared-base/issues).

## 🌐 Autres Langues

Ce fichier est également disponible en anglais : [README.en.md](README.en.md).
