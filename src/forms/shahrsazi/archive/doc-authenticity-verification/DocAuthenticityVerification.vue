<template>

<safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="تایید اصالت اسناد"
  >
  <form-wrapper :padding="false" title="اطلاعات پرونده" vertical>
    <safa-status :result="result" />
     <internal-section class="q-ma-md">
       <form-row :xs="1" :sm="2" :md="2" :lg="4" :xl="4">
       <form-control>
        <safa-combo
          label="شناسه استان"
          label-shrink
          v-model="dataModel.provinceId"
          :options="provinceList"
          sourceType="local"
          @input="getUnitCodesForAsnad($event)"
        />
        </form-control>
        <form-control>
        <safa-combo
          label="شناسه واحد ثبتی"
          label-shrink
          v-model="dataModel.unitId"
          :options="unitCodeList"
          sourceType="local"
        />
        </form-control>
        <form-control>
        <safa-text
        label="شماره اصلی"
        label-shrink
        v-model="dataModel.basic"
      />
      </form-control>
      <form-control>
       <safa-text
        label="شماره فرعی"
        label-shrink
        v-model="dataModel.secondary"
      />
      </form-control>
       </form-row>
      <div class="q-my-sm">

        <form-row :xs="1" :sm="2" :md="2" :lg="4" :xl="4">
          <form-control>
          <safa-text
            label="شماره دفتر املاک الکترونیکی"
            label-shrink
            v-model="dataModel.electronicEstateNoteNo"
          />
        </form-control>
          <form-control>
           <safa-text
            label="شناسه / کد ملی مالک"
            label-shrink
            v-model="dataModel.ownerNationalityCode"
          />
          </form-control>
          <form-control>
            <safa-text
            label="شماره دفتر (اختیاری) - مخصوص استاد غیر تک برگی"
            label-shrink
            v-model="dataModel.notebookNo"
          />
          </form-control>
        <form-control>
          <safa-text
        label="شماره صفحه (اختیاری) - مخصوص اسناد غیر تک برگی"
        label-shrink
        v-model="dataModel.pageNo"
      />
        </form-control>
        </form-row>

      </div>

      </internal-section >
      <internal-section class="q-ma-md" v-if="showDetails">
          <div class="q-mb-sm">
           <form-row :xs="1" :sm="2" :md="2" :lg="4">
            <form-control>
            <safa-checkbox
              label="دارا بودن/ نبودن سایرمحدودیتها"
              label-shrink
              v-model="response.HasOtherRestriction"
            />
            </form-control>
            <form-control>
            <safa-checkbox
              label="دارای رهن است یا خیر"
              label-shrink
              v-model="response.HasRahn"
            />
            </form-control>
            <form-control>
            <safa-checkbox
              label="دارای بازداشتی است یا خیر"
              label-shrink
              v-model="response.IsArrested"
            />
            </form-control>
            </form-row>
        </div>
        <form-row :xs="1" :sm="2" :md="2" :lg="4" :xl="4">
          <form-control>
            <safa-text
              label="نام و نام خانوادگی مالک"
              label-shrink
              v-model="fullName"
            />
            </form-control>
            <form-control>
            <safa-text
              label="مساحت ملک"
              label-shrink
              v-model="response.Area"
            />
            </form-control>
            <form-control>
            <safa-text
              label="نوع قطعه ملک مرتبط"
              label-shrink
              v-model="response.EPieceTypeTitle"
            />
            </form-control>
            <form-control>
            <safa-text
              label="وضعیت خاص ملک مرتبط"
              label-shrink
              v-model="response.EstateTypeTitle"
            />
            </form-control>

        </form-row>
          <div class="q-my-sm">
            <form-row :xs="1" :sm="2" :md="2" :lg="4" :xl="4">
              <form-control>
            <safa-text
              label="بخش"
              label-shrink
              v-model="response.Section"
            />
            </form-control>
            <form-control>
            <safa-text
              label="ناحیه"
              label-shrink
              v-model="response.SubSection"
            />
            </form-control>
            <form-control>
            <safa-text
              label="کد جام"
              label-shrink
              v-model="response.JamCode"
            />
            </form-control>
            <form-control>

            <safa-text
              label="شماره شناسنامه/ثبت ملک"
              label-shrink
              v-model="response.OwnerIdentityNo"
            />
            </form-control>
            </form-row>
          </div>
          <form-row :xs="1" :sm="2" :md="2" :lg="4" :xl="4">
            <form-control>
            <safa-text
              label="کاربری ملک مرتبط"
              label-shrink
              v-model="response.EstateUsingType"
            />
            </form-control>
            <form-control>
            <safa-text
              label="شماره چاپی سند"
              label-shrink
              v-model="response.PrintedDocNo"
            />
            </form-control>
          </form-row>
          <div class="q-mt-sm">
          <!-- <div class="row q-col-gutter-md">

          </div> -->
          </div>
      </internal-section>
      <template v-slot:footer>
        <div>
          <btn-save
            label="جستجو"
            color="primary"
          @click="search"/>
        </div>
    </template>
  </form-wrapper>

</safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  name: 'DocAuthenticityVerification',
  data () {
    return {
      title: "تایید اصالت اسناد",
      formKey: 'ee4e4c22-c65f-4ec2-846b-9a174fc3cc17',
      name: 'DocAuthenticityVerification',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      dataModel: {
        provinceId: '',
        unitId: '',
        basic: '',
        secondary: '',
        electronicEstateNoteNo: '',
        ownerNationalityCode: '',
        notebookNo: '',
        pageNo: ''

      },
      response: {},
      showDetails: false,
      provinceList: [],
      unitCodeList: [],
      fullName: '',
      result: null
    }
  },
  async created () {
    await this.getProvinceCodesForAsnad()
  },
  methods: {
    async search () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getVerificationForAsnad(
          { pManMailVerifyRequest: {
            ProvinceId: this.dataModel.provinceId,
            UnitId: this.dataModel.unitId,
            Basic: this.dataModel.basic,
            Secondary: this.dataModel.secondary,
            ElectronicEstateNoteNo: this.dataModel.electronicEstateNoteNo,
            OwnerNationalityCode: this.dataModel.ownerNationalityCode,
            NotebookNo: this.dataModel.notebookNo,
            PageNo: this.dataModel.pageNo
          } }
        )
        this.result = this.getResponse(data)
        this.response = this.result?.data.ManMailVerificationResponse
        this.fullName = `${this.response?.OwnerName}${' '}${this.response?.OwnerFamily}`
        this.showDetails = true
      } catch (e) {
        this.$logger.catchError(e)
      } finally {
        this.hideLoading()
      }
    },
    async getProvinceCodesForAsnad () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getProvinceCodesForAsnad({ })
        this.result = this.getResponse(data)
        this.provinceList = this.result?.data?.ManMailProvinces?.Result
        this.provinceList = this.provinceList.map((x) => {
          x.ID = x.Id
          return {
            ...x
          }
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getUnitCodesForAsnad ($event) {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getUnitCodesForAsnad(
          { pProvinceId: $event }
        )
        this.result = this.getResponse(data)
        this.unitCodeList = this.result?.data?.ManMailUnits?.Result
        this.unitCodeList = this.unitCodeList.map((x) => {
          x.ID = x.Id
          return {
            ...x
          }
        })
      } catch (e) {
        this.$logger.catchError(e)
      } finally {
        this.hideLoading()
      }
    }
  }

}
</script>

<style scoped>

</style>
