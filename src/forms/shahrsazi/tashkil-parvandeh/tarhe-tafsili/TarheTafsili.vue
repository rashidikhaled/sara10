<template>
   <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      title="طرح تفصیلی"
    >
      <safa-status :result="result" />
      <safa-status :result="saveResult" />
      <safa-group
        label-width="160px"
        :m="m"
      >
        <safa-text
          label="گذرها "
          v-model="results.Sh_TarhTafsili.Paths"
        />
        <safa-text
          label=" عرض گذرها "
          v-model="results.Sh_TarhTafsili.PathWidth"
          type="number"
        />
        <safa-text
          label="شعاع پخ "
          v-model="results.Sh_TarhTafsili.PakhRadius"
          type="number"
        />
        <safa-text
          label="   طول پخ"
          v-model="results.Sh_TarhTafsili.PakhLength"
          type="number"
        />
        <safa-text
          label="زاویه دو گذر متقاطع (درجه)"
          v-model="results.Sh_TarhTafsili.PathAngle"
          type="number"
        />
        <safa-text
          label=" بازوی پخ ها (متر)"
          v-model="results.Sh_TarhTafsili.BezelArm"
        />
        <safa-text
          label=" بن بست طبق ضوابط طرح"
          v-model="results.Sh_TarhTafsili.Tarh"
        />
        <safa-text
          label="زیر پهنه"
          v-model="results.Sh_TarhTafsili.UnderField"
        />
        <safa-text
          label=" عمق اصلاحی شرق  "
          v-model="results.Sh_TarhTafsili.EastDepth"
          type="number"
        />
        <safa-text
          label="عمق اصلاحی غرب"
          v-model="results.Sh_TarhTafsili.WestDepth"
          type="number"
        />
        <safa-text
          label=" عمق اصلاحی شمال"
          v-model="results.Sh_TarhTafsili.NorthDepth"
          type="number"
        />
        <safa-text
          label="عمق اصلاحی جنوب"
          v-model="results.Sh_TarhTafsili.SouthDepth"
          type="number"
        />
        <safa-text
          label="شعاع قوس (متر)"
          v-model="results.Sh_TarhTafsili.ArcRadius"
          type="number"
        />
        <safa-text
          label="طول قوس (متر) "
          v-model="results.Sh_TarhTafsili.ArcLength"
          type="number"
        />
        <safa-custom-text
          label="مساحت ناشی از ابعاد سند"
          v-model="results.Sh_TarhTafsili.DocDimensions"
          type="decimal"
          label-width="160px"
          :m="m"
        />
        <safa-text
          label="نوعیت"
          v-model="results.Sh_TarhTafsili.Typically"
        />
        <safa-text
          label="مشتمل بر"
          v-model="results.Sh_TarhTafsili.Including"
        />
        <safa-combo
          v-model="results.Sh_TarhTafsili.CI_PlanUsingType"
          label="نزدیکترین تراکم مسکونی همجوار "
          ciName="CI_PlanUsingType"
          domainName="CI_SaraM1"
        ></safa-combo>
        <safa-text
          label="نوع پهنه"
          v-model="results.Sh_TarhTafsili.PahnehType"
        />
        <safa-combo
          v-model="
              results.Sh_TarhTafsili.CI_TarhTafsili_MainCityLimitLocation
            "
          label="حریم شهر واقع در پهنه ی اصلی "
          ciName="CI_TarhTafsili_MainCityLimitLocation"
          domainName="CI_SaraM1"
        ></safa-combo>
        <safa-combo
          v-model="results.Sh_TarhTafsili.CI_TarhTafsili_SpecialTarh"
          label="گستره ی طرح های ویژه "
          ciName="CI_TarhTafsili_SpecialTarh"
          domainName="CI_SaraM1"
        ></safa-combo>
        <safa-custom-text
          label="مساحت اصلاحی واقع در طرح شهرداری"
          v-model="results.Sh_TarhTafsili.CorrectiveArea"
          type="decimal"
          label-width="160px"
          :m="m"
        />
      </safa-group>
      <div class=" row q-col-gutter-md">
        <safa-checkbox
          label="مشمول دوربرگردان می شود"
          v-model="results.Sh_TarhTafsili.HasUTurn"
          :m="m"
        ></safa-checkbox>
        <safa-checkbox
          label="درپهنه ی ممنوعیت واقع شده است"
          v-model="results.Sh_TarhTafsili.IsInForbiddenTafkik"
          :m="m"
        ></safa-checkbox>
        <safa-checkbox
          label="ارزش قیمت منطقه ای دارد"
          v-model="results.Sh_TarhTafsili.HasEconomicPrice"
          :m="m"
        ></safa-checkbox>
        <safa-checkbox
          label="دریافت های فرسوده قرار دارد"
          v-model="results.Sh_TarhTafsili.IsInOldTexture"
          :m="m"
        ></safa-checkbox>
        <safa-checkbox
          label="جبهه ی دوم نسبت به محور مجهز واقع شده است"
          v-model="results.Sh_TarhTafsili.IsInJebhe2"
          :m="m"
        ></safa-checkbox>
        <safa-checkbox
          label="رعایت 1.5 متر فضای باز الزامی می باشد"
          v-model="results.Sh_TarhTafsili.IsOutDoor"
          :m="m"
        ></safa-checkbox>
        <safa-checkbox
          label="شامل قانون منع فروش می شود"
          v-model="results.Sh_TarhTafsili.HasSellBan"
          :m="m"
        ></safa-checkbox>
      </div>
      <internal-section class="q-mt-sm">
        <div class="row">
          <div class="col-12 col-md-3 col-sm-6">
            <safa-label>اصلاحی در پلاک های مجاور مطابق طرح مصوب پیشین</safa-label>
          </div>
          <div class="col-12 col-md-3 col-sm">
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <safa-radio
                  label="رعایت شده است"
                  v-model="results.Sh_TarhTafsili.IsObservedNeighbourModified"
                  :val="true"
                  :disable="m === 'r'"
                  name="observe"
                />
              </div>
              <div class="col-6">
                <safa-radio
                  label="رعایت نشده است"
                  v-model="results.Sh_TarhTafsili.IsObservedNeighbourModified"
                  :val="false"
                  :disable="m === 'r'"
                  name="observe"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row q-my-sm">
          <div class="col-12 col-md-3 col-sm-6">
            <safa-label>مساحت باقی مانده از حد نصاب تفکیک</safa-label>
          </div>
          <div class="col-12 col-md-3 col-sm">
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <safa-radio
                  label="بیشتر است"
                  v-model="results.Sh_TarhTafsili.IsRemainedAreaUpper"
                  :val="true"
                  :disable="m === 'r'"
                  name="remain"
                />
              </div>
              <div class="col-6">
                <safa-radio
                  label="کمتر است"
                  v-model="results.Sh_TarhTafsili.IsRemainedAreaUpper"
                  :val="false"
                  :disable="m === 'r'"
                  name="remain"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-3 col-sm-6">
            <safa-label>در محور</safa-label>
          </div>
          <div class="col-12 col-md-3 col-sm">
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <safa-radio
                  label="واقع می باشد"
                  v-model="results.Sh_TarhTafsili.IsInMehvar"
                  :val="true"
                  :disable="m === 'r'"
                  name="mehvar"
                />
              </div>
              <div class="col-6">
                <safa-radio
                  label="واقع نمی باشد"
                  v-model="results.Sh_TarhTafsili.IsInMehvar"
                  :val="false"
                  :disable="m === 'r'"
                  name="mehvar"
                />
              </div>
            </div>
          </div>
        </div>
      </internal-section>
      <div class="q-mt-sm">
        <div class="row items-center q-col-gutter-sm">
          <div class="col-md-2">
            <safa-text
              :m="m"
              label="گذر (های) ضلع"
              v-model="results.Sh_TarhTafsili.PathSide"
              label-width="80px"
            />
          </div>
          <div class="col-md-4 col-sm">
            <safa-label>مشمول بند 6 ضوابط عمومی گذربندی (صفحه ی 77 دفترچه) میگردد.</safa-label>
          </div>
        </div>
      </div>
      <text-template
        :m="m"
        label="توضیحات"
        v-model="results.Sh_TarhTafsili.Comments"
        formKey="9A84721F-6B52-42FC-8679-468E4AE120E8"
        class="q-mt-sm"
        label-width="80px"
      />
      <template v-slot:footer>
        <form-actions
          :m="m"
          @edit="m = 'e'"
          @save="save"
          @cancel="m = 'r'"
        ></form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
export default {
  route: '/tarhe-tafsili',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'طرح تفصیلی',
      formKey: '9A84721F-6B52-42FC-8679-468E4AE120E8',
      name: 'TarheTafsili',
      main: true,
      m: 'r',
      results: { Sh_TarhTafsili: {} },
      saveResult: null,
      saveResults: {},
      result: null,
      isInMehvarYes: 'isInMehvarYes',
      isInMehvarNo: 'isInMehvarNo',
      isRemainedAreaUpperYes: null,
      isRemainedAreaUpperNo: null,
      isObservedNeighbourModifiedYes: null,
      isObservedNeighbourModifiedNo: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
      this.load()
    } else {
      this.showError('هیچ درخواستی در کارتابل انتخاب نشده است.')
    }
  },

  methods: {
    load () {
      // let self = this
      let data = { pNidProc: this.selectedRequest.NidProc }
      this.$services.SC.loadTarhTafsili(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            //       if (
            //         this.results.Sh_TarhTafsili.IsInMehvar != null &&
            // this.results.Sh_TarhTafsili.IsInMehvar === true
            //       ) {
            //         this.isInMehvarYes = true
            //         this.isInMehvarNo = false
            //       } else if (this.results.Sh_TarhTafsili.IsInMehvar === null) {
            //         this.isInMehvarYes = false
            //         this.isInMehvarNo = false
            //       } else {
            //         this.isInMehvarNo = true
            //         this.isInMehvarYes = false
            //       }
            //       if (
            //         this.results.Sh_TarhTafsili.IsRemainedAreaUpper !== null &&
            // this.results.Sh_TarhTafsili.IsRemainedAreaUpper === true
            //       ) {
            //         this.isRemainedAreaUpperYes = true
            //         this.isRemainedAreaUpperNo = false
            //       } else if (this.results.Sh_TarhTafsili.IsRemainedAreaUpper === null) {
            //         this.isRemainedAreaUpperYes = false
            //         this.isRemainedAreaUpperNo = false
            //       } else {
            //         this.isRemainedAreaUpperNo = true
            //         this.isRemainedAreaUpperYes = false
            //       }
            if (
              this.results.Sh_TarhTafsili.IsObservedNeighbourModified !==
                null &&
              this.results.Sh_TarhTafsili.IsObservedNeighbourModified === true
            ) {
              this.isObservedNeighbourModifiedYes = true
              this.isObservedNeighbourModifiedNo = false
            } else if (
              this.results.Sh_TarhTafsili.IsObservedNeighbourModified === null
            ) {
              this.isObservedNeighbourModifiedNo = false
              this.isObservedNeighbourModifiedYes = false
            } else {
              this.isObservedNeighbourModifiedNo = true
              this.isObservedNeighbourModifiedYes = false
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      let self = this
      const tarhTafsili = this.results.Sh_TarhTafsili
      tarhTafsili.PathAngle = tarhTafsili.PathAngle || 0
      tarhTafsili.BezelArm = tarhTafsili.BezelArm || 0
      tarhTafsili.ArcRadius = tarhTafsili.ArcRadius || 0
      tarhTafsili.EastDepth = tarhTafsili.EastDepth || 0
      tarhTafsili.WestDepth = tarhTafsili.WestDepth || 0
      tarhTafsili.NorthDepth = tarhTafsili.NorthDepth || 0
      tarhTafsili.SouthDepth = tarhTafsili.SouthDepth || 0
      tarhTafsili.ArcLength = tarhTafsili.ArcLength || 0
      tarhTafsili.DocDimensions = tarhTafsili.DocDimensions || 0
      tarhTafsili.CorrectiveArea = tarhTafsili.CorrectiveArea || 0
      let data = {
        pTarhTafsili: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: 'baea57df-4bb2-4ba2-956b-1617ba73a85d',
          WorkflowGuid: '5ca8477d-2a3a-4962-9c63-a8690ff8975c'
        },

        pNidProc: this.selectedRequest.NidProc
      }
      this.showLoading()
      this.$services.SC.saveTarhTafsili(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          self.saveResult = this.getResponse(data)
          if (self.saveResult.success) {
            // self.results = self.result.data
            this.m = 'r'

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })

            this.load()
            this.showSuccess('ذخیره با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          self.saveResult = this.getResponse(response)
          // console.log('error', self.result)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
