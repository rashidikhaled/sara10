<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title">
      <template v-slot:header>
        <safa-status :result="requestResult" />
        <safa-status :result="loadRequestHeaderRes" />
        <safa-status :result="getAssignRevisitInfoRes" />

        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          :taskInfo="taskInfo"
          cdcName="baseNosaziCode"
          from-request
          @enter="loadData"
          @fetched="fetched"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              v-model="model.Sh_RevisitAgent.Name"
              cdcName="Name"
              label="کارشناس"
              label-width="65px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.Sh_RevisitAgent.LastName"
              cdcName="LastName"
              label="نام خانوادگی"
              label-width="65px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.Sh_Revisit.RevisitTimeFrom"
              cdcName="RevisitTimeFrom"
              label="ساعت بازدید"
              label-width="65px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              ref="gDatepicker"
              v-model="model.Sh_Revisit.RevisitDate"
              cdcName="RevisitDate"
              label="تاریخ بازدید"
              label-width="65px"
              m="r"
            />
          </FormControl>
        </FormRow>
        <safa-splitter v-model="spHoriz" horizontal>
          <template v-slot:before>
            <fit>
              <safa-splitter v-model="spVert" class="fit" vertical>
                <template v-slot:before>
                  <fit>
                    <safa-grid
                    title="لیست آرشیو"
                    v-model="model.Sh_ImageDetails_List"
                    cdcName="Sh_ImageDetails_List"
                    :m="mode"
                    helper="gvArchiveAll"
                    @row:click="showSelectedImageByNidFile"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-grid
                    title="لیست سوابق آرشیو"
                    v-model="model.Sh_AllImageDetails_List"
                    cdcName="Sh_AllImageDetails_List"
                    helper="gvArchiveAll"
                    @row:click="showSelectedImageByNidFile"
                    />
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </template>
          <template v-slot:after>
            <safa-splitter
              v-model="spArchive"
              vertical
              :limits="[50, 100]"
              :separator-class="spArchive >= 90 ? 'hidden' : ''"
            >
              <template v-slot:before>
                <fit>
                  <div class="fit" v-if="model.Sh_Revisit.NidProc">
                    <ArchiveWrap
                      :name="archiveConfig.username"
                      :pass="archiveConfig.password"
                      :biz-code="archiveBizCode"
                    />
                  </div>
                </fit>
              </template>
              <template v-slot:after v-if="spArchive < 90">
                <fit>
                  <div class="q-pa-sm fit">
                    <img
                      :src="archivePreviewImage"
                      style="width: auto; height: auto;"
                    />
                  </div>
                </fit>
              </template>
            </safa-splitter>
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <FormActions :showEditButton="false">
          <btn-default label="نمایش همه آرشیو" @click="showAllArchive" v-if="spArchive < 90" />
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { StringHelper } from "ui-security"
import { appendUrls } from '../../../../utils'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "آرشیو تبلت",
      // formKey: "e5608c96-d9af-48a5-b832-710814cef24c",
      formKey: "993797F7-6DD8-41AC-BEB9-5B0F40652734", // https://trello.com/c/KHohktSk طبق این تسک و با بررسی شهر های مشهد یزد و رشت این آیدی باید ست شود
      name: "ArchiveTablet",
      main: true,
      loadRequestHeaderRes: null,
      getAssignRevisitInfoRes: null,

      loadObjRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      NidUniqueUpload: null,

      spVert: 50,
      spHoriz: 100,
      spArchive: 100,
      archivePreviewImage: "",

      model: {
        Sh_Revisit: {
          NidProc: null
        },
        Sh_RevisitAgent: {},
        Sh_AllImageDetails_List: [],
        Sh_ImageDetails_List: []
      },
      archiveBizCode: ""
    }
  },
  computed: {
    archiveConfig () {
      // debugger
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveTablet")
    },
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      // this.fetched(value)
      this.load()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  },

  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      this.archiveBizCode = bizCode
    },
    async load () {
      const { NidProc } = this.selectedRequest
      try {
        const payload = {
          pNidProc: NidProc,
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const { data } = await this.$services.SA.loadRequestHeader(
          payload,
          this.config
        )
        this.loadRequestHeaderRes = this.getResponse(data)
        if (this.loadRequestHeaderRes.success) {
          this.requestHeader = this.loadRequestHeaderRes.data
          await this.getAssignRevisitInfo()
          await this.getShImageDetailsList()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getAssignRevisitInfo () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getAssignRevisitInfo(
          { PNidProc: this.selectedRequest.NidProc },
          this.config
        )
        this.getAssignRevisitInfoRes = this.getResponse(data)
        if (this.getAssignRevisitInfoRes.success) {
          this.assignRevisitInfo = this.getAssignRevisitInfoRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `لیست بازدیدهای تخصیص یافته برای درخواست ${this.selectedRequest.NidWorkItem} بارگذاری شد.`
          })
        } else this.showError("لیست بازدیدهای تخصیص یافته بارگذاری نشد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async getShImageDetailsList () {
      let NidProc = null
      NidProc = this.selectedRequest.NidProc
      let nidRevisit =
          this.assignRevisitInfo.Revisits_ThisRequest &&
          this.assignRevisitInfo.Revisits_ThisRequest.length > 0
            ? this.assignRevisitInfo.Revisits_ThisRequest.find(
              (a) => a.IsActive === 1
            ).NidRevisit
            : "00000000-0000-0000-0000-000000000000"
      this.NidUniqueUpload = nidRevisit
      NidProc =
          this.selectedRequest.NidProc ||
          "00000000-0000-0000-0000-000000000000"
      // IsLoadedFromHistory = IsLoadedFromHistory
      try {
        const payLoad = {
          pNidUniqueUpload: this.NidUniqueUpload,
          pNidProc: NidProc
        }
        const { data } = await this.$services.SC.getShImageDetailsList(
          payLoad,
          this.config
        )
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model = this.loadObjRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `نمایش اطلاعات آرشیو تبلت بازدید برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          this.updateArchiveBizCode(this.model.Sh_Revisit.NidProc)
          // this.updateArchiveBizCode(this.model.Sh_Revisit.NidRevisit)
        }
      } catch (e) {
        console.log(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    showSelectedImageByNidFile ({ data }) {
      this.spArchive = 50
      const archivePayload = new StringHelper().convert(
        `access_token=${this.$store.state.StArchive.access_token}&ID=${data.ArchiveNidFile}&bz=${data.NidProc}&rnd=-62135609144000&ext=.jpg&mode=max&ZL=Small`
      )

      this.archivePreviewImage = appendUrls([
        window.getConfigValue("securityArchiveCore.baseUrl"),
        `ArchiveFileProvider?pdata1=${archivePayload}`
      ])
    },
    showAllArchive () {
      this.spArchive = 100
      this.updateArchiveBizCode(this.model.Sh_Revisit.NidProc)
    }
  },
  watch: {
    "model.Sh_Revisit.NidProc": {
      handler () {
        if (this.model.Sh_Revisit.NidProc !== null) {
          this.spHoriz = 40
        }
      },
      deep: true
    }
  }
}
</script>
