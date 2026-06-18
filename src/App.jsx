// src/App.jsx
import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/common/LoadingScreen';
import PageLoader from './components/common/PageLoader';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load pages for code splitting & initial paint performance
const Home          = lazy(() => import('./pages/Home'));
const Products      = lazy(() => import('./pages/Products'));
const Manufacturing = lazy(() => import('./pages/Manufacturing'));
const About         = lazy(() => import('./pages/About'));
const Contact       = lazy(() => import('./pages/Contact'));
const NotFound      = lazy(() => import('./pages/NotFound'));

// Lazy load admin pages
const AdminLayout    = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin     = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts  = lazy(() => import('./pages/admin/AdminProducts'));
const AdminCategories= lazy(() => import('./pages/admin/AdminCategories'));
const AdminSettings  = lazy(() => import('./pages/admin/AdminSettings'));
const AdminMedia     = lazy(() => import('./pages/admin/AdminMedia'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminDashboard'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {initialLoading && (
        <LoadingScreen onComplete={() => setInitialLoading(false)} />
      )}
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Client layout */}
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products"      element={<Products />} />
              <Route path="manufacturing" element={<Manufacturing />} />
              <Route path="about"         element={<About />} />
              <Route path="contact"       element={<Contact />} />
              <Route path="*"             element={<NotFound />} />
            </Route>

            {/* Admin layout */}
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
