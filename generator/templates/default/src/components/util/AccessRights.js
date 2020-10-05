const userGroups = {
  LOGIN: 'kiwi-login',
  ADMIN: 'kiwi-admins',
  CFO: 'kiwi-cfo',
  MARKETING: 'kiwi-marketing',
  QA: 'kiwi-qa',

  // sales departments
  SALES: 'kiwi-sales',
  CSO: 'kiwi-cso',
  HEAD_OF_SALES: 'kiwi-headofsales',
  SOM: 'kiwi-som',
  CUSTOMER_CARE: 'kiwi-customercare',
  EMPLOYER_BRANDING: 'kiwi-employerbranding',
  FIELD_SALES: 'kiwi-fieldsales',
  INSIDE_SALES: 'kiwi-insidesales',
  PRODUCT_CONSULTING: 'kiwi-productconsulting',

  // tools
  GDPR_TOOL: 'kiwi-gdpr-tool',
  MAIL_TOOL: 'kiwi-mail-tool',
};

/**
 * Check if the current user has access rights.
 * Admin user has always access.
 *
 * @param allowedUserGroups array of allowed user groups
 * @param internalUser current logged in internal user
 */
const userIsAuthorized = (allowedUserGroups, internalUser) => {
  const currentUserGroups = internalUser.groups;

  for (let i = 0; i < allowedUserGroups.length; i += 1) {
    const accessGroup = currentUserGroups.find(
      (ug) => ug === userGroups.ADMIN || ug === allowedUserGroups[i],
    );
    if (accessGroup) {
      return true;
    }
  }

  return false;
};

export { userGroups, userIsAuthorized };
