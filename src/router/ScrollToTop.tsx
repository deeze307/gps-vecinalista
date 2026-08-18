import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router conserva el scroll al navegar; en un sitio de fichas eso hace
 * que entres a una ciudad nueva por la mitad de la página.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};
