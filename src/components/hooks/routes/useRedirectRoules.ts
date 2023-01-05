import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

type PublicDirectories = {
  directories?: string[];
  exactPaths?: string[];
};

const useRedirectRules = () => {
  const publicDirectories: PublicDirectories = { directories: ['/transactions/'], exactPaths: ['/'] };

  const router = useRouter();
  const currentPath = router.asPath;

  const { isAuthenticated, isLoading } = useAuth0();

  const isPublicPath = (): boolean => {
    if (publicDirectories.directories?.some(publicPath => currentPath.startsWith(publicPath))) {
      return true;
    }
    if (publicDirectories.exactPaths?.some(exactPath => exactPath === currentPath)) {
      return true;
    }

    return false;
  };

  const applyAuthRedirect = (): boolean => {
    if (currentPath === '/' && isAuthenticated) {
      void router.push('/transactions');
      return true;
    }
    if (currentPath === '/transactions' && !isAuthenticated) {
      void router.push('/');
      return true;
    }
    return false;
  };

  const shouldRedirect = (): boolean => {
    // redirect if needed after checking if user is authenticated
    if (!isLoading) {
      if (applyAuthRedirect()) {
        return true;
      }
    }
    return false;
  };

  return { shouldRedirect, isPublicPath, applyAuthRedirect };
};

export default useRedirectRules;
