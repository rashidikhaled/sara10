<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="پلاک آبی"
          labelWidth="85px"
          type="number"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          :labelWidth="$q.screen.lt.md ? '85px' : '70px'"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="تلفن"
          type="number"
        />

        <safa-text
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          :labelWidth="$q.screen.lt.md ? '85px' : 'auto'"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت وضع موجود"
          type="number"
        />
        <safa-text
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          :labelWidth="$q.screen.lt.md ? '85px' : 'auto'"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت پس از رعایت بر اصلاحی"
          m="r"
          type="number"
        />
        <safa-text
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          :labelWidth="$q.screen.lt.md ? '85px' : 'auto'"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت باقیمانده"
          m="r"
          type="number"
        />
        <safa-text
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          :labelWidth="$q.screen.lt.md ? '85px' : '70px'"
          :m="m"
          class="col-12 col-md-9 "
          label="آدرس"
        />
      </div>
    </internal-section>
    <safa-splitter
      v-model="horizontalSplitter"
      :min-height="$q.screen.lt.md ? '800px' : '150px'"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            :horizontal="$q.screen.lt.md"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_AddressPostCode"
                  cdcName="Base_AddressPostCode"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseAddressPostCode"
                  max-height="100%"
                  min-height="150px"
                  title="کد پستی"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_RegisterPlack"
                  cdcName="Base_RegisterPlack"
                  :m="m"
                  fit
                  height="100%"
                  helper="registerPlack"
                  max-height="100%"
                  min-height="150px"
                  title="پلاک ثبتی"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            cdcName="verticalSplitter"
            :horizontal="$q.screen.lt.md"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_File"
                  cdcName="Base_File"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseFile"
                  max-height="100%"
                  min-height="150px"
                  title="شماره شناسایی پرونده"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_PreCodeInfo"
                  cdcName="Base_PreCodeInfo"
                  :m="m"
                  fit
                  height="100%"
                  helper="basePreCodeInfo"
                  max-height="100%"
                  min-height="150px"
                  title="کد قدیم"
                />
              </fit>
            </template>
          </safa-splitter>

        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabAddress',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50,
      verticalSplitter: 50
    }
  }
}
</script>
