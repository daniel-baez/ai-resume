declare module '@react-pdf/fontkit' {
  interface FontkitModule {
    open: (buffer: Buffer | ArrayBuffer) => unknown;
  }
  const fontkit: FontkitModule;
  export default fontkit;
} 