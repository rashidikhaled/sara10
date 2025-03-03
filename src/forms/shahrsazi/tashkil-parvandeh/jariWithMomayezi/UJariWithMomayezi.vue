<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"

  >
    <form-wrapper title="تطبیق کد نوسازی جاری با ممیزی" vertical>
      <fit>
        <safa-status :result="disconnectResult"/>
        <safa-status :result="requestResult"/>
        <div class="row q-mb-sm">
          <safa-combo
            label="منطقه1"
            class="col-sm-4 col-md-2"
            sourceType="local"
            :options="districts"
            @input="getMomayeziConnectToParvandehList"
            v-model="selectedRegionItem"
          />
        </div>
        <safa-datatable
          v-model="momayeziListResult.MomayeziConnectToParvandehList"
          ref="grid"
          name="grid"
          helper="tataboghList"
          @selectedChange="rowSelected"
          title="تطبیق کد نوسازی جاری با ممیزی"
          fit
          height="100%"
        >
        </safa-datatable>
      </fit>
      <safa-popup
        vertical
        v-model="isShowModal"
        width="1000px"
        height="800px"
        title="تطبیق کد نوسازی جاری با ممیزی"
      >
        <TatbighJariWithMomayezi
          @closeModal="closeModal"
          @reLoad="reLoad"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="tatbigh"
        />
      </safa-popup>
      <template v-slot:footer>
        <button-group>
          <btn-default
            label="قطع ارتباط"
            @click="disconnectParvandehAndMomayezi"
            :disable="!isShowDisconnect"
          />
          <btn-default
            label="ایجاد ارتباط"
            @click="showModal"
          />
        </button-group>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import TatbighJariWithMomayezi from './partials/UTatbighJariWithMomayezi.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: 'parvandeh/jari-with-momayezi',
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تطبیق کد نوسازی جری با ممیزی',
      formKey: '94fbaaa3-4753-4902-9119-e66e33fc4ddd',
      name: 'UJariWithMomayezi',
      main: true,
      value: {
        refreshCodeArray: [0, 0, 0, 0, 0, 0, 0]
      },
      isReadOnlyNosaziCode: ['e', 'e', 'e', 'e', 'e', 'e', 'e'],
      getBaseLibPrequest: {
        pNosaziCode: {
          Apartment: '6',
          Block: '3',
          Building: '5',
          CI_City: '0',
          District: '1',
          EumBaseInfoGroup: '0',
          EumNosaziCodeGroup: '0',
          EumNosaziCodeObjType: '0',
          EumRevisitGroup: '0',
          House: '4',
          Id: 'null',
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
          NidRevisit: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          ParentId: 'null',
          Region: '2',
          Shop: '7',
          UserName: 'null'
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: 'false'
      },
      getBaseLibResult: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      newNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCodeTrees: [],
      selectedNosaziCode: '1-2-3-4-0-0-0',
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      transferResult: {},
      momayeziListResult: {},
      requestResult: null,
      mToPListPrequest: {
        pFromRow: '0',
        pToRow: '2000',
        pWhere: null
      },
      isShowDisconnect: false,
      isShowModal: false,
      disconentPrequest: {
        pParvandehNosaziCode: 'dbaedcaf-f08c-40e6-9042-cf2ff2e500aa',
        pMomayeziNosaziCode: '447f8c39-8497-43d8-9cf3-0b3bce7586db'
      },
      disconnectResult: {},
      regionItems: [
        { ID: '1', Title: '1' },
        { ID: '2', Title: '2' },
        { ID: '3', Title: '3' },
        { ID: '4', Title: '4' },
        { ID: '5', Title: '5' },
        { ID: '6', Title: '6' }
      ],
      selectedRegionItem: 1
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  components: {
    TatbighJariWithMomayezi
  },
  mounted () {
    this.getMomayeziConnectToParvandehList()
  },
  methods: {

    cancel () {
      this.baseNosaziCode = [0, 0, 0, 0, 0, 0, 0]
      this.newNosaziCode = [0, 0, 0, 0, 0, 0, 0]
    },
    handleBaseNosaziCodeChanged () {
      this.showLoading()
      this.$services.SA.getNosaziCodeTreeChild(
        {
          pNosaziCode: {
            ...this.baseNosaziCode,
            ...this.options,
            NidUser: this.currentUser.NidUser
          }
        },
        {
          config: {
            District: this.selectedRegionItem
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          this.childTree = this.result.data['ChildTree'] || []
          const isValid = !!this.childTree.length
          if (isValid) {
            this.buildTree(this.childTree)
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.getBaseLibPrequest.pNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          } else {
            this.showError('کد نوسازی معتبر نمیباشد')
          }
        })
        .catch(ex => {
          this.serverError()
        }).finally(
          this.hideLoading()
        )
    },
    handleNosaziCodeSelected () {
      if (!this.selectedNosaziCode) {
        return
      }
      const isShowedAlready = this.tabs.some(
        x => x.name === this.selectedNosaziCode
      )
      if (!isShowedAlready) {
        const nosaziCodeObject =
          this.childTree.filter(
            x => x.nosaziCodeString === this.selectedNosaziCode
          )[0] || {}
        this.tabs.push({
          name: this.selectedNosaziCode,
          title:
            nosaziCodeObject.name +
            ' ' +
            this.selectedNosaziCode
              .split('')
              .reverse()
              .join(''),
          EumNosaziCodeObjType: nosaziCodeObject.EumNosaziCodeObjType,
          nosaziCodeObject
        })
      }
      this.currentTab = this.selectedNosaziCode
    },
    buildTree (childTree) {
      if (!childTree || !Array.isArray(childTree)) {
        return
      }
      const parentCode = childTree
        .filter(x => x.EumNosaziCodeObjType > 0) // Some error found here that object type is zer0
        .reduce((state, x) =>
          x.EumNosaziCodeObjType < state.EumNosaziCodeObjType ? x : state
        )
      const convert = nosaziCode => {
        return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
      }
      const icons = [
        'home',
        'home',
        'home',
        'home_work',
        'apartment',
        'account_balance',
        'shopping_cart'
      ]
      const names = [
        'ناحیه',
        'بلوک',
        'زمین',
        'ساختمان',
        'آپارتمان',
        'دستگاه',
        'صنف'
      ]

      function getChildren (nosaziCode) {
        if (!nosaziCode) {
          return
        }
        nosaziCode.name = names[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.icon = icons[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.nosaziCodeString = convert(nosaziCode)
        nosaziCode.children = childTree.filter(
          x => nosaziCode.Id === x.ParentId
        )
        nosaziCode.children.forEach(child => getChildren(child))
      }

      getChildren(parentCode)
      this.nosaziCodeTrees = [parentCode]
    },
    getMomayeziConnectToParvandehList () {
      // this.showConfirm(
      //   'آیا از تبدیل کد نوسازی دستگاه به کد ساختمان اطمینان دارید؟'
      // ).onOk(() => {
      this.showLoading()
      this.$services.SC.getMomayeziConnectToParvandehList(
        this.mToPListPrequest,
        {
          config: {
            District: this.selectedRegionItem
          }
        }
      )
        .then(async response => {
          this.$q.loading.hide()
          this.requestResult = this.getResponse(response.data)
          if (this.requestResult.success) {
            this.momayeziListResult = this.requestResult.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.getBaseLibPrequest.pNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(ex => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    disconnectParvandehAndMomayezi () {
      this.showConfirm('آیا از قطع ارتباط اطمینان دارید؟').onOk(() => {
        this.$q.loading.show()
        this.$services.SC.disconnectParvandehAndMomayezi(
          this.disconentPrequest,
          {
            config: {
              District: this.selectedRegionItem
            }
          }
        )
          .then(async response => {
            this.$q.loading.hide()
            this.disconnectResult = this.getResponse(response.data)
            this.getMomayeziConnectToParvandehList()
            // console.log('this.momayeziListResult', this.momayeziListResult)
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.getBaseLibPrequest.pNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
            this.isShowDisconnect = false
          })
          .catch(ex => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    rowSelected (e) {
      // console.log('/////dataItemSelected', e)
      this.isShowDisconnect = true
      this.disconentPrequest.pParvandehNosaziCode =
        e.dataItem.NidNosaziCode_Parvandeh
      this.disconentPrequest.pMomayeziNosaziCode =
        e.dataItem.NidNosaziCode_Momayezi
    },
    showModal () {
      this.isShowModal = true
    },
    closeSearchEngineerModal (e) {
      this.showSearchEngineer = e
    },
    closeModal (e) {
      this.isShowModal = e
    },
    reLoad (e) {
      this.isShowModal = e
      this.getMomayeziConnectToParvandehList()
    }

  }
}
</script>
