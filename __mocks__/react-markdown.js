// Mock react-markdown
const ReactMarkdown = jest.fn().mockImplementation(({ children }) => children);

module.exports = ReactMarkdown;
