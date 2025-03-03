<template>
  <safa-form
    appId="543f8a9b-107f-66fc-3367-7747df03a744"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getEngineerInfoByNidWorkItemRes" />
        <safa-status :result="getEngineerMessagesRes" />
        <safa-status :result="saveEngineerMessagesRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره درخواست"
              label-width="80px"
              v-model="dataContext.NidWorkItem"
              m="e"
              type="number"
              validations="required"
              @keypress.enter="btnSearchClick"
            />
          </FormControl>
          <FormControl>
            <btn-search @click="btnSearchClick" label="جستجو" />
          </FormControl>
        </FormRow>
        <q-separator class="q-mb-sm" />
        <FormRow :xs="1" :md="2" :lg="2" :xl="2" class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نام مالک :"
              v-model="dataContext.OwnerName"
              label-width="65px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام خانوادگی مالک :"
              v-model="dataContext.OwnerFamily"
              label-width="95px"
              m="r"
            />
          </FormControl>
          <FormControl class-name="col-md-12">
            <safa-text
              label="آدرس مالک :"
              v-model="dataContext.Address"
              label-width="65px"
              m="r"
            />
          </FormControl>
        </FormRow>

        <q-separator class="q-mb-sm" />

        <div class="fit q-mb-sm">
          <safa-datatable
            v-model="dataContext.EngsList"
            helper="sendMessageEngsList"
            ref="EngsList"
            title="لیست مهندسین"
            min-height="150px"
            height="100%"
            max-height="100%"
            fit
            m="r"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            :add-row="false"
            :delete-row="false"
            :allow-copy="false"
            @row-click="grdEngsSelectionChanged"
          />
        </div>

        <q-separator class="q-mb-sm" />

        <div class="q-mb-sm">
          <text-template
            v-model="dataContext.Message"
            label="توضیحات و نظر کارشناس :"
            type="textarea"
            label-width="130px"
            class="full-width"
            cdcName="txtMessage"
            m="e"
            :formKey="formKey"
            :rows="6"
          />
        </div>

        <q-separator class="q-mb-sm" />

        <div class="fit">
          <safa-datatable
            v-model="dataContext.EngMessages"
            helper="sendMessageEngMessages"
            ref="EngMessages"
            title="لیست پیام ها"
            min-height="150px"
            height="100%"
            max-height="100%"
            fit
            m="r"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            :add-row="false"
            :delete-row="false"
            :allow-copy="false"
          />
        </div>
      </fit>

      <template v-slot:footer>
        <form-actions :showEditButton="false">
          <template v-slot:after>
            <btn-default label="ذخیره پیام" @click="btnSaveClick" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

// utils
import { uid } from "quasar"
import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      name: "USendMessageToEngineer",
      title: "ارسال پیام به مهندسین",
      formKey: "db56a545-11d7-4a1f-b0c6-9d1a81f4d4bb",
      main: true,

      // Context
      dataContext: {
        EngsList: [],
        EngMessages: [],
        Message: "",
        NidWorkItem: "",

        OwnerName: "",
        OwnerFamily: "",
        Address: ""
      },

      // Resposnes
      getEngineerInfoByNidWorkItemRes: null,
      getEngineerMessagesRes: null,
      saveEngineerMessagesRes: null
    }
  },

  methods: {
    btnSearchClick () {
      if (!this.isValidForm()) return

      this.searchEngineer(this.dataContext.NidWorkItem)
    },

    searchEngineer (pNidWorkitem) {
      this.showLoading()
      const payload = {
        pNidWorkitem
      }

      this.$services.eng
        .getEngineerInfoByNidWorkItem(payload)
        .then(({ data }) => {
          this.getEngineerInfoByNidWorkItemRes = this.getResponse(data)

          if (this.getEngineerInfoByNidWorkItemRes.success) {
            this.dataContext.OwnerName =
              this.getEngineerInfoByNidWorkItemRes.data
                ?.GetEngineerInfoByNidWorkItemResult?.ClsEngineerInfo?.Fil_Owner
                ?.Name || ""
            this.dataContext.OwnerFamily =
              this.getEngineerInfoByNidWorkItemRes.data
                ?.GetEngineerInfoByNidWorkItemResult?.ClsEngineerInfo?.Fil_Owner
                ?.Family || ""
            this.dataContext.Address =
              this.getEngineerInfoByNidWorkItemRes.data
                ?.GetEngineerInfoByNidWorkItemResult?.ClsEngineerInfo?.Fil_Owner
                ?.Address || ""
            this.dataContext.EngsList =
              this.getEngineerInfoByNidWorkItemRes.data.GetEngineerInfoByNidWorkItemResult.ClsEngineerInfo.EngModelList.map(
                (e) => {
                  return {
                    ...e,
                    IdentityCode: e.Eng_Info.IdentityCode,
                    EngName: e.Eng_Info.EngName,
                    EngFamily: e.Eng_Info.EngFamily,
                    CI_Ability: e.Ref_Info.CI_Ability,
                    CI_StudyField: e.Qta_Info.CI_StudyField
                  }
                }
              )

            if (
              (this.getEngineerInfoByNidWorkItemRes.data
                ?.GetEngineerInfoByNidWorkItemResult?.ClsEngineerInfo
                ?.EngModelList?.length || 0) === 1
            ) {
              const engMessage =
                this.getEngineerInfoByNidWorkItemRes.data.GetEngineerInfoByNidWorkItemResult.ClsEngineerInfo.EngModelList.find(
                  Boolean
                )

              this.getEngineerMessages(
                engMessage.Ref_Info.NIdFil,
                engMessage.NIdEng
              )
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    btnSaveClick () {
      if (!this.dataContext.Message) {
        this.showError("ابتدا متن مورد نظر را وارد نمایید.")
        return false
      }

      const tmpItem = this.$refs.EngsList.selectedRows?.[0] || {}
      if (
        !tmpItem.NIdEng ||
        tmpItem.NIdEng === "00000000-0000-0000-0000-000000000000"
      ) {
        return false
      }

      this.showLoading()

      const payload = {
        pEngineerMessage: {
          NidEngineerMessage: uid(),
          NIdFil: tmpItem.Ref_Info.NIdFil,
          NidEng: tmpItem?.NIdEng || "00000000-0000-0000-0000-000000000000",
          Message: this.dataContext.Message,
          CreateDate: currentDate(),
          CreateTime: currentTime(),
          NidUser: this.getNidUser(),
          UserName: this.getUserDisplayName(),
          IsSeen: false,
          SeenState: "خوانده نشده",
          FileData: ""
        }
      }

      this.$services.eng
        .saveEngineerMessages(payload)
        .then(({ data }) => {
          this.saveEngineerMessagesRes = this.getResponse(data)

          if (this.saveEngineerMessagesRes.success) {
            this.getEngineerMessages(
              tmpItem?.Ref_Info?.NIdFil ||
                "00000000-0000-0000-0000-000000000000",
              tmpItem?.NIdEng || "00000000-0000-0000-0000-000000000000"
            )
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    grdEngsSelectionChanged (tmpItem) {
      this.getEngineerMessages(
        tmpItem?.Ref_Info?.NIdFil || "00000000-0000-0000-0000-000000000000",
        tmpItem?.NIdEng || "00000000-0000-0000-0000-000000000000"
      )
    },

    getEngineerMessages (pNIdFil, pNidEng) {
      this.showLoading()

      const payload = {
        pNIdFil,
        pNidEng
      }

      this.$services.eng
        .getEngineerMessages(payload)
        .then(({ data }) => {
          this.getEngineerMessagesRes = this.getResponse(data)
          if (this.getEngineerMessagesRes.success) {
            this.dataContext.EngMessages =
              this.getEngineerMessagesRes.data.GetEngineerMessagesResult
                ?.ClsEngineerInfo?.EngineerMessages || []
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
