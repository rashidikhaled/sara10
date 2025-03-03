<template>
  <safa-form
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper vertical :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <safa-tabs v-model="activeTab" class="fit">
        <template v-slot:tabs>
          <tab-menu name="executVote" label="اجرای رای" />
          <!-- <tab-menu name="executVote" label="آرشیو" /> -->
        </template>

        <tab-content name="executVote" title="اجرای رای">
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-text
                  v-model="model.CommissionInfo.SecretariatNo"
                  cdcName="SecretariatNo"
                  label="شماره دبیرخانه"
                  label-width="75px"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  v-model="model.CommissionInfo.UrbanNidKartablItem"
                  cdcName="UrbanNidKartablItem"
                  label="شماره ارجاع"
                  label-width="75px"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  v-model="model.CommissionInfo.OwnerName"
                  cdcName="OwnerName"
                  label="نام مالک"
                  label-width="75px"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  v-model="model.CommissionInfo.Address"
                  cdcName="Address"
                  label="آدرس"
                  label-width="75px"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  v-model="
                    model.ClsCommission_Impart.Commission_Impart.ImpartNo
                  "
                  cdcName="ImpartNo"
                  label="شماره ابلاغ"
                  label-width="75px"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  v-model="
                    model.ClsCommission_Impart.Commission_Impart.ImpartDate
                  "
                  cdcName="ImpartDate"
                  label="تاریخ ابلاغ"
                  label-width="75px"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  v-model="
                    model.ClsCommission_ExecutTrackingVote
                      .Commission_ExecutTrackingVote.CI_StatusOwner
                  "
                  cdcName="CI_StatusOwner"
                  ciName="CI_SatusOwner"
                  domainName="Commission100"
                  label="وضعیت ملک"
                  label-width="75px"
                  :m="mode"
                />
              </FormControl>
              <nosazi-code-input
                label="کدنوسازی"
                v-model="baseNosaziCode"
                m="r"
              />
            </FormRow>
            <safa-datatable
              title="اجرای رای"
              v-model="
                model.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses
              "
              cdcName="SrvGetVoteTrepasses"
              :columns="columns"
              :m="mode"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              paginate
            />
            <q-file
              ref="fileUploader"
              :value="selectedFile"
              @input="fileChangeEvent"
              v-show="false"
            />
          </fit>
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="btnAcceptClick"
          @cancel="isEditable = false"
        >
          <!-- editSPId="965ac7f3-d1c7-48ac-98c6-925eccabab92"
            editSPCaption="دکمه ویرایش" -->
          <template v-slot:after>
            <btn-default @click="btnUploadFileClick" label="بارگذاری فایل" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
// import fakeData from "./fakeData.js"

import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
export default {
  name: "UExecutTrackingVote",
  mixins: [baseFormMixin, kartableCommissionMixin],

  data: function () {
    return {
      title: "ثبت اجرای رای",
      formKey: "71E7876C-210C-4D2D-93EF-16DEA5DA4559",
      name: "UExecutTrackingVote",
      main: true,

      selectedFile: null,
      // Models
      grdTrepass: [],
      columns: [
        {
          field: "Id",
          title: "کد تخلف",
          width: "80px",
          editable: false
        },
        {
          field: "Title",
          title: "عنوان تخلف",
          width: "200px",
          editable: false
        },
        {
          field: "Title",
          title: "عنوان تخلف",
          width: "150px",
          editable: false
        },
        {
          field: "CI_TrepassType_Group",
          title: "نوع تخلف",
          width: "150px",
          editable: false,
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "CI_Years",
          title: "سال تخلف",
          width: "80px",
          editable: false,
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ تخلف",
          editor: "date",
          width: "100px",
          editable: false
        },
        {
          field: "TrepassValue",
          title: "مقدار تخلف",
          width: "80px",
          editable: false
        },
        {
          field: "Floor",
          title: "طبقه تخلف",
          width: "80px",
          editable: false
        },
        {
          field: "CI_UsingTypeGroupMojaz",
          title: "کاربری اصلی موجود",
          width: "150px",
          editable: false,
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "UsingTitle",
          title: "کاربری فرعی موجود",
          width: "150px",
          editable: false
        },
        // UsingGroupType
        {
          field: "CI_VoteType",
          title: "نوع رای",
          width: "150px",
          editable: false,
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "CommissionText",
          title: "شماره کمیسیون",
          width: "150px",
          editable: false
        },
        {
          field: "CI_CommissionType",
          title: "نوع کمیسیون",
          width: "150px",
          editable: false,
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_CommissionType"
        },
        {
          field: "VoteNo",
          title: "شماره رای",
          width: "150px",
          editable: false
        },
        {
          field: "CI_VoteType",
          title: "عنوان رای",
          width: "250px",
          editable: false,
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_VoteType"
        },
        {
          field: "VoteValue",
          title: "مقدار راي",
          width: "150px",
          editable: false
        },
        {
          field: "UrbanNidKartablItem",
          title: "شماره ارجاع",
          width: "100px",
          editable: false
        },
        {
          field: "VoteDate",
          title: "تاریخ راي",
          editor: "date",
          width: "100px",
          editable: false
        },
        {
          field: "Vote_Comments",
          title: "شرح راي",
          width: "350px",
          editable: false
        },
        {
          field: "CI_ExecuteSubsidiaryVote",
          title: "نتیجه اجرای رای(اصلی)/نتیجه اجرای رای",
          width: "350px",
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_ExecuteMainVote"
        },
        {
          field: "ExecuteVoteValue",
          title: "مقدار اجرا(متر)",
          width: "150px"
        },
        {
          field: "ExecuteVoteDate",
          title: "تاریخ اقدام",
          editor: "date",
          width: "100px"
        },
        {
          field: "ExecuteVoteComments",
          title: "شماره",
          width: "150px"
        },
        {
          field: "ExecuteVoteDesc",
          title: "توضیحات",
          width: "400px"
        }
      ],
      model: {
        CommissionInfo: {
          Address: "",
          AllUrbanComments: null,
          Apartment: 0,
          BackStateTitle: null,
          BillNo: null,
          Block: 0,
          Building: 0,
          CI_BoundCode: null,
          CI_Commission: 0,
          CI_CommissionBroken: null,
          CI_CommissionOld: null,
          CI_CommissionPriority: null,
          CI_CommissionType: 0,
          CI_PrintType: 0,
          CI_Region: 0,
          CI_RelapseType: null,
          CI_VoteCorrection: 0,
          CodeString: "",
          ColorInKartabl: null,
          ComEnterDate: "",
          Comments: null,
          CommissionComments: "",
          CommissionDate: "",
          CommissionDateExpert: null,
          CommissionState: null,
          CurrentArea: null,
          DateLicence: "",
          Density: null,
          District: 0,
          DocArea: null,
          DocTypeTitle: null,
          ExpertName: null,
          HasComments: false,
          HasLegalExpert: null,
          House: 0,
          IsManagementMustBehold: null,
          IsMeeting: false,
          IsRandomCom: false,
          IsRun: null,
          IsSara10: null,
          Iscomplainant: false,
          LegalExpertComments: null,
          NidProcAhkam: null,
          NoTownDabir: null,
          OwnerCellNo: null,
          OwnerName: "",
          OwnerNationalCode: null,
          OwnerTelNo: null,
          PenaltyValue: null,
          Pieces: null,
          PostCode: null,
          PreCode: null,
          RandomCommissionDate: null,
          Region: 0,
          Regplaque: "",
          RelapseComments: null,
          RelapseDate: null,
          RelapseTime: null,
          Remark: null,
          Requester: null,
          RootSubject: null,
          Run_Comments: null,
          SecretariatNo: 0,
          Shop: 0,
          SubNo: null,
          SysCI_City: null,
          SysCI_RequestBy: 0,
          TmpNidFilKernel: null,
          TreeLevel: 0,
          UrbanComments: null,
          UrbanNidKartablItem: 0,
          NidCommission: "00000000-0000-0000-0000-000000000000",
          UrbanNidRequest: null,
          UrbanRequestDate: null,
          UsingGroup_Mojood: null,
          UsingTypeTitle: null,
          WorkflowTitel: null,
          X: null,
          Y: null
        },
        CommissionInfos: [],
        ClsCommission_Impart: {
          Commission_Impart: {
            ImpartDate: ""
          }
        },
        ClsCommission_ExecutTrackingVote: {
          Commission_ExecuteTracking: [],
          SrvGetVoteTrepasses: [],
          Commission_ExecutTrackingVote: { CI_StatusOwner: 0 }
        }
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // Responses
      loadObjRes: null,
      saveObjRes: null,

      // Tabs
      activeTab: "executVote"
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else {
      this.hideSidebar(this.name)
    }
  },

  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        PRequest: {
          NidProcAhkam: this.selectedRequest.NidProc // '929b5131-287a-4f97-8b2b-045e7c54ecc0'
        }
      }
      this.$services.commissions
        .getCommissionInfoByNidProcAhkam(payload)
        .then((data) => {
          // debugger
          // const data = fakeData
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model =
              this.loadObjRes.data.GetCommissionInfoByNidProcAhkamResult

            // #region normalizeModel
            // this.model = {
            //   ...this.model,
            //   CommissionInfo: this.model.CommissionInfo ?,
            //   CommissionInfos: this.model.CommissionInfos ?? [],
            //   ClsCommission_Impart: this.model.ClsCommission_Impart ?? {
            //     Commission_Impart: { ImpartDate: "" }
            //   },
            //   ClsCommission_ExecutTrackingVote: this.model
            //     .ClsCommission_ExecutTrackingVote ?? {
            //     Commission_ExecuteTracking: [],
            //     SrvGetVoteTrepasses: [],
            //     Commission_ExecutTrackingVote: { CI_StatusOwner: 0 }
            //   }
            // }
            // #endregion

            // if (this.model.CommissionInfos.length === 1) {
            //   this.model.CommissionInfo = this.model.CommissionInfos[0]
            // } else if (this.model.CommissionInfos.length > 1) {
            //   this.model.CommissionInfo = this.model.CommissionInfos.find(
            //     (x) =>
            //       x.CommissionDate.hashCode() ===
            //       this.model.CommissionInfos.reduce(function (max, current) {
            //         return Math.max(max, current.CommissionDate.hashCode())
            //       }, -Infinity)
            //   )
            // }
            if (this.model.CommissionInfo) {
              this.baseNosaziCode = convertStringToNosaziCodeObject(
                this.model.CommissionInfo.CodeString
              )
            }
            if (
              this.model?.ClsCommission_ExecutTrackingVote
                ?.Commission_ExecuteTracking &&
              this.model.ClsCommission_ExecutTrackingVote
                .Commission_ExecuteTracking.length > 0
            ) {
              this.model.ClsCommission_ExecutTrackingVote.Commission_ExecuteTracking.forEach(
                (items) => {
                  this.model.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses.forEach(
                    (tmp) => {
                      if (items.NidVT === tmp.NidVT) {
                        tmp.CI_ExecuteMainVote = items.CI_ExecuteMainVote
                        tmp.CI_ExecuteSubsidiaryVote =
                          items.CI_ExecuteSubsidiaryVote

                        tmp.ExecuteVoteComments = items.ExecuteVoteComments
                        tmp.ExecuteVoteDate = items.ExecuteVoteDate
                        tmp.ExecuteVoteDesc = items.ExecuteVoteDesc
                        tmp.ExecuteVoteValue = parseFloat(
                          items.ExecuteVoteValue
                        )
                        tmp.NidCommission = items.NidCommission
                        tmp.NidVT = items.NidVT
                      }
                    }
                  )
                }
              )
            }
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

    btnAcceptClick () {
      let listCommissionExecuteTracking = []
      this.model.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses.forEach(
        (i) => {
          listCommissionExecuteTracking.push({
            CI_ExecuteMainVote: i.CI_ExecuteMainVote,
            CI_ExecuteSubsidiaryVote: i.CI_ExecuteSubsidiaryVote,
            ExecuteVoteComments: i.ExecuteVoteComments,
            ExecuteVoteDate: i.ExecuteVoteDate,
            ExecuteVoteDesc: i.ExecuteVoteDesc,
            ExecuteVoteValue: i.ExecuteVoteValue,
            NidCommission: i.NidCommission,
            NidVT: i.NidVT
          })
        }
      )
      this.model.ClsCommission_ExecutTrackingVote.Commission_ExecuteTracking =
        listCommissionExecuteTracking
      this.model.ClsCommission_ExecutTrackingVote.Commission_ExecutTrackingVote.NidCommission =
        this.model.CommissionInfo.NidCommission

      this.showLoading()
      const payload = {
        pRequest: {
          ClsCommission_ExecutTrackingVote:
            this.model.ClsCommission_ExecutTrackingVote
        }
      }
      this.$services.commissions
        .saveCommissionExecutTrackingVote(payload)
        .then(({ data: args }) => {
          this.saveObjRes = this.getResponse(args)
          if (this.saveObjRes.success) {
            this.isEditable = false
            this.showSuccess("ذخیره با موفقیت انجام شد")
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

    btnUploadFileClick () {
      this.$refs.fileUploader.pickFiles()
    },

    fileChangeEvent (file) {
      if (file) this.selectedFile = file
    }
  }
}
</script>
