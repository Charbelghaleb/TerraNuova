import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that automatically scrolls to top (0,0) on route changes
 * This ensures users always start from the beginning of content on new pages
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately when pathname changes
    window.scrollTo(0, 0);
    
    // Also ensure document body scroll is reset (for edge cases)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
};

export default useScrollToTop;