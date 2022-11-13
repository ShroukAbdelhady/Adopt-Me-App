module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  overrides: [],
  parser:"@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "import", "jsx-a11y","@typescript-eslint"],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx",".ts",".tsx"],
      }
    }
  }
};
