import { FC, PropsWithChildren, useRef } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface Props extends PropsWithChildren {}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bw-screen min-h-screen h-full">
      <Header />
      
      <main className="min-h-screen bg-neutral-200 p-4 h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
