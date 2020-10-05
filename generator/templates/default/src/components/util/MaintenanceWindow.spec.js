import MaintenanceWindow from './MaintenanceWindow';

beforeAll(() => {
  Date.now = () => new Date('2020-09-21T10:00:00Z').getTime();
});

describe('Maintenance Window', () => {
  test('it should show an upcoming maintenance window', () => {
    const moment = jest.requireActual('moment');
    const window1 = {
      start: moment('2020-09-24 07:00:00'),
      end: moment('2020-09-24 09:00:00'),
      description: 'Umstellung und Migration der Zahlungsbedingungen.',
      isActive: true,
    };

    MaintenanceWindow.allMaintenanceWindows = jest.fn(() => [window1]);

    const maintenance = MaintenanceWindow.upcomingMaintenance();
    expect(maintenance).toMatchObject(window1);
  });

  test('it should show an active maintenance window', () => {
    const moment = jest.requireActual('moment');
    const window1 = {
      start: moment('2020-09-20 05:00:00'),
      end: moment('2020-09-22 07:00:00'),
      description: 'Umstellung und Migration der Zahlungsbedingungen.',
      isActive: true,
    };

    MaintenanceWindow.allMaintenanceWindows = jest.fn(() => [window1]);

    const maintenance = MaintenanceWindow.activeMaintenance();
    expect(maintenance).toMatchObject(window1);
  });

  test('it should show an active maintenance window even if the estimated end time is reached', () => {
    const moment = jest.requireActual('moment');
    const window1 = {
      start: moment('2020-09-20 05:00:00'),
      end: moment('2020-09-20 07:00:00'),
      description: 'Umstellung und Migration der Zahlungsbedingungen.',
      isActive: true,
    };

    MaintenanceWindow.allMaintenanceWindows = jest.fn(() => [window1]);

    const maintenance = MaintenanceWindow.activeMaintenance();
    expect(maintenance).toMatchObject(window1);
  });

  test('it should not show inactive maintenance windows', () => {
    const moment = jest.requireActual('moment');
    const window1 = {
      start: moment('2020-09-24 07:00:00'),
      end: moment('2020-09-24 09:00:00'),
      description: 'Umstellung und Migration der Zahlungsbedingungen.',
      isActive: false,
    };
    const window2 = {
      start: moment('2020-09-20 05:00:00'),
      end: moment('2020-09-22 07:00:00'),
      description: 'Umstellung und Migration der Zahlungsbedingungen.',
      isActive: false,
    };
    const window3 = {
      start: moment('2020-09-20 05:00:00'),
      end: moment('2020-09-20 07:00:00'),
      description: 'Umstellung und Migration der Zahlungsbedingungen.',
      isActive: false,
    };

    MaintenanceWindow.allMaintenanceWindows = jest.fn(() => [window1, window2, window3]);

    const maintenance = MaintenanceWindow.activeMaintenance();
    expect(maintenance).toBeUndefined();
  });
});
