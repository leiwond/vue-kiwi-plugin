<template>
  <empty-layout>
    <!--<ui-alert ref="alert"/>-->
    <kiwi v-if="loadingInit" />
    <v-form v-else @submit.prevent="submit">
      <div class="text-xs-center ">
        <img src="@/assets/images/karriereat.svg" alt="karriere.at">
      </div>
      <p class="font-weight-thin text-xs-center mb-4">Internal Web Interface</p>
      <v-card width="380" class="pb-3">
        <v-card-text class="px-4">
          <v-text-field
            v-model="credentials.username"
            data-qa="username field"
            label="Benutzername"
            autofocus
            :disabled="loginDisabled"
            :error-messages="loginError($v.credentials.username)"
            @input="$v.credentials.username.$touch()"
            @blur="$v.credentials.username.$touch()"/>

          <v-text-field
            v-model="credentials.password"
            data-qa="password field"
            label="Passwort"
            type="password"
            :disabled="loginDisabled"
            :error-messages="loginError($v.credentials.password)"
            @input="$v.credentials.password.$touch()"
            @blur="$v.credentials.password.$touch()"/>
        </v-card-text>

        <v-card-actions class="px-4">
          <v-btn
            block
            color="primary"
            :loading="request.pending"
            :disabled="loginDisabled"
            type="submit"
            data-qa="login button"
            depressed>
            Anmelden
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </empty-layout>
</template>

<style lang="scss" type="stylesheet/scss" scoped>
  img {
    width: 110px;
  }
</style>

<script>

import { validationMixin } from 'vuelidate';
import validationErrorMixin from '@/components/util/mixins/validationErrorMixin';
import { required } from 'vuelidate/lib/validators';
import EmptyLayout from '@/components/layout/EmptyLayout.vue';
import Kiwi from '@/components/ui/Kiwi.vue';
import { mapState, mapActions } from 'vuex';
import ActiveDirectoryUser from '@/models/ActiveDirectoryUser';
import jwtDecode from 'jwt-decode';

export default {
  name: 'LoginModule',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      request: {
        pending: false,
        error: '',
      },
      loginDisabled: false,
      loadingInit: true,
    };
  },
  computed: {
    ...mapState([
      'loggedIn',
    ]),
  },
  async mounted() {
    if (this.loggedIn) {
      await this.$router.push('companies');
    } else {
      const authToken = localStorage.getItem('auth-token');
      if (authToken !== null) {
        try {
          const claim = jwtDecode(authToken);
          if (claim.uuid !== undefined && claim.databaseId !== undefined) {
            const adUser = await ActiveDirectoryUser.custom(`active-directory-users/${claim.uuid}`).$first();
            this.userLoaded(adUser);
          }
        } catch (error) {
          localStorage.removeItem('auth-token');
        }
      } else {
        this.loadingInit = false;
      }
    }
  },
  methods: {
    ...mapActions([
      'loginSucceeded',
      'loginUser',
    ]),
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.request.pending = true;
        this.request.error = '';
        ActiveDirectoryUser.$http.defaults.headers.username = btoa(this.credentials.username);
        ActiveDirectoryUser.$http.defaults.headers.password = btoa(this.credentials.password);
        try {
          this.userLoaded(
            await ActiveDirectoryUser.custom('active-directory-users/login').$first(),
          );
        } catch (error) {
          this.request.error = this.computeErrorMessage(error);
        }
        delete ActiveDirectoryUser.$http.defaults.headers.username;
        delete ActiveDirectoryUser.$http.defaults.headers.password;
        this.request.pending = false;
      }
    },

    async userLoaded(adUser) {
      const thumbnail = await ActiveDirectoryUser.custom(`active-directory-users/thumbnail/${adUser.relationships.thumbnail.data.id}`).$first();
      adUser.thumbnail = thumbnail.attributes.thumbnail;
      this.loginSucceeded(adUser);
      await this.$router.push('jobs');
      this.loadingInit = false;
    },

    loginError(field) {
      return this.request.error || this.validationError(field);
    },

    /**
             * Compute the right error message.
             * Either not authorized or not authenticated
             */
    computeErrorMessage(error) {
      if (error.message.includes('status code 403')) {
        return 'Benutzer hat keine Zugriffsrechte!';
      }

      return 'Benutzername und/oder Passwort sind falsch!';
    },
  },

  validations: {
    credentials: {
      username: { required },
      password: { required },
    },
  },

  components: {
    EmptyLayout,
    Kiwi,
  },

  mixins: [
    validationMixin,
    validationErrorMixin,
  ],
};
</script>
