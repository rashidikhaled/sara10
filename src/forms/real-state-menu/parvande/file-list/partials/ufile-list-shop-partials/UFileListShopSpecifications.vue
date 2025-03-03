<template>
  <safa-form id="" caption="مشخصات">
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="کد پستی"
            type="number"
            label-width="100px"
            v-model="value.Base_AddressInfo.PostCode"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-text
            label="کد اقتصادی"
            type="number"
            label-width="100px"
            v-model="value.Base_AddressInfo.EconomicCode"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-text
            label="پلاک آبی"
            type="number"
            label-width="100px"
            v-model="value.Base_AddressInfo.Plack"
            :m="m"
          />
        </form-control>
      </div>
      <div class="q-mb-sm">
        <div>
          <safa-text
            label="آدرس"
            label-width="100px"
            v-model="value.Base_AddressInfo.MainAddress"
            :m="m"
          />
        </div>
      </div>

      <safa-splitter
        v-model="splitterValueHorizontal"
        horizontal
        class="q-mb-sm"
      >
        <template v-slot:before>
          <safa-splitter v-model="splitterValueVerticalR" vertical>
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="شماره شناسایی قدیم"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_PreCodeInfo"
                  helper="oldIdColumns"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title=" شماره شناسایی پرونده "
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_File"
                  :columns="baseFileId"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </template>
        <template v-slot:after>
          <fit>
            <safa-splitter v-model="splitterValueVerticalL" vertical>
              <template v-slot:before>
                <fit>
                  <safa-datatable
                    title="تامین پارکینگ"
                    fit
                    min-height="100px"
                    height="100%"
                    max-height="100%"
                    v-model="value.Base_SupplyParking"
                    :columns="supplyParking"
                    :m="m"
                    :showRowNumber="false"
                    :show-selected-checkbox="false"
                    :allowMultipleSelection="false"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-datatable
                    title=" ضمائم "
                    fit
                    min-height="100px"
                    height="100%"
                    max-height="100%"
                    v-model="value.Base_Attachment"
                    helper="baseAttachment"
                    :m="m"
                    :showRowNumber="false"
                    :show-selected-checkbox="false"
                    :allowMultipleSelection="false"
                  />
                </fit>
              </template>
            </safa-splitter>
          </fit>
        </template>
      </safa-splitter>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-combo
            label=" موقعیت زمین"
            label-width="100px"
            ciName="CI_GeoStatus"
            domainName="Estate"
            v-model="value.Base_ShopInfo.CI_GeoStatus"
            :m="m"
          />
        </form-control>
        <form-control>
          <safa-combo
            label=" موقعیت تجاری"
            label-width="100px"
            ciName="CI_TradingStatus"
            domainName="Estate"
            v-model="value.Base_ShopInfo.CI_TradingStatus"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-combo
            label="محل استقرار"
            label-width="100px"
            ciName="CI_JobStateStatus"
            domainName="Estate"
            v-model="value.Base_ShopInfo.CI_JobStateStatus"
            :m="m"
          />
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-combo
            label="تاریخ تاسیس واحد تجاری"
            label-width="100px"
            ciName="CI_GeoStatus"
            domainName="Estate"
            v-model="value.Base_ShopInfo.CreateUnitDate"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-text
            label="ارتفاع مفید"
            label-width="100px"
            v-model="value.Base_ShopInfo.Hight"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-text
            label="تعداد دربند"
            label-width="100px"
            v-model="value.Base_ShopInfo.DarbandCount"
            :m="m"
          />
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="مساحت فضای باز تجاری"
            label-width="100px"
            v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-text
            label="مساحت سهم العرصه"
            label-width="100px"
            v-model="value.Base_ShopInfo.ToftImpart"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-text
            label="مساحت کل زیربنا(واحد تجاری)"
            label-width="100px"
            v-model="value.Base_ShopInfo.TotalArea"
            :m="m"
          />
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-combo
            label="نوع سند"
            label-width="100px"
            ciName="CI_DocType"
            domainName="Estate"
            v-model="value.Base_CommonEstate.CI_DocType"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-combo
            label="وضعیت سند"
            label-width="100px"
            ciName="CI_DocStatus"
            domainName="Estate"
            v-model="value.Base_CommonEstate.CI_DocStatus"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-combo
            label="نوع مالکیت"
            label-width="100px"
            ciName="CI_OwnerType"
            domainName="Estate"
            v-model="value.Base_CommonEstate.CI_OwnerType"
            :m="m"
          />
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="نام کاربر ایجاد کننده"
            v-model="value.Base_ShopInfo.UserName"
            label-width="100px"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-datepicker
            label="تاریخ ایجاد"
            v-model="value.Base_ShopInfo.CreateDate"
            label-width="100px"
            :m="m"
          />
        </form-control>
      </div>
    </fit>
  </safa-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      splitterValueHorizontal: 50,
      splitterValueVerticalR: 50,
      splitterValueVerticalL: 50,

      // columns:
      baseFileId: [
        { title: "شماره شناسایی پرونده مادر", field: "FileIdMother" }
      ],

      supplyParking: [
        {
          title: "کد نوع تامین پارکینگ",
          field: "CI_SupplyParkingType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "کد نحوه تامین پارکینگ",
          field: "CI_SupplyParkingHow",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "کد نوع مالکیت پارکینگ",
          field: "CI_OwnerParkingType",
          editor: "combo",
          domain: "Estate"
        },
        { title: "شماره طبقه", field: "FloorNo", editor: "numeric" },
        { title: "تعداد درب", field: "DoorCount" },
        { title: "مساحت", field: "Area" }
      ]
    }
  }
}
</script>
