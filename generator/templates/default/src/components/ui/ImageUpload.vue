<template>
  <div :class="classes" :title="title" @click="pickFile">
    <slot v-if="file" name="preview" :url="file.getUrl()" class="upload-preview"/>
    <slot v-else name="placeholder"/>
    <v-progress-circular
      :value="progress"
      class="upload-progress"
      color="grey darken-1"
      :size="loaderSize"
    />
    <input type="file" ref="fileInput" accept="image/*" class="upload-input" @change="uploadFile">
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .upload {
    position: relative;
    display: flex;
    cursor: pointer;

    &--loading {
      .upload-progress {
        display: inline-flex;
      }

      .upload-preview {
        opacity: 0.2;
      }
    }

    &-progress {
      position: absolute;
      display: none;
      pointer-events: none;
    }

    &-preview {
      opacity: 1;
      transition: opacity 0.5s;
    }

    &-input {
      display: none;
    }
  }
</style>

<script>
// TODO
// import FileService from 'services/FileService';
// import ImageService from 'services/ImageService';
import Raven from 'raven-js';
import { FileVisibility } from '../../models/File';

export default {
  props: {
    value: { type: String, default: null }, // file id,
    width: { type: Number, default: 60 }, // width of the uploaded image
    height: { type: Number, default: 60 }, // height of the uploaded image
    visibility: { type: String, default: FileVisibility.INTERNAL },
    loaderSize: { type: Number, default: 60 },
    title: { type: String, default: 'Bild hochladen' },
  },

  data() {
    return {
      file: null,
      uploading: false,
      progress: 0,
    };
  },

  computed: {
    classes() {
      return {
        upload: true,
        'upload--loading': this.uploading,
      };
    },
  },

  watch: {
    value: {
      handler(value) {
        if (value) {
          // TODO
          // FileService.getFile(value)
          //     .then((file) => {
          //         this.file = file;
          //     });
        } else {
          this.file = null;
        }
      },
      immediate: true,
    },
  },

  methods: {
    pickFile() {
      this.$refs.fileInput.click();
    },

    uploadFile() {
      const { files } = this.$refs.fileInput;
      const filters = { width: this.width, height: this.height };
      this.$emit('uploadStart', files);
      this.uploading = true;
      this.progress = 0;

      // TODO
      // ImageService.upload(files, filters, this.visibility, this.updateProgress)
      //   .then((file) => {
      //     this.file = file;
      //     this.$emit('uploadSuccess', file);
      //     this.$emit('input', file.id);
      //   })
      //   .catch((error) => {
      //     this.$emit('uploadError', error);
      //     Raven.captureException(error);
      //   })
      //   .finally(() => {
      //     this.uploading = false;
      //   });
    },

    updateProgress(evt) {
      this.progress = evt.loaded / evt.total;
    },
  },
};
</script>
