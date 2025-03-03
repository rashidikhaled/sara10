<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_RequesterType"
          cdcName="CI_RequesterType"
          label="شرکت خدماتی"
          label-width="80px"
          :m="m"
          source-type="local"
          :options="requesterTypeSource"
          ref="ciRequesterType"
          required
          :validations="['required', validations.CI_RequesterType]"
        />
      </FormControl>
      <FormControl :class="{'flex no-wrap items-center': !noSelectinCIRequesterType }">
        <safa-combo
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_RedirectName"
          cdcName="CI_RedirectName"
          label="نام تابعه"
          label-width="80px"
          source-type="local"
          :options="redirectNameOptions"
          :m="m"
          required
          :validations="['required', validations.CI_RedirectName]"
          :class="{'col': !noSelectinCIRequesterType}"
        />
        <q-icon color="primary" name="info" size="sm" v-if="!noSelectinCIRequesterType">
          <q-tooltip> مقدار فیلد نام تابعه از تنظیمات کاربر خوانده میشود. </q-tooltip>
        </q-icon>
      </FormControl>
      <FormControl>
        <safa-combo
          label="عنوان پروژه"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_Project"
          cdcName="CI_Project"
          :m="m"
          ciName="CI_Project"
          domain-name="Dig"
          required
          :validations="['required', validations.CI_Project]"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد رهگیری"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.NIdWorkItem"
          cdcName="NIdWorkItem"
          m="r"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.CI_Region"
          source-type="local"
          :options="districts"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ناحیه"
          label-width="80px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.RequesterRegion
          "
          cdcName="RequesterRegion"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آدرس مسیر حفاری بلوار"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.Boulevard"
          cdcName="Boulevard"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان اصلی"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.MainStreet"
          cdcName="MainStreet"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="خیابان فرعی"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.ByStreet"
          cdcName="ByStreet"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه اصلی"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.MainAlley"
          cdcName="MainAlley"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کوچه فرعی"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.ByAlley"
          cdcName="ByAlley"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-map-measure
          v-model="
            value.ClsRequestService_Info.RequestService_Info.DigPathLength
          "
          cdcName="DigPathLength"
          label="طول ترسیم"
          label-width="80px"
          required
          :validations="['required', validations.digPathLength]"
          @getMapInfo="getMapInfo"
          :m="m"
        />
      </FormControl>
      <!-- <FormControl>
        <safa-text
          label="طول ترسیم"
          label-width="80px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.DigPathLength
          "
          cdcName="DigPathLength"
          required
          :validations="['required', validations.digPathLength]"
          :m="m"
        >
          <template v-slot:append>
            <q-icon
              v-if="m === 'e'"
              title="درج خط"
              style="position: relative; right: 9px; font-size: 24px"
              @click="drawingLengthModal = true"
              color="primary"
              name="square_foot"
              class="cursor-pointer"
            />
          </template>
        </safa-text>
      </FormControl> -->
      <FormControl>
        <safa-text
          label="تلفن همراه پیگیری کننده"
          label-width="80px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.FollowerCellphoneNo
          "
          cdcName="FollowerCellphoneNo"
          :validations="
            value.ClsRequestService_Info.RequestService_Info
              .FollowerCellphoneNo &&
            value.ClsRequestService_Info.RequestService_Info
              .FollowerCellphoneNo !== ''
              ? validations.mobile
              : ''
          "
          type="number"
          dir="ltr"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام پیگیری کننده"
          label-width="80px"
          v-model="value.ClsRequestService_Info.RequestService_Info.FollowerName "
          cdcName="FollowerName "
          :m="m"
        />
      </FormControl>
    </FormRow>
    <div class="row q-mb-sm">
      <text-template
        label="توضیحات درخواست"
        label-width="80px"
        v-model="value.ClsRequestService_Info.RequestService_Info.Description"
        cdcName="Description"
        type="textarea"
        :rows="2"
        :m="m"
      />
    </div>
    <safa-datatable
      title="مدت زمان و اجرای عملیات حفاری (پیشنهادی درخواست)"
      v-model="value.ClsRequestService_Info.RequestService_Time"
      cdcName="RequestService_Time"
      :columns="requestServiceTimeColumns"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      :m="m"
      :defaultNewRow="defaultNewRow"
      min-height="350px"
      height="100%"
      max-height="100%"
      @update="updateRequestServiceTime"
      fit
      required
      validations="required"
    />

    <safa-popup
      title=""
      width="600px"
      height="315px"
      v-model="drawingLengthModal"
    >
      <fit>
        <div class="fit">
          <q-scroll-area class="full-height q-px-sm">
            <EditPoint allowEdit />
          </q-scroll-area>
        </div>
        <q-separator class="q-gutter-sm q-mt-sm" />
        <div class="q-gutter-sm q-pa-sm">
          <btn-default label="اعمال" @click="drawingLength" />
          <btn-cancel @click="drawingLengthModal = false" />
        </div>
      </fit>
    </safa-popup>
  </fit>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import EditPoint from "kais-map/src/lib-components/dialogs/EditPoint.vue"

export default {
  mixins: [baseFormMixin],
  components: { EditPoint },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String,
    noSelectinCIRequesterType: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      drawingLengthModal: false,
      defaultNewRow: {
        AgainRenewal: null,
        CI_CauseRenewal: 0,
        CI_Phase: 0,
        Delay: 0,
        Description: null,
        Duration: 0,
        EndDate: null,
        EndTime: null,
        NIdRequestService: "00000000-0000-0000-0000-000000000000",
        NIdTime: "00000000-0000-0000-0000-000000000000",
        RegDate: null,
        StartDate: currentDate(),
        StartTime: null,
        Total: 0
      },
      redirectNameOptions: [],
      requesterTypeSource: [],
      requestServiceTimeColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          editor: "combo",
          domain: "Dig",
          validations: "required",
          width: "130px"
        },
        {
          field: "StartDateExtension",
          title: "تاریخ شروع",
          editor: "date",
          validations: "required",
          width: "130px"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          editor: "date",
          validations: "required",
          width: "130px"
        },
        {
          field: "Duration",
          title: "مدت (روز)",
          editable: false,
          width: "60px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "300px"
        }
      ],
      validations: {
        mobile: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        digPathLength: Joi.custom(
          function (value, helper) {
            if (
              this.value.ClsRequestService_Info.RequestService_Info
                .DigPathLength === 0
            ) {
              return helper.message("مقدار 0 برای طول ترسیم مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_RequesterType: Joi.custom(
          function (value, helper) {
            if (this.value.ClsRequestService_Info.RequestService_Info.CI_RequesterType === 0) {
              return helper.message("مقدار نامشخص مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_RedirectName: Joi.custom(
          function (value, helper) {
            if (this.value.ClsRequestService_Info.RequestService_Info.CI_RedirectName === 0) {
              return helper.message("مقدار نامشخص مجاز نمی باشد.")
            }
            return true
          }.bind(this)
        ),
        CI_Project: Joi.custom(
          function (value, helper) {
            if (
              this.value.ClsRequestService_Info.RequestService_Info
                .CI_Project === 0
            ) {
              return helper.message(
                "مقدار وارد شده برای عنوان پروژه مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  computed: {
    customMode () {
      if (this.noSelectinCIRequesterType === false) {
        return "r"
      } else return this.m
    },
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    ciRequesterTypeTitle () {
      return this.$refs.ciRequesterType.selectedItem.Title ?? ""
    }
  },
  watch: {
    "value.ClsRequestService_Info.RequestService_Info.DigPathLength ": {
      handler () {
        if (
          this.value.ClsRequestService_Info.RequestService_Info
            .DigPathLength === "" ||
          this.value.ClsRequestService_Info.RequestService_Info
            .DigPathLength === null
        ) {
          this.value.ClsRequestService_Info.RequestService_Info.DigPathLength = 0
        }
      },
      immediate: true
    },
    "value.ClsRequestService_Info.RequestService_Info.CI_RequesterType": {
      handler (newVal, oldVal) {
        if (this.noSelectinCIRequesterType) return
        if (!Array.isArray(this.requesterTypeSource) || this.requesterTypeSource.length === 0) return
        // this.value.ClsRequestService_Info.RequestService_Info.CI_RedirectName = this.requesterTypeSource?.find(f => f.ID === newVal)?.RedirectName ?? 0
        const updatedRedirectNameList = this.requesterTypeSource?.find(f => f.ID === newVal)?.RedirectName
        if (Array.isArray(updatedRedirectNameList) && updatedRedirectNameList.length > 0) {
          this.getRedirectNameList(updatedRedirectNameList)
          this.value.ClsRequestService_Info.RequestService_Info.CI_RedirectName = updatedRedirectNameList[0].ID
        }
      },
      immediate: true
    }
  },
  methods: {
    drawingLength () {
      // متد this.$KaisMap.StrEDITWKT در حال حاضر مقدار this.$KaisMap.StrEDITWKT برمیگرداند . برای این فرم نیاز هیت مقدار عددی برگرداند که طول ترسیم ارسال شود . برای همین  موقتا کد زیر کامنت شد. طبق گفته ی آقای حیدری در ورژن بعدی نقشه این مورد اصلاح میشود.

      // this.value.ClsRequestService_Info.RequestService_Info.DigPathLength =
      //   this.$KaisMap.StrEDITWKT === 'LINESTRING()' ? '' : this.$KaisMap.StrEDITWKT
      this.drawingLengthModal = false
    },
    updateRequestServiceTime () {
      this.$emit("updateRequestServiceTime")
    },
    getWKT (WKT) {
      this.$emit("getWKT", WKT)
    },
    async getRedirectNameList (list) {
      try {
        this.showLoading()
        if (list && list.length > 0) {
          this.redirectNameOptions = list
        } else {
          const payload = {
            CI_RequesterType:
            this.value.ClsRequestService_Info?.RequestService_Info
              ?.CI_RequesterType ?? 0
          }
          const { data } = await this.$services.excavation.getClsCIRedirectName(
            payload
          )
          const res = this.getResponse(data)
          if (res.success) {
            this.redirectNameOptions =
            res.data.GetClsCI_RedirectNameResult?.CI_RedirectName ?? []
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getMapInfo (e) {
      this.$emit("getMapInfo", e)
    },
    fillRequesterInfoSource (list, handleProcess = false) {
      if (handleProcess) {
        if (list && Object.values(list).length > 0) {
          this.requesterTypeSource = Object.values(list)?.map((item) => ({
            ID: item.RequesterType.ID,
            Title: item.RequesterType.Title,
            RedirectName: item?.RedirectName
          })) ?? []

          const activeRedirectName = this.requesterTypeSource.find(e => e.ID === this.value.ClsRequestService_Info.RequestService_Info.CI_RequesterType)
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
