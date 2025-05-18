import { Font } from '@react-pdf/renderer';
import path from 'path';

// Configure fonts for PDF generation
Font.register({
  family: 'Roboto',
  fonts: [
    { 
      src: path.join(process.cwd(), 'public/fonts/Roboto-Regular.ttf'),
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    { 
      src: path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'),
      fontWeight: 'bold',
      fontStyle: 'normal'
    },
    { 
      src: path.join(process.cwd(), 'public/fonts/Roboto-Italic.ttf'),
      fontWeight: 'normal',
      fontStyle: 'italic'
    }
  ]
});

Font.register({
  family: 'Playfair Display',
  fonts: [
    {
      src: path.join(process.cwd(), 'public/fonts/PlayfairDisplay-Regular.ttf'),
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    {
      src: path.join(process.cwd(), 'public/fonts/PlayfairDisplay-Bold.ttf'),
      fontWeight: 'bold',
      fontStyle: 'normal'
    },
    {
      src: path.join(process.cwd(), 'public/fonts/PlayfairDisplay-Italic.ttf'),
      fontWeight: 'normal',
      fontStyle: 'italic'
    }
  ]
});

// Configure emoji support
Font.registerEmojiSource({
  format: 'png',
  url: 'https://twemoji.maxcdn.com/2/72x72/',
}); 