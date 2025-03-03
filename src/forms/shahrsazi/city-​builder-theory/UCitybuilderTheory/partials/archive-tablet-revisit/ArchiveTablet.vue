<template>
  <fit>
    <safa-status :result="loadObjRes" />
    <FormRow class="q-pa-sm">
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
          <div class="fit">
            <safa-splitter v-model="spVert" class="fit" vertical>
              <template #before>
                <fit>
                  <safa-grid
                    title="لیست آرشیو"
                    v-model="model.Sh_ImageDetails_List"
                    cdcName="Sh_ImageDetails_List"
                    :m="mode"
                    helper="gvArchiveAll"
                    @row:click="showSelectedImageDetailsList"
                  />
                </fit>
              </template>
              <template #after>
                <fit>
                  <safa-grid
                    title="لیست سوابق آرشیو"
                    v-model="model.Sh_AllImageDetails_List"
                    cdcName="Sh_AllImageDetails_List"
                    helper="gvArchiveAll"
                    @row:click="showAllImageDetailsList"
                  />
                </fit>
              </template>
            </safa-splitter>
          </div>
        </fit>
      </template>
      <template v-slot:after>
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
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    baseLibResults: Object,
    selectedRevisitItem: Object,
    assignRevisitInfo: Object
  },
  data () {
    return {
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
      return window.getConfigValue("archiveTablet")
      // if (!this.selectedDistrict) {
      //   // eslint-disable-next-line no-undef
      //   return window.getConfigValue('archiveCore')
      // } else {
      //   // eslint-disable-next-line no-undef
      //   const districtConfig = window.getConfigValue('archiveCore').district || {}
      //   console.log('///////////////////////////////////////////', districtConfig)
      //   console.log('///////////////////////////////////////////', this.selectedDistrict)
      //   return districtConfig[this.selectedDistrict]
      // }
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    async loadObj () {
      let NidProc = null
      // let IsLoadedFromHistory = false
      if (this.selectedRevisitItem !== null) {
        this.NidUniqueUpload = this.selectedRevisitItem.NidRevisit
        NidProc = this.selectedRevisitItem.Nidproc
        // IsLoadedFromHistory = IsLoadedFromHistory
      } else {
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
      }
      try {
        const payLoad = {
          pNidUniqueUpload: this.NidUniqueUpload,
          pNidProc: NidProc
        }
        const { data } = await this.$services.SC.getShImageDetailsList(
          payLoad,
          { config: { District: this.selectedDistrict } }
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
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      this.archiveBizCode = bizCode
    },
    showSelectedImageDetailsList ({ data }) {
      // debugger
      // console.log("data selected :>> ", data)
      this.updateArchiveBizCode(data.ArchiveNidFile.toString())
    },
    showAllImageDetailsList ({ data }) {
      // debugger
      this.updateArchiveBizCode(data.ArchiveNidFile.toString())
    },
    showAllArchive () {
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
