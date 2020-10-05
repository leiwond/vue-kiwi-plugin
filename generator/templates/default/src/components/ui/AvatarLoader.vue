<template>
    <div class="avatarLoader">
        <div v-if="user.photoId && loading" class="avatarLoader-spinner">
            <v-progress-circular indeterminate color="grey lighten-3" />
        </div>
        <v-avatar :size="size">
            <img v-if="url" :src="url">
            <span v-else class="subheading">
                {{ user | initials }}
            </span>
        </v-avatar>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .avatarLoader {
        position: relative;
        display: inline-block;

        &-spinner {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
</style>

<script>

// TODO
// import FileService from 'services/FileService';

export default {
  props: {
    user: { type: Object, required: true },
    size: { type: String, required: true },
  },

  data() {
    return {
      photoUrl: null,
      loading: true,
    };
  },

  computed: {
    url() {
      return this.photoUrl || this.businessAccountPhotoUrl;
    },

    businessAccountPhotoUrl() {
      if (this.user.businessAccountPhoto) {
        return process.env.VUE_APP_FILES_LEGACY_BASE_URL + this.user.businessAccountPhoto;
      }
      return null;
    },
  },

  created() {
    if (this.user.photoId) {
      // TODO
      // FileService.getFile(this.user.photoId).then((file) => {
      //   this.photoUrl = file.getUrl();
      // }).finally(() => {
      //   this.loading = false;
      // });
    }
  },
};
</script>
