<template>
  <safa-form
  :id="formKey"
   :caption="title"
   appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
   >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="SearchDocInfoResult" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="propertyDetails" label="مشخصات ملک" />
            <tab-menu name="otherFeatures" label="سایر مشخصات" />
            <tab-menu name="realEstate" label="مستغلات" />
          </template>

          <tab-content name="propertyDetails">
            <PropertyDetails v-model="Doc_Info" :name="name" :title="title" />
          </tab-content>
          <tab-content name="otherFeatures">
            <OtherFeatures v-model="Doc_Info" :name="name" :title="title" />
          </tab-content>
          <tab-content name="realEstate">
            <RealEstate v-model="Doc_Info" :name="name" :title="title" />
          </tab-content>
        </safa-tabs>
        <form-control>
        <safa-grid
          v-model="DocInfoList"
          fit
          max-height="100%"
          height="100%"
          minHeight="100%"
          paginate
          m="r"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
        helper="DetailsColumn"
        @dbclick="onShowForm"

        />
        </form-control>
      </fit>
        <safa-popup
        title="اطلاعات املاک و اسناد"
        v-model="showform"
        width="1000px"
        height="600px"
      >
      <UDocInfo ref="UDocInfoRef"/>
      </safa-popup>
      <template v-slot:footer>
        <form-actions :showEditButton="false" :m="mode">
          <btn-search label="جستجو" @click="searchObj" />
          <btn-default label="گزارش" @click="report" />
          <btn-cancel label="پاک کردن" @click="clear" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PropertyDetails from "./partials/PropertyDetails.vue"
import OtherFeatures from "./partials/OtherFeatures.vue"
import RealEstate from "./partials/RealEstate.vue"
export default {
  mixins: [baseFormMixin],
  components: {
    PropertyDetails,
    OtherFeatures,
    RealEstate
  },
  data () {
    return {
      title: "جستجوی اطلاعات املاک و اسناد",
      name: "USearchDocInfo",
      formKey: "038A6D80-1DB8-4C3E-B325-613D1DD3F61D",
      main: true,
      showform: false,
      activeTab: "propertyDetails",
      SearchDocInfoResult: null,
      DocInfoList: [],
      Doc_Info: {
        OldOwnerNameAddress: null,
        Plack: null,
        RenterName: null,
        RenterAddress: null,
        RenterTel: null,
        ContractNo: null,
        RentPrice: null,
        CI_ContractRent: null,
        TransferRentDateFrom: null,
        ContractStartDateFrom: null,
        ContractEndDateFrom: null,
        ContractEndDateTo: null,
        RealEstateTransferNo: null,
        TransferNo: null,
        AssignmentNo: null,
        AssignmentDateFrom: null,
        AssignmentDateTo: null,
        ContractStartDateTo: null,
        TransferRentDateTo: null,
        TransferRentNo: null,
        PostCode: null,
        CI_UsingGroup: null,
        CI_HouseStatus: null,
        CI_UsingGroup2: null,
        CI_OwnerType: null,
        CI_OwnerStatus: null,
        EndRentDate: null,
        ContractBuyNoCommunicated: null,
        ContractBuyDateCommunicatedFrom: null,
        ContractBuyDateCommunicatedTo: null,
        ContractBuyNo: null,
        ContractBuyDateFrom: null,
        ContractBuyDateTo: null,
        CurrentAreaFrom: null,
        CurrentAreaTo: null,
        BuildAreaFrom: null,
        BuildAreaTo: null,
        PathValueFrom: null,
        PathValueTo: null,
        RemainAreaFrom: null,
        EndRentDateFrom: null,
        EndRentDateTo: null,
        RemainAreaTo: null,
        TotalPrice: null,
        EvaluationDateFrom: null,
        EvaluationDateTo: null,
        PlanName: null,
        EndowmentName: null,
        ClassNo: null,
        CI_CertificateStatus: null,
        TransferDateFrom: null,
        TransferDateTo: null,
        IsUnion: false,
        IsSeparation: false,
        RegisterPlackSub: null,
        RegisterPlackMain: null,
        RegisterPlackSection: null,
        DocNo: null,
        DocNoAyan: null,
        TransferYear: null,
        BureauLetterNo: null,
        CI_DocStatus2: null,
        Barcode: null,
        DocType1: false,
        DocType2: false,
        DocType3: false,
        DocType4: false,
        DocType5: false,
        DocType6: false,
        DocType7: false,
        DocType8: false,
        DocType9: false,
        DocType10: false,
        TransferDocAgentName: null,
        TransferLetterNo: null,
        TransferDocDateFrom: null,
        TransferDocDateTo: null,
        TransferDocName: null,
        CI_GettingKind: null,
        IsDocMunicipality: false,
        IsDocSafe: false,
        IsDocArchiveEstate: false,
        IsAssignable: false,
        CI_CessionKind: null,
        LetterNo: null,
        LetterDateFrom: null,
        LetterDateTo: null
      }

    }
  },
  computed: {
    query () {
      const sql = [];
      // Boolea fields
      [
        'DocType1',
        'IsUnion',
        'IsSeparation',
        'DocNo',
        'DocType1',
        'DocType2',
        'DocType3',
        'DocType4',
        'DocType5',
        'DocType6',
        'DocType7',
        'DocType8',
        'DocType9',
        'DocType10',
        'IsDocSafe',
        'IsAssignable',
        'IsDocMunicipality',
        'IsDocArchiveEstate'

      ]
        .filter(
          (field) =>
            this.Doc_Info[field] !== null && this.Doc_Info[field] !== false
        )
        .forEach((field) => {
          sql.push(`(Doc_Info.${field}=1')`)
        });
      // Equal Op fields
      [
        'CI_UsingGroup',
        'CI_UsingGroup2',
        'CI_CertificateStatus',
        'CI_OwnerType',
        'CI_ContractRent',
        'CI_DocStatus2',
        'CI_OwnerStatus',
        'CI_GettingKind',
        'CI_CessionKind',
        'CI_HouseStatus'
      ]
        .filter(
          (field) =>
            this.Doc_Info[field] !== null && this.Doc_Info[field] !== ''
        )
        .forEach((field) => {
          sql.push(`(${field} = N'${this.Doc_Info[field]}')`)
        });

      // Like Op fields
      [
        'AssignmentNo',
        'RealEstateTransferNo',
        'OldOwnerNameAddress',
        'RegisterPlackSub',
        'Plack',
        'Barcode',
        'TransferDocName',
        'PostCode',
        'TransferDocAgentName',
        'TransferLetterNo',
        'ContractBuyNoCommunicated',
        'ClassNo',
        'EndowmentName',
        'RegisterPlackSection',
        'RegisterPlackMain',
        'DocNoAyan',
        'TransferYear',
        'BureauLetterNo',
        'TransferNo',
        'LetterNo',
        'ContractBuyNo',
        'RenterAddress',
        'ContractNo',
        'RentPrice',
        'RenterTel',
        'RenterName'
      ]
        .filter((field) => this.Doc_Info[field] !== null)
        .forEach((field) => {
          sql.push(`(Doc_Info.${field} LIKE N'%${this.Doc_Info[field]}%')`)
        })
        // dates
      if (
        this.Doc_Info.AssignmentDateFrom != null &&
        this.Doc_Info.AssignmentDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.AssignmentDate >= N'${this.Doc_Info.AssignmentDateFrom}')`)
      }
      if (
        this.Doc_Info.AssignmentDateTo != null &&
        this.Doc_Info.AssignmentDateTo !== ''
      ) {
        sql.push(`(Doc_Info.TransferRentDate <= N'${this.Doc_Info.AssignmentDateTo}')`)
      }
      if (
        this.Doc_Info.TransferRentDateFrom != null &&
        this.Doc_Info.TransferRentDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.TransferRentDate >= N'${this.Doc_Info.TransferRentDateFrom}')`)
      }
      if (
        this.Doc_Info.TransferRentDateTo != null &&
        this.Doc_Info.TransferRentDateTo !== ''
      ) {
        sql.push(`(Doc_Info.TransferRentDate <= N'${this.Doc_Info.TransferRentDateTo}')`)
      }
      if (
        this.Doc_Info.ContractStartDateFrom != null &&
        this.Doc_Info.ContractStartDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.ContractStartDate >= N'${this.Doc_Info.ContractStartDateFrom}')`)
      }
      if (
        this.Doc_Info.ContractStartDateTo != null &&
        this.Doc_Info.ContractStartDateTo !== ''
      ) {
        sql.push(`(Doc_Info.ContractStartDate <= N'${this.Doc_Info.ContractStartDateTo}')`)
      }
      if (
        this.Doc_Info.ContractEndDateFrom != null &&
        this.Doc_Info.ContractEndDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.ContractEndDate >= N'${this.Doc_Info.ContractEndDateFrom}')`)
      }
      if (
        this.Doc_Info.ContractEndDateTo != null &&
        this.Doc_Info.ContractEndDateTo !== ''
      ) {
        sql.push(`(Doc_Info.ContractEndDate <= N'${this.Doc_Info.ContractEndDateTo}')`)
      }
      if (
        this.Doc_Info.TransferRentDateFrom != null &&
        this.Doc_Info.TransferRentDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.TransferRentDate >= N'${this.Doc_Info.TransferRentDateFrom}')`)
      }
      if (
        this.Doc_Info.TransferRentDateTo != null &&
        this.Doc_Info.TransferRentDateTo !== ''
      ) {
        sql.push(`(Doc_Info.TransferRentDate <= N'${this.Doc_Info.TransferRentDateTo}')`)
      }
      if (
        this.Doc_Info.TransferDocDateFrom != null &&
        this.Doc_Info.TransferDocDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.TransferDocDate >= N'${this.Doc_Info.TransferDocDateFrom}')`)
      }
      if (
        this.Doc_Info.TransferDocDateTo != null &&
        this.Doc_Info.TransferDocDateTo !== ''
      ) {
        sql.push(`(Doc_Info.TransferDocDate <= N'${this.Doc_Info.TransferDocDateTo}')`)
      }
      if (
        this.Doc_Info.LetterDateFrom != null &&
        this.Doc_Info.LetterDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.LetterDate >= N'${this.Doc_Info.LetterDateFrom}')`)
      }
      if (
        this.Doc_Info.LetterDateTo != null &&
        this.Doc_Info.LetterDateTo !== ''
      ) {
        sql.push(`(Doc_Info.LetterDate <= N'${this.Doc_Info.LetterDateTo}')`)
      }
      if (
        this.Doc_Info.TransferDateFrom != null &&
        this.Doc_Info.TransferDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.TransferDate >= N'${this.Doc_Info.TransferDateFrom}')`)
      }
      if (
        this.Doc_Info.TransferDateTo != null &&
        this.Doc_Info.TransferDateTo !== ''
      ) {
        sql.push(`(Doc_Info.TransferDate <= N'${this.Doc_Info.TransferDateTo}')`)
      }
      if (
        this.Doc_Info.EvaluationDateFrom != null &&
        this.Doc_Info.EvaluationDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.EvaluationDate >= N'${this.Doc_Info.EvaluationDateFrom}')`)
      }
      if (
        this.Doc_Info.EvaluationDateTo != null &&
        this.Doc_Info.EvaluationDateTo !== ''
      ) {
        sql.push(`(Doc_Info.EvaluationDate <= N'${this.Doc_Info.EvaluationDateTo}')`)
      }
      if (
        this.Doc_Info.EndRentDateFrom != null &&
        this.Doc_Info.EndRentDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.EndRentDate >= N'${this.Doc_Info.EndRentDateFrom}')`)
      }
      if (
        this.Doc_Info.EndRentDateTo != null &&
        this.Doc_Info.EndRentDateTo !== ''
      ) {
        sql.push(`(Doc_Info.EndRentDate <= N'${this.Doc_Info.EndRentDateTo}')`)
      }
      if (
        this.Doc_Info.ContractBuyDateCommunicatedFrom != null &&
        this.Doc_Info.ContractBuyDateCommunicatedFrom !== ''
      ) {
        sql.push(`(Doc_Info.ContractBuyDateCommunicated >= N'${this.Doc_Info.ContractBuyDateCommunicatedFrom}')`)
      }
      if (
        this.Doc_Info.ContractBuyDateCommunicatedTo != null &&
        this.Doc_Info.ContractBuyDateCommunicatedTo !== ''
      ) {
        sql.push(`(Doc_Info.ContractBuyDateCommunicated <= N'${this.Doc_Info.ContractBuyDateCommunicatedTo}')`)
      }
      if (
        this.Doc_Info.ContractBuyDateFrom != null &&
        this.Doc_Info.ContractBuyDateFrom !== ''
      ) {
        sql.push(`(Doc_Info.ContractBuyDate >= N'${this.Doc_Info.ContractBuyDateFrom}')`)
      }
      if (
        this.Doc_Info.ContractBuyDateTo != null &&
        this.Doc_Info.ContractBuyDateTo !== ''
      ) {
        sql.push(`(Doc_Info.ContractBuyDate <= N'${this.Doc_Info.ContractBuyDateTo}')`)
      }
      if (
        this.Doc_Info.CurrentAreaFrom != null &&
        this.Doc_Info.CurrentAreaFrom !== ''
      ) {
        sql.push(`(Doc_Info.CurrentArea  >= N'${this.Doc_Info.CurrentAreaFrom}')`)
      }
      if (
        this.Doc_Info.CurrentAreaTo != null &&
        this.Doc_Info.CurrentAreaTo !== ''
      ) {
        sql.push(`(Doc_Info.CurrentArea <= N'${this.Doc_Info.CurrentAreaTo}')`)
      }
      if (
        this.Doc_Info.BuildAreaFrom != null &&
        this.Doc_Info.BuildAreaFrom !== ''
      ) {
        sql.push(`(Doc_Info.BuildArea >= N'${this.Doc_Info.BuildAreaFrom}')`)
      }
      if (
        this.Doc_Info.BuildAreaTo != null &&
        this.Doc_Info.BuildAreaTo !== ''
      ) {
        sql.push(`(Doc_Info.BuildArea <= N'${this.Doc_Info.BuildAreaTo}')`)
      }
      if (
        this.Doc_Info.PathValueFrom != null &&
        this.Doc_Info.PathValueFrom !== ''
      ) {
        sql.push(`(Doc_Info.PathValue >= N'${this.Doc_Info.PathValueFrom}')`)
      }
      if (
        this.Doc_Info.PathValueTo != null &&
        this.Doc_Info.PathValueTo !== ''
      ) {
        sql.push(`(Doc_Info.PathValue <= N'${this.Doc_Info.PathValueTo}')`)
      }
      if (!sql.length) {
        return ''
      }
      // sql.push('**')
      return ' WHERE ' + sql.join(' AND ')
    }
  },
  methods: {
    onShowForm ({ row }) {
      debugger
      console.log(row)
      this.showform = true
      this.$nextTick(() => {
        this.$refs.UDocInfoRef.model.Doc_Info.NIdWorkItem = row.NIdWorkItem
        this.$refs.UDocInfoRef.btnSearchCodeClick()
      })
    },
    searchObj () {
      try {
        this.showLoading()
        const payload = {
          pFromRow: '0',
          pToRow: '2000',
          pWhere: this.query

        }
        this.$services.ES.searchDocInfo(payload)
          .then(async ({ data }) => {
            this.SearchDocInfoResult = this.getResponse(data)
            if (this.SearchDocInfoResult.success) {
              this.DocInfoList = this.SearchDocInfoResult.data.SearchDocInfoResult.DocInfoList
              await this.log({
                action: this.logActions.view,
                bizCode: this.Doc_Info.Plack,
                bizCodeTitle: 'پلاک'
              })
            }
          })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    clear () {
      this.DocInfoList = []
    }
  }
}
</script>
