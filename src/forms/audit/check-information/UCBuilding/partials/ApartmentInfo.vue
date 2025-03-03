<template>
    <fit>
      <div class="q-pa-sm">
               <form-row >
            <form-control>
              <nosazi-code-input
                v-model="value.nosaziCode"
                label="کد نوسازی :"
                label-width="90px"
                :enabled="
                  m === 'e'
                    ? value.nosaziCodeEnable
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
                v-model="value.preNosaziCode"
                label="کد نوسازی ممیزی :"
                label-width="90px"
                :enabled="
                  m === 'e'
                    ? value.preNosaziCodeEnable
                      ? '1-1-1-1-1-1-1'
                      : '0-0-0-0-0-0-0'
                    : '0-0-0-0-0-0-0'
                "
                m="e"
                :actions="false"
              />
            </form-control>

            <form-control>
              <safa-text
                v-model="value.Base_Info.NorgirArea"
                label="مساحت نورگیر :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-text
                v-model="value.Base_Info.TajavozArea"
                label="مساحت تجاوز به حریم گذرها :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                v-model="value.Base_Info.StartDate"
                label="تاریخ شروع عملیات ساختمانی :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                v-model="value.Base_Info.EndDate"
                label="تاریخ پایان عملیات ساختمانی :"
               label-width="90px"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_BuildingStep"
                label="مرحله ساختمانی :"
               label-width="90px"
                ciName="CI_BuildingStep"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="value.Base_Info.CI_BuildingPosition"
                label="جهت نمای ساختمان :"
               label-width="90px"
                ciName="CI_BuildingPosition"
                domainName="CI_SaraM1"
                :m="m"
              />
            </form-control>

            <form-control>
              <safa-combo
                v-model="value.Base_Info.CI_QuestionnaireType"
                label="وضعیت پرسش نامه :"
               label-width="90px"
                ciName="CI_QuestionnaireType"
                domainName="Survey"
                :m="m"
              />
            </form-control>
          </form-row>
            <form-control>
              <text-template
                label="توضیحات :"
                v-model="value.Base_Info.Comments"
                :rows="4"
                cdcName="Comments"
               label-width="90px"
               class="q-mt-sm"
                :m="m"
              />
            </form-control>

      </div>
    </fit>
  </template>

<script>
export default {
  name: "ApartmentInfo",

  props: {
    m: {
      type: String,
      default: "r"
    },
    value: {
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
