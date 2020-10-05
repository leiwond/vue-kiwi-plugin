<template>
    <div class="companyHistory" data-qa="company history">
        <ui-data-table
            :headers="headers"
            :items="history"
            :loading="loading"
            loadingText="Lade Einträge..."
            noDataText="Noch keine Einträge vorhanden!"
            class="font-weight-thin">
            <template slot="items" slot-scope="props">
                <tr class="historyRow">
                    <td>
                        {{ new Date(props.item.date) | date }}
                        <br>
                        {{ new Date(props.item.date) | time }}
                    </td>
                    <td>{{ getValue(props.item.fieldName) }}</td>
                    <td>
                        <span
                          class="historyValue historyValue-old"
                          v-if="valueExists(props.item.value.old)"
                        >
                            {{ getValue(props.item.value.old) }}
                        </span>
                        <span
                          class="historyValue historyValue-new"
                          v-if="valueExists(props.item.value.new)"
                        >
                            {{ getValue(props.item.value.new) }}
                        </span>
                        <template v-if="props.item.comment">
                            <br>
                            <span class="historyComment">{{ props.item.comment }}</span>
                        </template>
                    </td>
                    <td>{{ getInternalUserNameById(props.item.user.id) }}</td>
                </tr>
            </template>
        </ui-data-table>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .historyValue {
        display: inline-block;
        padding: 2px 5px;

        &-old {
            text-decoration: line-through;
        }

        &-new {
            background-color: $color-blue3;
        }
    }

    .historyRow {
        > :nth-child(1) {
            width: 120px;
        }

        > :nth-child(2) {
            width: 150px;
        }

        > :nth-child(4) {
            width: 150px;
        }
    }

    .historyComment {
        color: $color-gray3;
        font-style: italic;
    }
</style>

<script>
import DateConverter from '@/components/util/DateConverter';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    history: { type: Array, required: true },
    loading: { type: Boolean, required: true },
  },

  data: () => ({
    headers: [
      { text: 'Datum', value: 'date', sortable: false },
      { text: 'Aktion', value: 'action', sortable: false },
      { text: 'Änderung/Kommentar', value: 'change-comment', sortable: false },
      { text: 'Benutzer', value: 'user', sortable: false },
    ],
  }),

  computed: {
    ...mapGetters('internalUser', ['getInternalUserByDatabaseId']),
  },

  created() {
    this.loadInternalUsers();
  },

  methods: {
    getInternalUserNameById(id) {
      const user = this.getInternalUserByDatabaseId(id);

      if (user) {
        return `${user.firstName} ${user.lastName}`;
      }

      return 'SYSTEM';
    },

    valueExists(value) {
      return value.length > 0 || value.label;
    },

    getValue(value) {
      let val = value.label || value;
      if (val instanceof Date) {
        val = DateConverter.convertDate(val);
      }
      return val;
    },

    ...mapActions('internalUser', {
      loadInternalUsers: 'loadAllInternalUsers',
    }),
  },
};
</script>
