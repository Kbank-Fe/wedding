import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { useViewportListener } from '@/hooks/useViewportListener';
import routes from '~react-pages';

import LoadingSpinner from './components/shared/LoadingSpinner';

const App = () => {
  useViewportListener();

  return <Suspense fallback={<LoadingSpinner />}>{useRoutes(routes)}</Suspense>;
};

export default App;
