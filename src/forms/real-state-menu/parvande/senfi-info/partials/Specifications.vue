<template>
  <safa-form id="" caption="مشخصات">
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="کد پستی"
            type="number"
            label-width="100px"
            v-model="Result.Base_AddressInfo.PostCode"
            :m="mode"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="کد اقتصادی"
            type="number"
            label-width="100px"
            v-model="Result.Base_AddressInfo.EconomicCode"
            :m="mode"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="پلاک آبی"
            type="number"
            label-width="100px"
            v-model="Result.Base_AddressInfo.Plack"
            :m="mode"
          ></safa-text>
        </form-control>
      </div>
      <div class="q-mb-sm">
        <div>
          <safa-text
            label="آدرس"
            label-width="100px"
            v-model="Result.Base_AddressInfo.MainAddress"
            :m="mode"
          ></safa-text>
        </div>
      </div>

      <safa-splitter v-model="splitterValueHorizontal" horizontal>
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
                  v-model="Result.Base_PreCodeInfo"
                  helper="oldIdColumns"
                  :m="mode"
                  :take="20"
                  :addRow="false"
                  :allowCopy="false"
                  :deleteRow="false"
                  :isEditable="true"
                  class="q-mb-sm"
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
                  v-model="Result.Base_File"
                  :columns="baseFileId"
                  :m="mode"
                  :take="20"
                  :addRow="false"
                  :allowCopy="false"
                  :deleteRow="false"
                  :isEditable="true"
                  class="q-mb-sm"
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
                    v-model="Result.Base_SupplyParking"
                    :columns="supplyParking"
                    :m="mode"
                    :take="20"
                    :addRow="false"
                    :allowCopy="false"
                    :deleteRow="false"
                    :isEditable="true"
                    class="q-mb-sm"
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
                    v-model="Result.Base_Attachment"
                    helper="baseAttachment"
                    :m="mode"
                    :take="20"
                    :addRow="false"
                    :allowCopy="false"
                    :deleteRow="false"
                    :isEditable="true"
                    class="q-mb-sm"
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
            v-model="Result.Base_ShopInfo.CI_GeoStatus"
            :m="mode"
          ></safa-combo>
        </form-control>
        <form-control>
          <safa-combo
            label=" موقعیت تجاری"
            label-width="100px"
            ciName="CI_TradingStatus"
            domainName="Estate"
            v-model="Result.Base_ShopInfo.CI_TradingStatus"
            :m="mode"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="محل استقرار"
            label-width="100px"
            ciName="CI_JobStateStatus"
            domainName="Estate"
            v-model="Result.Base_ShopInfo.CI_JobStateStatus"
            :m="mode"
          ></safa-combo>
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-combo
            label="تاریخ تاسیس واحد تجاری"
            label-width="100px"
            ciName="CI_GeoStatus"
            domainName="Estate"
            v-model="Result.Base_ShopInfo.CreateUnitDate"
            :m="mode"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-text
            label="ارتفاع مفید"
            label-width="100px"
            v-model="Result.Base_ShopInfo.Hight"
            :m="mode"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="تعداد دربند"
            label-width="100px"
            v-model="Result.Base_ShopInfo.DarbandCount"
            :m="mode"
          ></safa-text>
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="مساحت فضای باز تجاری"
            label-width="100px"
            v-model="Result.Base_ShopInfo.FreeSpaceNoTradingArea"
            :m="mode"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="مساحت سهم العرصه"
            label-width="100px"
            v-model="Result.Base_ShopInfo.ToftImpart"
            :m="mode"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="مساحت کل زیربنا(واحد تجاری)"
            label-width="100px"
            v-model="Result.Base_ShopInfo.TotalArea"
            :m="mode"
          ></safa-text>
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-combo
            label="نوع سند"
            label-width="100px"
            ciName="CI_DocType"
            domainName="Estate"
            v-model="Base_CommonEstate.CI_DocType"
            :m="mode"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="وضعیت سند"
            label-width="100px"
            ciName="CI_DocStatus"
            domainName="Estate"
            v-model="Base_CommonEstate.CI_DocStatus"
            :m="mode"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع مالکیت"
            label-width="100px"
            ciName="CI_OwnerType"
            domainName="Estate"
            v-model="Base_CommonEstate.CI_OwnerType"
            :m="mode"
          ></safa-combo>
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="نام کاربر ایجاد کننده"
            v-model="Result.Base_ShopInfo.UserName"
            label-width="100px"
            :m="m"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-datepicker
            label="تاریخ ایجاد"
            v-model="Result.Base_ShopInfo.CreateDate"
            label-width="100px"
            :m="m"
          ></safa-datepicker>
        </form-control>
      </div>
    </fit>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

const defaultModel = {
  Base_AddressInfo: {
    Alley: "",
    BlockNo: "",
    EconomicCode: "",
    FloorDone: "",
    MainAddress: "",
    Nid: "",
    NidCopy: "",
    Plack: "",
    PostCode: "",
    Sector: "",
    SubAddress: "",
    Telephone: "",
    Vahed: "",
    Base_PreCodeInfo: "",
    Base_File: "",
    Base_SupplyParking: "",
    Base_Attachment: ""
  },
  Base_ShopInfo: {
    CI_GeoStatus: "",
    CI_JobStateStatus: "",
    CI_TradingStatus: "",
    CreateDate: "",
    CreateUnitDate: "",
    DarbandCount: "",
    FreeSpaceNoTradingArea: "",
    Hight: "",
    Nid: "",
    NidCopy: "",
    NidUser: "",
    ToftImpart: "",
    TotalArea: "",
    UserName: ""
  }
}
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "Specifications",
      Base_CommonEstate: {
        CI_BuildingStep: null,
        CI_DocRefrence: null,
        CI_DocStatus: null,
        CI_DocType: null,
        CI_HouseUser: null,
        CI_OwnerType: null,
        CI_SideCode: null,
        CI_UsingGroup: null,
        CI_UsingType: null,
        Comments: null,
        CommercialGapWidth: null,
        DevotionName: null,
        DocComments: null,
        DocExportDate: null,
        DocTransferDate: null,
        Nid: null,
        NidCopy: null,
        Populations: null,
        RegisterSection: null,
        TafkikComments: null,
        TafkikDate: null,
        TafkikNo: null,
        TrusteeName: null
      },

      Result: {
        Base_AddressInfo: { ...defaultModel },
        Base_ShopInfo: { ...defaultModel },
        Base_Attachment: [],
        Base_PreCodeInfo: [],
        Base_SupplyParking: [],
        Base_File: []
      },
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
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          title: "کد نحوه تامین پارکینگ",
          field: "CI_SupplyParkingHow",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          title: "کد نوع مالکیت پارکینگ",
          field: "CI_OwnerParkingType",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        { title: "شماره طبقه", field: "FloorNo" },
        { title: "تعداد درب", field: "DoorCount" },
        { title: "مساحت", field: "Area" }
      ]
    }
  }
}
</script>
