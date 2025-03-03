<template>
  <safa-splitter
    v-model="splitterModel"
    horizontal
  >
    <template v-slot:before>
      <fit>
        <div class="row q-col-gutter-x-sm full-height">
          <div class="col-12 col-md-6">
            <safa-datatable
              title="فاقد وضعیت مجاز"
              :columns="eUsingRevisitColumns"
              v-model="value.data.Contrast_BuildingUsing_Revisit"
              fit
              height="100%"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-datatable
              title="مجازهای استفاده "
              :columns="eUsingOtherColumns"
              v-model="value.data.Contrast_BuildingUsing_Other"
              fit
              height="100%"
            />
          </div>
        </div>
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <safa-datatable
          title="مغایرت"
          :columns="eUsingContColumns"
          v-model="value.Contrast_BuildingUsing_Contrast"
        />
      </fit>
    </template>
  </safa-splitter>

</template>

<script>
export default {
  name: 'TabBaseUsingContrast',
  props: {
    value: Object
  },

  data () {
    return {
      eUsingRevisit: true,
      splitterModel: 50,
      eUsingRevisitColumns: [
        { field: 'BuildingNo', title: 'شماره ساختمان موجود', width: 200 },
        { field: 'FloorNo', title: 'طبقه موجود', width: 200 },
        {
          field: 'CI_UsingGroup',
          title: 'کاربری اصلی موجود',
          cell: 'grid-combo',
          width: 200
        },
        {
          field: 'CI_UsingType',
          title: 'کاربری فرعی موجود',
          cell: 'grid-combo',
          width: 200
        },
        {
          field: 'CI_RoofType',
          title: 'نوع سقف موجود',
          cell: 'grid-combo',
          width: 200
        },
        { field: 'UnitCount', title: 'تعداد واحد موجود', width: 200 },
        { field: 'UsingArea', title: 'مساحت کاربری موجود', width: 200 },
        { field: 'UsefulHeight', title: 'ارتفاع مفید موجود', width: 200 },
        { field: 'Dahaneh', title: 'دهنه موجود', width: 200 },
        { field: 'UnitNo', title: 'شماره واحد', width: 200 }
      ],
      eUsingOther: true,
      eUsingOtherColumns: [
        { field: 'BuildingNo', title: 'شماره ساختمان مجاز/پرونده', width: 200 },
        { field: 'FloorNo', title: 'طبقه مجاز/پرونده', width: 200 },
        {
          field: 'CI_UsingGroup',
          title: 'کاربری اصلی مجاز/پرونده',
          cell: 'grid-combo',
          width: 200
        },
        {
          field: 'CI_UsingType',
          title: 'کاربری فرعی مجاز/پرونده',
          cell: 'grid-combo',
          width: 200
        },
        {
          field: 'CI_RoofType',
          title: 'نوع سقف مجاز/پرونده',
          cell: 'grid-combo',
          width: 200
        },
        { field: 'UnitCount', title: 'تعداد واحد مجاز/پرونده', width: 200 },
        { field: 'UsingArea', title: 'مساحت کاربری مجاز/پرونده', width: 200 },
        { field: 'UsefulHeight', title: 'ارتفاع مفید مجاز/پرونده', width: 200 },
        { field: 'Dahaneh', title: 'دهنه مجاز/پرونده', width: 200 }
      ],
      eUsingCont: true,
      eUsingContColumns: [
        { field: 'BuildingNo', title: 'شماره ساختمان موجود', width: 200 },
        { field: 'FloorNo', title: 'طبقه موجود', width: 200 },
        {
          field: 'CI_UsingGroup',
          title: 'کاربری اصلی موجود',
          cell: 'grid-combo',
          width: 200
        },
        {
          field: 'CI_UsingType',
          title: 'کاربری فرعی موجود',
          cell: 'grid-combo',
          width: 200
        },
        {
          field: 'CI_RoofType',
          title: 'نوع سقف موجود',
          cell: 'grid-combo',
          width: 200
        },

        { field: 'UnitCount_Other', title: 'تعداد واحد موجود', width: 200 },
        { field: 'UnitCount_Rev', title: 'تعداد واحد مجاز/پرونده', width: 200 },
        { field: 'UnitCount_Cont', title: 'مغایرت تعداد واحد', width: 200 },

        { field: 'UsingArea_Other', title: 'مساحت کاربری موجود', width: 200 },
        {
          field: 'UsingArea_Rev',
          title: 'مساحت کاربری مجاز/پرونده',
          width: 200
        },
        { field: 'UsingArea_Cont', title: 'مغایرت مساحت کاربری', width: 200 },

        { field: 'UsefulHeight_Other', title: 'ارتفاع مفید موجود', width: 200 },
        {
          field: 'UsefulHeight_Rev',
          title: 'ارتفاع مفید مجاز/پرونده',
          width: 200
        },
        { field: 'UsefulHeight_Cont', title: 'مغایرت ارتفاع مفید', width: 200 },

        { field: 'Dahaneh_Other', title: 'دهنه موجود', width: 200 },
        { field: 'Dahaneh_Rev', title: 'دهنه مجاز/پرونده', width: 200 },
        { field: 'Dahaneh_Cont', title: 'مغایرت دهنه', width: 200 }
      ]
    }
  }
}
</script>
