import React from 'react';

import Field from '../../components/Field';
import Layout from '../../components/Layout';
import ControlPanel from '../../components/ControlPanel';

const Main: React.FC = () => (
  <Layout>
    <Field />
    <ControlPanel />
  </Layout>
);

export default Main;
