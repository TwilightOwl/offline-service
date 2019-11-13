module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(ts|js)x?$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/?!(asynchronous-tools)"
  ]
}