// import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: '',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        translate: 'DASHBOARDS',
        type: 'collapse',
        icon: 'dashboard',
        children: [
          {
            id: 'analytics-dashboard',
            title: 'Analytics',
            type: 'item',
            url: 'apps/dashboards/analytics',
          },
          {
            id: 'summary-dashboard',
            title: 'Summary',
            type: 'item',
            url: 'apps/dashboards/summary',
          },
        ],
      },
      {
        id: 'users',
        title: 'Users',
        translate: 'USERS',
        type: 'item',
        icon: 'person',
        url: 'apps/users',
      },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'CALENDAR',
        type: 'item',
        icon: 'today',
        url: 'apps/calendar',
      },
      {
        id: '1',
        title: 'Appointment',
        translate: 'APPOINTMENT',
        type: 'collapse',
        icon: 'shopping_cart',
        url: 'apps/appointment',
        children: [
          {
            id: 'appointment-products',
            title: 'Products',
            type: 'item',
            url: 'apps/appointment/products',
            end: true,
          },
          {
            id: 'appointment-list',
            title: 'Appointment List',
            type: 'item',
            url: 'apps/appointment/appointment-list',
            end: true,
          },
          {
            id: 'assigned-list',
            title: 'Assigned List',
            type: 'item',
            url: 'apps/appointment/assigned-list',
            end: true,
          },
        ],
      },
      {
        id: 'location',
        title: 'Locations',
        translate: 'LOCATIONS',
        type: 'item',
        icon: 'flag',
        url: 'apps/locations',
      },
      {
        id: 'mail',
        title: 'Mail',
        translate: 'MAIL',
        type: 'item',
        icon: 'email',
        url: 'apps/mail',
      },
      {
        id: 'todo',
        title: 'To-Do',
        translate: 'TODO',
        type: 'item',
        icon: 'check_box',
        url: 'apps/todo',
      },
      {
        id: 'contacts',
        title: 'Contacts',
        translate: 'CONTACTS',
        type: 'item',
        icon: 'account_box',
        url: 'apps/contacts/all',
      },
      {
        id: 'chat',
        title: 'Chat',
        translate: 'CHAT',
        type: 'item',
        icon: 'chat',
        url: 'apps/chat',
      },
      {
        id: 'notes',
        title: 'Notes',
        translate: 'NOTES',
        type: 'item',
        icon: 'note',
        url: 'apps/notes',
      },
      {
        id: 'tickets',
        title: 'Tickets',
        translate: 'TICKET',
        type: 'item',
        icon: 'contact_support',
        url: 'apps/tickets',
      },
      {
        id: 'announcements',
        title: 'Announcements',
        translate: 'ANNOUNCEMENT',
        type: 'item',
        icon: 'announcement',
        url: 'apps/announcement',
      },
      {
        id: 'logs',
        title: 'Logs',
        translate: 'LOGS',
        type: 'item',
        icon: 'article',
        url: 'apps/logs',
      },
    ],
  },
];

export default navigationConfig;
