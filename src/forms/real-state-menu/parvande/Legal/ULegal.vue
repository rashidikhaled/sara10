<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="getSupplySourcesInfoMessageRes" />
        <safa-status :result="getLegalInfoRes" />
        <safa-status :result="saveLegalInfoRes" />
        <safa-status :result="delLegalinfoRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="SourceSupply" label="مشخصات منبع تامین" />
            <tab-menu name="HistoryOwners" label="تاریخچه مالکین" />
            <tab-menu name="JointOwners" label="مالکین مشاعی" />
            <tab-menu
              name="ClassesPhysical"
              label="کلاسه های پرونده های فیزیکی"
            />
          </template>
          <tab-content name="SourceSupply">
            <USourceSupply
              :name="name"
              :title="title"
              :m="mode"
              v-model="model"
              :SupplySources="SupplySources"
            />
          </tab-content>
          <tab-content name="HistoryOwners" :padding="false">
            <UHistoryOwners
              :name="name"
              :title="title"
              :m="mode"
              v-model="model"
              @reLoad="getSupplySourcesInfoMessage"
              :GrdOwnerAttorney="GrdOwnerAttorneyList"
            />
          </tab-content>
          <tab-content name="JointOwners" :padding="false">
            <UJointOwners
              :name="name"
              :title="title"
              :m="mode"
              v-model="model"
            />
          </tab-content>
          <tab-content name="ClassesPhysical" :padding="true">
            <UClassesPhysical
              :name="name"
              :title="title"
              :m="mode"
              v-model="model"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template #after v-if="!isEditable">
            <btn-delete label="حذف" @click="btnDeleteClick" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import USourceSupply from "./partials/USourceSupply"
import UHistoryOwners from "./partials/UHistoryOwners"
import UJointOwners from "./partials/UJointOwners"
import UClassesPhysical from "./partials/UClassesPhysical"
export default {
  mixins: [baseFormMixin],
  components: {
    USourceSupply,
    UHistoryOwners,
    UJointOwners,
    UClassesPhysical
  },
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      name: "ULegal",
      title: "مشخصات حقوقی",
      formKey: "F5C7ADBE-033D-4436-872F-B91D0B4AC832",
      main: true,

      // #region services
      result: null,
      delLegalRes: null,
      saveRes: null,
      legRes: null,
      // #endregion

      // #region variables
      activeTab: "SourceSupply",
      model: {
        Legal_Info: {
          BeneficCurent: "",
          CI_AssignmentCapability: 1,
          CI_BeneficCurent: 0,
          CI_CessionKind: 0,
          CI_CessionOwner: 0,
          EndowmentName: "",
          LegalDesc: "",
          NIdCopy_tmp: 0,
          NIdLegal: "00000000-0000-0000-0000-000000000000",
          NIdSupplySources: "00000000-0000-0000-0000-000000000000",
          NId_tmp: 0,
          NidRequest: "00000000-0000-0000-0000-000000000000",
          SupplySourcesDesc: ""
        },
        Legal_Owner: [],
        Legal_OwnerShare: [],
        Legal_RelatedClasse: [],
        _NIdLegal: "00000000-0000-0000-0000-000000000000",
        _NIdRequest: "00000000-0000-0000-0000-000000000000"
      },
      SupplySources: [],
      GrdOwnerAttorneyList: [],

      // services
      getSupplySourcesInfoMessageRes: null,
      getLegalInfoRes: null,
      saveLegalInfoRes: null,
      delLegalinfoRes: null,
      NIdRequest: "00000000-0000-0000-0000-000000000000"
    }
  },
  created () {
    if (this.selectedRequest) {
      this.getSupplySourcesInfoMessage()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar(this.name)
    }
  },
  methods: {
    async getSupplySourcesInfoMessage () {
      this.showLoading()
      const payload = {
        PIsNewRow: false,
        PCI_Region: this.selectedDistrict
      }
      try {
        const { data } = await this.$services.ES.getSupplySourcesInfoMessage(
          payload
        )
        this.getSupplySourcesInfoMessageRes = this.getResponse(data)
        if (this.getSupplySourcesInfoMessageRes.success) {
          const res =
            this.getSupplySourcesInfoMessageRes.data
              .GetSupplySources_Info_MessageResult

          if (res && res.length > 0) {
            const list = []
            list.push(
              ...res.map((item) => {
                let r = {}
                r.ID = item.NIdSupplySources
                r.Title =
                  item.SupplySourcesCode + " || " + item?.SupplySourcesTitle
                r.GettingKind = item.GettingKind
                r.GettingOwner = item.GettingOwner
                r.SupplySourcesTitle = item.SupplySourcesTitle
                return r
              })
            )
            this.SupplySources = list
          }
          this.getLegalInfo()
          await this.log({
            action: this.logActions.view,
            bizCode: this.NIdRequest,
            bizCodeTitle: "NidRequest",
            nosaziCode: "",
            nidWorkItem: "",
            saveDesc: ""
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getLegalInfo () {
      this.showLoading()
      const payload = {
        pNIdProc:
          this.selectedRequest.NidProc ?? "00000000-0000-0000-0000-000000000000"
      }
      this.$services.ES.getLegalInfo(payload)
        .then(async ({ data }) => {
          this.getLegalInfoRes = this.getResponse(data)
          if (this.getLegalInfoRes.success) {
            this.model = this.getLegalInfoRes.data.GetLegal_InfoResult
            this.NIdRequest =
              this.getLegalInfoRes.data.GetLegal_InfoResult._NIdRequest
            this.GrdOwnerAttorneyList = this.model.Legal_Owner_Attorney
            // .map(
            //   (e) => {
            //     if (
            //       e.NIdOwner === this.NIdOwner ||
            //       e.NIdOwner === "00000000-0000-0000-0000-000000000000"
            //     ) {
            //       return e
            //     } else return []
            //   }
            // )
            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: ""
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (this.model.Legal_Info.CI_CessionKind === 0) {
        this.showError("نحوه واگذاری وارد نشده است.")
        return
      }
      if (!this.isValidForm()) return
      this.showLoading()
      debugger
      const payload = { PObj: this.model }
      this.$services.ES.saveLegalInfo(payload)
        .then(async ({ data }) => {
          this.saveLegalInfoRes = this.getResponse(data)
          if (this.saveLegalInfoRes.success) {
            console.log('pppppppp', payload)
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.getSupplySourcesInfoMessage()
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: `ذخیره اطلاعات فرم مشخصات حقوقی برای شماره درخواست ${this.NIdRequest} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    btnDeleteClick () {
      this.showConfirm("آیا اطلاعات مورد نظر  حذف شود؟").onOk(async () => {
        this.showLoading()
        this.$services.ES.delLegalinfo({
          pNIdProc:
            this.selectedRequest?.NidProc ??
            "00000000-0000-0000-0000-000000000000"
        })
          .then(async ({ data }) => {
            this.delLegalinfoRes = this.getResponse(data)
            if (this.delLegalinfoRes.success) {
              this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
              await this.log({
                action: this.logActions.delete,
                bizCode: this.NIdRequest,
                bizCodeTitle: "NidRequest",
                nosaziCode: "",
                nidWorkItem: "",
                saveDesc: ""
              })
            } else {
              this.showError("خطا در حذف اطلاعات")
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
