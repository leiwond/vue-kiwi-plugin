export const FileVisibility = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  INTERNAL: 'internal',
};

export default class File {
  constructor() {
    this.id = null;
    this.hash = '';
    this.name = '';
    this.mimetype = '';
    this.size = 0;
    this.visibility = null;
    this.url = '';
    this.path = '';
  }

  getUrl() {
    return process.env.VUE_APP_FILES_BASE_URL + this.visibility + this.url;
  }
}
