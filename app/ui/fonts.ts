import { Inter, Lusitana } from 'next/font/google';

// Define Inter font
export const inter = Inter({ subsets: ['latin'] });

// Define Lusitana font (often used for specific elements like logos)
export const lusitana = Lusitana({
  weight: ['400', '700'], // Specify the weights you need
  subsets: ['latin'],
});

// You can export other fonts as needed