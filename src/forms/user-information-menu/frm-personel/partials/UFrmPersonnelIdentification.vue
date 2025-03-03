<template>
  <div>
    <FormRow :sm="4" :md="4" :lg="4" :xl="4">
      <FormControl>
        <safa-combo
          label="نوع درخواست :"
          label-width="95px"
          v-model="value.requestType"
          :options="requestTypeOptions"
          sourceType="local"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="محل خدمت :"
          label-width="95px"
          v-model="value.hkhedmatLocation"
          :options="khedmatLocationOptions"
          sourceType="local"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام کاربر :"
          label-width="95px"
          v-model="value.username"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="حوزه فعالیت :"
          label-width="95px"
          v-model="value.hozeFaaliat"
          :options="hozeFaaliatOptions"
          sourceType="local"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام :"
          label-width="95px"
          v-model="value.name"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره تلفن :"
          label-width="95px"
          v-model="value.tel"
          dir="ltr"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام خانوادگی :"
          label-width="95px"
          v-model="value.family"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره همراه :"
          label-width="95px"
          v-model="value.mobile"
          dir="ltr"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ملی :"
          label-width="95px"
          v-model="value.natioanlCode"
          type="number"
          dir="ltr"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ایمیل :"
          label-width="95px"
          v-model="value.email"
          :m="m"
          dir="ltr"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره شناسنامه :"
          label-width="95px"
          v-model="value.idNumber"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل صدور :"
          label-width="95px"
          v-model="value.birthPlace"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="سمت :"
          label-width="95px"
          v-model="value.post"
          :options="postOptions"
          sourceType="local"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع قراردادکاری :"
          label-width="95px"
          v-model="value.jobType"
          :options="jobTypeOptions"
          sourceType="local"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مناطق دارای دسترسی :"
          label-width="95px"
          v-model="value.allowDomain"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-label style="width: 95px">جنسیت :</safa-label>
        <div class="q-gutter-x-lg">
          <safa-radio label="آقا" :val="1" v-model="value.sex" />
          <safa-radio label="خانم" :val="2" v-model="value.sex" />
        </div>
      </FormControl>
      <FormControl>
        <safa-text
          label="سریال تبلت :"
          label-width="95px"
          v-model="value.tokenSerial"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تولد :"
          label-width="95px"
          v-model="value.birthDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ انقضاء کاربر :"
          label-width="95px"
          v-model="value.expireDateBorder"
          :m="m"
        />
      </FormControl>

      <safa-text
        type="textarea"
        label="آدرس محل سکونت :"
        label-width="95px"
        class="col-12"
        :rows="2"
        v-model="value.homeAddress"
        :m="m"
      />
    </FormRow>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "UFrmPersonnelIdentification",

  mixins: [baseFormMixin],

  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      name: "UFrmPersonnelIdentification",

      // Models

      requestTypeOptions: [
        { ID: "newUserMode", Title: "کاربر جدید" },
        { ID: "editUserMode", Title: "ویرایش کاربر" }
      ],

      khedmatLocationOptions: [],
      hozeFaaliatOptions: [],
      postOptions: [],
      jobTypeOptions: []
    }
  }
}
</script>
