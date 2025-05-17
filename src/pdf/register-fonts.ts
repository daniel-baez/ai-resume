import { Font } from '@react-pdf/renderer';
import path from 'path';

const robotoRegular = path.resolve(__dirname, '../../public/fonts/Roboto-Regular.ttf');
const robotoBold = path.resolve(__dirname, '../../public/fonts/Roboto-Bold.ttf');
const robotoItalic = path.resolve(__dirname, '../../public/fonts/Roboto-Italic.ttf');
const playfairRegular = path.resolve(__dirname, '../../public/fonts/PlayfairDisplay-Regular.ttf');
const playfairBold = path.resolve(__dirname, '../../public/fonts/PlayfairDisplay-Bold.ttf');
const playfairItalic = path.resolve(__dirname, '../../public/fonts/PlayfairDisplay-Italic.ttf');
console.log('Registering fonts:');
console.log('Roboto-Regular:', robotoRegular);
console.log('Roboto-Bold:', robotoBold);
console.log('Roboto-Italic:', robotoItalic);
console.log('Playfair-Regular:', playfairRegular);
console.log('Playfair-Bold:', playfairBold);
console.log('Playfair-Italic:', playfairItalic);

Font.register({
  family: 'Roboto',
  fonts: [
    { src: robotoRegular },
    { src: robotoBold, fontWeight: 700 },
    { src: robotoItalic, fontStyle: 'italic' },
  ],
});

Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: playfairRegular },
    { src: playfairBold, fontWeight: 700 },
    { src: playfairItalic, fontStyle: 'italic' },
  ],
}); 