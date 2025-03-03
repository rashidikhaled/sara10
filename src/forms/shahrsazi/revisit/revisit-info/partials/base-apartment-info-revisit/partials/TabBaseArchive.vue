<template>
  <fit>
    <internal-section class="q-mt-sm" title="صورتجلسه تفکیک">
      <div class="row q-col-gutter-md">
        <safa-text
          v-model="value.Base_CommonEstate.TafkikNo"
          cdcName="TafkikNo"
          :m="m"
          class="col-12 col-sm-6"
          label="شماره صورتجلسه تفکیک"
          labelWidth="100px"
        />
        <safa-datepicker
          v-model="value.Base_CommonEstate.TafkikDate"
          cdcName="TafkikDate"
          :m="m"
          class="col-12 col-sm-6"
          label="تاریخ صورتجلسه تفکیک"
          labelWidth="100px"
        />
      </div>
    </internal-section>
    <safa-splitter
      v-model="secondHorizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="firsttHorizontalSplitter"
          :horizontal="$q.screen.lt.md"
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="value.Base_ShahrsaziArchive"
                cdcName="Base_ShahrsaziArchive"
                fit
                :m="m"
                helper="bazdidApartmentArchive"
                height="100%"
                max-height="100%"
                title="سوابق شهرسازی"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                v-model="value.Base_ShahrsaziArchiveHouse"
                cdcName="Base_ShahrsaziArchiveHouse"
                :m="r"
                fit
                helper="baseShahrsaziArchiveHouse"
                height="100%"
                max-height="100%"
                title="سوابق شهرسازی ملک"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_CommissionHistory"
            cdcName="Base_CommissionHistory"
            :m="m"
            fit
            helper="baseCommissionHistory"
            height="100%"
            max-height="100%"
            title="سوابق کمیسیونها"
          />
        </fit>
      </template>
    </safa-splitter>

    <div class="q-mt-sm">
      <text-template
        v-model="value.Base_CommonEstate.TafkikComments"
        cdcName="TafkikComments"
        :m="m"
        formKey="60121967-793b-4977-98f5-d6adf9f6d92a"
        identifier="78e2a76e-e3bc-46f5-8044-6a132e57c2a6"
        label="توضیحات صورتجلسه تفکیک"
      />
    </div>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "TabBaseArchive",
      firsttHorizontalSplitter: 50,
      secondHorizontalSplitter: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
