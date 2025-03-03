<template>
  <safa-form
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <safa-status :result="loadObjRes" />
      <fit>
        <FormRow>
          <FormControl>
            <safa-text
              label="کد ارجاع"
              label-width="80px"
              v-model="nidWorkItem"
              required
              type="number"
              @keypress.enter="loadObj"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="loadObj"
                  color="primary"
                  name="search"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </FormControl>
        </FormRow>

        <q-separator class="q-my-sm" />

        <ArchiveWrap
          v-if="archiveBizCode"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
          class="fit"
        />
        <div v-else class="flex items-center full-height justify-center">
          <span class="text-grey">عدم یافتن تنظیمات مرتبط با آرشیو ...</span>
        </div>

      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const GuidEmpty = '00000000-0000-0000-0000-000000000000'

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UArchiveDig",
      title: "آرشیو حفاری",
      formKey: "17108ea7-fd31-441e-83bd-04cc6a1239c0",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      archiveBizCode: null,
      nidWorkItem: '',
      loadObjRes: null
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfigValue("archiveDig")
    }
  },

  methods: {
    async loadObj () {
      if (this.nidWorkItem === '') return this.showError('لطفا کد ارجاع مورد نظر را جهت نمایش آرشیو وارد نمایید.')
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getArchiveRootSubject({
          pRequest: {
            IsSara10: true,
            NidWorkItem: this.nidWorkItem
          }
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data.GetArchiveRootSubjectResult
          // eslint-disable-next-line eqeqeq
          if (res && res.NidProc != GuidEmpty) {
            this.archiveBizCode = res.NidProc
          } else {
            this.showError("متاسفانه برای کد ارجاع وارد شده، کد آرشیو یافت نشد.")
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  },

  created () {
    this.nidWorkItem = this.selectedRequest?.NidWorkItem ?? ''
    this.loadObj()
  }

}
</script>
