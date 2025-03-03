<template>
  <fit>
    <div class="fit archive-wrap relative" style="min-height: 500px">
      <q-intersection @visibility="visibilityUpdated" class="fit">
        <ArchiveLogin
          v-if="isVisibleArchive"
          v-bind="$attrs"
          :userLoginId="currentUser.NidUser"
          :userLoginName="currentUser.FullName"
          class="fit"
        />
      </q-intersection>
      <span style="position: absolute; bottom: 24px; left: 36px; height: 140px; z-index: 100" class="column q-gutter-sm text-center">
        <span class="text-weight-bold text-primary">300</span>
        <span class="flex-grow">
          <q-slider
            v-model="tileSize"
            :min="90"
            :max="300"
            reverse
            vertical
            style="height: 100%;"
          />
        </span>
        <span>90</span>
      </span>
      <span style="position: absolute; bottom: 24px; left: 80px;">
        <q-toggle v-model="showTooltip" dense size="sm" label="تولتیپ" toggle-order="ft" />
      </span>
    </div>
  </fit>
</template>
<script>
import { services } from "ui-security"

const defaultOptions = {
  showOnlyStates: null,
  stateItems: null,
  entities: null,
  showToolbar: true
}
import formScopeMixin from "src/mixins/formScopeMixin"

export default {
  name: "ArchiveWrap",
  mixins: [formScopeMixin],
  props: {
    bizCode: String,
    // options: Object,
    options: {
      type: Object,
      default: () => ({
        showOnlyStates: null,
        showTree: true
      })
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  data () {
    return {
      isVisibleArchive: true,
      tileSize: 90,
      showTooltip: true,
      tileHeightTimer: null,
      tooltipTimer: null
    }
  },
  computed: {
    defaultArchiveOptions () {
      // eslint-disable-next-line no-undef
      return archiveStore
    }
  },
  watch: {
    options () {
      this.showArchive()
    },
    bizCode () {
      this.showArchive()
    },
    tileSize () {
      if (this.tileSize >= 90 && this.tileSize <= 300) {
        // eslint-disable-next-line no-undef
        archiveStore.tileHeightSize = this.tileSize
        clearTimeout(this.tileHeightTimer)
        this.tileHeightTimer = setTimeout(() => {
          services.setUserStorage("archive_tile_height_size", this.tileSize)
        }, 3000)
      }
    },
    showTooltip () {
      // eslint-disable-next-line no-undef
      archiveStore.showTooltip = !!this.showTooltip
      clearTimeout(this.tooltipTimer)
      this.tooltipTimer = setTimeout(() => {
        services.setUserStorage("archive_show_tooltip", this.showTooltip)
      }, 3000)
    }
    /*    'archiveStore.bizCode' () {
                // eslint-disable-next-line no-undef
                console.debug('archiveStore bizcode changed', archiveStore.bizCode)
              } */
  },
  methods: {
    applyOptions () {
      const archiveOptions = {
        ...defaultOptions,
        ...(this.options || {})
      }
      Object.keys(archiveOptions).forEach((key) => {
        // eslint-disable-next-line no-undef
        archiveStore[key] = archiveOptions[key]
        // console.log(`archiveStore::${key}`, archiveStore[key])
      })
      // eslint-disable-next-line no-undef
      archiveStore.bizCode = this.bizCode
      console.debug("archive bizCode changed :", this.bizCode)
    },
    visibilityUpdated (visible) {
      if (visible) {
        this.showArchive()
      } else {
        this.hideArchive()
      }
    },
    async showArchive () {
      this.isVisibleArchive = false
      this.applyOptions()
      await this.$nextTick()
      setTimeout(() => {
        this.isVisibleArchive = true
      }, 100)
    },
    hideArchive () {
      this.isVisibleArchive = false
      // eslint-disable-next-line no-undef
      archiveStore.bizCode = null
    }
  },
  mounted () {
    this.tileSize = Number(services.getUserStorage(
      `archive_tile_height_size`,
      this.defaultArchiveOptions.tileHeightSize
    ))
    this.showTooltip = !!services.getUserStorage(
      `archive_show_tooltip`,
      this.defaultArchiveOptions.showTooltip
    )
  }
}
</script>
<style lang="scss">
.archive-wrap {
  > .q-intersection > div {
    height: 100%;
    min-height: 500px;
  }
}
</style>
