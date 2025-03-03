<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="آدرس"
          v-model="getHouseResult.Base_AddressInfo.MainAddress"
          label-width="80px"
          :m="m"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک آبی"
          v-model="getHouseResult.Base_AddressInfo.Plack"
          label-width="80px"
          :m="m"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          v-model="getHouseResult.Base_AddressInfo.PostCode"
          label-width="80px"
          :m="m"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="کد اقتصادی"
          v-model="getHouseResult.Base_AddressInfo.EconomicCode"
          label-width="80px"
          :m="m"
        ></safa-text>
      </FormControl>
    </FormRow>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="q-mb-sm"
      margin="0"
      style="min-height: 250px"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="splitterModel"
            vertical
            margin="0"
            style="min-height: 250px"
          >
            <template v-slot:before>
              <fit>
                <safa-grid
                  v-model="getHouseResult.Base_PreCodeInfo"
                  helper="oldIdColumns"
                  :m="m"
                  title="شماره شناسایی قدیم"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>

            <template v-slot:after>
              <fit>
                <safa-grid
                  v-model="getHouseResult.Base_File"
                  helper="baseFileColumns"
                  :m="m"
                  title="شماره شناسایی پرونده"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <safa-grid
            v-model="getHouseResult.Base_Edge"
            helper="fourDirectionsColumns"
            :m="m"
            title="جهات اربعه"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
    </safa-splitter>

    <FormRow :sm="3" :md="3" :lg="3">
      <FormControl>
        <safa-text
          label="نام کاربر ایجاد کننده"
          v-model="getHouseResult.Base_HouseInfo.UserName"
          label-width="120px"
          m="r"
        ></safa-text>
      </FormControl>

      <FormControl>
        <safa-datepicker
          label="تاریخ ایجاد"
          v-model="getHouseResult.Base_HouseInfo.CreateDate"
          label-width="80px"
          m="r"
        ></safa-datepicker>
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    getHouseResult: {
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
      splitterModel: 50
    }
  }
}
</script>
