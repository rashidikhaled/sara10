<template>
  <safa-form
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="getCanSecondConfirmListRes" />
        <safa-status :result="doSecondConfirmationRes" />
      </template>
      <fit>
        <safa-grid
          title=""
          v-model="canSecondConfirmList"
          cdcName="ObjectSurveyList"
          :columns="searchListColumns"
          :pageSize="100"
          @row:dblclick="rowDblclick"
          paginate
          ref="objectSurvey"
        >
          <template v-slot:header>
            <div class="flex items-center q-gutter-x-sm q-mr-xs">
              <nosazi-code-input
                v-model="baseNosaziCode"
                @enter="loadObj"
                cdcName="baseNosaziCode"
                label-width="90px"
                enabled="1-1-1-1-0-0-0"
              />
              <q-icon
                style="font-size: 20px"
                @click="loadObj"
                color="primary"
                name="find_replace"
                title="جستجو براساس کدنوسازی"
                class="cursor-pointer"
              />
              <q-separator vertical />
            </div>
          </template>
        </safa-grid>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تاییدات دوم",
      formKey: "C7F245F5-A261-4158-8EFE-E4C3E114653C",
      name: "USecondConfirmations",
      main: true,
      sidebarCompatible: true,

      // #region variables
      isView: false,
      searchListColumns: [
        {
          field: "",
          title: "تایید دوم",
          editor: "action",
          width: "100px",
          btnColor: "primary",
          btnIcon: "check",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.secondConfirmHandler(params)
        },
        {
          title: "کد نوسازی",
          field: "NosaziCodestr",
          width: "120px"
        },
        {
          title: "تاریخ بررسی",
          field: "RequiredRevisitDate",
          width: "100px",
          editor: "date"
        },
        {
          title: "ساعت بررسی",
          field: "RequiredRevisitTime",
          width: "100px"
        },
        {
          title: "نام ممیز",
          field: "SName",
          width: "120px"
        },
        {
          title: "نام خانوادگی ممیز",
          field: "SFamily",
          width: "120px"
        },
        {
          title: "تاریخ ارجاع",
          field: "SurveyorAssignDate",
          width: "100px",
          editor: "date"
        },
        {
          title: "ساعت ارجاع",
          field: "SurveyorAssignTime",
          width: "100px"
        },
        {
          title: "کاربر ارجاع دهنده",
          field: "NameUserAssignToSurveyor",
          width: "150px"
        },
        {
          title: "تاریخ دانلود",
          field: "SurveyorDownloadDate",
          width: "100px",
          editor: "date"
        },
        {
          title: "ساعت دانلود",
          field: "SurveyorDownloadTime",
          width: "100px"
        },
        {
          title: "تاریخ آپلود",
          field: "SurveyorUploadDate",
          width: "100px",
          editor: "date"
        },
        {
          title: "ساعت آپلود",
          fild: "SurveyorUploadTime",
          width: "100px"
        }
      ],
      canSecondConfirmList: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // #region services
      getCanSecondConfirmListRes: null,
      doSecondConfirmationRes: null
    }
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SO.getCanSecondConfirmList({
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pFromRow: 0,
          pToRow: 100
        })
        this.getCanSecondConfirmListRes = this.getResponse(data)
        if (this.getCanSecondConfirmListRes.success) {
          this.canSecondConfirmList =
            this.getCanSecondConfirmListRes.data?.CanSecondConfirm_List ?? []
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "NosaziCode",
              nosaziCode: strNosaziCode,
              saveDesc: `لیست تاییدات دوم برای کدنوسازی ${strNosaziCode} نمایش داده شد.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    secondConfirmHandler (params) {
      this.showConfirm(
        `آیا از تایید دوم کد ${params.NosaziCodestr} اطمینان دارید؟`
      ).onOk(async () => {
        try {
          this.showLoading()
          const { data } = await this.$services.SO.doSecondConfirmation({
            pNidProc: params.NidProc,
            pNidUser: this.getNidUser(),
            pUserName: this.currentUser.username
          })
          this.doSecondConfirmationRes = this.getResponse(data)
          if (this.doSecondConfirmationRes.success) {
            this.canSecondConfirmList =
              this.doSecondConfirmationRes.data?.CanSecondConfirm_List ?? []
            await this.log({
              action: this.logActions.confirm,
              bizCode: params.NosaziCodestr,
              bizCodeTitle: "NosaziCode",
              nosaziCode: params.NosaziCodestr,
              saveDesc: `تایید دوم برای کدنوسازی ${params.NosaziCodestr} انجام گردید.`
            })
            await this.loadObj()
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      })
    },
    rowDblclick ({ data: tmpItem }) {
      const params = {
        NosaziCode_House: `${tmpItem.District}-${tmpItem.Region}-${tmpItem.Block}-${tmpItem.House}-0-0-0`,
        NidBase: tmpItem.NidBase,
        NidProc: tmpItem.NidProc,
        IsLoadedFromMenu: false,
        ObjType: tmpItem.EumNosaziCodeObjType,
        IsConfirmations: true
      }

      if (tmpItem.EumRequiredRevisit) {
        params.EumRevisit = tmpItem.EumRequiredRevisit
      }
      this.$window.open({
        component: "USearchUParvandeh",
        title: `جزئیات پرونده (${tmpItem.House}-${tmpItem.Block}-${tmpItem.Region}-${tmpItem.District})`,
        keepAlive: false,
        padding: false,
        width: '900px',
        height: '600px',
        componentProps: {
          formKey: this.formKey,
          title: this.title,
          name: this.name,
          params: { ...params }
        }
      })
    }
  }
}
</script>
