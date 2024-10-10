'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isReferralsActive, setIsReferralsActive] = useState(false);
  const [isMissionActive, setIsMissionActive] = useState(false);

  useEffect(() => {
    setIsHomeActive(false);
    setIsReferralsActive(false);
    setIsMissionActive(false);

    switch (pathname) {
      case '/':
        setIsHomeActive(true);
        break;
      case '/referrals':
        setIsReferralsActive(true);
        break;
      case '/mission':
        setIsMissionActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isHomeActive,
    isReferralsActive,
    isMissionActive,
  };
};

export default useNavigation;