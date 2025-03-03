<template>
   <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper title="نحوه تفکیک عرصه">
      <fit>
        <div class="row q-col-gutter-sm">
          <safa-custom-text
            type="decimal"
            label="مساحت طبق سند"
            v-model="requestResult.data.Base_HouseInfo.DocArea"
            m="r"
            class="col-3"
          />
          <safa-custom-text
            type="decimal"
            label="مساحت طبق سند"
            v-model="requestResult.data.Base_HouseInfo.CurrentArea"
            m="r"
            class="col-3"
          />
          <safa-custom-text
            type="decimal"
            label="مساحت طبق سند"
            v-model="requestResult.data.Base_HouseInfo.AreaAfterEdit"
            m="r"
            class="col-3"
          />
          <safa-grid
            v-model="requestResult.data.Base_Edge"
            ref="technical-grid"
            name="grid"
            helper="shahrsazi.jahateArbaeArse"
            :allowMultipleSelection="false"
            :selectable="true"
            :loadingAnimation="false"
            :allow-new-row="false"
            :deleteRow="false"
            :allowCopy="false"
            :allowRemoveRow="false"
            title="جهات اربعه"
          ></safa-grid>
          <safa-datatable
            v-model="requestResult.data.Sh_TafkikPieces"
            ref="technical-grid"
            name="grid"
            helper="shahrsazi.howToTafkik"
            :m="mode"
            :allowMultipleSelection="false"
            :selectable="true"
            :loadingAnimation="false"
            :deleteRow="false"
            :allowCopy="false"
            :allowRemoveRow="false"
            title="نحوه تفکیک"
          ></safa-datatable>
        </div>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable=true"
          @cancel="isEditable=false"
          @save="saveData"
          editButtonTitle="تفکیک"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
// import saveOddmentPrequest from 'src/models/saveOddmentPrequest.js'
import saveDataPrequest from './models/saveDataPrequest.js'
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions'

export default {
  route: '/parvande/how-to-seperate-arse',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'شهرسازی- نحوه تفکیک عرصه',
      formKey: '9243c1a2-8232-4077-962a-faeb241504c2',
      name: 'UHowToSeperateArse',
      main: true,
      workflowCompatible: true,
      loadResult: {},
      isGoToEdit: false,
      editMode: 'r',
      savePrequest: {
        pTechnicalCommittee: {
          ErrorResult: {
            BizErrors: null,
            Requirements: null
          },
          NidProc: '10ba38db-dba4-40a2-9079-4e7b4bc592b9',
          Sh_TechnicalCommittee: {
            Sh_TechnicalCommittee: {
              CI_TechnicalCommittee: '1',
              CI_TechnicalCommitteeMainUsing: '1',
              CI_TechnicalCommitteeSubUsing: '1',
              Comment: 'Test Description',
              NidProc: '00000000-0000-0000-0000-000000000000',
              NidTechnicalCommittee: '00000000-0000-0000-0000-000000000000',
              VoteDate: '1398/12/20',
              VoteNo: '1'
            }
          }
        }
      },
      items: [],
      loadDataPrequest: {
        pNidProc: '269df9f0-5348-4466-903f-2cb17025ab8f'
      },
      selectedNosaziCode: '0-0-0-0-0-0-0',
      result: null,
      isDeleteDisabled: true,
      formActionEditMode: 'r',
      requestResult: {
        data: {
          Commission_Order: [],
          Base_HouseInfo: {
            DocArea: 0,
            CurrentArea: 0,
            AreaAfterEdit: 0
          }
        }
      }
    }
  },
  components: {
    FormActions
  },
  mounted () {
    this.isSelectedRequest()

    if (this.selectedRequest) {
      this.loadData()
    }
  },
  methods: {
    saveData () {
      // this.showConfirm('آیا از تفکیک کد نوسازی اطمینان دارید؟')
      //   .onOk(() => {
      this.showLoading()

      saveDataPrequest.pTafkikPieces.Sh_TafkikPieces = this.requestResult.data.Sh_TafkikPieces
      saveDataPrequest.pTafkikPieces.Sh_TafkikPieces = this.normalizeTafkikPiecesRows().cleanRows()
      saveDataPrequest.pUser.Username = this.getUserDisplayName()
      saveDataPrequest.pUser.Password = this.currentUser.Password

      this.$services.SC.saveTafkikPieces(saveDataPrequest, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async response => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.showSuccess('تفکیک با موفقیت انجام شد')

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })

            this.isEditable = false

            this.loadData()
          }
        })
        .catch(ex => {
          this.serverError()
        }).finally(
          this.hideLoading()
        )
    },
    normalizeTafkikPiecesRows () {
      return saveDataPrequest.pTafkikPieces.Sh_TafkikPieces.map(m => {
        return {
          ...m,
          CI_DocType: m.CI_DocType || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          DocExportDate: m.DocExportDate || '',
          PieceArea: m.PieceArea || 0,
          PieceBar: m.PieceBar || 0,
          PieceNo: m.PieceNo || 0,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidTafkik: m.NidTafkik || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    loadData () {
      const checkResult = this.isSelectedRequest()

      this.loadDataPrequest.pNidProc = this.selectedRequest.NidProc

      if (checkResult) {
        this.showLoading()

        this.$services.SC.loadTafkikPieces(this.loadDataPrequest, {
          config: {
            District: this.selectedDistrict
          }
        })
          .then(async response => {
            this.requestResult = this.getResponse(response.data)

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })

            this.hideLoading()

            // console.log('/////this.requestResult', this.requestResult)
          })
          .catch(ex => {
            this.serverError()
          }).finally(
            this.hideLoading()
          )
      }
    }
  }
}
</script>
