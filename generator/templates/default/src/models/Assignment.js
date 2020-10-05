export const AssignmentType = {
  SALES: 'sales',
  CUSTOMER_CARE: 'cc',
  BRANDING: 'branding',
  BRANDING_PROJECT_MANAGEMENT: 'branding-pm',
  PRODUCING: 'producing',
};

export default class Assignment {
  constructor() {
    this.userId = null;
    this.type = '';
  }
}
