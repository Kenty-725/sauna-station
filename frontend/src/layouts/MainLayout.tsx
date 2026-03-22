import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};
