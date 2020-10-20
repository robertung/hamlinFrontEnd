<template>
  <div class="profile view">
    <h1>Hamlin Halloween Pumpkin Upload</h1>
    <b-tabs>
        <b-tab title="Uploads">
          <h1 class="tab-title">{{ imageCountMessage }}</h1>
          <p>PNG and JPG format only</p>
          <form
              @submit.prevent="sendFile"
              enctype="multipart/form-data"
            >
              <div class="field" v-if="showUpload">
                <div class="file is-boxed is-primary">
                  <label class="file-label">
                      <input
                        multiple
                        type="file"
                        class="file-input"
                        ref="files"
                        @change="selectFile"
                      />
                  </label>
                </div>
              </div>
              <template
                  v-for="(file, index) in files"
                >
                <div
                  class="image-container"
                  :key="index"
                >
                  <img
                    :src="file.url"
                  />
                  <div
                    :id="`tooltip-target-${index}`"
                    class="delete"
                    @click.prevent="
                      files.splice(index, 1);
                      uploadFiles.splice(index, 1)"
                  > <b-icon icon="x-circle-fill" />
                  <b-tooltip :target="`tooltip-target-${index}`" triggers="hover">
                        Delete
                  </b-tooltip>
                  </div>
                  <span
                    v-if="file.invalidMessage"
                    style="color:red">
                    {{ file.invalidMessage }}
                  </span>
                </div>
              </template>
              <div class="field">
                <template v-if="!maxImageButton">
                  <b-button
                    type="submit"
                    variant="primary"
                  >
                    Upload Images
                  </b-button>
                </template>
                <p v-else>You have to many images delete some to upload.</p>
                <p>{{ this.message }}</p>
              </div>
              </form>
        </b-tab>

        <b-tab title="Your Images" lazy>
              <b-button
                type="submit"
                variant="primary"
                :disabled="!deleteImageId.length > 0"
                @click.prevent="saveDeletedImages()"
              >
              Delete Selected Images {{ deleteImageId.length || '' }}
              </b-button>

            <template v-for="(image, index) in userImages">
                <div
                  class="image-container"
                  :key="index"
                >
                <img :src="image.image_path" />
                <div
                  class="delete"
                  @click.prevent="userImages.splice(index, 1);deleteImage(image.id);"><b-icon icon="x-circle-fill" />
                </div>
                </div>
            </template>
        </b-tab>

      </b-tabs>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class Profile extends Vue {

  private files = [];

  private uploadFiles = [];

  private message = '';

  private imgURL = [];

  private yourImages = [];

  private deleteImageId = [];

  private showUpload = true;

  private imageMaxCount = 6;

  private get maxImageButton(): boolean {
    if (this.uploadFiles.length >= (this.imageMaxCount + 1)) {
      return true;
    }
    return false;
  }
  get imageCountMessage() {
    const count = this.imageMaxCount;
    if (this.uploadFiles.length >= count) {
      this.showUpload = false;
      return `You cannot add anymore image, ${count} is the max.`;
    }
    this.showUpload = true;
    return `You can upload up to${this.uploadFiles.length - count} ${this.uploadFiles.length === 5 ? 'image' : 'images'}.`;
  }

  private get user() {
    return this.$store.getters.user;
  }

  private get getUserId(): boolean {
    return this.$store.getters.getUserId;
  }

  private get userImages() {
    return this.$store.getters.userImage;
  }

  private selectFile(): void {
    const { files } = this.$refs.files;
    this.uploadFiles = [...this.files, ...files];

    this.files = [
      ...this.files,
      ..._.map(files, (file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        invalidMessage: this.validateFile(file),
      })),
    ];
  }

  private validateFile(file): String {
    const MAX_SIZE = 20000000;
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (file.size > MAX_SIZE) {
      return `max size: ${MAX_SIZE / 100}kb`;
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Please use only .jpg or .png file types';
    }

    return '';
  }

  private async sendFile(): Promise<void> {
    const formData = new FormData();
    this.uploadFiles.userId = this.getUserId;
    _.forEach(this.uploadFiles, (file) => {
      if (this.validateFile(file) === '') {
        formData.append('files', file);
      }
    });
    try {

      await this.$store.dispatch('upload', formData);
      this.message = 'Files uploaded';
      this.files = [];
      this.uploadFiles = [];
      this.grabTokenAndUserData();
    } catch (err) {
      console.log(err, 'err');
      this.message = 'Error';
    }
  }

  deleteImage(id): void {
    this.deleteImageId.push(id);
  }

  async saveDeletedImages(): Promise<void> {
    const payload = {
      imageIds: this.deleteImageId,
      userId: this.getUserId,
    };
    await this.$store.dispatch('deleteImages', payload);
    this.deleteImageId = [];
  }

  private grabTokenAndUserData(): void {
    this.$store.dispatch('fetchUserData');
  }

  private created(): void {
    this.grabTokenAndUserData();
  }

  private destroy(): void {
    this.deleteImageId = [];
  }
}
</script>

<style lang="scss">
  .profile {
    margin-top: 20px;

    h1 {
      color: #fa9b03;
    }
    .tab-title {
      color: #000;
      margin: 20px 0 25px;
    }
  }

  .nav-tabs .nav-link {
    color: #fa9b03;
  }
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: black;
    background-color: #fa9b03;
  }

  .tab-content {
    background: #fa9b03;
    padding: 20px;
    margin: 0;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  .image-container {
    position: relative;
    max-width: 300px;
    margin-bottom: 20px;
    z-index: 10;
    img {
      max-width: 300px;
      border-radius: 5px;
    }

    .delete {
      position: absolute;
      right: -6px;
      top: -9px;
      background: red;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
</style>
