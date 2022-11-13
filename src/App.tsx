import React, { lazy, Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Details from './pages/Details';
// import SearchParams from './pages/SearchParams';
import ErrorBoundary from './components/ErrorBoundary';
import AdoptedPetContext from './contexts/AdoptedPetContext';
import Loader from './components/Loader';
import { Pet } from './types/common';


const Details = lazy(() => import('./pages/Details'));
const SearchParams = lazy(() => import('./pages/SearchParams'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const NotFound = () => {
  <h1> 404 Page not Found </h1>;
};
const App = () => {

  const adoptedPet = useState <Pet | null>(null);
  return (
    <BrowserRouter>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="loader-container">
                  <Loader />
                </div>
              }
            >
              <header>
                <Link to="/"> Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
          </QueryClientProvider>
        </ErrorBoundary>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(<App />);
