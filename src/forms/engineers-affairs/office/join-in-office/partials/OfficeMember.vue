<template>
  <form-wrapper title="عضویت در دفتر">
    <template #header>
      <safa-status :result="engInfoWithCodeRes" />
      <safa-status :result="saveMemInfoRes" />

      <div class="q-gutter-x-sm flex" v-if="engFullName">
        <strong>مهندس:</strong>
        <p class="q-mb-none">
          {{ engFullName }}
        </p>
      </div>
    </template>

    <fit>
      <div class="row q-col-gutter-sm q-mb-sm items-center">
        <EngineerInfoBox
          v-model="identityCode"
          label-width="80px"
          @fetched="loadObj"
          class="col-12"
        />
      </div>
      <q-separator class="q-mt-sm" />

      <FormRow class="q-ma-sm q-px-sm">
        <FormControl>
          <safa-combo
            ciName="CI_Years"
            domainName="engineer"
            label="سال کاری"
            :m="mode"
            label-width="80px"
            v-model="model.ClsMem_Info.Mem_Info.CI_Years"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ عضویت"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.JoinDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="ضریب"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.MultiplyValue"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ خروج"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.DisJoinDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره نامه خروج از دفتر"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.DisjoinLetterNo"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-ma-sm q-px-sm">
        <FormControl>
          <safa-checkbox
            label="مسئول دفتر می باشم"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsPresident"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="جانشین مسئول دفتر می باشم"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsSubstitute"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="اعمال ظریب دفتر"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsApplyMultiply"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="خروج از دفتر"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsDisJoin"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="مدیرعامل می باشد"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsCEO"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="عضویت هیئت مدیریت می باشد"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsMamangmentBoard"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="تمام وقت می باشد"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsFullTime"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            label="پایه فعال رشته"
            label-width="80px"
            :m="mode"
            v-model="model.ClsMem_Info.Mem_Info.IsBaseOnStudy"
          />
        </FormControl>
        <text-template
          label-width="80px"
          label="توضیجات"
          class="col-12"
          v-model="model.ClsMem_Info.Mem_Info.MemComments"
          :m="mode"
        />
      </FormRow>
      <safa-datatable
        helper="officeMemberDetailColumns"
        v-model="model.ClsMem_Info.Mem_Detail"
        hideHeader
        :m="mode"
        fit
        height="100%"
        max-height="100%"
        min-height="200px"
        show-selected-checkbox
        paginate
        class="q-px-sm"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        showEditButton
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObj"
      />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    result: {
      type: [Array, Object],
      defualt: () => {}
    }
  },
  data () {
    return {
      name: "OfficeMember",
      title: "عضو در دفتر",
      formKey: "0991f288-1402-4639-9e80-5c580320a4ae",
      model: {
        GetEng_InfoWithCodeResult: {},
        ClsMem_Info: {
          Mem_Info: {
            ApplyMultiplyDate: "",
            CI_Years: 0,
            DisJoinDate: "",
            DisjoinLetterNo: null,
            IsApplyMultiply: false,
            IsBaseOnStudy: false,
            IsCEO: false,
            IsDisJoin: false,
            IsFullTime: false,
            IsMamangmentBoard: false,
            IsPresident: false,
            IsSubstitute: false,
            JoinDate: "",
            MemComments: "",
            MultiplyValue: 0,
            NIdEng: EMPTY_GUID,
            NIdMem: EMPTY_GUID,
            NIdMem_tmp: 0,
            NIdOff: EMPTY_GUID,
            NidParent_tmp: null
          },
          Mem_Detail: []
        },
        Eng_Info: {
          EngineerLastOffice: {}
        },
        OfficeCode: ""
      },

      EngSettingModel: {
        CI_Years_Eng: 1401
      },

      identityCode: null,
      engFullName: null,
      NIdMem: EMPTY_GUID,

      engInfoWithCodeRes: null,
      saveMemInfoRes: null
    }
  },

  mounted () {
    if (!this.value) {
      this.model.ClsMem_Info.Mem_Info.NIdEng =
        this.result.EngineerLastOffice?.NIdEng || EMPTY_GUID
      this.model.ClsMem_Info.Mem_Info.NIdOff = this.result.NidOffice
    } else {
      if (!this.engFullName) { this.engFullName = `${this.value.EngName}${this.value.EngFamily}` }
      this.identityCode = this.value.IdentityCode
      this.NIdMem = this.value.NIdMem
    }

    this.loadObj()
  },

  methods: {
    loadObj () {
      if (!this.identityCode && !this.value) return

      this.showLoading()
      let payLoad = {
        pRequest: {
          EngineerCode: this.identityCode,
          NIdMem: this.NIdMem
        }
      }

      this.$services.engineers
        .getEngInfoWithCode(payLoad)
        .then(async ({ data }) => {
          this.engInfoWithCodeRes = this.getResponse(data)

          if (this.engInfoWithCodeRes.success) {
            if (this.engInfoWithCodeRes.data.GetEng_InfoWithCodeResult) {
              this.model.Eng_Info = this.engInfoWithCodeRes.data.GetEng_InfoWithCodeResult

              if (
                this.model.Eng_Info.EngineerLastOffice.NIdEng &&
                this.model.Eng_Info.EngineerLastOffice.NIdEng !== EMPTY_GUID
              ) {
                if (
                  this.model.Eng_Info.EngineerLastOffice.NIdMem &&
                  this.model.Eng_Info.EngineerLastOffice.NIdMem !== EMPTY_GUID &&
                  this.isEditable === false &&
                  !this.value &&
                  !this.model.OfficeCode.includes("n") &&
                  !this.model.OfficeCode.includes("d") &&
                  !this.model.OfficeCode.includes("N") &&
                  !this.model.OfficeCode.includes("D")
                ) {
                  this.showError("مهندس مورد نظر عضو دفتر می باشد")

                  if (this.model.ClsMem_Info.Mem_Info) { this.model.ClsMem_Info.Mem_Info.NIdEng = EMPTY_GUID }

                  return false
                } else {
                  this.model.ClsMem_Info = this.engInfoWithCodeRes.data.GetEng_InfoWithCodeResult.ClsMem_Info
                  this.model.ClsMem_Info.Mem_Info.NIdEng = this.engInfoWithCodeRes.data.GetEng_InfoWithCodeResult.EngineerLastOffice.NIdEng

                  if (this.model.ClsMem_Info.Mem_Info.CI_Years === 0) {
                    const { CIYearsEng } = await this.$stKartable.dispatch(
                      "formSettings/getSettings",
                      {
                        key: "EngSetting",
                        defaultValue: this.EngSettingModel
                      }
                    )

                    this.model.ClsMem_Info.Mem_Info.CI_Years = CIYearsEng
                  }

                  await this.log({
                    action: this.logActions.view,
                    bizCode: this.identityCode,
                    bizCodeTitle: "کد دفتر"
                  })
                }
              } else {
                this.showError("اطلاعاتی با این کد یافت نشد")
                if (this.model.ClsMem_Info.Mem_Info) { this.model.ClsMem_Info.Mem_Info.NIdEng = EMPTY_GUID }

                return false
              }
            }
          }
        })
        .catch(err => {
          this.serverError()
          console.error(err.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      if (this.model.ClsMem_Info.Mem_Info.NIdEng === EMPTY_GUID) {
        this.showError("مهندسی انتخاب نشده است")
        return false
      }

      if (
        !this.model.ClsMem_Info.Mem_Info.NIdOff ||
        this.model.ClsMem_Info.Mem_Info.NIdOff === EMPTY_GUID
      ) { this.model.ClsMem_Info.Mem_Info.NIdOff = this.result.NidOffice }

      // this.model.ClsMem_Info.ExitAll = false;

      this.showLoading()
      let payLoad = {
        pRequest: {
          ClsMem_Info: {
            ...this.model.ClsMem_Info
          }
        }
      }
      this.$services.engineers
        .saveMemInfo(payLoad)
        .then(async ({ data }) => {
          this.saveMemInfoRes = this.getResponse(data)
          if (this.saveMemInfoRes.success) {
            this.model = this.saveMemInfoRes.data.SaveMem_InfoResult

            await this.log({
              action: this.logActions.save,
              bizCode: this.identityCode,
              bizCodeTitle: "کد دفتر"
            })
            this.isEditable = false
            this.$emit("saveEngineer")
          }
        })
        .catch(err => {
          this.isEditable = false
          this.serverError()
          console.error(err, "err_getMemOffices")
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
