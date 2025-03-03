<template>
  <form-wrapper :title="title">
    <fit>
      <expantion-section
        default-opened
        v-model="expansionState"
        title="جستجو"
      >
        <div class="row q-col-gutter-sm">
          <safa-combo
            v-model="requestType"
            label="نوع"
            label-width="60px"
            class="col-12 col-md-3"
            source-type="local"
            :options="requestTypeList"
          />
          <safa-combo
            v-model="CI_ArchiveGroup"
            label="گروه"
            label-width="60px"
            class="col-12 col-md-3"
            domainName="engineer"
            ciName="CI_ArchiveGroup"
          />
          <engineer-info-box
            label="کد عضویت"
            labelWidth="60px"
            class="col-md-6"
            v-model="currentIdentityCode"
            @getEngineerInfo="getEngineerInfo"
          />
        </div>
      </expantion-section>
      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
      ></ArchiveWrap>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  props: {
    currentIdentityCode: Number
  },
  data () {
    return {
      title: 'آرشیو',
      name: 'EngineerArchive',
      formKey: '1c66314b-08b3-49a9-b5a0-ac45203c07b8',
      main: true,
      expansionState: true,
      CI_ArchiveGroup: 0,
      requestType: '1',
      requestTypeList: [
        {
          ID: '1',
          Title: 'مهندس'
        },
        {
          ID: '2',
          Title: 'دفتر'
        }
      ],
      getArchiveRootSubjectResult: null
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let payLoad = {
        Request: this.requestType,
        Code: this.currentIdentityCode,
        CI_ArchiveGroup: this.CI_ArchiveGroup
      }
      this.$services.engineers
        .getArchiveRootSubject(payLoad)
        .then(async (response) => {
          this.result = this.getResponse(response.data)
          if (this.result.success) {
            this.getArchiveRootSubjectResult =
              this.result.data.GetArchiveRootSubjectResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.currentIdentityCode,
              bizCodeTitle: 'کد عضویت'
            })
          }
        })
        .catch((error) => {
          console.error('load error', error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getEngineerInfo () {
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    }
  }
}
</script>
