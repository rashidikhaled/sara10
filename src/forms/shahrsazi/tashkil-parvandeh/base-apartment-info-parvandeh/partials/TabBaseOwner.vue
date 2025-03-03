<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نوع سند"
          label-width="90px"
          v-model="value.Base_CommonEstate.CI_DocType"
          cdcName="CI_DocType"
          ci-name="CI_DocType"
          domain-name="CI_SaraM1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت سند"
          label-width="90px"
          v-model="value.Base_CommonEstate.CI_DocStatus"
          cdcName="CI_DocStatus"
          ci-name="CI_DocStatus"
          domain-name="CI_SaraM1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع مالکیت"
          label-width="90px"
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مجموع کل زیربنا"
          label-width="90px"
          v-model="value.Base_ApartmentInfo.TotalArea"
          cdcName="TotalArea"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت زیربنای مشترکات"
          label-width="90px"
          v-model="value.Base_ApartmentInfo.SharingInfrastructure"
          cdcName="SharingInfrastructure"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت سهم العرصه"
          label-width="90px"
          v-model="value.Base_ApartmentInfo.ToftImpart"
          cdcName="ToftImpart"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت نما"
          label-width="90px"
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع نما"
          label-width="90px"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="بخش ثبتی"
          label-width="90px"
          v-model="value.Base_CommonEstate.RegisterSection"
          cdcName="RegisterSection"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صدور سند"
          label-width="90px"
          v-model="value.Base_CommonEstate.DocExportDate"
          cdcName="DocExportDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اثر"
          label-width="90px"
          v-model="value.Base_ApartmentInfo.ActDate"
          cdcName="ActDate"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="حقوق ارتفاقی"
          label-width="90px"
          v-model="value.Base_ApartmentInfo.HoughogheErtefaghi"
          cdcName="HoughogheErtefaghi"
          :m="m"
        />
      </FormControl>
    </FormRow>

    <safa-splitter v-model="spModel" class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <safa-grid
            title="پلاک ثبتی"
            v-model="value.Base_RegisterPlack"
            :checkboxSelection="true"
            rowSelection='multiple'
            helper="agBaseRegisterPlack"
            cdcName="Base_RegisterPlack"
            :m="m"
            fit
            paginate
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <!--  helper="shahrsazi.baseOwner" -->
          <safa-grid
            title="مالکین"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :checkboxSelection="true"
            rowSelection='multiple'
            :columns="baseOwnerParvandeInfo"
            :m="m"
            fit
            :allowCopy="true"
            :copyWithCount="true"
            paginate
            ref="baseOwner"
          />
        </fit>
      </template>
    </safa-splitter>

    <safa-popup
      title="استعلام ثبت احوال"
      v-model="showCheckSabtModal"
      width="300px"
      height="300px"
    >
      <UCheckSabteahval
        :baseNosaziCode="baseNosaziCode"
        :settingData="settingData"
        @changeDataAfterEstelam="changeDataAfterEstelam"
      />
    </safa-popup>
  </fit>
</template>

<script>
import { currentDate } from "src/utils/index"
import UCheckSabteahval from "../../check-sabteahval/UCheckSabteahval.vue"
export default {
  components: { UCheckSabteahval },
  name: "TabBaseOwner",
  props: {
    m: String,
    baseNosaziCode: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    settingData: {
      type: Object,
      default: () => ({
        Chk_IsCheckSabt: false,
        Chk_IsCheckSabtJson: false,
        Chk_IsCheckSabtWCF: false
      })
    }
  },
  data () {
    return {
      spModel: 30,
      showCheckSabtModal: false,
      isJson: false,
      isWCF: false,

      // این آرایه مربوط به ستون های گرید باید در دیتا وجود داشته باشد و به هلپر منتقل نشود ، چون روی ستون های آن با توجه به بیزینس تغییرات اعمال میشود.
      baseOwnerParvandeInfo: [
        {
          field: 'isSelected',
          width: '80px',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: 'center',
          headerAlign: 'center',
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
          // showDisabledCheckboxes: true,
          // editor: 'selection',
        },
        {
          field: "EumOwnerCharacter",
          title: "شخصیت",
          editor: "combo",
          source: [
            { ID: 1, Title: "حقیقی" },
            { ID: 2, Title: "حقوقی" }
          ],
          width: "100px"
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی/شخصیت حقوقی",
          width: "150px"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          width: "100px"
        },
        {
          field: "NationalCode",
          title: "کد ملی/کد اقتصادی",
          width: "150px"
          // cell: "EconomicCodeTemplate"
        },
        {
          field: "DateCheckSabt",
          title: "تاریخ استعلام ثبت احوال",
          width: "100px",
          editor: "date",
          editable: false
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر /کد سازمانی",
          width: "150px"
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه/شماره ثبت",
          width: "150px",
          editor: "numeric",
          cell: "NationalCodeTemplate"
        },
        {
          field: "Telephone",
          title: "تلفن",
          width: "100px",
          params: {
            pattern: ["[0-9]", "فقط عدد قابل قبول میباشد"],
            type: "numeric"
          }
        },
        {
          field: "ToftImpart",
          title: "سهم عرصه",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "ToftDang",
          title: "دانگ عرصه",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "ToftHabeh",
          title: "حبه عرصه",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "AyanImpart",
          title: "سهم اعیان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "AyanDang",
          title: "دانگ اعیان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "AyanHabeh",
          title: "حبه اعیان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "150px"
        },
        {
          field: "EconomicID",
          title: " شناسه ملی",
          width: "150px"
        },
        {
          field: "EmissionPlace",
          title: "محل صدور/محل ثبت",
          width: "150px"
        },
        {
          field: "ToftTotalImpart",
          title: "سهم کل از عرصه",
          width: "100px",
          editor: "numeric"
        },
        {
          field: "AyanTotalImpart",
          title: " سهم کل از اعیان",
          width: "100px",
          editor: "numeric"
        },
        {
          field: "CellPhone",
          title: "شماره تلفن همراه",
          width: "100px",
          params: {
            patterns: [
              ["^09/d{9}", "با 09 شروع شود"],
              ["/d{11}", "فقط عدد قابل قبول میباشد"]
            ],
            type: "numeric"
          }
        },
        {
          field: "DocNo",
          title: "شماره سند",
          width: "100px",
          editor: "numeric"
        },
        {
          field: "ActDate",
          title: "تاریخ اثر",
          editor: "date",
          width: "100px"
        },
        {
          field: "BirthDate",
          title: "تاریخ تولد مالک",
          editor: "date",
          width: "100px"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "PostCode",
          title: "کد پستی",
          width: "150px",
          editor: "numeric",
          cell: "NationalCodeTemplate"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "150px"
        }
      ]
    }
  },
  computed: {
    columnGenerateCheckSabt () {
      return {
        field: "",
        title: "استعلام ثبت احوال",
        editor: "action",
        width: "131px",
        btnTitle: "استعلام ثبت احوال",
        btnColor: "primary",
        btnIcon: "how_to_reg",
        cellRenderer: "agCallbackBtn",
        callback: (params) => this.showCheckSabtModalHandler(params)
      }
    }
  },
  watch: {
    settingData: {
      handler () {
        if (this.settingData.Chk_IsCheckSabt === true) {
          // if settingData.Chk_IsCheckSabt is true , we must to show columnGenerateCheckSabt col in grid
          this.addNewColToColumns(
            this.baseOwnerParvandeInfo,
            this.columnGenerateCheckSabt,
            4
          )
        }
      },
      immediate: true
    }
  },
  methods: {
    addNewColToColumns (arr = [], newObj = {}, position = 4) {
      let insertIndex = Math.min(position, arr.length)
      arr.splice(insertIndex, 0, newObj)
    },
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    showCheckSabtModalHandler (params) {
      if (!params.hasOwnProperty("uniqueId")) {
        for (let i = 0; i < this.value.Base_Owner.length; i++) {
          if (!this.value.Base_Owner[i].uniqueId) {
            this.value.Base_Owner[i].uniqueId = this.newGuid()
          }
        }
      }
      if (this.m === "r") {
        return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.")
      }
      this.showCheckSabtModal = true
      this.params = params
    },
    changeDataAfterEstelam ({ estelamModel, typeOfServ }) {
      if (!this.isValidForm()) return
      if (!typeOfServ) {
        return this.showError(
          "لطفا کدملی و تاریخ تولد خود را جهت استعلام وارد نمایید و دکمه استعلام را بزنید."
        )
      }
      if (typeOfServ === "isJson") {
        this.isJson = true
        this.isWCF = false
      }
      if (typeOfServ === "isWCF") {
        this.isJson = false
        this.isWCF = true
      }
      if (this.isJson) {
        const res = estelamModel
        console.log("res :>> ", res)
        for (let i = 0; i < this.value.Base_Owner.length; i++) {
          if (this.value.Base_Owner[i].uniqueId === this.params.uniqueId) {
            this.value.Base_Owner[i].Name =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].PersonName =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].NationalCode = res.PersonInfo.nationalCode
            this.value.Base_Owner[i].FirstName = res.PersonInfo.name
            this.value.Base_Owner[i].LastName = res.PersonInfo.family
            this.value.Base_Owner[i].FatherName = res.PersonInfo.fatherName
            this.value.Base_Owner[i].BirthDate = res.PersonInfo.birthDate
            this.value.Base_Owner[i].OfficeName = res.PersonInfo.officeName
            this.value.Base_Owner[i].ShenasnamehNo =
              res.PersonInfo.shenasnameNo

            this.value.Base_Owner[i].OwnerName = res.PersonInfo.name
            this.value.Base_Owner[i].OwnerLastName = res.PersonInfo.family
            this.value.Base_Owner[i].OwnerFatherName =
              res.PersonInfo.fatherName
            this.value.Base_Owner[i].EmissionPlace = res.PersonInfo.officeName
            this.value.Base_Owner[i].IDCardNo = res.PersonInfo.shenasnameNo
            this.value.Base_Owner[i].DateCheckSabt = currentDate()
          }
        }
      }
      if (this.isWCF) {
        const res = estelamModel
        console.log("res :>> ", res)
        for (let i = 0; i < this.value.Base_Owner.length; i++) {
          if (this.value.Base_Owner[i].uniqueId === this.params.uniqueId) {
            // OwnerName: res.PersonInfo.PersonName,
            //   NationalCode: this.estelam.NationalCode,
            this.estelam.OwnerName =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].Name =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].PersonName =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].NationalCode = res.PersonInfo.nationalCode
            this.value.Base_Owner[i].FirstName = res.PersonInfo.name
            this.value.Base_Owner[i].LastName = res.PersonInfo.family
            this.value.Base_Owner[i].FatherName = res.PersonInfo.fatherName
            this.value.Base_Owner[i].BirthDate = res.PersonInfo.birthDate
            this.value.Base_Owner[i].OfficeName = res.PersonInfo.officeName
            this.value.Base_Owner[i].ShenasnamehNo =
              res.PersonInfo.shenasnameNo

            this.value.Base_Owner[i].OwnerName = res.PersonInfo.name
            this.value.Base_Owner[i].OwnerLastName = res.PersonInfo.family
            this.value.Base_Owner[i].OwnerFatherName =
              res.PersonInfo.fatherName
            this.value.Base_Owner[i].EmissionPlace = res.PersonInfo.officeName
            this.value.Base_Owner[i].IDCardNo = res.PersonInfo.shenasnameNo
            this.value.Base_Owner[i].DateCheckSabt = currentDate()
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.baseOwner.gridApi.refreshCells()
      })
      this.$forceUpdate()
      this.isJson = false
      this.isWCF = false
      this.showCheckSabtModal = false
    }
  }
}
</script>
