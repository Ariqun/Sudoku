import React, { PropsWithChildren } from 'react';

import classes from './Layout.module.scss';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.component}>
    {children}
  </div>
);

export default Layout;
