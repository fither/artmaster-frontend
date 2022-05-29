import './db/academy-db';
import './db/analytics-dashboard-db';
import './db/faq-db';
import './db/icons-db';
import './db/invoices-db';
import './db/knowledge-base-db';
import './db/mail-db';
import './db/profile-db';
import './db/summary-dashboard-db';
import './db/scrumboard-db';
import './db/search-db';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
