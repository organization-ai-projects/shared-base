export default {
  extends: ['@commitlint/config-conventional'], // Nom du module sous forme de chaîne
  rules: {
    // Types autorisés
    'type-enum': [
      2, // Niveau d'erreur (2 = erreur bloquante)
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'build', 'ci', 'revert'],
    ],

    // Le type ne doit jamais être vide
    'type-empty': [2, 'never'],

    // Le sujet (message après le type) ne doit jamais être vide
    'subject-empty': [2, 'never'],

    // Longueur maximale du message
    'header-max-length': [2, 'always', 72],

    // Enforce lowercase in subject
    'subject-case': [2, 'always', 'lower-case'],

    // Pas de point final dans le sujet
    'subject-full-stop': [2, 'never', '.'],
  },
};
