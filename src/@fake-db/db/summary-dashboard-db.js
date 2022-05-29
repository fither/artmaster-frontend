import mock from '../mock';

const summaryDashboardAppDB = {
	summaries: [
		{
			id: 1,
			name: 'ACME Corp. Backend App'
		},
		{
			id: 2,
			name: 'ACME Corp. Frontend App'
		},
		{
			id: 3,
			name: 'Creapond'
		},
		{
			id: 4,
			name: 'Withinpixels'
		}
	]
};

mock.onGet('/api/summary-dashboard-app/summaries').reply(config => {
	return [200, summaryDashboardAppDB.summaries];
});
