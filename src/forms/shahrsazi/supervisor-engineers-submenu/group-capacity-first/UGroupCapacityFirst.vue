<template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper :title="title" vertical>
      <fit>
        <template #header>
          <safa-status :result="resloadObj" />
        </template>
        <form-row>
          <safa-text
            label="مقدار سهمیه"
            label-width="70px"
            v-model="model.capacity"
            :m="mode"
            class="col-12 col-md-2 col-sm-3"
            cdcName="capacity"
          />
          <safa-text
            label="تعداد کار"
            label-width="50px"
            v-model="model.numberWork"
            :m="mode"
            class="col-12 col-md-2 col-sm-3"
            cdcName="numberWork"
          />
        </form-row>
        <fit>
          <div class="row q-col-gutter-x-sm full-height">
            <div class="col-12 col-md-4" style="min-height:150px">
              <fit>
                <safa-datatable
                  v-model="getQtaGroupResult.ADPstudyFieldRelList"
                  fit
                  helper="ADPstudyFieldRelList"
                  class="q-mt-md"
                  title="رشته"
                  height="100%"
                  max-height="100%"
                  margin="0"
                  cdcName="ADPstudyFieldRelList"
                />
              </fit>
            </div>
            <div class="col-12 col-md-4 q-mt-md" style="min-height:150px">
              <safa-datatable
                fit
                v-model="getQtaGroupResult.AbilityList"
                helper="AbilityList"
                title="صلاحیت"
                height="100%"
                max-height="100%"
                margin="0"
                cdcName="AbilityList"
              />
            </div>
            <div class="col-12 col-md-4 q-mt-md" style="min-height:150px">
              <safa-datatable
                v-model="getQtaGroupResult.BaseList"
                helper="BaseList"
                title="پایه"
                height="100%"
                max-height="100%"
                margin="0"
                cdcName="BaseList"
              />
            </div>
          </div>
        </fit>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          class="col-12"
          :showEditButton="true"
          :showNewButton="false"
          :showSaveButton="false"
          @save="saveData"
          @edit="isEditable = true"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-default
              label="اعمال سهمیه بر روی موارد انتخاب شده"
              @click="getQtaFirstSession"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "سهمیه اول دوره گروهی",
      formKey: "fa1c509c-9e10-4a84-a564-b2df0657f8d6",
      name: "UGroupCapacityFirst",
      main: true,
      model: {
        capacity: "",
        numberWork: ""
      },
      // ADPstudyFieldRelList: [
      //   {
      //     field: "StudyField",
      //     title: "رشته ",
      //     width: 100
      //   },
      //   {
      //     field: "StudyFieldRel",
      //     title: "گرایش",
      //     width: 200
      //   }
      // ],
      // AbilityList: [
      //   {
      //     field: "Title",
      //     title: "صلاحیت",
      //     width: 100
      //   }
      // ],
      // BaseList: [
      //   {
      //     field: "Title",
      //     title: "پایه",
      //     width: 100
      //   }
      // ],

      resloadObj: null,
      getQtaGroupResult: {
        ADPstudyFieldRelList: [],
        AbilityList: [],
        BaseList: [],
        CI_Years: "0"
      }
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      let payLoad = {
        pRequest: {}
      }
      this.$services.engineers
        .getQtaGroup(payLoad)
        .then(async ({ data }) => {
          this.resloadObj = this.getResponse(data)
          if (this.resloadObj.success) {
            this.getQtaGroupResult = this.resloadObj.data.GetQtaGroupResult
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
