<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      title="بدهکاری بستانکاری"
      vertical
      :padding="false"
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          actions
          from-request
          @fetched="fetched"
        />
      </template>
      <safa-datatable
        ref="technical-grid"
        v-model="requestResult.data.Universal_OddmentAcount"
        :loadingAnimation="false"
        m='ne'
        :selectable="true"
        helper="shahrsazi.bedehkariBestankari"
        name="grid"
        height="100%"
        maxHeight="100%"
        minHeight="0"
        @selectedChange="selectedChange"
        class="fit"
        margin="0"
        :bordered="false"
        title="بدهکاری بستانکاری"
      />
      <template v-slot:footer>
        <FormActions
          :m="mode"
          :showEditButton="false"
          :showNewButton="true"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @newInfo="isEditable = true"
          @save="saveData"
        >
          <template v-slot:after>

            <btn-delete
              :disabled="isDeleteDisabled"
              label="حذف"
              @click="deleteUniversalOddmentAcount"
              spId="e48746ee-aae9-4cd9-8308-7089dbc2398f"
              spCaption="حذف"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>

import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/parvande/bedehkari-bestankari',
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'شهرسازی- بدهکاری / بستانکاری',
      formKey: '7b66f30d-664c-4bf6-a34d-a793985ca6bd',
      name: 'UBedehkariBestankari',
      main: true,
      sidebarCompatible: true,
      pNidNosaziCode: null,
      loadPrequest: {
        pNidProc: '10ba38db-dba4-40a2-9079-4e7b4bc592b9'
      },
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
      deletePrequest: {
        pNidUniversalOddment: '00000000-0000-0000-0000-000000000000'
      },
      items: [],
      loadGridDataPrequest: {
        pNidNosaziCode: null,
        pUser: {}
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
      selectedNosaziCode: '0-0-0-0-0-0-0',
      result: null,
      isDeleteDisabled: true,
      formActionEditMode: 'r',
      requestResult: {
        data: {
          Universal_OddmentAcount: []
        }
      }
    }
  },
  components: {},
  mounted () {
    // if (this.requestResult.data.Universal_OddmentAcount.length === 0) {
    //   this.showError('لطفا یک کد نوسازی را در کادر بالای صفحه جستجو کنید')
    // }
  },
  methods: {
    deleteUniversalOddmentAcount () {
      this.showConfirm('آیا از حذف ردیف انتخاب شده اطمینان دارید؟').onOk(() => {
        this.showLoading()
        this.$services.SC.deleteUniversalOddmentAcount(this.deletePrequest, {
          config: {
            District: this.baseNosaziCode.District
          }
        })
          .then(async response => {
            this.$q.loading.hide()
            const deleteResult = this.getResponse(response.data)
            if (!deleteResult.hasError) {
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.delete,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })
              this.showSuccess('عملیات با موفقیت انجام شد')
              this.loadGridData()
              this.isDeleteDisabled = true
            }
          })
          .catch(ex => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    normalizeRow () {
      return this.requestResult.data.Universal_OddmentAcount.map(m => {
        return {
          ...m,
          AllottedPrice: m.AllottedPrice || 0,
          CI_DutyYear: m.CI_DutyYear || '1390',
          CreateDate: m.CreateDate || null,
          CreateTime: m.CreateTime || null,
          EumObjOnPrice: m.EumObjOnPrice || '1',
          EumOddmentType: m.EumOddmentType || '1',
          NationalCode: m.NationalCode || '',
          NidNosaziCode:
            m.NidNosaziCode || '00000000-0000-0000-0000-000000000000',
          NidUniversalOddment:
            m.NidUniversalOddment || '00000000-0000-0000-0000-000000000000',
          NidUser: m.NidUser || null,
          NidWorkItem: m.NidWorkItem || 5,
          OwnerName: m.OwnerName || '6',
          Price: m.Price || 0,
          UserName: m.UserName || null
        }
      })
    },
    saveData () {
      if (!this.pNidNosaziCode) {
        this.showError('کلید اصلی وجود ندارد')
        return
      }
      let universalOddmentAcount = this.requestResult.data
        .Universal_OddmentAcount
      universalOddmentAcount.forEach(itm => {
        if (itm.NidNosaziCode === '00000000-0000-0000-0000-000000000000') {
          itm.NidNosaziCode = this.pNidNosaziCode
        }
        if (itm.NidUser === '00000000-0000-0000-0000-000000000000') {
          itm.NidUser = this.getNidUser()
        }
      })
      let data = {
        pUniversal_OddmentAcount: {
          Universal_OddmentAcount: universalOddmentAcount,
          _NidNosaziCode: this.loadGridDataPrequest.pNidNosaziCode,
          _User: {
            UserGuid: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        },
        pUser: {
          UserGuid: this.getNidUser(),
          UserName: this.getUserDisplayName()
        }
      }
      this.showSending()

      this.$services.SC.saveUniversalOddmentAcount(data)
        .then(async response => {
          this.hideSending()
          this.requestResult = this.getResponse(response.data)
          if (!this.requestResult.hasError) {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
            this.isEditable = false
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.loadGridData()
          }
        })
        .catch(ex => {
          this.hideSending()
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    },

    loadGridData () {
      if (!this.loadGridDataPrequest.pNidNosaziCode) {
        this.showError('کلید اطلاعات معتبر نمیباشد')
        return
      }

      this.showLoading()
      let data = {
        pNidNosaziCode: this.loadGridDataPrequest.pNidNosaziCode,
        pUser: {
          UserGuid: this.getNidUser(),
          UserName: this.getUserDisplayName()
        }
      }
      this.$services.SC.getUniversalOddmentAcount(data)
        .then(async response => {
          this.requestResult = this.getResponse(response.data)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })
        })
        .catch(ex => {
          this.serverError()
        })
        .finally(this.hideLoading())
    },
    fetched (e) {
      this.loadGridDataPrequest.pNidNosaziCode = e.ArchiveWrapper.NidNosaziCode
      this.pNidNosaziCode = e.ArchiveWrapper.NidNosaziCode
      this.loadGridData()
    },
    selectedChange (e) {
      this.deletePrequest.pNidUniversalOddment = e.dataItem.NidUniversalOddment
      this.isDeleteDisabled = false
    }
  }

}
</script>
