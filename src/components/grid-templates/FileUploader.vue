<template>
  <td class="datatable-text-template">
    <div class="row q-col-gutter-sm items-center">
      <div class="col-8">
        <q-file
          dense
          outlined
          ref="fileUploader"
          :value="selectedFile"
          @input="fileChangeEvent"
          accept=".doc,.docx"
        />
      </div>
      <div class="col">
        <btn-default
          @click="uploadFile"
          label="آپلود قالب"
        />
      </div>
    </div>
  </td>
</template>

<script>
import fileHelper from "src/mixins/fileHelper"

export default {
  name: "PictureTemplate",
  props: {
    field: String,
    dataItem: Object,
    inEdit: Boolean,
    editable: Boolean,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    column: Object,
    mode: String
  },
  mixins: [fileHelper],
  data () {
    return {
      image: null,
      selectedFile: []
    }
  },
  mounted () {
    if (this.dataItem && this.dataItem[this.field]) {
      this.image = this.convertToImage(
        this.dataItem && this.dataItem[this.field]
      )
    }
  },
  computed: {
    tdWidth () {
      if (this.column && this.column.width) return this.column.width
      return "40px"
    },
    tdHeight () {
      if (this.column && this.column.he) return this.column.height
      return "40px"
    }
  },
  methods: {
    uploadFile () {
    //   this.$refs.fileUploader.pickFiles();
      this.$emit('uploadFile', this.$refs.fileUploader)
    },
    fileChangeEvent (file) {
      if (file) {
        const sizeInMB = file.size / 1024 / 1024
        if (sizeInMB > 4) {
          this.showError("حجم فایل نمیتواند بیشتر از 4 مگابایت باشد.")
          return
        }
        this.selectedFile = file
      }
      /* console.log(file)
      console.log(await this.fileToByteArray(file))
      console.log(await this.getBase64(file)) */
    },
    convertToImage (buffer) {
      return (
        "data:image/jpg;base64," +
        btoa(String.fromCharCode(...new Uint8Array(buffer)))
      )
    }
  }
}
</script>
<style lang="scss">
.safa-datatable table td.datatable-text-template:not(.wrap) {
  white-space: nowrap;
}
</style>
