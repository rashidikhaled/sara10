<template>
  <fit>
    <safa-grid
      v-model="value.CommissionList_InNidNosaziCode"
      :addRow="false"
      :allowCopy="false"
      :allowMultipleSelection="false"
      :deleteRow="false"
      :show-selected-checkbox="false"
      cdcName="commissionList"
      fit
      height="100%"
      :columns="commissionList"
      m="r"
      max-height="100%"
      min-height="200px"
      paginate
      title="لیست کمیسیون"
    />
    <!-- @commissionArchiveClick="handleCommissionArchive" -->
    <safa-popup
      v-model="commissionVoteDialog"
      title="رای های کمیسیون"
      width="900px"
      height="700px"
    >
      <CommissionVoteList
        v-model="selectCommission"
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :title="title"
      />
    </safa-popup>

    <!-- <safa-popup v-model="commissionArchiveDialog" title="آرشیو کمیسیون">
      <fit>
        <form-wrapper>
          <FormRow class="q-mb-sm">
            <FormControl>
              <safa-combo
                label="گروه آرشیو"
                label-width="90px"
                v-model="selectedArchiveGrp"
                cdcName="selectedArchiveGrp"
                ciName="CI_ArchiveGroup"
                domainName="CI_SaraM1"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کلید آرشیو"
                label-width="90px"
                v-model="baseLibInNosaziCode.ArchiveWrapper.BizCode"
                cdcName="BizCode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="پلاک ثبتی"
                label-width="90px"
                v-model="baseLibInNosaziCode.Base_RegisterPlack_Str"
                cdcName="Base_RegisterPlack_Str"
              />
            </FormControl>
          </FormRow>
          <div class="fit">
            <ArchiveWrap
              :name="archiveConfig.username"
              :pass="archiveConfig.password"
              :biz-code="archiveBizCode"
            />
          </div>
        </form-wrapper>
      </fit>
    </safa-popup> -->
  </fit>
</template>

<script>
// import baseFormMixin from "src/mixins/baseFormMixin"
import CommissionVoteList from "./CommissionVoteList"

export default {
  name: "CommissionList",
  // mixins: [baseFormMixin],
  components: { CommissionVoteList },

  props: {
    baseNosaziCode: Object,
    baseLibInNosaziCode: Object,
    value: {
      type: Object,
      default: () => {}
    },
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      commissionVoteDialog: false,
      commissionArchiveDialog: false,
      selectCommission: null,
      selectedArchiveGrp: 1,
      commissionListInNosaziCode: [],
      archiveBizCode: "",
      commissionList: [
        {
          field: 'commissionVotes',
          title: "رای های کمیسیون",
          btnTitle: 'رای های کمیسیون',
          editor: 'action',
          width: "130px",
          cellRenderer: 'agCallbackBtn',
          showBtn: (data) => !data.Status,
          callback: (params) => this.handleCommissionVotes(params)
        },
        // {
        //   field: "commissionArchive",
        //   title: "آرشیو کمیسیون",
        //   editor: "action",
        //   width: "120px"
        // },
        {
          field: "CommissionNo",
          title: "شماره کمیسیون",
          width: "150px"
        },
        {
          field: "CommissionType",
          title: "نوع کمیسیون",
          width: "150px"
        },
        {
          field: "CommissionDate",
          title: "تاريخ کمیسیون",
          editor: "date",
          width: "120px"
        },
        { field: "Comments", title: "توضیحات", width: "auto" }
      ]
    }
  },

  methods: {
    handleCommissionVotes (e) {
      this.selectCommission = e
      this.commissionVoteDialog = true
    }

    // handleCommissionArchive (e) {
    //   this.selectCommission = e.dataItem
    //   console.log(this.baseLibInNosaziCode)
    //   this.getArchiveWrapper()
    // },

    // getArchiveWrapper () {
    //   const payload = {
    //     pNidNosaziCode: this.baseLibInNosaziCode._NidNosaziCode,
    //     pCI_ArchiveGroup: this.selectedArchiveGrp || 1
    //   }
    //   this.$services.SA.getArchiveWrapper(payload)
    //     .then(({ data }) => {
    //       const res = this.getResponse(data)
    //       if (res.success) {
    //         if (res.data.ArchiveWrapper) {
    //           this.updateArchiveBizCode(res.data.ArchiveWrapper.BizCode)
    //           this.commissionArchiveDialog = true
    //         }
    //       } else {
    //         this.commissionArchiveDialog = false
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err)
    //       this.showError("اسناد این شماره پرونده موجود نمی باشد.")
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },

    // updateArchiveBizCode (bizCode) {
    //   // eslint-disable-next-line no-undef
    //   // archiveStore.bizCode = bizCode
    //   this.archiveBizCode = bizCode
    // }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    },
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    }
  },

  watch: {
    // selectedArchiveGrp () {
    //   this.getArchiveWrapper()
    // }
  }
}
</script>
