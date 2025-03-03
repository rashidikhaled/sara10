<template>
  <fit>
    <div class="q-pa-sm">
      <internal-section class="q-mb-md" title="اطلاعات پرونده">
        <form-row class="q-mb-sm" :xs="1" :sm="1" :md="2" :lg="2" :xl="2">
          <form-control>
            <nosazi-code-input
              v-model="dataContext.nosaziCode"
              label="کد نوسازی :"
              label-width="90px"
              :enabled="
                m === 'e'
                  ? dataContext.nosaziCodeEnable
                    ? '1-1-1-1-1-1-1'
                    : '0-0-0-0-0-0-0'
                  : '0-0-0-0-0-0-0'
              "
              m="e"
              :actions="false"
            />
          </form-control>
          <form-control>
            <nosazi-code-input
              v-model="dataContext.preNosaziCode"
              label="کد نوسازی ممیزی :"
              label-width="90px"
              :enabled="
                m === 'e'
                  ? dataContext.preNosaziCodeEnable
                    ? '1-1-1-1-1-1-1'
                    : '0-0-0-0-0-0-0'
                  : '0-0-0-0-0-0-0'
              "
              m="e"
              :actions="false"
            />
          </form-control>
        </form-row>
        <form-row :xs="1" :sm="2" :md="2" :lg="2" :xl="2">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.NorgirArea"
              label="مساحت نورگیر :"
              label-width="150px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.TajavozArea"
              label="مساحت تجاوز به حریم گذرها :"
              label-width="150px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.StartDate"
              label="تاریخ شروع عملیات ساختمانی :"
              label-width="150px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.EndDate"
              label="تاریخ پایان عملیات ساختمانی :"
              label-width="150px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_BuildingStep"
              label="مرحله ساختمانی :"
              label-width="150px"
              ciName="CI_BuildingStep"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-combo2
              v-model="dataContext.mainContext.Base_Info.CI_BuildingPosition"
              label="جهت نمای ساختمان :"
              label-width="150px"
              ciName="CI_BuildingPosition"
              domainName="CI_SaraM1"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section style="margin-bottom: 0 !important" title="پرسشنامه">
        <form-row :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <form-control>
            <safa-combo
              v-model="dataContext.mainContext.Base_Info.CI_QuestionnaireType"
              label="وضعیت پرسش نامه :"
              label-width="110px"
              ciName="CI_QuestionnaireType"
              domainName="Survey"
              :m="m"
            />
          </form-control>
          <form-control>
            <text-template
              label="توضیحات :"
              v-model="dataContext.mainContext.Base_Info.Comments"
              :rows="4"
              cdcName="Comments"
              label-width="110px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>
    </div>
  </fit>
</template>

<script>
export default {
  name: "USearchUTreeInfoUBuildingApartmentInfo",

  props: {
    m: {
      type: String,
      default: "r"
    },
    dataContext: {
      type: Object,
      required: true
    },
    isLoadedFromMenu: Boolean
  },

  data () {
    return {}
  }
}
</script>
