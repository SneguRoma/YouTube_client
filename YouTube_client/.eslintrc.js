module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.*?.json"],
        createDefaultProgram: true,
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "airbnb-base",
        "airbnb-typescript/base",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-console": "off",
        "@typescript-eslint/no-unused-vars": "off",
        '@typescript-eslint/class-methods-use-this': 'off',
      },
    },
    {
      files: ["*.component.html", "**/*.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {},
    },
    {
      files: ["*.component.ts"],
      plugins: ["import"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"],
    },
  ],
};
