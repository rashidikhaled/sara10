<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title" vertical>
      <safa-text
        label="وضعیت ارسال"
        label-width="100px"
        @keyup.enter="search"
      />
      <internal-section class="q-my-lg">
        <div>
          <!--  -->
          <q-markup-table :dark="$q.dark.isActive" bordered dense flat separator="cell" square>
            <thead>
            <tr>
              <th></th>
              <th colspan="3">مساحت</th>
              <th colspan="2">کاربری</th>
              <th colspan="2">ارتفاع</th>
            </tr>
            <tr>
              <th>طبقات</th>
              <th>مجاز(متر مربع)</th>
              <th>اجرا شده( متر مربع)</th>
              <th>اختلاف (متر مربع)</th>
              <th>مجاز</th>
              <th>اجرا شده</th>
              <th>مجاز</th>
              <th>اجرا شده</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="text-center"><input v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].FloorNo"/></td>
              <td class="text-center"><input v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].AllowedArea"/>
              </td>
              <td class="text-center"><input v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].ExecutedArea"/>
              </td>
              <td class="text-center"><input v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].DiffArea"/>
              </td>
              <td class="text-center"><input
                v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].CI_UsingType_Allowed"/></td>
              <td class="text-center"><input
                v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].CI_UsingType_Executed"/></td>
              <td class="text-center"><input
                v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].Height_Allowed"/></td>
              <td class="text-center"><input
                v-model="model.BuildingExecRep_FormOperation_Floors_Main[0].Height_Executed"/></td>
            </tr>
            </tbody>
          </q-markup-table>
        </div>
      </internal-section>

      <internal-section
        class="q-mt-lg"
      >
        <!-- <div class="q-gutter-md">
          <safa-radio
            label="شبیه"
            :val="false"
            v-model="isEqual"
            cdcName="isEqual"
          />
        </div> -->
        <FormRow class="q-mb-sm" :lg="2" :md="2" :sm="2" :xs="2" :xl="2">
          <FormControl>
            <div class="q-gutter-md flex">
              <div>ابعاد ستون ها و سقف مطابق نقشه های معماری تایید شده شهرداری :</div>
              <safa-radio
                label="می باشد"
                :val="false"
                v-model="isEqual"
                cdcName="isEqual"
              />
              <safa-radio
                label="نمی باشد"
                :val="true"
                v-model="isEqual"
                cdcName="Equal"
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>اجرای عقب نشینی ها،پیش رویها و پخی ها مطابق نقشه های معماری تایید شده شهرداری:</div>
              <safa-radio
                label="می باشد"
                :val="false"
                v-model="isEqual"
                cdcName="isEqual"
              />
              <safa-radio
                label="نمی باشد"
                :val="true"
                v-model="isEqual"
                cdcName="Equal"
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>اجرای پیش آمدگی های مجاور معابر مطابق نقشه های معماری تایید شده شهرداری:</div>
              <safa-radio
                label="می باشد"
                :val="false"
                v-model="isEqual"
                cdcName="isEqual"
              />
              <safa-radio
                label="نمی باشد"
                :val="true"
                v-model="isEqual"
                cdcName="Equal"
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>
                ترازهای ارتفاعی اجرا شده براساس نقشه های تایید شده شهرداری:
              </div>
              <safa-radio
                label="می باشد"
                :val="false"
                v-model="isEqual"
                cdcName="isEqual"
              />
              <safa-radio
                label="نمی باشد"
                :val="true"
                v-model="isEqual"
                cdcName="Equal"
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>نورگیرها مطابق نقشه های تایید شده شهرداری:</div>
              <safa-radio
                label="می باشد"
                :val="false"
                v-model="isEqual"
                cdcName="isEqual"
              />
              <safa-radio
                label="نمی باشد"
                :val="true"
                v-model="isEqual"
                cdcName="Equal"
              />
            </div>
          </FormControl>
          <FormControl>
            <div class="q-gutter-md flex">
              <div>بنای اجراشده نسبت به نقشه های مصوب شهرداری خلاف زیربنایی:</div>
              <safa-radio
                label="دارد"
                :val="false"
                v-model="isEqual"
                cdcName="isEqual"
              />
              <safa-radio
                label="ندارد"
                :val="true"
                v-model="isEqual"
                cdcName="Equal"
              />
            </div>
          </FormControl>
        </FormRow>
        <text-template
          label="توضیحات"
          v-model="newComment"
          type="textarea"
          formKey="9921D24C-FC87-4A8B-B03D-C0A7A66289EF"
        ></text-template>
      </internal-section>

      <template v-slot:footer>
        <form-actions :showEditButton="false">
          <template v-slot:after>
            <btn-default label="ثبت تغییرات" />
            <btn-default label="گزارش" />
            <btn-default label="تایید گزارش" />
            <btn-default label="ارسال گزارش" />
            <btn-default label="تایید ناظر هماهنگ کننده" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import kartableReferencesMixin from '../mixins/kartableReferencesMixin'

export default {
  components: {},
  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      title: 'گزارش ابعاد و محدوده سقفهای ساختمان',
      formKey: '7ba0789d-cd9e-4cf0-ba11-79500d4ecc3d',
      name: 'UOperationBuildingArea',
      main: true,
      model: {
        BuildingExecRep_FormOperation_Floors_Main: [
          {
            AcceptDate: null,
            AcceptTime: null,
            AllowedArea: null,
            BuildingExecDate: null,
            CI_ExecSendStatus: null,
            CI_UsingType_Allowed: null,
            CI_UsingType_Executed: null,
            Comments: null,
            DiffArea: null,
            EumReportStatus: null,
            ExecutedArea: null,
            FloorNo: null,
            Height_Allowed: null,
            Height_Executed: null,
            NIdBuildingExecRep: null,
            NIdEng_Accept: null,
            NIdEng_Revoke: null,
            NidBuildingReportFormFloors: null,
            OkDate: null,
            OkTime: null,
            RevisitExecDate: null,
            RevokeDate: null,
            RevokeTime: null,
            SecretariatDate: null,
            SecretariatNo: null,
            SendDate: null,
            SendTime: null,
            SerialID: null,
            UnitCount_Allowed: null,
            UnitCount_Executed: null
          }
        ]
      }
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidEngineer: this.NidEng_Temp
        }
      }
      this.$services.engineers
        .GetEngCompareInfo(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getEngInfoTempResult = response.data.GetEngCompareInfoResult
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ''
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    AcceptEngineerInfo () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidEngineer: this.NidEng_Temp
        }
      }
      this.$services.engineers
        .AcceptEngineerInfo(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getEngInfoTempResult = response.data.AcceptEngineerInfoResult
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.hide()
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ''
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    RejectEngineerInfo () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidEngineer: this.NidEng_Temp
        }
      }
      this.$services.engineers
        .RejectEngineerInfo(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getEngInfoTempResult = response.data.RejectEngineerInfoResult
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.hide()
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ''
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    hide () {
      this.$emit('hide')
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
