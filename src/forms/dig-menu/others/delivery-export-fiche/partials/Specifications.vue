<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.ClsLicense.ClsDelivery.RequestService_Info.CI_RequesterType"
          label="شرکت خدماتی"
          label-width="80px"
          cdcName="CI_RequesterType"
          ciName="CI_RequesterType"
          domain-name="Dig"
          :m="m"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsLicense.ClsDelivery.RequestService_Info.CI_RedirectName"
          label="نام تابعه"
          label-width="80px"
          cdcName="CI_RedirectName"
          ciName="CI_RedirectName"
          domain-name="Dig"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsLicense.ClsDelivery.RequestService_Info.ExportLicenseNo"
          label="شماره مجوز"
          label-width="80px"
          cdcName="ExportLicenseNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.ClsLicense.ClsDelivery.RequestService_Info.ExportLicenseDate"
          label="تاریخ مجوز"
          label-width="80px"
          cdcName="ExportLicenseDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="
            value.ClsLicense.ClsDelivery.ActualCompletion.ActualCompletionDate
          "
          label="تاریخ اتمام مرمت"
          label-width="80px"
          cdcName="TxtActualCompletion"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsLicense.ClsDelivery.RequestService_Info.Address"
          label="آدرس"
          label-width="80px"
          cdcName="Address"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="spH1" horizontal class="fit">
      <template v-slot:before>
        <safa-splitter v-model="spH2" horizontal class="fit">
          <template v-slot:before>
            <safa-splitter v-model="spV1" vertical class="fit">
              <template v-slot:before>
                <fit>
                  <safa-grid
                    title="مشخصات پروژه (مجوز)"
                    :columns="deliveryProjectLicenseColumns"
                    v-model="
                      value.ClsLicense.ClsDelivery.Delivery_Project_License
                    "
                    cdcName="Delivery_Project_License"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100px"
                    m="r"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-grid
                    title="مشخصات اجرا شده"
                    v-model="value.ClsLicense.ClsDelivery.Delivery_Project"
                    cdcName="Delivery_Project"
                    :columns="deliveryProjectColumns"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100px"
                    :m="m"
                  />
                </fit>
              </template>
            </safa-splitter>
          </template>
          <template v-slot:after>
            <safa-splitter v-model="spV2" vertical class="fit">
              <template v-slot:before>
                <fit>
                  <safa-grid
                    title="اقدامات و خسارت وارد شده به شهرداری"
                    v-model="
                      value.ClsLicense.ClsDelivery.Delivery_Installations
                    "
                    cdcName="Delivery_Installations"
                    :columns="deliveryInstallationsColumns"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100px"
                    :m="m"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-grid
                    title="تاخیرات"
                    v-model="value.ClsLicense.ClsDelivery.Delivery_Delays"
                    cdcName="Delivery_Delays"
                    :columns="deliveryDelaysColumns"
                    fit
                    max-height="100%"
                    height="100%"
                    minHeight="100px"
                    m="r"
                  />
                </fit>
              </template>
            </safa-splitter>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter v-model="spV3" vertical class="fit">
          <template v-slot:before>
            <fit>
              <safa-grid
                title="جرائم حین اجرا"
                v-model="value.ClsLicense.ClsDelivery.Delivery_Crimes"
                cdcName="Delivery_Crimes"
                :columns="deliveryCrimesColumns"
                fit
                max-height="100%"
                height="100%"
                minHeight="100px"
                :m="m"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                title="اعلام نواقص"
                v-model="value.ClsLicense.ClsDelivery.Delivery_Defects"
                cdcName="Delivery_Defects"
                :columns="deliveryDefectsColumns"
                fit
                max-height="100%"
                height="100%"
                minHeight="100px"
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
    formKey: String,
    title: String,
    name: String,
    m: String
  },

  data () {
    return {
      spH1: 70,
      spH2: 50,
      spV1: 50,
      spV2: 50,
      spV3: 50,
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
          width: "110px"
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
          width: "110px"
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
          width: "110px"
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
          width: "110px"
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
          width: "120px"
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
          width: "120px"
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
          width: "120px"
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
          title: "توضیحات ",
          width: "100px"
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
