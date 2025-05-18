// Mock react-pdf components and functions
const mockBlob = {
  arrayBuffer: async () => new ArrayBuffer(1024), // 1KB mock PDF
};

const mockPDFInstance = {
  toBlob: async () => mockBlob,
};

const pdf = jest.fn(() => mockPDFInstance);
const PDFViewer = jest.fn();
const Page = jest.fn();
const Text = jest.fn();
const View = jest.fn();
const Document = jest.fn();
const renderToStream = jest.fn();
const renderToFile = jest.fn();
const renderToBuffer = jest.fn().mockResolvedValue(Buffer.from('mock pdf content'));

module.exports = {
  pdf,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  renderToStream,
  renderToFile,
  renderToBuffer,
  StyleSheet: {
    create: jest.fn()
  },
  Font: {
    register: jest.fn()
  }
};
