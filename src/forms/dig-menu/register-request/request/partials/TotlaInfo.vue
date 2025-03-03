<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo
          v-model="value.Request_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          label="شرکت خدماتی"
          label-width="100px"
          :m="m"
          source-type="local"
          :options="requesterTypeSource"
          ref="ciRequesterType"
          required
          :validations="['required', validations.CI_RequesterType]"
        />
        <!-- <q-icon color="primary" name="info" size="sm">
          <q-tooltip> مقدار فیلد شرکت خدماتی از تنظیمات کاربر خوانده میشود. </q-tooltip>
        </q-icon> -->
      </FormControl>
      <FormControl :class="{'flex no-wrap items-center': !noSelectinCIRequesterType }">
        <!-- <safa-combo
          v-model="value.Request_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          label="نام تابعه"
          label-width="100px"
          domainName="Dig"
          ciName="CI_RedirectName"
          :m="m"
          required
          :validations="['required', validations.CI_RedirectName]"
          :class="{'col': !noSelectinCIRequesterType}"
        /> -->
        <safa-combo
          v-model="value.Request_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          label="نام تابعه"
          label-width="100px"
          source-type="local"
          :options="redirectNameOptions"
          :m="m"
          required
          :validations="['required', validations.CI_RedirectName]"
          class="col q-mr-sm"
        />
        <q-icon color="primary" name="info" size="sm" v-if="!noSelectinCIRequesterType">
          <q-tooltip> مقدار فیلد نام تابعه از تنظیمات کاربر خوانده میشود. </q-tooltip>
        </q-icon>
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          label="کد رهگیری"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Request_Info.CI_Region"
          cdcName="CI_Region"
          domainName="Dig"
          label="منطقه"
          required
          :validations="['required', validations.CI_Region]"
          label-width="100px"
          ciName="CI_Region"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request_Info.RequesterRegion"
          cdcName="RequesterRegion"
          label="ناحیه"
          label-width="100px"
          :m="m"
          required
          :validations="['required', 'number']"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="requesterType"
          cdcName="requesterType"
          domainName="Dig"
          label="نوع متقاضی"
          label-width="100px"
          ciName="CI_TypeApplicant"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-if="requesterType === 1"
          label="نام متقاضی"
          label-width="100px"
          v-model="requesterName"
          cdcName="requesterName"
          sourceType="local"
          :options="requesterNamesOptions"
          :m="m"
          ref="reqNameRef"
          required
          validations="required"
        />
        <safa-text
          v-else
          v-model="requesterName"
          cdcName="requesterName"
          label="نام متقاضی"
          label-width="100px"
          :m="m"
          required
          :validations="['required', 'string']"
        />
      </FormControl>
      <FormControl v-if="hasMandate">
          <safa-text
            label="شماره وکالت نامه"
            v-model="value.Request_Info.MandateNo"
            cdcName="MandateNo"
            :m="m"
            label-width="100px"
          />
        </FormControl>
        <FormControl v-if="hasMandate">
          <safa-datepicker
            label="تاریخ وکالت نامه"
            format="jYYYY/jMM/jDD"
            display-format="dddd jDD jMMMM jYYYY"
            v-model="value.Request_Info.MandateDate"
            cdcName="MandateDate"
            :m="m"
            label-width="100px"
          />
        </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request_Info.RequesterNationalCode"
          cdcName="RequesterNationalCode"
          label="کد ملی"
          label-width="100px"
          required
          type="number"
          :validations="['required', validations.nationalCode]"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="docInfo.PostCode"
          cdcName="PostCode"
          label="کد پستی"
          label-width="100px"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request_Info.TelNo"
          cdcName="TelNo"
          label="تلفن متقاضی"
          type="number"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-map-measure
          v-model="value.Request_Info.DigPathLength"
          cdcName="DigPathLength"
          label="طول ترسیم"
          label-width="100px"
          required
          :validations="['required', validations.DigPathLength]"
          @getMapInfo="getMapInfo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request_Info.CellphoneNo"
          cdcName="CellphoneNo"
          label="تلفن همراه متقاضی"
          label-width="100px"
          :m="m"
          required
          type="number"
          :validations="['required', validations.CellphoneNo]"
        />
      </FormControl>
      <safa-text
        v-model="docInfo.RequesterAddress"
        cdcName="RequesterAddress"
        label="آدرس ملک"
        label-width="100px"
        :m="m"
        required
        validations="required"
        class="col-12"
      />
      <text-template
        v-model="value.Request_Info.Description"
        cdcName="Description"
        label="توضیحات درخواست"
        label-width="100px"
        class="col-12"
        :rows="9"
        :m="m"
      />
    </FormRow>
  </fit>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
import customValidation from "src/utils/customValidation"

export default {
  mixins: [baseFormMixin],
  props: {
    m: String,
    noSelectinCIRequesterType: {
      type: Boolean,
      default: false
    },
    value: Object,
    docInfo: Object,
    requesterNamesOptions: Array
  },
  data () {
    return {
      requesterType: 0,
      hasMandate: false,
      ciRequesterMode: "r",
      requesterName: null,
      drawingLengthModal: false,
      redirectNameOptions: [],
      requesterTypeSource: [],
      validations: {
        requesterType: Joi.custom(
          function (value, helper) {
            if (this.requesterType === 0 || isNaN(this.requesterType)) {
              return helper.message(
                "مقدار وارد شده برای نوع متقاضی ، مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        ),
        nationalCode: customValidation.nationalCode,
        CellphoneNo: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        DigPathLength: Joi.custom(
          function (value, helper) {
            if (this.value.Request_Info.DigPathLength === 0) {
              return helper.message("مقدار 0 برای طول ترسیم مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_RequesterType: Joi.custom(
          function (value, helper) {
            if (this.value.Request_Info.CI_RequesterType === 0) {
              return helper.message("مقدار نامشخص مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_RedirectName: Joi.custom(
          function (value, helper) {
            if (this.value.Request_Info.CI_RedirectName === 0) {
              return helper.message("مقدار نامشخص مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_Region: Joi.custom(
          function (value, helper) {
            if (
              this.value.Request_Info.CI_Region === 0 ||
              this.value.Request_Info.CI_Region === null ||
              this.value.Request_Info.CI_Region === ""
            ) {
              return helper.message(
                "مقدار نامشخص برای فیلد منطقه مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  computed: {
    // customMode () {
    //   if (this.noSelectinCIRequesterType === false) {
    //     return "r"
    //   } else return this.m
    // },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  watch: {
    "value.Request_Info.DigPathLength": {
      handler () {
        if (
          this.value.Request_Info.DigPathLength === "" ||
          this.value.Request_Info.DigPathLength === null
        ) {
          this.value.Request_Info.DigPathLength = 0
        }
      },
      immediate: true
    },
    "value.Request_Info.CI_RequesterType": {
      handler (newVal, oldVal) {
        if (this.noSelectinCIRequesterType) return
        if (!Array.isArray(this.requesterTypeSource) || this.requesterTypeSource.length === 0) return
        // this.getRedirectNameList(newVal?.RedirectName)
        const updatedRedirectNameList = this.requesterTypeSource?.find(f => f.ID === newVal)?.RedirectName
        if (Array.isArray(updatedRedirectNameList) && updatedRedirectNameList.length > 0) {
          this.getRedirectNameList(updatedRedirectNameList)
          this.value.Request_Info.CI_RedirectName = updatedRedirectNameList[0].ID
        }
      },
      immediate: true
    },
    requesterName: {
      handler (newVal, oldVal) {
        if (this.requesterType === 1) {
          if (this.requesterNamesOptions.length > 0 && newVal !== '') {
            const req = this.requesterNamesOptions.find(f => f.ID === newVal)
            this.value.Request_Info.RequesterName = `${req.OwnerName ?? ""}` + " " + `${req.OwnerLastName ?? ""}`
            this.value.Request_Info.RequesterNationalCode = req.NationalCode || null
            this.value.Request_Info.TelNo = req.Telephone || null
            this.value.Request_Info.CellphoneNo = req.CellPhone || null

            // this.value.Request_Info.RequesterAddress = req.Address || null
            // this.value.Request_Info.PostCode = req.PostCode || null
          }
        }
      },
      immediate: true
    },
    requesterType () {
      this.requesterName = ""
      this.requesterLastName = ""
      this.value.Request_Info.TelNo = ""
      this.value.Request_Info.RequesterNationalCode = ""
      this.value.Request_Info.CellphoneNo = ""
      this.value.Request_Info.RequesterAddress = ""
      if (this.requesterType === 1) {
        this.hasMandate = false
      } else {
        this.hasMandate = true
      }
    }
  },
  methods: {
    getMapInfo (e) {
      this.$emit("getMapInfo", e)
    },
    async getRedirectNameList (list) {
      try {
        this.showLoading()
        if (list && list.length > 0) {
          this.redirectNameOptions = list
        } else {
          const { data } = await this.$services.excavation.getClsCIRedirectName({
            CI_RequesterType: this.value?.Request_Info?.CI_RequesterType ?? 0
          })
          const res = this.getResponse(data)
          if (res.success) {
            this.redirectNameOptions =
            res.data.GetClsCI_RedirectNameResult?.CI_RedirectName ?? []
          // this.$emit("getCIRedirectName")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    fillRequesterInfoSource (list, handleProcess = false) {
      if (handleProcess) {
        if (list && Object.values(list).length > 0) {
          this.requesterTypeSource = Object.values(list)?.map((item) => ({
            ID: item.RequesterType.ID,
            Title: item.RequesterType.Title,
            RedirectName: item?.RedirectName
          })) ?? []

          const activeRedirectName = this.requesterTypeSource.find(e => e.ID === this.value.Request_Info.CI_RequesterType)
          if (activeRedirectName) {
            this.getRedirectNameList(activeRedirectName.RedirectName)
          }
        }
      } else {
        this.requesterTypeSource = list?.map((item) => {
          return {
            ID: item.RequesterType[0].ID,
            Title: item.RequesterType[0].Title,
            RedirectName: item?.RedirectName
          }
        }) ?? []
        this.getRedirectNameList()
      }
    }
  }
}
</script>
