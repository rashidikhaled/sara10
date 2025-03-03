<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-datepicker
          v-model="value.ActualCompletion.ActualCompletionDate"
          label="تاریخ اتمام مرمت"
          label-width="80px"
          cdcName="ActualCompletionDate"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ActualCompletion.DeadlineDefect"
          label="مهلت نقض"
          label-width="80px"
          cdcName="DeadlineDefect"
          :m="m"
        />
      </FormControl>
    </FormRow>

    <safa-splitter v-model="spVer" vertival>
      <template v-slot:before>
        <safa-splitter v-model="spH1" horizontal class="fit" margin="0">
          <template v-slot:before>
            <safa-splitter v-model="spH2" horizontal margin="0">
              <template v-slot:before>
                <fit>
                  <safa-grid
                    title="مشخصات پروژه (مجوز)"
                    :columns="deliveryProjectLicenseColumns"
                    v-model="value.Delivery_Project_License"
                    cdcName="Delivery_Project_License"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100%"
                    m="r"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-grid
                    title="اقدامات و خسارت وارد شده به شهرداری"
                    v-model="value.Delivery_Installations"
                    cdcName="Delivery_Installations"
                    :columns="deliveryInstallationsColumns"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100%"
                    :m="m"
                  />
                </fit>
              </template>
            </safa-splitter>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                title="جرائم حین اجرا"
                v-model="value.Delivery_Crimes"
                cdcName="Delivery_Crimes"
                :columns="deliveryCrimesColumns"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
                :m="m"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter v-model="spH3" horizontal margin="0">
          <template v-slot:before>
            <safa-splitter v-model="spH4" horizontal margin="0">
              <template v-slot:before>
                <fit>
                  <safa-grid
                    title="مشخصات اجرا شده"
                    v-model="value.Delivery_Project"
                    cdcName="Delivery_Project"
                    :columns="deliveryProjectColumns"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100%"
                    :m="m"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-grid
                    title="تاخیرات"
                    v-model="value.Delivery_Delays"
                    cdcName="Delivery_Delays"
                    :columns="deliveryDelaysColumns"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100%"
                    m="r"
                  />
                </fit>
              </template>
            </safa-splitter>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                title="اعلام نواقص"
                v-model="value.Delivery_Defects"
                cdcName="Delivery_Defects"
                :columns="deliveryDefectsColumns"
                fit
                :deleteRow="false"
                max-height="100%"
                height="100%"
                minHeight="100%"
                :m="m"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      spVer: 50,
      spH1: 63,
      spH2: 50,
      spH3: 63,
      spH4: 50,
      deliveryProjectLicenseColumns: [
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          editor: "combo",
          domain: "Dig",
          width: "100px"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "Lenght",
          title: "طول (متر)",
          width: "110px"
        },
        {
          field: "Width",
          title: "عرض (متر)",
          width: "110px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "80px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          editor: "combo",
          domain: "Dig",
          width: "130px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت",
          width: "140px"
        }
      ],
      deliveryProjectColumns: [
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          editor: "combo",
          domain: "Dig",
          width: "100px"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "Lenght",
          title: "طول (متر)",
          width: "110px"
        },
        {
          field: "Width",
          title: "عرض (متر)",
          width: "110px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "80px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          editor: "combo",
          domain: "Dig",
          width: "130px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت",
          width: "140px"
        }
      ],
      deliveryInstallationsColumns: [
        {
          field: "CI_Delivery_InstallationsType",
          title: "عنوان",
          width: "110px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_Installations",
          title: "نوع",
          width: "110px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "Value",
          title: "مبلغ",
          width: "80px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ],
      deliveryDelaysColumns: [
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "120px",
          editor: "date"
        },
        {
          field: "EndDate",
          title: "تاریخ پایان",
          width: "120px",
          editor: "date"
        },
        {
          field: "Time",
          title: "مدت (روز)",
          width: "120px"
        },
        {
          field: "DelaysAllowed",
          title: "تاخیر مجاز (روز)",
          width: "120px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ],
      deliveryCrimesColumns: [
        {
          field: "Score",
          title: "امتیاز نظارت",
          width: "110px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ],
      deliveryDefectsColumns: [
        {
          field: "CI_DefectsSubject",
          title: "عنوان",
          editor: "combo",
          domain: "Dig",
          width: "90px"
        },
        {
          field: "Description",
          title: "توضیحات کارشناس",
          width: "150px"
        },
        {
          field: "DescCompany",
          title: "توضیحات شرکت خدماتی",
          width: "200px"
        },
        {
          field: "IsDeficiencies",
          title: "رفع نقص",
          width: "100px",
          editor: "checkbox"
        },
        {
          field: "Place",
          title: "مکان نقص",
          width: "100px"
        }
      ]
    }
  }
}
</script>
