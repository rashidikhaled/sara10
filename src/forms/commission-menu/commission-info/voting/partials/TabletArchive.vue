<template>
  <fit>
    <safa-status :result="getTabletRevisitImageDetailsRes" />
    <safa-splitter v-model="splitterModel" vertical class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <FormRow class="q-mb-sm" :sm="2" :md="2" :lg="2" :xl="2">
            <FormControl>
              <safa-text
                v-model="dataContext.Name"
                cdcName="Name"
                label="نام کارشناس"
                label-width="70px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="dataContext.LastName"
                cdcName="LastName"
                label="نام خانوادگی"
                label-width="70px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="dataContext.RevisitTimeFrom"
                cdcName="RevisitTimeFrom"
                label="ساعت بازدید"
                label-width="70px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                v-model="dataContext.RevisitDate"
                cdcName="RevisitDate"
                label="تاریخ بازدید"
                label-width="70px"
                m="r"
              />
            </FormControl>
          </FormRow>

          <safa-datatable
            :columns="columns"
            m="r"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            v-model="gvArchive.ItemsSource"
            cdcName="ItemsSource"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <ArchiveWrap
            v-if="showArchive && archiveConfig && archiveConfig.username"
            style="min-height: 300px"
            class="fit"
            ref="archiveRef"
            :name="archiveConfig.username"
            :pass="archiveConfig.password"
            :bizCode="archiveBizCode"
          >
          </ArchiveWrap>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "آرشیو تبلت بازدید",
      name: "TabletArchive",
      formKey: "3a8e9343-ced5-4450-abc2-5f92de4e92f4",
      main: true,
      nidProc: "00000000-0000-0000-0000-000000000000",
      district: 0,
      showArchive: false,
      // Form Controls
      RevisitInfo: {
        Sh_RevisitAgent: {
          Name: null,
          LastName: null
        },
        Sh_Revisit: {
          RevisitTimeFrom: null,
          RevisitDate: null
        }
      },
      dataContext: {
        Name: "",
        LastName: "",
        RevisitTimeFrom: "",
        RevisitDate: ""
      },

      // Grid
      columns: [
        { field: "ArchiveGroupName", title: "عنوان گروه", width: "80px" },
        { field: "ArchiveNidFile", title: "کلید در آرشیو", width: "100px" },
        { field: "ArchiveFileName", title: "عنوان فایل", width: "85px" },
        { field: "ImageTime", title: "زمان گرفتن عکس", width: "110px" }
      ],
      gvArchive: { ItemsSource: [] },

      // Splitter
      splitterModel: 40,

      // temp
      nidActiveRevisit: null,

      // Responses
      getTabletRevisitImageDetailsRes: null
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveTablet")
    }
  },

  methods: {
    loadObj () {
      this.showLoading()
      let payload = {
        pDistrict: this.district,
        pNidProc: this.nidProc
      }

      this.$services.commissions
        .getTabletRevisitImageDetails(payload) // ToDo:  Implement AddObjToMap,LoadUIArchive
        .then(async ({ data }) => {
          this.getTabletRevisitImageDetailsRes = this.getResponse(data)
          if (this.getTabletRevisitImageDetailsRes.success) {
            const res =
              this.getTabletRevisitImageDetailsRes.data
                .GetTabletRevisitImageDetailsResult
            this.RevisitInfo = res
            this.nidActiveRevisit = res.NidActiveRevisit
            this.gvArchive.ItemsSource = res.TabletRevisitImageDetails
            this.updateArchiveBizCode(this.nidProc)
            // this.updateArchiveBizCode(this.nidActiveRevisit)
            this.showArchive = true
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در آرشیو تبلت بازدید کمیسیون ماده 100 انجام گردید.`
            })
          } else {
            this.showArchive = false
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
