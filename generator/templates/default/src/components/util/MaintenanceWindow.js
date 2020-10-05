import moment from 'moment';

/**
 * Define maintenance windows for important deployments where no user interaction is
 * allowed during deployment. Items must have a start date, end date and a description
 * that is shown to the user why he is not allowed to use the kiwi during this period.
 *
 * Because we want to be flexible and don't want to disallow kiwi interaction for a previously
 * estimated time when we need in fact more ore less time for the deployment, the lock will be
 * controlled via the isActive flag.
 * That means a separate kiwi deploy is necessary for locking and unlocking.
 */
const maintenanceWindows = [
  {
    start: moment('2020-09-24 06:30:00'),
    end: moment('2020-09-24 08:00:00'),
    description: 'Umstellung und Migration der Zahlungsbedingungen.',
    isActive: false,
  },
];

class MaintenanceWindow {
  static allMaintenanceWindows() {
    return maintenanceWindows;
  }

  static upcomingMaintenance() {
    return this.allMaintenanceWindows().find((w) => w.isActive && moment().isBefore(w.start));
  }

  static activeMaintenance() {
    return this.allMaintenanceWindows().find((w) => w.isActive && moment().isAfter(w.start));
  }
}

export default MaintenanceWindow;
