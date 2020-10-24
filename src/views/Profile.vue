<template>
  <div class="profile view">
    <b-button class="instruction-button" variant="success" id="show-btn" @click="$bvModal.show('bv-modal-example')">How to upload instructions</b-button>

  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      How to upload images
    </template>
    <div class="d-block text-center">
      <ol class="instruction-list">
        <li>You can use your cell phone or desktop to upload pictures.</li>
        <li>You can upload multiple pictures at a time.</li>
        <li>Each individual image cannot exceed 1000mb in file size, jpg and png formats only. Please adjust accordingly.</li>
        <li>Click or tap on the camera icon to start choosing images.</li>
        <li>Once selected the images will display for preview. Please look for any warnings for file type and file size.</li>
        <li>You can also delete images before uploading by clicking or tapping on the x button on the top right of the image.</li>
        <li>Once an image or images are selected the upload button below will be active.</li>
        <li>Click or tap on the upload images button.</li>
        <li>That's it. You can go to the vote page to see your images.</li>
        <li>If you you need to edit your images click or tap on the 'your images' tab.</li>
        <li>Please click or tap on contact link in the navigation if you have any questions.</li>
      </ol>
      <!-- <p>You can use your cell phone or desktop to upload pictures. You can upload up to 6 max. The image size cannot exceed 1000mb so please adjust before upload.</p> -->
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
  </b-modal>

  <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
    <b-tabs>
        <b-tab class="uploads-tab" title="Uploads">
          <h1 class="tab-title">{{ imageCountMessage }}</h1>
          <p>PNG and JPG format only max size 1000kb or 1mb</p>
          <form
              @submit.prevent="sendFile"
              enctype="multipart/form-data"
              class="uploads-form"
            >
              <div class="field" v-if="showUpload">
                <div class="file is-boxed is-primary">
                  <label class="file-label">
                    <!-- <image-compressor
                      :done="getFiles"
                      :scale="70"
                      :quality="70"
                      /> -->
                      <input
                        multiple
                        type="file"
                        class="file-input"
                        ref="files"
                        hidden
                        @change="selectFile"
                      />
                      <b-button
                        class="input-upload-button"
                        variant="primary"
                        @click="chooseFile()">
                        <b-icon class="camera-icon" icon="camera-fill" aria-hidden="true"/>
                      </b-button>
                  </label>
                </div>
              </div>
              {{ canvasImage.blob }}
               <img
                    :src="canvasImage.blob"
                  />
              <template
                  v-for="(file, index) in canvasImage"
                >
                <div
                  class="image-container"
                  :key="index"
                >
                  <img
                    :src="file.blob"
                  />
                </div>
              </template>
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
                    v-if="!uploading"
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
                    v-if="!uploading"
                    class="image-button upload-button"
                    type="submit"
                    variant="primary"
                    :disabled="disableUploadButton"
                  >
                    Upload Images
                  </b-button>
                  <b-spinner
                    v-if="uploading"
                    class="upload-button"
                    style="width: 3rem; height: 3rem;"
                    label="Large Spinner"
                  />
                </template>
                <p v-else>You have to many images delete some to upload.</p>
                <p>{{ this.message }}</p>
              </div>
              </form>
        </b-tab>

        <b-tab title="Your Images" lazy>
          <div class="your-images-form">
              <b-button
                v-if="!deletingUploading"
                class="image-button delete-button"
                type="submit"
                variant="primary"
                :disabled="!deleteImageId.length > 0"
                @click.prevent="saveDeletedImages()"
              >
              Delete Selected Images {{ deleteImageId.length || '' }}
              </b-button>
              <b-spinner
                 v-if="deletingUploading"
                class="upload-button"
                style="width: 3rem; height: 3rem;"
                label="Large Spinner"
              />
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
          </div>
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

  private uploading = false;

  private deletingUploading = false;

  private imagesToLarge = false;

  private canvasImage = [];

  // private getFiles(obj): void {
  //   console.log(obj.compressed.blob, 'OBJ');
  //   this.canvasImage = obj.compressed;
  // }

  private chooseFile(): void {
    // @ts-ignore
    this.$refs['files'].click();
  }

  private get disableUploadButton(): boolean {
    if (this.uploadFiles.length > 0) {
      return false;
    }
    return true;
  }

  private get maxImageButton(): boolean {
    if (this.uploadFiles.length >= (this.imageMaxCount + 1)) {
      return true;
    }
    return false;
  }

  private get imageCountMessage(): string {
    const count = this.imageMaxCount;
    if (this.uploadFiles.length >= count) {
      this.showUpload = false;
      return `You cannot add anymore image, ${count} is the max.`;
    }
    this.showUpload = true;
    return `You can upload up to${this.uploadFiles.length - count} ${this.uploadFiles.length === 5 ? 'image' : 'images'}.`;
  }

  private get user(): {} {
    return this.$store.getters.user;
  }

  private get getUserId(): boolean {
    return this.$store.getters.getUserId;
  }

  private get userImages(): {} {
    return this.$store.getters.userImage;
  }

  private selectFile(): void {
    // @ts-ignore
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
    const MAX_SIZE = 1000000;
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (file.size > MAX_SIZE) {
      return `max size is ${MAX_SIZE / 1000}kb... please use a smaller size.`;
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Please use only .jpg or .png file types.';
    }
    return '';
  }

  private async sendFile(): Promise<void> {
    this.uploading = true;
    const formData = new FormData();
    // @ts-ignore
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
      this.uploading = false;
      const input = this.$refs.files;
      // @ts-ignore
      input.type = 'text';
      // @ts-ignore
      input.type = 'file';
    } catch (err) {
      this.message = 'Error';
    }
  }

  deleteImage(id): void {
    this.deleteImageId.push(id);
  }

  async saveDeletedImages(): Promise<void> {
    this.deletingUploading = true;
    const payload = {
      imageIds: this.deleteImageId,
      userId: this.getUserId,
    };
    await this.$store.dispatch('deleteImages', payload);
    this.deleteImageId = [];
    this.deletingUploading = false;
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

    .image-button {
      height: 100px;
      width: 100px;
      border-radius: 100%;
    }

    .upload-button {
      margin-top: 20px;
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
  .uploads-form {
    display: flex !important;
    flex-direction: column !important;;
    align-items: center !important;
    text-align: center;
  }
  .your-images-form {
    flex-direction: column !important;;
    align-items: center !important;
    text-align: center;
    display: flex;
  }
  .tab-pane {
    text-align: center;
  }

  .bi-camera-fill {
    font-size: 100px !important;
  }

  .input-upload-button {
    margin-bottom: 20px;
  }

  .delete-button {
    margin-bottom: 20px;
  }

  .instruction-button {
    margin-bottom: 20px;
  }

  .instruction-list {
    text-align: left;

    li {
      margin-bottom: 20px;
      font-size: 12px;
    }
  }
</style>
