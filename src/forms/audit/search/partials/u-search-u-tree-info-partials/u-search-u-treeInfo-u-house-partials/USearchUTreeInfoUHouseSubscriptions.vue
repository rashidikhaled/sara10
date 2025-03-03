<template>
  <fit>
    <div class="q-pa-sm">
      <internal-section class="q-mb-md" title="پایانکار و پروانه">
        <form-row :xs="1" :sm="2" :md="2" :lg="2" :xl="4">
          <form-control>
            <safa-text
              v-model="
                dataContext.mainContext.Base_Info.LastPayankar_CertificateNo
              "
              label="شماره پایانکار ساختمان :"
              label-width="120px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="
                dataContext.mainContext.Base_Info.LastParvaneh_CertificateNo
              "
              label="شماره پروانه ساختمانی :"
              label-width="120px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="
                dataContext.mainContext.Base_Info.LastPayankar_CertificateDate
              "
              label="تاریخ پایانکار ساختمان :"
              label-width="120px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="
                dataContext.mainContext.Base_Info.LastParvaneh_CertificateDate
              "
              label="تاریخ پروانه ساختمانی :"
              label-width="120px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section class="q-mb-md" title="اشتراکات">
        <form-row :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <form-control>
            <div class="flex items-center q-gutter-x-md">
              <div
                class="flex items-center full-height q-gutter-sm"
                style="width: 190px"
              >
                <safa-label style="width: 65px">اشتراک آب :</safa-label>
                <safa-radio
                  label="دارد"
                  :val="'1'"
                  v-model="dataContext.mainContext.Base_Info.HasAb"
                  :m="m"
                />
                <safa-radio
                  label="ندارد"
                  :val="'0'"
                  v-model="dataContext.mainContext.Base_Info.HasAb"
                  :m="m"
                />
              </div>

              <safa-text
                style="flex-grow: 1"
                v-model="dataContext.mainContext.Base_Info.SubScription_Ab"
                label="شماره اشتراک آب :"
                label-width="100px"
                :m="dataContext.mainContext.Base_Info.HasAb == 0 ? 'r' : m"
              />
            </div>
          </form-control>
          <form-control>
            <div class="flex items-center q-gutter-x-md">
              <div
                class="flex items-center full-height q-gutter-sm"
                style="width: 190px"
              >
                <safa-label style="width: 65px">اشتراک برق :</safa-label>
                <safa-radio
                  label="دارد"
                  :val="'1'"
                  v-model="dataContext.mainContext.Base_Info.HasBargh"
                  :m="m"
                />
                <safa-radio
                  label="ندارد"
                  :val="'0'"
                  v-model="dataContext.mainContext.Base_Info.HasBargh"
                  :m="m"
                />
              </div>

              <safa-text
                style="flex-grow: 1"
                v-model="dataContext.mainContext.Base_Info.SubScription_Bargh"
                label="شماره اشتراک برق :"
                label-width="100px"
                :m="dataContext.mainContext.Base_Info.HasBargh == 0 ? 'r' : m"
              />
            </div>
          </form-control>
          <form-control>
            <div class="flex items-center q-gutter-x-md">
              <div
                class="flex items-center full-height q-gutter-sm"
                style="width: 190px"
              >
                <safa-label style="width: 65px">اشتراک گاز :</safa-label>
                <safa-radio
                  label="دارد"
                  :val="'1'"
                  v-model="dataContext.mainContext.Base_Info.HasGaz"
                  :m="m"
                />
                <safa-radio
                  label="ندارد"
                  :val="'0'"
                  v-model="dataContext.mainContext.Base_Info.HasGaz"
                  :m="m"
                />
              </div>

              <safa-text
                style="flex-grow: 1"
                v-model="dataContext.mainContext.Base_Info.SubScription_Gaz"
                label="شماره اشتراک گاز :"
                label-width="100px"
                :m="dataContext.mainContext.Base_Info.HasGaz == 0 ? 'r' : m"
              />
            </div>
          </form-control>
          <form-control>
            <div class="flex items-center q-gutter-x-md">
              <div
                class="flex items-center full-height q-gutter-sm"
                style="width: 190px"
              >
                <safa-label style="width: 65px">اشتراک تلفن :</safa-label>
                <safa-radio
                  label="دارد"
                  :val="'1'"
                  v-model="dataContext.mainContext.Base_Info.HasTel"
                  :m="m"
                />
                <safa-radio
                  label="ندارد"
                  :val="'0'"
                  v-model="dataContext.mainContext.Base_Info.HasTel"
                  :m="m"
                />
              </div>

              <safa-text
                style="flex-grow: 1"
                v-model="
                  dataContext.mainContext.Base_Info.SubScription_Telephon
                "
                label="شماره اشتراک تلفن :"
                label-width="100px"
                :m="dataContext.mainContext.Base_Info.HasTel == 0 ? 'r' : m"
              />
            </div>
          </form-control>
        </form-row>
      </internal-section>

      <internal-section class="q-mb-md" title="فیش">
        <form-row :xs="1" :sm="2" :md="2" :lg="2" :xl="4">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastFiche_FicheNo"
              label="شماره آخرین فیش پرداختی نوسازی :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastFiche_Credit"
              label="مبلغ پرداختی :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.LastFiche_PaymentDate"
              label="تاریخ پرداخت :"
              label-width="100px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastFiche_FromToYear"
              label="از سال تا سال :"
              label-width="100px"
              :m="m"
            />
          </form-control>
        </form-row>
      </internal-section>

      <internal-section class="q-mb-md" title="مفاصا حساب">
        <form-row :xs="1" :sm="1" :md="3" :lg="3" :xl="3">
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastMafasa"
              label="آخرین مفاصا حساب نوسازی :"
              label-width="145px"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              v-model="dataContext.mainContext.Base_Info.LastMafasa_Date"
              label="تاریخ صدور :"
              :label-width="dynamicLabelWidth ? '70px' : '145px'"
              :m="m"
            />
          </form-control>
          <form-control>
            <safa-text
              v-model="dataContext.mainContext.Base_Info.LastMafasa_Value"
              label="مبلغ :"
              :label-width="dynamicLabelWidth ? '70px' : '145px'"
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
  name: "USearchUTreeInfoUHouseSubscriptions",

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

  computed: {
    dynamicLabelWidth () {
      const layoutWidth =
        this.$store.getters["ui/layoutMode"] === "half"
          ? this.$store.getters["ui/layoutSplitterWidth"]
          : 100
      const width = window.innerWidth / (100 / layoutWidth)
      return this.$q.screen.sizes.md < width
    }
  },

  data () {
    return {}
  }
}
</script>
