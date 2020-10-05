import Vue from 'vue';

import UiAlert from './ui/Alert.vue';
// import UiAvatarLoader from 'ui/AvatarLoader'
// import UiAutocomplete from 'ui/Autocomplete'
import UiCard from './ui/Card.vue';
import UiConfirm from './ui/Confirm.vue';
// import UiDatePicker from './ui/DatePicker'
// import UiDialog from './ui/Dialog'
// //import UiFileUpload from './ui/FileUpload'
// import UiHistory from './ui/History'
// //import UiImageUpload from './ui/ImageUpload'
import UiKiwi from './ui/Kiwi.vue';
// import UiLineChart from './ui/LineChart'
import UiLoadingBar from './ui/LoadingBar.vue';
import UiLoadingScreen from './ui/LoadingScreen.vue';
// import UiMailHistory from './ui/MailHistory'
// import UiMultiFilter from './ui/MultiFilter'
// import UiPhone from './ui/Phone'
import UiSnackBar from './ui/SnackBar.vue';
// import UiToggleBox from './ui/ToggleBox'
// import UiGoogleMaps from './ui/GoogleMaps'
import UiCompanyState from './ui/CompanyState.vue';
// import UiEditor from './ui/Editor'
// import UiDateRangePicker from './ui/DateRangePicker'

export default {
  register: () => {
    Vue.component('ui-alert', UiAlert);
    Vue.component('ui-card', UiCard);
    Vue.component('ui-confirm', UiConfirm);
    Vue.component('ui-kiwi', UiKiwi);
    Vue.component('ui-loading-bar', UiLoadingBar);
    Vue.component('ui-loading-screen', UiLoadingScreen);
    Vue.component('ui-snackbar', UiSnackBar);
    Vue.component('ui-company-state', UiCompanyState);
  },
};
