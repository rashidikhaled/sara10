<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical>
      <safa-status :result="loadResult" />
      <safa-status :result="getFreeCapacityInfoDetailsRes" />
      <safa-status :result="deleteFreeCapacityInfoRes" />
      <form-row>
        <form-control>
          <safa-text
            v-model="NidWorkitem"
            @keyup.enter="loadObj"
            label="کد ارجاع"
            label-width="100px"
          />
        </form-control>
        <form-control>
          <btn-search label="جستجو" @click="loadObj" />
        </form-control>
      </form-row>
      <expantion-section title="آزادسازی " v-model="expansionState">
        <form-row>
          <form-control>
            <safa-text
              label="نام و نام خانوادگی"
              v-model="model.fullName"
              cdcName="fullName"
              label-width="100px"
              m="r"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ آزادسازی"
              v-model="model.ReleaseDate"
              cdcName="ReleaseDate"
              label-width="100px"
              :m="model.IsDetails ? 'r' : 'e'"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ نامه"
              v-model="model.ReleaseLetterDate"
              cdcName="ReleaseLetterDate"
              label-width="100px"
              :m="model.IsDetails ? 'r' : 'e'"
            />
          </form-control>
          <form-control>
            <safa-text
              label="شماره نامه"
              v-model="model.ReleaseLetterNo"
              cdcName="ReleaseLetterNo"
              label-width="100px"
            />
          </form-control>
          <form-control>
            <safa-text
              label="سهمیه"
              label-width="100px"
              v-model="model.CreditValue"
              cdcName="quota"
              :m="model.IsDetails ? 'e' : 'r'"
              type="number"
              :validations="['number', 'required']"
            />
          </form-control>
          <!-- <form-control class="items-center"> -->
          <safa-checkbox
            label="جزئیات"
            label-width="100px"
            v-model="model.IsDetails"
            cdcName="isDetails"
          />
          <!-- </form-control> -->
        </form-row>
        <text-template
          label="توضیحات"
          label-width="100px"
          v-model="model.QtaComments"
          cdcName="comments"
          class="col-12 q-my-sm"
          :rows="3"
          :m="model.IsDetails ? 'e' : 'r'"
        />
        <div class="row flex justify-end">
          <btn-save @click="saveObj" />
        </div>
      </expantion-section>
      <SideBySideGridTemplate
        :show="FreeCapacityDetails"
        @hide="FreeCapacityDetails = null"
      >
        <template #before>
          <!-- helper="refFreeCapacityInfo" -->
          <safa-datatable2
            v-model="getFreeCapacityInfoResult.RefFreeCapacityInfo"
            :m="mode"
            fit
            :height="$q.screen.lt.xl ? '420px' : '720px'"
            :lazyLoad="false"
            :columns="columns"
            cdcName="RefFreeCapacityInfo"
            ref="RefFreeCapacityInfo"
            :allowMultipleSelection="false"
            :actions="[]"
          > <!-- تاریخ قابل ویرایش نیست -->
            <template #cell-freeCapacityDetails="{ row }">
              <q-badge
                class="no-wrap justify-center cursor-pointer"
                @click="onOpenFreeCapacityInfoDetails(row)"
              >
                +
              </q-badge>
            </template>
            <template #cell-freeCapacityAccept="{ row }">
              <q-badge
                class="no-wrap justify-center cursor-pointer"
                @click="freeCapacityAccept(row)"
              >
                آزادسازی
              </q-badge>
            </template>
          </safa-datatable2>
        </template>
        <template #after>
          <!-- helper="freeCapacityInfoDetails" -->
          <safa-datatable
            title="جزئیات"
            :columns="freeCapacityInfoDetails"
            v-model="FreeCapacityDetails"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            @deleteClick="deleteCapacity"
          />
        </template>
      </SideBySideGridTemplate>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { controlValidation } from "ui-core"

export default {
  mixins: [baseFormMixin, controlValidation],
  data () {
    return {
      title: "آزادسازی ظرفیت",
      formKey: "320C4872-8B3B-4396-9A6E-2FB49CCAE7B5",
      name: "UFreeCapacity",
      main: true,
      selectedRow: null,
      sidebarCompatible: true,
      model: {
        fullName: "",
        ReleaseDate: "",
        ReleaseLetterDate: "",
        ReleaseLetterNo: "",
        IsDetails: false,
        CreditValue: 0,
        infrastructure: 0,
        QtaComments: ""
      },
      expansionState: false,
      isView: false,
      NidWorkitem: 0,
      getFreeCapacityInfoResult: {
        RefFreeCapacityInfo: []
      },
      loadResult: null,
      columns: [
        {
          field: "freeCapacityDetails",
          title: "+"
        },
        {
          field: "freeCapacityAccept",
          title: "آزادسازی"
        },
        {
          field: "IdentityCode",
          title: "کد عضویت"
        },
        {
          field: "EngName",
          title: "نام"
        },
        {
          field: "EngFamily",
          title: "نام خانوادگی"
        },

        {
          field: "IsRelease",
          title: "آزاد شده",
          editor: "checkbox"
        },

        {
          field: "ReleaseDate",
          title: "تاریخ آزادسازی"
        },

        {
          field: "ReleaseLetterNo",
          title: "شماره نامه"
        },

        {
          field: "ReleaseLetterDate",
          title: "تاریخ نامه"
        },

        {
          field: "Activity",
          title: "فعالیت"
        },

        {
          field: "Ablility",
          title: "صلاحیت"
        },

        {
          field: "RequestType",
          title: " نوع درخواست"
        },

        {
          field: "infrastructure",
          title: "زیربنا",
          cell: "grid-money-format"
        },
        {
          field: "SaghfMojaz",
          title: "تعداد سقف"
        }
      ],
      freeCapacityInfoDetails: [
        {
          field: "delete",
          title: "حذف",
          editor: "action"
        },
        {
          field: "QuotaType",
          title: "نوع سهمیه"
        },
        {
          field: "CI_Years",
          title: "سال کاری"
        },
        {
          field: "CreditValue",
          title: "مفدار سهمیه"
        },
        {
          field: "ConfirmDate",
          title: "تاریخ تایید"
        },

        {
          field: "LetterNo",
          title: "شماره نامه"
        },

        {
          field: "QtaComments",
          title: " توضیحات"
        }
      ],
      getFreeCapacityInfoDetailsRes: null,
      FreeCapacityDetails: [],
      deleteFreeCapacityInfoRes: null
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.NidWorkitem = this.selectedRequest.NidWorkItem
      // this.NidWorkitem = "321436"
      this.loadObj()
    }
  },

  methods: {
    loadObj () {
      if (this.NidWorkitem) {
        this.showLoading()
        let payLoad = {
          pRequest: {
            NidWorkitem: this.NidWorkitem
            // NidWorkitem: "321436"
          }
        }
        this.$services.engineers
          .getFreeCapacityInfo(payLoad)
          .then(async (response) => {
            this.loadResult = this.getResponse(response.data)
            if (this.loadResult.success) {
              this.getFreeCapacityInfoResult.RefFreeCapacityInfo =
                this.loadResult.data.GetFreeCapacityInfoResult.RefFreeCapacityInfo
              await this.log({
                action: this.logActions.view,
                bizCode: this.NidWorkitem.toString(),
                bizCodeTitle: "کد ارجاع"
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
    },
    // freeCapacityAccept ({ dataItem }) {
    //   this.expansionState = true
    //   this.selectedRow = { ...dataItem }
    //   const fullName = `${dataItem.EngName} ${dataItem.EngFamily}`
    //   this.model = { ...dataItem, fullName: fullName }
    //   this.model.CreditValue = this.model.ReferedMeter
    // },
    freeCapacityAccept (dataItem) {
      this.expansionState = true
      this.selectedRow = { ...dataItem }
      const fullName = `${dataItem.EngName} ${dataItem.EngFamily}`
      this.model = { ...dataItem, fullName: fullName }
      this.model.CreditValue = this.model.ReferedMeter
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.model.IsDetails = false
      this.model.CreditValue = parseInt(this.model.CreditValue)
      if (this.model.CreditValue > this.model.infrastructure) {
        this.showError("سهمیه وارد شده صحیح نمی باشد.")
        return
      }
      this.showLoading()
      let data = {
        pRequest: this.model,
        pNidUser: this.currentUser.NidUser,
        pUserName: this.getUserDisplayName()
      }
      this.$services.engineers
        .freeCapacity(data)
        .then(async (response) => {
          const res = this.getResponse(response.data)
          if (res.success) {
            this.expansionState = false
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.NidWorkitem.toString(),
              bizCodeTitle: "کد ارجاع"
            })
            this.loadObj()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
          this.hideLoading()
        })
    },
    getFreeCapacityInfoDetails (row) {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidRefer: row.NIdRef
        }
      }
      this.$services.engineers
        .getFreeCapacityInfoDetails(payLoad)
        .then(async (response) => {
          this.getFreeCapacityInfoDetailsRes = this.getResponse(response.data)
          if (this.getFreeCapacityInfoDetailsRes.success) {
            this.FreeCapacityDetails =
              this.getFreeCapacityInfoDetailsRes.data.GetFreeCapacityInfoDetailsResult.FreeCapacityDetails
            await this.log({
              action: this.logActions.view,
              bizCode: row.NIdRef,
              bizCodeTitle: "NidRefer"
            })
            // }
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
    onOpenFreeCapacityInfoDetails (row) {
      this.getFreeCapacityInfoDetails(row)
    },
    deleteCapacity ({ dataItem }) {
      this.showConfirm("آیا برای حذف اطمینان دارید؟").onOk(() => {
        this.deleteFreeCapacityInfo({ dataItem })
      })
    },
    deleteFreeCapacityInfo (detailsCapacityInfo) {
      this.showLoading()
      let payLoad = {
        pRequest: {
          ...detailsCapacityInfo.dataItem
        }
      }
      this.$services.engineers
        .deleteFreeCapacityInfo(payLoad)
        .then(async (response) => {
          this.deleteFreeCapacityInfoRes = this.getResponse(response.data)
          if (this.deleteFreeCapacityInfoRes.success) {
            this.showSuccess("حذف با موفقیت انجام شد")
            this.loadObj()
            this.FreeCapacityDetails = []
            await this.log({
              action: this.logActions.delete,
              bizCode: "",
              bizCodeTitle: ""
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
    acceptExitFreeCapacity ({ e, field, dataItem }) {
      this.showConfirm("آیا برای خروج از آزاد سازی اطمینان دارید؟").onOk(() => {
        this.exitFreeCapacity({ e, field, dataItem })
      })
    },
    exitFreeCapacity ({ e, field, dataItem }) {
      this.showLoading()
      let payload = { pRequest: dataItem }
      this.$services.engineers
        .exitOfCapacity(payload)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.NidWorkitem.toString(),
              bizCodeTitle: "کد ارجاع"
            })
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.loadObj()
          }
        })
        .catch((e) => {
          console.error(e)
          this.hideLoading()
          this.serverError()
        })
    }
  },
  watch: {
    model: {
      handler () {
        this.$nextTick(() => {
          let index =
            this.getFreeCapacityInfoResult.RefFreeCapacityInfo.findIndex(
              (x) => x.uniqueID === this.selectedRow.uniqueID
            )
          if (this.getFreeCapacityInfoResult.RefFreeCapacityInfo[index]) {
            this.getFreeCapacityInfoResult.RefFreeCapacityInfo[index] =
              this.model
            this.$refs.RefFreeCapacityInfo.initialGridRows()
          }
        })
      },
      deep: true
    }
  }
}
</script>
