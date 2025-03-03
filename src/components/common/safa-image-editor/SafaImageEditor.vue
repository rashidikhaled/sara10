<template>
  <fit>
    <div class="safa-image-editor full-height">
      <PinturaEditor
        class="full-height"
        v-bind="editorProps"
        :src="dataUrlImage"
        @pintura:process="handleProcess"
        @pintura:close="closeEditor"
      />
    </div>
  </fit>
</template>

<!-- eslint-disable camelcase -->
<script>
import "@pqina/pintura/pintura.css"
import { PinturaEditor } from "@pqina/vue-pintura/vue-2"
import {
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  locale_en_gb,
  setPlugins,
  plugin_crop,
  plugin_filter,
  // plugin_finetune,
  plugin_annotate,
  plugin_filter_defaults,
  // plugin_finetune_defaults,
  markup_editor_defaults,
  plugin_crop_locale_en_gb,
  plugin_filter_locale_en_gb,
  // plugin_finetune_locale_en_gb,
  plugin_annotate_locale_en_gb,
  markup_editor_locale_en_gb
} from "@pqina/pintura"

setPlugins(plugin_crop, /* plugin_finetune, */ plugin_filter, plugin_annotate)
import fileHelper from "src/mixins/fileHelper"

export default {
  name: "SafaImageEditor",

  components: { PinturaEditor },

  mixins: [fileHelper],

  props: {
    imageFile: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      editorConfig: {
        imageCropAspectRatio: 1,
        utils: ["crop", "rotate", "filter", "annotate"]
      },
      editorProps: {
        imageReader: createDefaultImageReader(),
        imageWriter: createDefaultImageWriter(),
        shapePreprocessor: createDefaultShapePreprocessor(),
        // ...plugin_finetune_defaults,
        ...plugin_filter_defaults,
        ...markup_editor_defaults,
        locale: {
          ...locale_en_gb,
          ...plugin_crop_locale_en_gb,
          // ...plugin_finetune_locale_en_gb,
          ...plugin_filter_locale_en_gb,
          ...plugin_annotate_locale_en_gb,
          ...markup_editor_locale_en_gb
        }
      }
    }
  },

  computed: {
    dataUrlImage () {
      return this.imageFile.startsWith("data:image/")
        ? this.imageFile
        : `data:image/png;base64,${this.imageFile}`
    }
  },

  methods: {
    async handleProcess ({ dest }) {
      // const base64 = await this.getBase64(dest)
      const fileBytes = await this.fileToByteArray(dest)
      this.$emit("save-edited-image", {
        /* base64, */
        fileBytes
      })
      this.closeEditor()
    },
    closeEditor () {
      this.$emit("close-editor")
    }
  }
}
</script>

<style lang="scss">
.PinturaRoot {
  position: relative;
  background-color: white !important;

  > .PinturaNavMain {
    right: unset !important;
    left: 1em !important;
  }

  > .PinturaTabPanels.PinturaMain .PinturaUtilMain {
    transform: rotateY(-180deg) !important;
  }
}
</style>
