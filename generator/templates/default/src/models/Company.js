import { camelcase } from 'camelcase';
import { camelCaseKeys } from 'camelcase-keys';
import Model from './Model';

import { AssignmentType } from './Assignment';

export const CompanyType = {
  COMPANY: '9',
  CONSULTANT: '5',
};

export const CompanyBranches = {
  CONSULTANT: '4024',
  OTHER: '4026',
};

export const CompanyId = {
  KARRIERE_AT: '136',
};

export const termOfPayment = {
  PREPAYMENT: 'prepayment',
  DAYS_14: '14days',
  DAYS_30: '30days',
  DAYS_45: '45days',
  DAYS_60: '60days',
  DAYS_90: '90days',
};

export const vatCheckStatus = {
  UNCHECKED: 'unchecked',
  VALID: 'valid',
  INVALID: 'invalid',
  FAILED: 'failed',
};

export const ArchiveUserId = '30';

export const PotUsers = [
  {
    label: 'Archiv',
    value: '30',
  },
  {
    label: 'NN',
    value: '59',
  },
  {
    label: 'TKP',
    value: '178',
  },
  {
    label: '1, ID',
    value: '28',
  },
];

export const lockReasons = [
  { value: 0, text: 'Nicht gesperrt' },
  { value: 1, text: 'Konkurs' },
  { value: 2, text: 'Fusion' },
  { value: 3, text: 'Schließung' },
  { value: 4, text: 'Zahlungsmoral' },
  { value: 5, text: 'Sonstiges' },
];

export const marketingLockReasons = [
  { value: 0, text: 'Nicht gesperrt' },
  { value: 1, text: 'Rechtsanwälte' },
  { value: 2, text: 'Mitbewerber' },
  { value: 3, text: 'Corporate Compliance' },
  { value: 4, text: 'Gegengeschäft' },
  { value: 5, text: 'Agentur' },
];

export default class Company extends Model {
  baseURL() {
    return process.env.VUE_APP_API_SERVICE_BASE_URL;
  }

  resource() {
    return 'companies';
  }

  // async get() {
  //   return super.get().then((res) => {
  //     res.data.forEach((model) => {
  //       const included = model.included();
  //       _.forOwn(included, (IncludedModel, key) => {
  //         const relationship = _.get(model.relationships, key);
  //         if (relationship && relationship.data) {
  //           const includedModel = res.included.find(
  //             (i) => i.id === relationship.data.id && i.type === relationship.data.type,
  //           );
  //           includedModel.attributes = camelCaseKeys(includedModel.attributes, { deep: true });
  //           relationship.included = new IncludedModel(includedModel);
  //         }
  //       });
  //       model.type = camelcase(model.type);
  //       model.attributes = camelCaseKeys(model.attributes, { deep: true });
  //       model.relationships = camelCaseKeys(model.relationships, { deep: true });
  //     });
  //     return res;
  //   });
  // }

  /**
   * Get assigned internal userId for a certain assignment type (sales, cuca, branding,...)
   *
   * @param assignmentType
   */
  getInternalUserId(assignmentType) {
    const assignment = this.assignments.find((ass) => ass.type === assignmentType);

    return assignment ? assignment.userId : undefined;
  }

  /**
   * Returns userId of the internal sales user assigned to this company.
   */
  getInternalSalesUserId() {
    return this.getInternalUserId(AssignmentType.SALES);
  }

  /**
   * Set internal user assignment for a certain assignment type (sales, producing, customer
   * care, branding,...)
   *
   * @param type
   * @param userId
   */
  setAssignment(type, userId) {
    const existingAssignment = this.assignments.find((assignment) => assignment.type === type);

    if (existingAssignment) {
      existingAssignment.userId = userId;
    } else {
      this.assignments.push({ userId, type });
    }
  }

  getAddress(addressType) {
    return this.addresses.find((addr) => addr.type === addressType);
  }

  formattedStreet() {
    let street = `${this.address.street} ${this.address.streetNumber}`;

    if (this.address.floor) {
      street += `/${this.address.floor}`;
    }

    if (this.address.apartment) {
      street += `/${this.address.apartment}`;
    }

    return street.trim();
  }

  isArchived() {
    return this.getInternalUserId(AssignmentType.SALES) === ArchiveUserId;
  }

  isConsultant() {
    return this.typeId === CompanyType.CONSULTANT;
  }

  isLocked() {
    return !!this.flags.isLocked;
  }

  isMarketingLocked() {
    return !!this.flags.isMarketingLocked;
  }
}
