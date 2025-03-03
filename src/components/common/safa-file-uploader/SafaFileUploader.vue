<template>
  <!-- :displayText="label" -->
  <ComponentDecoration
    :errorMessage="errorMessage"
    :id="id"
    :isEllipsis="isEllipsis"
    :labelShrink="labelShrink"
    :labelWidth="labelWidth"
    :mode="mode"
    :required="required"
    :showRequiredSymbol="required"
    :subtext="subtext"
  >
    <div class="flex items-center no-wrap">
      <safa-text :label="label" v-model="model.FileName" m="r" :required="required" :validations="validations">
        <template v-slot:append>
          <q-icon
            :title="model.FileName === '' ? 'بارگذاری فایل' : 'تغییر فایل'"
            style="position: relative; right: 5px; font-size: 18px"
            @click="uploadFile"
            color="primary"
            :name="
              model.FileName === '' ? 'file_upload' : 'published_with_changes'
            "
            class="cursor-pointer"
            :disabled="m === 'r'"
          />
        </template>
      </safa-text>
      <q-file
        v-if="type"
        ref="fileUploader"
        :value="selectedFile"
        @input="fileChangeEvent"
        v-show="false"
        :accept="type"
      />
      <q-file
      v-else
        ref="fileUploader"
        :value="selectedFile"
        @input="fileChangeEvent"
        v-show="false"
      />
    </div>
  </ComponentDecoration>
</template>

<script>
export default {
  name: "SafaFileUploader",
  props: {
    value: { type: [Number, String], default: 0 },
    validations: [Array, String],
    isEllipsis: { type: Boolean, default: false },
    multiType: { type: Boolean, default: false },
    labelShrink: { type: Boolean, default: false },
    labelWidth: String,
    displayText: String,
    required: Boolean,
    showRequiredSymbol: Boolean,
    id: String,
    mode: String,
    subtext: String,
    errorMessage: String,
    label: { type: String, default: "" },
    dir: { type: String, default: "ltr" },
    m: { type: String, default: "e" },
    type: { type: String }, // ".png,.jpeg,.jpg,.WRD,.TXT,.ODOC,.rar,.zip"
    maxSize: { type: Number, default: 4 } // 4MB
  },
  data () {
    return {
      selectedFile: [],
      model: {
        FileName: ""
      }
    }
  },
  methods: {
    uploadFile () {
      if (this.m === 'r') return
      this.$refs.fileUploader.pickFiles()
    },
    async fileChangeEvent (file) {
      this.model.FileName = ""
      if (file) {
        const s = file.size / 1048576
        let unit = this.maxSize < 1 ? 'کیلوبایت' : 'مگابایت'
        let max = this.maxSize < 1 ? this.maxSize * 1000 : this.maxSize
        if (s > this.maxSize) {
          this.showError(`حجم فایل انتخاب شده بیش از حد مجاز می باشد. لطفا فایل با حداکثر حجم ${max} ${unit} انتخاب نمایید.`, { title: "خطای اعتبارسنجی" })
          return
        }
        this.model.FileName = file.name
        this.$emit('change', file)
      } else this.$emit('change', null)
    }
  }
}
</script>
