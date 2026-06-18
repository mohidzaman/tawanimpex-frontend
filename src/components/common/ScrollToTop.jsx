// src/components/common/ScrollToTop.jsx
// Scrolls the window to the top on every route change.
// Must be rendered inside <BrowserRouter>.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
