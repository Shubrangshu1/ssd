
import { APP_NAME, MANDIR_NAME } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} {APP_NAME} - {MANDIR_NAME}. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Dedicated to community service and spiritual growth.
        </p>
      </div>
    </footer>
  );
}
