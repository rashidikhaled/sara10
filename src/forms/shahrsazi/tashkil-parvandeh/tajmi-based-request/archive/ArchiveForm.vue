<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <div>
    <internal-section>
      <div class="row q-col-gutter-lg">
        <safa-combo
          label="گروه آرشیو"
          ciName="CI_ArchiveGroup"
          domainName="CI_SaraM1"
          class="col-12 col-md-2"
          label-width="60px"
          v-model="selectedArchiveGrp"
        />
        <safa-text
          label="کلید آرشیو"
          v-model="baseLibResults.ArchiveWrapper.BizCode"
          class="col-12 col-md-2"
          label-width="60px"
        />
        <safa-text
          label="پلاک ثبتی"
          class="col-12 col-md-2"
          label-width="60px"
          v-model="baseLibResults.Base_RegisterPlack_Str"
        />
      </div>
    </internal-section>
    <div>
      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
      ></ArchiveWrap>
    </div>
  </div>
 </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  components: {
    // FormActions,
  },

  data () {
    return {
      title: 'آرشیو تاریخچه تجمیع براساس درخواست',
      formKey: '4ab33ba3-67ee-415e-bb68-db5b53d66566',
      sidebarCompatible: true,
      selectedArchiveGrp: null,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {}
      }
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.getArchiveWrapper()
    }
  },
  mounted () {
    this.getUserResourcePermissions()
    this.getCiArciveType()
  }
}
</script>
