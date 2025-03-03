<template>
  <safa-form :id="formKey"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77">
    <form-wrapper :title="title">
      <template>
        <!-- <safa-status :result="getAllJobLocationsResult" /> -->
        <safa-status :result="getAllJobLocationsResult" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نام"
              label-width="90px"
              v-model="model.dutyPlace.name"
              required
              validations="required"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="کد شهر"
              label-width="90px"
              v-model="model.dutyPlace.CI_City"
              ciName="CI_City"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام شهر"
              label-width="90px"
              v-model="model.dutyPlace.city"
              required
              validations="required"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="حوزه های کاری مجاز"
              label-width="90px"
              v-model="model.dutyPlace.allowDomains"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام مدیر"
              label-width="90px"
              cdcName="username"
              v-model="model.dutyPlace.managerUserFullName"
              required
              validations="required"
              m="r"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px"
                  size="xs"
                  color="primary"
                  :disabled="!isEditable"
                  @click="managerSearch"
                  name="search"
                  class="cursor-pointer"
                  title="جستجوی نام مدیر"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              label="نام دفتر"
              label-width="90px"
              v-model="model.dutyPlace.officeName"
              required
              validations="required"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="آدرس دفتر"
              label-width="90px"
              v-model="model.dutyPlace.officeAddress"
              required
              validations="required"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تلفن دفتر"
              label-width="90px"
              v-model="model.dutyPlace.officeTell"
              required
              validations="required"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="دورنگار دفتر"
              label-width="90px"
              v-model="model.dutyPlace.officeFax"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="طول جغرافیایی"
              label-width="90px"
              v-model="model.dutyPlace.longitude"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="عرض جغرافیایی"
              label-width="90px"
              v-model="model.dutyPlace.latitude"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ شروع"
              label-width="90px"
              v-model="model.dutyPlace.startDate"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ پایان"
              label-width="90px"
              v-model="model.dutyPlace.endDate"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="دامنه"
              label-width="90px"
              v-model="model.dutyPlace.domain"
              required
              validations="required"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="توضیحات"
              label-width="90px"
              v-model="model.dutyPlace.comment"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <safa-datatable
          v-model="joblocationList"
          :columns="dutyPlaceColumns"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          m="r"
          paginate
          :take="20"
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          showNewButton
          :showEditButton="false"
          @newInfo="isEditable = true"
          @cancel="reset"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
    <safa-popup
      v-model="showManagerSearch"
      title="اضافه کردن مدیر"
      width="1000px"
    >
      <manager-selector
        :name="name"
        :formKey="formKey"
        @selectedManager="managerName"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ManagerSelector from "./partials/ManagerSelector.vue"

const defaultModel = {
  CI_City: 0,
  NidJobLocation: "",
  WKT: null,
  allowDomains: null,
  altitude: null,
  city: null,
  comment: "",
  domain: 6,
  endDate: null,
  latitude: null,
  longitude: null,
  managerUserFullName: null,
  managerUserGuide: "00000000-0000-0000-0000-000000000000",
  name: null,
  nosaziCode: "",
  officeAddress: null,
  officeFax: null,
  officeName: null,
  officeTell: null,
  securityServiceAddress: "",
  startDate: null
}

export default {
  mixins: [baseFormMixin],
  components: { ManagerSelector },
  data () {
    return {
      title: "محل خدمت",
      formKey: 'B65FE692-36EA-0001-0017-66B8EB0E9E77',
      name: "UDutyPlace",
      main: true,
      getAllJobLocationsResult: null,
      joblocationList: [],
      saveResult: null,
      showManagerSearch: false,
      model: { dutyPlace: { ...defaultModel } },
      dutyPlaceColumns: [
        {
          field: "city",
          title: "شهر",
          width: "100px"
        },
        {
          field: "name",
          title: "محل خدمت",
          width: "250px"
        },
        {
          field: "NidJobLocation",
          title: "GUID",
          width: "250px"
        }
      ]
    }
  },

  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.security
        .getAllJobLocations()
        .then(({ data }) => {
          this.getAllJobLocationsResult = this.getResponse(data)
          if (this.getAllJobLocationsResult.success) {
            this.joblocationList = this.getAllJobLocationsResult.data.data.list
            this.reset()
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (!this.isValidForm()) return
      const payload = {
        ...this.model.dutyPlace,
        allowDomains: this.model.dutyPlace.allowDomains,
        domain: this.$stSecurity.getters["authorize/user"].domain[0]
      }
      this.$services.security.addJobLocation(payload).then(({ data }) => {
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.loadObj()
        }
      })
    },

    reset () {
      this.model = {
        dutyPlace: {
          ...defaultModel
        }
      }
      this.isEditable = false
      this.resetValidation()
    },

    managerSearch () {
      if (!this.isEditable) return
      this.showManagerSearch = true
    },
    managerName (user) {
      this.showManagerSearch = false
      this.model.dutyPlace.managerUserFullName = user.username
      this.model.dutyPlace.managerUserGuide = user.NidUser
    }
  }
}
</script>
