
'use client';

import { APP_NAME } from '@/lib/constants';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          {currentYear ? `© ${currentYear} ${APP_NAME}. All rights reserved.` : `© ${APP_NAME}. All rights reserved.`}
        </p>
        <p className="text-xs mt-1">
          Dedicated to community service and spiritual growth.
        </p>
      </div>
    </footer>
  );
}
