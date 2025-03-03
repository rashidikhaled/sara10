<template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper vertical :title="title" :padding="false">
      <template #header>
        <safa-status :result="getCommissionForImpartRes" />
        <safa-status :result="saveCommissionExecutTrackingVoteRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab" class="fit">
          <template v-slot:tabs>
            <tab-menu name="executVote" label="ابلاغ رای" />
          </template>
          <tab-content name="executVote" title="ابلاغ رای">
            <fit>
              <FormRow :sm="5" :md="5" :lg="5" :xl="5" class="q-mb-sm">
                <FormControl>
                  <safa-text
                    v-model="model.CommissionInfo.SecretariatNo"
                    label="شماره دبیرخانه"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    v-model="model.CommissionInfo.UrbanNidKartablItem"
                    label="شماره ارجاع"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    v-model="model.CommissionInfo.OwnerName"
                    label="نام مالک"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    v-model="model.CommissionVote.VoteNo"
                    label="شماره رای"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    v-model="model.CommissionVote.VoteDate"
                    label="تاریخ رای"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    v-model="model.CommissionVote.CI_VoteType"
                    ciName="CI_VoteType"
                    domainName="Commission100"
                    label="نوع رای"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    v-model="model.CommissionInfo.CI_PrintType"
                    ciName="CI_PrintType"
                    domainName="Commission100"
                    label="نوع چاپ"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    v-model="
                      model.ClsCommission_Impart.Commission_Impart.ImpartNo
                    "
                    label="شماره ابلاغ"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    v-model="
                      model.ClsCommission_Impart.Commission_Impart.ImpartDate
                    "
                    label="تاریخ ابلاغ"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    v-model="
                      model.ClsCommission_Impart.Commission_Impart
                        .VoteReceiverName
                    "
                    label="تحویل گیرنده رای"
                    label-width="90px"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    v-model="
                      model.ClsCommission_Impart.Commission_Impart
                        .VoteReceiverCode
                    "
                    label="کد ملی تحویل گیرنده"
                    label-width="90px"
                    :m="mode"
                    type="number"
                    :validation="[
                      'required',
                      'number',
                      validations.VoteReceiverCode,
                    ]"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    v-model="
                      model.ClsCommission_Impart.Commission_Impart
                        .NotificationagentName
                    "
                    label-width="90px"
                    label="نام و نام خانوادگی مامور ابلاغ"
                    :m="mode"
                  />
                </FormControl>
                <nosazi-code-input
                  label="کد نوسازی"
                  label-width="90px"
                  v-model="baseNosaziCode"
                  m="r"
                />
                <safa-text
                  class="col-12"
                  v-model="model.CommissionInfo.Address"
                  label="آدرس"
                  label-width="90px"
                  :m="mode"
                />
              </FormRow>
              <q-separator class="q-mb-sm" />
              <FormRow class="q-mb-sm" :sm="1" :md="1" :lg="1" :xl="1">
                <FormControl>
                  <div class="flex items-center q-gutter-x-sm">
                    <safa-radio
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .TypeProcedure
                      "
                      val="1"
                      :m="mode"
                    />
                    <span class="firstTxt">
                      مطابق ماده 68 قانون آيين دادرسي مدني به مالك/ذينفع
                    </span>
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .OwnerNameMadeh68
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '1' ? 'e' : 'r'
                      "
                    />
                    <span class="centerTxt"> یا وکیل مالک </span>
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .LawyerOwnerMadeh68
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '1' ? 'e' : 'r'
                      "
                    />
                    <span> با اخذ وكالتنامه كاري يا دعاوي ابلاغ گرديد. </span>
                  </div>
                </FormControl>
                <FormControl>
                  <div class="flex items-center q-gutter-x-sm">
                    <safa-radio
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .TypeProcedure
                      "
                      val="2"
                      :m="mode"
                    />
                    <span class="firstTxt">
                      مطابق ماده 69 قانون آيين دادرسي مدني به آقای/خانم
                    </span>
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .OwnerNameMadeh69
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '2' ? 'e' : 'r'
                      "
                    />
                    <span class="centerTxt"> سمت و نوع وابستگی </span>
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .SideNameMadeh69
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '2' ? 'e' : 'r'
                      "
                    />
                    <span> مالک ابلاغ گرديد. </span>
                  </div>
                </FormControl>
                <FormControl>
                  <div class="flex items-center q-gutter-x-sm">
                    <safa-radio
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .TypeProcedure
                      "
                      val="5"
                      :m="mode"
                    />
                    <span class="firstTxt">
                      مطابق ماده 76 قانون آيين دادرسي مدني به آقاي/خانم</span
                    >
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .OwnerNameMadeh76
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '5' ? 'e' : 'r'
                      "
                    />
                    <span class="centerTxt"> دارای سمت </span>
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .SideNameMadeh76
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '5' ? 'e' : 'r'
                      "
                    />
                    <span> ابلاغ گرديد. </span>
                  </div>
                </FormControl>
                <FormControl>
                  <div class="flex items-center q-gutter-x-sm">
                    <safa-radio
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .TypeProcedure
                      "
                      val="6"
                      :m="mode"
                    />
                    <span class="firstTxt">
                      مطابق ماده 75 قانون آيين دادرسي مدني به آقای/خانم
                    </span>
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .OwnerNameMadeh75
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '6' ? 'e' : 'r'
                      "
                    />
                    <span class="centerTxt"> دارای سمت </span>
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .SideNameMadeh75
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '6' ? 'e' : 'r'
                      "
                    />
                    <span> ابلاغ گرديد. </span>
                  </div>
                </FormControl>
                <FormControl>
                  <div class="flex items-center q-gutter-x-sm">
                    <safa-radio
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .TypeProcedure
                      "
                      val="4"
                      :m="mode"
                    />
                    <span>
                      مطابق ماده 70 قانون آيين دادرسي مدني به علت استنكاف از
                      قبول اخطاريه توسط آقاي/خانم</span
                    >
                    <safa-text
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .OwnerNameMadeh70
                      "
                      label=""
                      :m="
                        isEditable && currentTypeProcedure === '4' ? 'e' : 'r'
                      "
                    />
                    <span> مالک در محل الصاق قانونی گرديد. </span>
                  </div>
                </FormControl>
                <FormControl>
                  <div class="flex items-center q-gutter-x-sm">
                    <safa-radio
                      v-model="
                        model.ClsCommission_Impart.Commission_Impart
                          .TypeProcedure
                      "
                      val="3"
                      :m="mode"
                    />
                    <span>
                      مطابق ماده 70 قانون آيين دادرسي مدني به علت عدم حضور مالك
                      و بستگان وي در محل الصاق قانوني گرديد.
                    </span>
                  </div>
                </FormControl>
              </FormRow>
              <q-separator class="q-mb-sm" />
              <text-template
                class="fit q-mb-sm"
                v-model="
                  model.ClsCommission_Impart.Commission_Impart.Desciption
                "
                label="توضیحات"
                label-width="90px"
                :m="mode"
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="cancel"
        >
          <template v-slot:after>
            <btn-default label="بارگذاری فایل" @click="uploadFile" />
            <btn-default label="چاپ گزارش" @click="print" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Joi from "joi"
import kartableCommissionMixin from "../../commission-menu/mixins/kartableCommissionMixin.js"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  data () {
    return {
      title: "ابلاغ رای",
      formKey: "71826ABA-3F38-4FD7-B622-6FCF5536C437",
      name: "UImpartCommission",
      main: true,

      activeTab: "executVote",
      model: {
        ClsCommission_Impart: {
          Commission_Impart: {
            Desciption: null,
            ImpartDate: null,
            ImpartNo: null,
            LawyerOwnerMadeh68: null,
            NidCommission: "00000000-0000-0000-0000-000000000000",
            NidImpart: "00000000-0000-0000-0000-000000000000",
            NotificationagentName: null,
            OwnerNameMadeh68: null,
            OwnerNameMadeh69: null,
            OwnerNameMadeh70: null,
            OwnerNameMadeh75: null,
            OwnerNameMadeh76: null,
            SideNameMadeh69: null,
            SideNameMadeh75: null,
            SideNameMadeh76: null,
            TypeProcedure: null,
            VoteReceiverCode: null,
            VoteReceiverName: null,
            VoteReceiverNo: null
          }
        },
        CommissionInfo: {
          Address: "",
          Apartment: 0,
          Block: 0,
          Building: 0,
          CI_Commission: 0,
          CI_CommissionType: 0,
          CI_PrintType: 0,
          CI_Region: 0,
          CI_RelapseType: null,
          CI_VoteCorrection: 0,
          CodeString: null,
          Comments: null,
          CommissionComments: null,
          District: null,
          ExpertName: "",
          House: null,
          NidCommission: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidTaskState: "00000000-0000-0000-0000-000000000000",
          OwnerName: "",
          Region: null,
          SecretariatNo: "",
          Shop: null,
          UrbanNidKartablItem: ""
        },
        CommissionVote: {
          CI_VoteType: 0,
          NoteComment: null,
          VoteDate: "",
          VoteNo: "",
          Vote_Comments: ""
        },
        Commission_VoteList: []
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

      getCommissionForImpartRes: null,
      saveCommissionExecutTrackingVoteRes: null,

      validations: {
        VoteReceiverCode: Joi.custom(
          function (value, helper) {
            if (
              this.model.ClsCommission_Impart.Commission_Impart.VoteReceiverCode
                .length !== 10
            ) {
              return helper.message("کد ملی می بایست 10 رقم باشد.")
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  mounted () {
    if (this.selectedNidCommission) {
      this.loadObj()
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        PRequest: {
          CheckExistVoteToArchiveByNidCommission: false,
          CheckExistVoteToArchiveByReportName: false,
          IsActive: false,
          IsSara10: true,
          ListCommissionVoteOfAgent: null,
          NIDCommission: this.selectedNidCommission,
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          IsdeleteArchive: false,
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidKartabl: null,
          NidTaskState: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          NidsCommission: null,
          NosaziCode: null
        }
      }
      this.$services.commissions
        .getCommissionForImpart(payload)
        .then(async ({ data }) => {
          this.getCommissionForImpartRes = this.getResponse(data)
          if (this.getCommissionForImpartRes.success) {
            this.model =
              this.getCommissionForImpartRes.data.GetCommissionForImpartResult
            if (this.model.CommissionInfo.CodeString) {
              this.baseNosaziCode = convertStringToNosaziCodeObject(
                this.model.CommissionInfo.CodeString
              )
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "selectedNidCommission"
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (
        this.model.ClsCommission_Impart.Commission_Impart.ImpartDate.localeCompare(
          this.model.CommissionVote.VoteDate
        ) > -1
      ) {
        if (
          // !this.IsPageValid("validsum") &&
          this.currentTypeProcedure === 3
        ) {
        } else this.saveCommissionImpart()
      } else {
        this.showError("تاریخ ابلاغ نمی تواند از تاریخ صدور رای کوچیکتر باشد.")
      }
    },
    saveCommissionImpart () {
      // eslint-disable-next-line no-useless-return
      if (!this.isValidForm()) return
      // این بخش به علت مشکل در  سرا 8 تکمیل نیست
    },
    uploadFile () {},
    cancel () {
      this.resetValidation()
      this.isEditable = false
    },
    async print () {
      const reportPath =
        "/Sara8Reports/RptImpartCommission"
      const queryParams = {
        NidImpart: this.model.ClsCommission_Impart.Commission_Impart.NidImpart,
        NidUser: this.getNidUser(),
        NidCommission: this.selectedRequest.NidProc
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.confirmOutput,
        bizCode: this.model.ClsCommission_Impart.Commission_Impart.NidImpart,
        bizCodeTitle: "NidImpart"
      })
    }
  },
  computed: {
    currentTypeProcedure () {
      return this.model.ClsCommission_Impart.Commission_Impart.TypeProcedure
    }
  },
  watch: {
    currentTypeProcedure: {
      handler () {
        if (this.currentTypeProcedure === "1") {
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh70 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh76 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh76 =
            null
        } else if (this.currentTypeProcedure === "2") {
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh70 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh76 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh76 =
            null
        } else if (this.currentTypeProcedure === "5") {
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh70 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh75 =
            null
        } else if (this.currentTypeProcedure === "6") {
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh70 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh76 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh76 =
            null
        } else if (this.currentTypeProcedure === "4") {
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh76 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh76 =
            null
        } else if (this.currentTypeProcedure === "3") {
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh70 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh76 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh76 =
            null
        } else {
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh69 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh70 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh75 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh76 =
            null
          this.model.ClsCommission_Impart.Commission_Impart.SideNameMadeh76 =
            null
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.firstTxt {
  min-width: 270px;
}
.centerTxt {
  min-width: 110px;
  text-align: center;
}
</style>
