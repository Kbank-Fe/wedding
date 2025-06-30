import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from '~react-pages';

const App = () => {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
};

export default App;
