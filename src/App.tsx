import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { useViewportListener } from '@/hooks/useViewportListener';
import routes from '~react-pages';

const App = () => {
  useViewportListener();

  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
};

export default App;
