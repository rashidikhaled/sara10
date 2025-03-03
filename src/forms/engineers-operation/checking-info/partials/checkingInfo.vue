<template>
  <fit>
    <FormRow :xl="3" :lg="3" :md="3" :sm="2" class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره ارجاع"
          label-width="100px"
          v-model="dataModel.Fil_Info.NidWorkItem"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text label="نام مالک" label-width="100px" m="r"/>
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی"
          label-width="100px"
          v-model="dataModel.Fil_Info.RegisterPlack"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت زیر بنا"
          label-width="100px"
          v-model="dataModel.Fil_Info.infrastructure"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد سقف"
          label-width="100px"
          v-model="dataModel.Fil_Info.Floor"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      v-model="dataModel.TitleList"
      :columns="columns"
      m="r"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      title="لیست عناوین"
    />
  </fit>
</template>
<script>
export default {
  props: {
    dataModel: Object
  },
  data () {
    return {
      columns: [
        { field: "CI_CheckingTitleInAbilityStudy", title: "عنوان", editor: 'combo', domain: 'engineer', width: '100px' },
        { field: "CI_CheckingTitleStatus", title: "وضعیت عنوان", editor: 'combo', domain: 'engineer', width: '100px' },
        { field: "IsOkInCheckerView", title: "آیا از نظر بازبین تایید شده است؟", editor: 'checkbox', width: '200px' },
        { field: "CheckerComments", title: "توضیحات بازبین", width: '200px' },
        { field: "Comments", title: "توضیحات", width: '200px' }
      ]
    }
  }
}
</script>
