<template>
  <fit>
    <div class="q-pa-sm">
      <form-row :sm="2" :md="2" :lg="2" :xl="2">
        <form-control>
          <safa-text
            v-model="dataContext.Base_BlockInfo.FamousRegion"
            label="محل مشهور :"
            label-width="105px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_BlockInfo.NoResidentialApartmentCount"
            label="تعداد کسب و پیشه :"
            label-width="105px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_BlockInfo.PathCount"
            label="تعداد معبر :"
            label-width="105px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_BlockInfo.BuildingCount"
            label="تعداد ساختمان :"
            label-width="105px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_BlockInfo.HouseCount"
            label="تعداد ملک :"
            label-width="105px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_BlockInfo.GlobalBlockNo"
            label="شماره بلوک دفترچه ارزش معاملاتی :"
            label-width="105px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_BlockInfo.ApartmentCount"
            label="تعداد آپارتمان :"
            label-width="105px"
            m="r"
          />
        </form-control>
        <!-- <form-control> // طبق اعلام آقای خوش ایین، این فیلد داخل دیتابیس وجود نداره، همچنین داخل سرا 8 هم بصورت نمایشیه و هیچ عملکردی نداره، بنابراین کامنت میشه
          safa-text label="تعداد دکل و آنتن" label-width="105px" :m="r" / :>
        </form-control> -->
        <form-control>
          <safa-checkbox
            v-model="dataContext.Base_BlockInfo.IsShapeBlock"
            label="شکل بلوک"
            label-width="105px"
            m="r"
          />
        </form-control>
      </form-row>
    </div>

    <q-separator class="q-mb-sm" />

    <div class="q-pa-sm q-gutter-y-sm">
      <safa-label>شماره شناسنامه :</safa-label>
      <form-row :sm="3" :md="3" :lg="3" :xl="3">
        <form-control>
          <safa-text
            v-model="dataContext.Base_NosaziCode.District"
            label="منطقه :"
            label-width="45px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_NosaziCode.Region"
            label="محله :"
            label-width="45px"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            v-model="dataContext.Base_NosaziCode.Block"
            label="بلوک :"
            label-width="45px"
            m="r"
          />
        </form-control>
      </form-row>
    </div>

    <q-separator />

    <div class="fit q-pa-sm">
      <!-- <div class="q-pa-sm"> -->
      <safa-splitter v-model="splitterModel" vertical>
        <template v-slot:before>
          <fit>
            <safa-grid
              helper="postalCodeMap"
              fit
              title="کدپستی"
              min-height="150px"
              height="100%"
              max-height="100%"
              m="r"
              v-model="dataContext.Base_AddressPostCode"
              :allowMultipleSelection="false"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              :columns="blockPathColumns"
              fit
              title="اطلاعات معابر"
              min-height="150px"
              height="100%"
              max-height="100%"
              m="r"
              v-model="dataContext.Base_BlockPath"
              :allowMultipleSelection="false"
            />
          </fit>
        </template>
      </safa-splitter>
    </div>
    <!-- </div> -->
  </fit>
</template>

<script>
export default {
  name: "USearchUBlockBlockInfo",

  props: {
    dataContext: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      blockPathColumns: [
        {
          field: "CI_SideCode",
          title: "جهت"
        },
        {
          field: "PathName",
          title: "نام معبر",
          width: 150
        },
        {
          field: "GlobalPathCode",
          title: "کد معبر یا مرز",
          width: 115
        },
        {
          field: "GlobalPathTitle",
          title: "نام معبر یا مرز",
          width: 120
        },
        {
          field: "PathWidth",
          title: "عرض معبر",
          width: 100,
          editor: "text"
        },
        {
          field: "PathLength",
          title: "طول معبر",
          width: 100,
          editor: "text"
        },
        {
          field: "PathCode",
          title: "کد معبر",
          width: 150
        },
        {
          field: "PathWidthPlan",
          title: "عرض معبر بر اساس طرح",
          width: 170
        },
        {
          field: "PlanDate",
          title: "تاریخ طرح",
          width: 105,
          editor: "date"
        },
        {
          field: "PlanBand",
          title: "بند طرح",
          width: 90
        },
        {
          field: "PlanSourceNo",
          title: "شماره مرجع طرح",
          width: 150
        },
        {
          field: "SourceCode",
          title: "کد مرجع",
          width: 150
        },
        {
          field: "MoveSideCode",
          title: "کد جهت حرکت",
          width: 150
        },
        {
          field: "GlobalBlockNo",
          title: "كدبلوك در دفترچه تقسيمات ارزشه",
          width: 250
        }
      ],
      splitterModel: 40
    }
  }
}
</script>
