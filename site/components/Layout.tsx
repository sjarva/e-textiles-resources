import React from 'react';
import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => (
  <>
    <header>
      <h1>E-textile resources</h1>
    </header>
    <main>
      <div>{children}</div>
    </main>
    <footer>This is a footer</footer>
  </>
);

export default Layout;
