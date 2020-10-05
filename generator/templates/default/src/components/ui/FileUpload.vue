<template>
    <div class="upload">
        <v-text-field
          :label="label"
          :error-messages="error"
          @click="pickFile"
          v-model="fileName"
          readonly
        />
        <v-progress-linear :value="progress" class="upload-progress" v-show="uploading"/>
        <input
          type="file"
          ref="fileInput"
          :accept="accept"
          class="upload-input"
          @change="uploadFile"
        >
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .upload {
        position: relative;

        &-progress {
            position: absolute;
            top: 30px;
        }

        &-input {
            display: none;
        }
    }
</style>

<script>

// TODO
// import FileService from 'services/FileService';
// import { FileVisibility } from 'models/File';
import Raven from 'raven-js';

export default {
  props: {
    accept: { type: String, default: '' },
    context: { type: String, required: true },
    errorMessages: { type: String, default: '' },
    label: { type: String, default: 'Datei wählen' },
    maxFileSize: { type: Number, default: 3000 }, // kilobyte
    value: { type: String, default: null }, // file id
    visibility: { type: String, default: '' /* TODO FileVisibility.INTERNAL */ },
  },

  data() {
    return {
      file: null,
      fileSizeMessage: '',
      uploading: false,
      progress: 0,
    };
  },

  computed: {
    fileName() {
      return this.file ? this.file.name : '';
    },

    error() {
      return this.fileSizeMessage ? this.fileSizeMessage : this.errorMessages;
    },
  },

  watch: {
    value: {
      async handler(value) {
        if (value) {
          // TODO
          // this.file = await FileService.getFile(value);
        } else {
          this.file = null;
          this.resetFile();
        }
      },
      immediate: true,
    },
  },

  methods: {
    pickFile() {
      this.$refs.fileInput.click();
    },

    resetFile() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },

    async uploadFile() {
      const { files } = this.$refs.fileInput;
      if (files.length === 0) {
        return;
      }

      if (files[0].size / 1024 > this.maxFileSize) {
        this.fileSizeMessage = `Die Datei überschreitet die maximal erlaubte Größe von ${
          this.$options.filters.numberFormat(this.maxFileSize)}kB`;
        return;
      }

      this.$emit('uploadStart', files);
      this.uploading = true;
      this.progress = 0;
      this.fileSizeMessage = '';

      try {
        // TODO
        // this.file = await FileService.upload(
        //    files, this.visibility, this.context, this.updateProgress);
        // this.$emit('uploadSuccess', this.file);
        // this.$emit('input', this.file.id);
      } catch (error) {
        Raven.captureException(error);
        this.$emit('uploadError', error);
      }

      this.uploading = false;
    },

    updateProgress(evt) {
      this.progress = evt.loaded / evt.total;
    },
  },
};
</script>
