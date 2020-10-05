<template>
    <v-container grid-list-lg>
        <ui-data-table
            :headers="headers"
            :items="mails"
            :loading="loading"
            :customSort="customSort"
            :disable-initial-sort="true"
            no-data-text="Es sind keine E-Mail Logs vorhanden."
            loading-text="E-Mail Logs werden geladen..."
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ mapMailName(props.item.mailName) }}</td>
                    <td>{{ props.item.resourceId }}</td>
                    <td>{{ props.item.subject }}</td>
                    <td>{{ formatRecipients(props.item.to) }}</td>
                    <td>{{ formatRecipients(props.item.cc) }}</td>
                    <td>{{ formatRecipients(props.item.bcc) }}</td>
                    <td>
                      {{ getInternalUserNameByDatabaseId(props.item.senderId) }}
                      ({{ props.item.senderId }})
                    </td>
                    <td>{{ props.item.sendDate | datetime }}</td>
                </tr>
            </template>
        </ui-data-table>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    mails: { type: Array, required: true },
    loading: { type: Boolean, default: false },
  },

  data: () => ({
    headers: [
      { text: 'E-Mail', value: 'mailName' },
      { text: 'ID', value: 'resourceId' },
      { text: 'Betreff', value: 'subject' },
      { text: 'Empfänger', value: 'to' },
      { text: 'Cc', value: 'cc' },
      { text: 'Bcc', value: 'bcc' },
      { text: 'Absender', value: 'senderId' },
      { text: 'gesendet am', value: 'sendDate' },
    ],
  }),

  computed: {
    ...mapGetters('internalUser', {
      internalUserShortCode: 'getInternalUserShortCodeByDatabaseId',
    }),
  },

  methods: {
    mapMailName(mailName) {
      switch (mailName) {
        case '63-job-online':
        case '63-job-online-en':
          return 'Job Online Mail';
        case '61-business-offer':
        case '61-business-offer-en':
          return 'Angebot';
        case '62-business-order-confirmation':
        case '62-business-order-confirmation-en':
          return 'Auftragsbestätigung';
        default:
          return 'E-Mail';
      }
    },

    getInternalUserNameByDatabaseId(userId) {
      if (userId === '-1') {
        return 'SYSTEM';
      }

      return this.internalUserShortCode(userId);
    },

    formatRecipients(addresses) {
      if (addresses.length > 0) {
        return addresses.join(', ');
      }
      return '-';
    },

    customSort(items, index, isDesc) {
      return items.sort((a, b) => this.compareWithDate(a.sendDate, b.sendDate, isDesc));
    },

    compareWithDate(dateA, dateB, desc) {
      let compareResult = dateA > dateB ? -1 : 1;

      if (desc) {
        compareResult *= -1;
      }
      return compareResult;
    },
  },
};
</script>
