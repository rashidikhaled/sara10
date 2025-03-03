<template>
  <safa-form
    :id="formKey"
    caption="شهرسازی- مکاتبات"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper vertical :title="title" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          m="r"
          v-model="baseNosaziCode"
          from-request
        />
      </template>
      <safa-status :result="loadLetterRes" />
      <safa-status :result="saveLetterRes" />

      <!-- :columns="columns" -->
      <fit>
        <safa-grid
        title="مکاتبات"
         helper="mokatebat"
          v-model="model.Base_Letter"
          cdcName="Base_Letter"
          :deleteRow="true"
          :m="mode"
          :defaultNewRow="defaultNewRow"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          fit
          :pageSize="20"
          paginate
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="loadObj"
          editSPId="70bce05d-9a70-4768-be7a-210294a92cec"
          editFormId="8ba3141c-b550-4bee-b479-9216cdb58460"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "مکاتبات",
      formKey: "8ba3141c-b550-4bee-b479-9216cdb58460",
      name: "LettersBySelectedRequest",
      main: true,

      loadLetterRes: null,
      saveLetterRes: null,
      isView: false,
      defaultNewRow: {
        isSelectedNode: false,
        CI_LetterType: null,
        LetterNo: "",
        LetterDate: "",
        DabirkhanehNo: "",
        DabirkhanehDate: "",
        LetterHeader: "",
        LetterSummary: "",
        LetterExportRef: "",
        Comments: ""
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
      model: {
        Base_Letter: [],
        NidLib: {},
        _NidBase: '00000000-0000-0000-0000-000000000000',
        _NidNosaziCode: '00000000-0000-0000-0000-000000000000'
      }
      // columns: [
      //   {
      //     field: "isSelectedNode",
      //     title: "",
      //     width: "45px",
      //     filterable: false,
      //     resizable: false,
      //     headerCheckboxSelection: true,
      //     lockPosition: true,
      //     pinned: "right",
      //     editor: "selection"
      //   },
      //   {
      //     field: "CI_LetterType",
      //     title: "کد نوع نامه",
      //     editor: "combo",
      //     domain: "CI_SaraM1",
      //     width: "225px"
      //   },
      //   {
      //     field: "LetterNo",
      //     title: "شماره نامه",
      //     width: "100px"
      //   },
      //   {
      //     field: "LetterDate",
      //     title: "تاريخ نامه",
      //     editor: "date",
      //     width: "100px"
      //   },
      //   {
      //     field: "DabirkhanehNo",
      //     title: "شماره ثبت دبیرخانه",
      //     width: "150px"
      //   },
      //   {
      //     field: "DabirkhanehDate",
      //     title: "تاريخ ثبت دبیرخانه",
      //     editor: "date",
      //     width: "150px"
      //   },
      //   {
      //     field: "LetterHeader",
      //     title: "عنوان نامه",
      //     width: "100px"
      //   },
      //   {
      //     field: "LetterSummary",
      //     title: "خلاصه نامه",
      //     width: "150px"
      //   },
      //   {
      //     field: "LetterExportRef",
      //     title: "مرجع صدور نامه",
      //     width: "150px"
      //   },
      //   {
      //     field: "Comments",
      //     title: "توضیحات",
      //     width: "auto"
      //   }
      // ]
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.selectedDistrict
        }
      }
    }
  },

  methods: {
    async loadObj () {
      this.isEditable = false
      try {
        this.showLoading()
        const { data } = await this.$services.SC.loadLetter(
          { pNidProc: this.selectedRequest.NidProc },
          this.config
        )
        this.loadLetterRes = this.getResponse(data)
        if (this.loadLetterRes.success) {
          const res = this.loadLetterRes?.data ?? {
            Base_Letter: [],
            NidLib: {},
            _NidBase: '00000000-0000-0000-0000-000000000000',
            _NidNosaziCode: '00000000-0000-0000-0000-000000000000'
          }
          this.model = {
            ...res,
            Base_Letter: res.Base_Letter.map(m => {
              return {
                ...m,
                isSelectedNode: false
              }
            })
          }
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات برای درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.severError()
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      try {
        this.showLoading()
        const payload = {
          pLetter: this.model,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.saveLetter(
          payload,
          this.config
        )
        this.saveLetterRes = this.getResponse(data)
        if (this.saveLetterRes.success) {
          this.showSuccess("اطلاعات با موفقیت ذخیره شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات برای درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
          })
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.severError()
      } finally {
        this.hideLoading()
      }
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  }
}
</script>
