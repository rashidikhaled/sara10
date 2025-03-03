<template>
  <form-wrapper :loading="loading">
    <fit>
      <!-- domainName="Commission100" ciName="CI_Gharar" -->
      <safa-combo
        class="q-mb-sm"
        label="نوع دستور"
        label-width="90px"
        :m="mode"
        source-type="local"
        :options="orderOptions"
        v-model="model.GharaInfo.CI_Gharar"
        cdcName="CI_Gharar"
      />
      <!-- <safa-text
        label-width="90px"
        type="textarea"
        :rows="13"
        label="توضیحات"
        :m="mode"
  یه مینی پروژه خیلی خفن به دلخواه خودت با جدیدترین متدها اسمااسکریپت بنویس
      <form-row class="no-wrap q-mb-sm" v-if="model.GharaInfo.CI_Gharar === 1">
        <form-control>
          <safa-combo2
            type="multiple"
            class="q-mb-sm"
            label="صلاحیت ها"
            label-width="90px"
            :m="mode"
            domainName="Commission100"
            ciName="CI_Ability"
            v-model="selectAbilities"
            cdcName="selectAbilities"
            ref="abilityRef"
          />
        </form-control>
        <! @input="onFilteredExperts" -->
      <form-control class="flex items-start">
        <safa-combo2
          class="q-mr-sm col"
          label="کارشناسان"
          label-width="90px"
          :m="mode"
          source-type="local"
          type="multiple"
          :options="filteredExperts"
          v-model="experts"
          cdcName="experts"
          ref="expertRef"
        />
        <btn-default
          @click="add"
          label="اضافه"
          :disabled="mode === 'r' ? true : false"
        />
      </form-control>
      <safa-datatable2
        class="q-mb-sm"
        v-if="model.GharaInfo.CI_Gharar === 1"
        height="250px"
        max-height="100%"
        fit
        :allowMultipleSelection="false"
        :columns="[
          { field: 'Title', title: 'شخص', width: '200px' },
          { field: 'StatusTitle', title: 'صلاحیت', width: '200px' },
        ]"
        v-model="ghararExpertGrid"
        cdcName="ghararExpertGrid"
      >
        <!-- تاریخ ندارد  -->
      </safa-datatable2>
      <text-template
        label="توضیحات"
        label-width="90px"
        :m="mode"
        :rows="13"
        v-model="model.GharaInfo.Descryption"
        cdcName="Descryption"
        fit
      />
    </fit>
    <template v-slot:footer>
      <FormActions
        @edit="isEditable = true"
        @save="newObj"
        @cancel="isEditable = false"
        :m="mode"
      >
        <template v-slot:after>
          <btn-default label="چاپ" />
        </template>
      </FormActions>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import { currentDate, currentTime } from "src/utils/index"
export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  props: {
    formKey: String,
    title: String
  },
  data () {
    return {
      name: "Order",
      showSave: false,
      isExpanded: false,
      loading: false,
      showEdit: true,
      selectAbilities: [],
      GhararExpertRequestdto: [],
      // filteredExperts:[],
      experts: [],
      orderOptions: [
        {
          ID: 0,
          Title: "ارجاع به منطقه"
        },
        {
          ID: 1,
          Title: "ارجاع به کارشناس"
        },
        {
          ID: 2,
          Title: "ارجاع به مرکز"
        },
        {
          ID: 3,
          Title: "ارجاع به مدیر کمیسیون"
        },
        {
          ID: 4,
          Title: "سایر"
        }
      ],
      allExpert: [],
      tempFilterdResult: [],
      CI_Ability: [],
      GhararExpert: [],
      model: {
        GharaInfo: {
          Descryption: "",
          CI_Gharar: 0
        },
        GhararExpert: []
      },
      ghararInfoResult: null
      //   Reason: "",
    }
  },
  computed: {
    ghararExpertGrid: {
      get () {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.model.GhararExpert = this.model.GhararExpert.map((x) => {
          return {
            ...x,
            Title: this.CI_Ability.find((y) => y.ID === x.CI_Ability).Title
          }
        })
        const filterdResult = this.allExpert.filter((x) => {
          return this.model.GhararExpert.some((y) => {
            return y.NidExpert === x.ID
          })
        })
        const finalResult = filterdResult.map((x) => {
          return {
            ...x,
            StatusTitle: this.model.GhararExpert.filter(
              (y) => y.NidExpert === x.ID
            )
              .map((z) => z.Title)
              .toString()
          }
        })
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.tempFilterdResult = finalResult
        return finalResult
      }
    },
    // computedCIGharar(){
    //   const result = this.CI_Ability.filter(
    //         (x) => {
    //           return this.model.GhararExpert.some((y) => {
    //             return y.CI_Ability=== x.ID
    //           });
    //         }
    //       );
    //     return result.map(x=>x.Title).toString()
    // },
    filteredExperts () {
      let finalResult = this.allExpert.filter((x) => {
        return this.selectAbilities.some((y) => {
          return y === x.CI_Ability
        })
      })
      return finalResult
    }
  },
  methods: {
    add () {
      let selectedAbility = this.$refs.abilityRef.selectedItems
      let selectedExpert = this.$refs.expertRef.selectedItems
      this.tempFilterdResult.push({
        Title: selectedExpert.map((x) => x.Title).toString(),
        StatusTitle: selectedAbility.map((x) => x.Title).toString()
      })
    },
    getAllExperts () {
      this.$services.commissions
        .getAllExperts()
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const list = []
            list.push(
              ...res.data.GetAllExpertsResult.AllExpertInfos.map((item) => {
                let r = {}
                r.ID = item.NidExpert
                r.Title = `${item.FirstName || "---"} ${
                  item.LastName || "---"
                }`
                return r
              })
            )
            this.allExpert = list.map((x) => {
              return {
                ...x,
                CI_Ability:
                  res.data.GetAllExpertsResult.AllExpertAbility.find(
                    (y) => y.NidExpert === x.ID
                  ) &&
                  res.data.GetAllExpertsResult.AllExpertAbility.find(
                    (y) => y.NidExpert === x.ID
                  ).CI_Ability
              }
            })
            this.CI_Ability = res.data.GetAllExpertsResult.CI_Ability
            // this.getExpert();
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {})
    },
    rowClickHandler () {
      this.isExpanded = !this.isExpanded
    },
    getGhararInfo () {
      const payload = {
        pNidCommission: this.selectedCommission.NidCommission
      }
      this.$services.commissions
        .getGhararInfo(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            if (res.data.GetGhararInfoResult.GharaInfo != null) {
              this.model = { ...res.data.GetGhararInfoResult }
            }
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedCommission.NidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `بارگذاری اطلاعات قرار کمیسیون ${this.title} انجام گردید.`
            })
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {})
    },
    newObj () {
      const cartesian = (a, b) =>
        a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], [])
      // cartesian(['x', 'y'], [1, 2])
      if (this.$refs.hasOwnProperty("abilityRef") && this.$refs.abilityRef) {
        let selectedAbility = this.$refs.abilityRef.selectedItems.map((x) => {
          return { CI_Ability: x.ID }
        })
        let selectedExpert = this.$refs.expertRef.selectedItems.map((x) => {
          return { NidExpert: x.ID, CI_Ability: x.CI_Ability }
        })
        let res = cartesian(selectedExpert, selectedAbility).map((x) =>
          Object.assign({}, ...x)
        )

        if (this.model.GhararExpert.length > 0) {
          this.model.GhararExpert.forEach((element) => {
            res.push({ ...element })
          })
          this.GhararExpertRequestdto = res
        } else {
          this.GhararExpertRequestdto = res
        }
      }
      const payload = {
        pClsGharar: {
          // EntityKey [ xmlns:d6p1=http://schemas.datacontract.org/2004/07/System.Data z:Id=i2 xmlns=http://schemas.datacontract.org/2004/07/System.Data.Objects.DataClasses ]
          GharaInfo: {
            CI_Gharar: this.model.GharaInfo && this.model.GharaInfo.CI_Gharar,
            Descryption:
              this.model.GharaInfo && this.model.GharaInfo.Descryption,
            NidCommission: "00000000-0000-0000-0000-000000000000",
            NidGharar: "00000000-0000-0000-0000-000000000000",
            // NidGharar: this.model.GharaInfo && this.model.GharaInfo.NidGharar,
            NidUser: this.getNidUser(),
            RegDate: currentDate(),
            RegTime: currentTime(),
            UserName: this.getUserDisplayName()
          },
          GhararExpert: this.GhararExpertRequestdto,
          NidCommission: this.selectedCommission.NidCommission
        }
      }
      this.$services.commissions
        .saveGhararInfo(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.log({
              action: this.logActions.save,
              bizCode: this.selectedCommission.NidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `ذخیره اطلاعات قرار کمیسیون ${this.title} انجام گردید.`
            })
          } else {
            this.$emit("accseptHoghoghi", false)
            this.showError(res.errors[0].text)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {})
    }
  },
  created () {
    this.getAllExperts()
    this.getGhararInfo()
  }
}
</script>
