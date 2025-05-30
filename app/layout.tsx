import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Wise Cities E-Commerce',
  description: 'Pixel-perfect clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
