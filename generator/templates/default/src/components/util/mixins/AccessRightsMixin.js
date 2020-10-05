import { userGroups, userIsAuthorized as isAuthorized } from '../AccessRights';

const AccessRightsMixin = {
  data() {
    return {
      userGroups,
    };
  },

  computed: {
    allUserGroups() {
      return Object.values(this.userGroups);
    },
  },

  methods: {
    userIsAuthorized(allowedUserGroups) {
      return isAuthorized(allowedUserGroups, this.$store.state.internalUser.current);
    },
  },
};

export default AccessRightsMixin;
