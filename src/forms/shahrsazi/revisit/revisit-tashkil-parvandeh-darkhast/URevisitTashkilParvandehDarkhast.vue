<template>
  <safa-form
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :padding="false" title="تشکیل پرونده درخواست">
      <formHeader :task-info="taskInfo" />
      <safa-status :result="result" />
       <base-house-info-revisit
        v-if="revisitShow === 'house'"
        v-model="revisitOfRequest"
        :name="name"
      />

      <base-building-info-revisit-request
        v-else-if="revisitShow === 'building'"
        :formKey=formKey
        title="شهرسازی- تشکیل پرونده درخواست ساختمان"
        v-model="revisitOfRequest"
      />

      <base-apartment-info-revisit
        v-else-if="revisitShow === 'apartment'"
        :formKey=formKey
        title="شهرسازی - تشکیل پرونده درخواست آپارتمان"
        v-model="revisitOfRequest"
      />

      <base-house-sharing-info-revisit
        v-else-if="revisitShow === 'device'"
        :formKey=formKey
        title="شهرسازی - تشکیل پرونده درخواست دستگاه"
        v-model="revisitOfRequest"
      />

      <base-shop-info-revisit
        v-else-if="revisitShow === 'shop'"
        :formKey=formKey
        :title="title"
        v-model="revisitOfRequest"
      />
    </form-wrapper>
  </safa-form>
</template>

<script>
import loadRequestHeaderRequest from "../revisit-info/models/loadRequestHeaderRequest"
import BaseHouseInfoRevisit from "./partials/base-house-info-revisit/BaseHouseInfoRevisit"
import BaseBuildingInfoRevisitRequest from "./partials/base-building-info-revisit/BaseBuildingInfoRevisitRequest"
import BaseApartmentInfoRevisit from "./partials/base-apartment-info-revisit/BaseApartmentInfoRevisit"
import BaseHouseSharingInfoRevisit from "./partials/base-house-sharing-info-revisit/BaseHouseSharingInfoRevisit"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  route: "/revisit/tashkil-parvandeh-darkhast",
  mixins: [baseFormMixin],
  components: {
    BaseHouseSharingInfoRevisit,
    BaseApartmentInfoRevisit,
    BaseBuildingInfoRevisitRequest,
    BaseHouseInfoRevisit
  },

  data () {
    return {
      // formkey ba id sidebar bayad yeki bashad ,dar gheyre in surat moshkel dastresi khahim dasht
      title: "تشکیل پرونده درخواست",
      formKey: "17F4DC30-E76E-4E54-BE09-76FA25420F45",
      name: "URevisitTashkilParvandehDarkhast",
      main: true,
      sidebarCompatible: true,
      result: null,
      baseNosaziCode: {},
      requestHeader: { ...loadRequestHeaderRequest }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    },
    IsMashhadConfigSet () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("esupParams").IsMashhad
    },
    revisitOfRequest () {
      if (
        !this.requestHeader.MainObj ||
        !this.requestHeader.HouseObj ||
        !this.requestHeader["Sh_RequestInfo"]
      ) {
        return {}
      }
      const target =
        (this.IsMashhadConfigSet &&
          this.requestHeader.MainObj.EumNosaziCodeObjType === 3) ||
        this.requestHeader.MainObj.EumNosaziCodeObjType === 6
          ? this.requestHeader.HouseObj
          : this.requestHeader.MainObj
      return {
        ...target,
        NidProc: this.requestHeader["Sh_RequestInfo"].NidProc
      }
    },
    revisitShow () {
      if (this.revisitOfRequest.EumNosaziCodeObjType === 2) {
        return "house"
      } else if (
        !this.IsMashhadConfigSet &&
        this.revisitOfRequest.EumNosaziCodeObjType === 3
      ) {
        return "building"
      } else if (
        this.IsMashhadConfigSet &&
        this.revisitOfRequest.EumNosaziCodeObjType === 3
      ) {
        return "house"
      } else if (this.revisitOfRequest.EumNosaziCodeObjType === 4) {
        return "apartment"
      } else if (this.revisitOfRequest.EumNosaziCodeObjType === 5) {
        return "device"
      } else if (this.revisitOfRequest.EumNosaziCodeObjType === 6) {
        return "shop"
      }
      return ""
    }
  },
  methods: {
    async load () {
      if (!this.selectedRequest) {
        return this.showError("هیچ درخواستی در کارتابل انتخاب نشده است")
      }
      const { BizCode, NidProc } = this.selectedRequest
      this.baseNosaziCode = convertStringToNosaziCodeObject(BizCode)
      this.requestHeader = { ...loadRequestHeaderRequest }

      try {
        this.showLoading()
        // Fetch Request Header
        let response = await this.$services.SA.loadRequestHeader(
          {
            pNidProc: NidProc,
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.result = this.getResponse(response.data)
        if (this.result.success !== true) {
          return this.showError("هدر درخواست بارگذاری نشد")
        }
        this.requestHeader = this.result.data

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.BizCode,
          bizCodeTitle: "کد نوسازی"
        })

        // end
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
        if (this.$refs.tree) {
          this.$refs.tree.expandAll()
        }
      }
    }
  },
  mounted () {
    this.load()
  }
}
</script>
