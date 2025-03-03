<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20c96248-c0c2-4da0-bb07-9480b0c95dce"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <safa-splitter
          v-model="spModel"
          vertical
          class="fit"
          margin="0"
          :min-height="$q.screen.lt.lg ? '500px' : '150px'"
        >
          <template v-slot:before>
            <fit>
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-text
                    label="شماره درخواست مبدا"
                    label-width="110px"
                    cdcName="oldNidWorkItem"
                    v-model="oldNidWorkItem"
                    @keyup.enter="loadObj('old')"
                    :validations="['required', 'number']"
                  >
                    <template v-slot:append>
                      <q-icon
                        style="position: relative; right: 5px"
                        size="xs"
                        color="primary"
                        @click="loadObj('old')"
                        name="search"
                        class="cursor-pointer"
                        title="بازآوری اطلاعات"
                      />
                    </template>
                  </safa-text>
                </FormControl>
                <nosazi-code-input
                  label="کد نوسازی"
                  label-width="110px"
                  cdcName="CodeString"
                  v-model="oldModel.ClsFil_Info.Fil_Info.CodeString"
                  m="r"
                />
              </FormRow>
              <internal-section
                :defaultShow="false"
                title="اطلاعات درخواست مبدا"
              >
                <FormRow>
                  <FormControl>
                    <safa-datepicker
                      label="تاریخ درخواست"
                      label-width="110px"
                      cdcName="EnterDate"
                      v-model="oldModel.ClsFil_Info.Fil_Info.EnterDate"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="نوع درخواست"
                      label-width="110px"
                      cdcName="CI_RequestType"
                      v-model="oldModel.ClsFil_Info.Fil_Info.CI_RequestType"
                      ciName="CI_RequestType"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="کاربری ملک"
                      label-width="110px"
                      cdcName="CI_UsingType"
                      v-model="oldModel.ClsFil_Info.Fil_Info.CI_UsingType"
                      ciName="CI_UsingType"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="نوع سازه"
                      label-width="110px"
                      cdcName="CI_SazehType"
                      v-model="oldModel.ClsFil_Info.Fil_Info.CI_SazehType"
                      ciName="CI_SazehType"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="مرحله ساختمانی"
                      label-width="110px"
                      cdcName="CI_ConstructionStage"
                      v-model="
                        oldModel.ClsFil_Info.Fil_Info.CI_ConstructionStage
                      "
                      ciName="CI_ConstructionStage"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-custom-text
                      label="زیر بنا"
                      label-width="110px"
                      cdcName="infrastructure"
                      type="money"
                      v-model="oldModel.ClsFil_Info.Fil_Info.infrastructure"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      label="تعداد سقف"
                      label-width="110px"
                      cdcName="Floor"
                      v-model="oldModel.ClsFil_Info.Fil_Info.Floor"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="سال کاری"
                      label-width="110px"
                      cdcName="CI_Years"
                      v-model="oldModel.ClsFil_Info.Fil_Info.CI_Years"
                      ciName="CI_Years"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                </FormRow>
              </internal-section>
              <safa-datatable
                title="ارجاعات"
                v-model="oldModel.AllReferToEngineer"
                helper="allReferToEngineerColumns"
                :show-selected-checkbox="true"
                :allowMultipleSelection="true"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                min-height="100px"
                height="100%"
                max-height="100%"
                fit
                paginate
                m="r"
                ref="fromAllReferToEngineer"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-text
                    label-width="110px"
                    cdcName="newNidWorkItem"
                    label="شماره درخواست مقصد"
                    @keyup.enter="loadObj('new')"
                    v-model="newNidWorkItem"
                    :validations="['required', 'number']"
                  >
                    <template v-slot:append>
                      <q-icon
                        style="position: relative; right: 5px"
                        size="xs"
                        color="primary"
                        @click="loadObj('new')"
                        name="search"
                        class="cursor-pointer"
                        title="بازآوری اطلاعات"
                      />
                    </template>
                  </safa-text>
                </FormControl>
                <nosazi-code-input
                  label="کد نوسازی"
                  label-width="110px"
                  cdcName="CodeString"
                  v-model="newModel.ClsFil_Info.Fil_Info.CodeString"
                  m="r"
                />
              </FormRow>
              <internal-section
                :defaultShow="false"
                title="اطلاعات درخواست مقصد"
              >
                <FormRow>
                  <FormControl>
                    <safa-datepicker
                      label="تاریخ درخواست"
                      label-width="110px"
                      cdcName="EnterDate"
                      v-model="newModel.ClsFil_Info.Fil_Info.EnterDate"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="نوع درخواست"
                      label-width="110px"
                      cdcName="CI_RequestType"
                      v-model="newModel.ClsFil_Info.Fil_Info.CI_RequestType"
                      ciName="CI_RequestType"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="کاربری ملک"
                      label-width="110px"
                      cdcName="CI_UsingType"
                      v-model="newModel.ClsFil_Info.Fil_Info.CI_UsingType"
                      ciName="CI_UsingType"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="نوع سازه"
                      label-width="110px"
                      cdcName="CI_SazehType"
                      v-model="newModel.ClsFil_Info.Fil_Info.CI_SazehType"
                      ciName="CI_SazehType"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="مرحله ساختمانی"
                      label-width="110px"
                      cdcName="CI_ConstructionStage"
                      v-model="
                        newModel.ClsFil_Info.Fil_Info.CI_ConstructionStage
                      "
                      ciName="CI_ConstructionStage"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-custom-text
                      label="زیر بنا"
                      label-width="110px"
                      cdcName="infrastructure"
                      type="money"
                      v-model="newModel.ClsFil_Info.Fil_Info.infrastructure"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      label="تعداد سقف"
                      label-width="110px"
                      cdcName="Floor"
                      v-model="newModel.ClsFil_Info.Fil_Info.Floor"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="سال کاری"
                      label-width="110px"
                      cdcName="CI_Years"
                      v-model="newModel.ClsFil_Info.Fil_Info.CI_Years"
                      ciName="CI_Years"
                      domainName="engineer"
                      m="r"
                    />
                  </FormControl>
                </FormRow>
              </internal-section>
              <safa-datatable
                title="ارجاعات"
                v-model="newModel.AllReferToEngineer"
                helper="allReferToEngineerColumns"
                :show-selected-checkbox="false"
                :allowMultipleSelection="false"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                min-height="100px"
                height="100%"
                max-height="100%"
                fit
                paginate
                m="r"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <FormActions :showEditButton="false">
          <btn-default
            m="r"
            label="کپی ارجاعات از درخواست مبدا به درخواست مقصد"
            @click="copyReferences"
          />
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UAttachedEngineersFromRequest",
      title: "پیوست مهندس ها از یک درخواست به درخواست دیگر",
      formKey: "0298097f-278e-461e-a939-a65c1fcbc86e",
      main: true,

      loadObjRes: null,
      saveObjRes: null,
      spModel: 50,
      oldNidWorkItem: "",
      newNidWorkItem: "",
      oldModel: {
        ClsFil_Info: {
          Fil_Info: {
            CodeString: "",
            EnterDate: "",
            CI_RequestType: "",
            CI_UsingType: "",
            CI_SazehType: "",
            CI_ConstructionStage: "",
            infrastructure: "",
            Floor: "",
            NidProc: "00000000-0000-0000-0000-000000000000",
            CI_Years: new PersianDate().year().toString()
          }
        },
        AllReferToEngineer: []
      },
      newModel: {
        ClsFil_Info: {
          Fil_Info: {
            CodeString: "",
            EnterDate: "",
            CI_RequestType: "",
            CI_UsingType: "",
            CI_SazehType: "",
            CI_ConstructionStage: "",
            infrastructure: "",
            Floor: "",
            NidProc: null,
            CI_Years: new PersianDate().year().toString()
          }
        },
        AllReferToEngineer: []
      },
      selectedEng: []
    }
  },
  methods: {
    loadObj (val) {
      if (val === "old" && !this.oldNidWorkItem) {
        return this.showError("لطفا شماره درخواست مبدا را وارد نمایید.")
      }
      if (val === "new" && !this.newNidWorkItem) {
        return this.showError("لطفا شماره درخواست مقصد را وارد نمایید.")
      }
      this.showLoading()
      this.$services.engineers
        .getFilInfoAndReferToEngineer({
          pNidWorkItem:
            val === "old"
              ? parseInt(this.oldNidWorkItem)
              : parseInt(this.newNidWorkItem)
        })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const code =
              val === "old"
                ? this.oldNidWorkItem.toString()
                : this.newNidWorkItem.toString()
            await this.log({
              action: this.logActions.view,
              bizCode: code,
              bizCodeTitle: "NidWorkItem",
              saveDesc: `نمایش اطلاعات درخواست ${code} و مهندسین پیوست شده به آن`
            })
            const res =
              this.loadObjRes.data?.GetFilInfoAndReferToEngineerResult ?? {}
            if (!res.ClsFil_Info) return
            val === "old" ? (this.oldModel = res) : (this.newModel = res)

            if (val === "old" && this.oldModel.AllReferToEngineer) {
              this.oldModel.AllReferToEngineer =
                this.oldModel.AllReferToEngineer.map((m) => {
                  return { ...m, selected: true }
                })
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
    copyReferences () {
      if (!this.isValidForm()) return
      this.selectedEng = this.$refs.fromAllReferToEngineer.selectedRows ?? []
      if (this.selectedEng.length === 0) {
        return this.showSuccess(
          "لطفا از مهندسین مبدا یک یا چند مهندس جهت پیوستن به درخواست مقصد، انتخاب نمایید."
        )
      }
      this.showConfirm(
        "آیا از کپی ارجاعات از درخواست مبدا به درخواست مقصد اطمینان دارید؟"
      ).onOk(() => {
        this.saveObj()
      })
    },
    saveObj () {
      const selectedNidEng = this.selectedEng.map((m) => m.NIdEng)
      const selectedEngName = this.selectedEng.map((m) => {
        return (m.EngName + ' ' + m.EngFamily + '(' + m.IdentityCode + ')') ?? ''
      }).toString()
      this.$services.engineers
        .attachSelectedEngineersFromNidProcToNidProc({
          pFromNidProc: this.oldModel.ClsFil_Info.Fil_Info.NidProc,
          pToNidProc: this.newModel.ClsFil_Info.Fil_Info.NidProc,
          pNidEngList: selectedNidEng
        })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("عملیات کپی ارجاعات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.copy,
              bizCode: this.newModel.ClsFil_Info.Fil_Info.NidProc,
              bizCodeTitle: "newNidWorkItem",
              saveDesc: `عملیات پیوست مهندس/مهندسین (${selectedEngName}) از شماره درخواست مبدا (${this.oldNidWorkItem}) به شماره ارجاع (${this.newNidWorkItem}) انجام گردید.`
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
    }
  }
}
</script>
