<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      title="کپی کنترل نقشه و تشکیل پرونده"
      vertical
    >
      <template #header>
        <safa-status :result="copyHistoryTomapControlResult" />
        <safa-status :result="tashkilParvandeCopyResult" />
      </template>
      <div class="row q-col-gutter-x-sm full-height">
        <div class=" col-6 col-md-6 col-sm-12 full-height">
          <fit>
            <internal-section class="fit">
              <nosazi-code-input
                v-model="baseNosaziCode"
                @enter="getBaseLibInNosaziCodeForTree"
                label="کد نوسازی مبدأ"
                actions
              />
              <q-separator class="q-my-sm" />
              <safa-label class="lbl q-mb-sm">ساختار درختی مبدأ</safa-label>
              <div
                v-scroll
                class="fit scroll"
              >
                <q-tree
                  ref="tree"
                  default-expand-all
                  selected-color="primary"
                  node-key="nosaziCodeString"
                  label-key="nosaziCodeString"
                  :nodes="nosaziCodeTrees"
                  :selected.sync="selectedNosaziCode"
                  @update:selected="handleNosaziCodeSelected"
                  tick-strategy="strict"
                  :ticked.sync="selectedNosaziCode"
                ></q-tree>
              </div>
            </internal-section>
          </fit>
        </div>
        <div class="col-6 col-md-6 col-sm-12 full-height">
          <fit>
            <internal-section class="fit">
              <nosazi-code-input
                v-model="newNosaziCode"
                @enter="handleNewNosaziCodeChanged"
                label="کد نوسازی مقصد"
                labelWidth="200px"
              /> <!-- v-model="toNosaziCode" -->
              <q-separator class="q-my-sm">
              </q-separator>
              <safa-label class="lbl q-mb-sm">ساختار درختی مقصد</safa-label>
              <div
                v-scroll
                class="fit scroll"
              >
                <q-tree
                  ref="tree"
                  default-expand-all
                  selected-color="primary"
                  node-key="nosaziCodeString"
                  label-key="nosaziCodeString"
                  :nodes="newNosaziCodeTrees"
                  :selected.sync="selectedNosaziCode"
                  @update:selected="handleNosaziCodeSelected"
                  tick-strategy="strict"
                  :ticked.sync="selectedNosaziCode"
                ></q-tree>
              </div>
            </internal-section>
          </fit>
        </div>
      </div>
      <template v-slot:footer>
        <!-- <div class="row q-col-gutter-x-lg"> -->
        <btn-default
          label="کپی کنترل نقشه"
          @click="copyHistoryToMapControl"
          class="q-mr-sm"
          spCaption="کپی کنترل نقشه"
 spId="56d6e2e9-2949-46ee-8f7a-209ba58d098c"
        />
        <btn-default
          label="کپی تشکیل پرونده"
          @click="tashkilParvandeCopy"
          spCaption="کپی تشکیل پرونده"
 spId="3b0892ea-c776-4f7a-a254-745b3894fcf0"
        />

        <!-- </div> -->
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/parvandeh/copy-map-control',
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'کپی کنترل نقشه و تشکیل پرونده',
      formKey: 'e3e7acdf-ebec-485b-8990-ae8f271d8dde',
      name: 'copyMapControl',
      main: true,
      value: {
        refreshCodeArray: [0, 0, 0, 0, 0, 0, 0]
      },
      ticked: null,
      nosaziCodeTreesDestination: [],
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
      toNosaziCode: {
        District: 1,
        Region: 2,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCodeTrees: [],
      selectedNosaziCode: '',
      newNosaziCodeTrees: [],
      newSelectedNosaziCode: '',
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      transferResult: {},
      convertResult: {},
      copyHistoryTomapControlPrequest: {
        pNidProc: '9c6dde20-de26-4d3c-9471-7ef60661219f',
        pNidBaseFrom: '9eb4eb12-487b-47a9-b61a-cecb29d1ee3e'
      },
      copyHistoryTomapControlResult: {},
      tashkilParvandeCopyPrequest: {
        pFromNidBase: '2d26cc37-25c3-4068-95c8-3deb7f1ebfff',
        pToNidBase: '012d4600-db1e-489e-8f94-620a474a9396',
        pCount: '1',
        pNidUser: '251f7cfe-3415-4351-bbc5-ba3e7158664c',
        pUserName: 'ui تست (uitest)',
        pFillGap: 'true',
        NewObjCode: null
      },
      newResult: {},
      fromNosazi: {},
      toNosazi: {},
      loadMapControlPrequest: {
        pNidNosaziCode: '3e139211-6cb3-4d71-8387-2a2b50784e42'
      },
      loadNewMapControlPrequest: {
        pNidNosaziCode: '3e139211-6cb3-4d71-8387-2a2b50784e42'
      },
      getInNidNosaziPrequest: {
        pNidNosaziCodeRoot: '3e139211-6cb3-4d71-8387-2a2b50784e42',
        pLoadFunc: 'ChildTree'
      },
      getNewInNidNosaziPrequest: {
        pNidNosaziCodeRoot: '321141a4-fdae-490c-9934-66b81d9030a3',
        pLoadFunc: 'ChildTree'
      },
      activeRequestListPrequest: {
        pNidNosaziCode: '321141a4-fdae-490c-9934-66b81d9030a3'
      },
      activeRequestListResponse: {},
      mapControlHistoryResult: {},
      subMapControlHistoryResult: {},
      mapNewControlHistoryResult: {},
      subNewMapControlHistoryResult: {},
      nidNosaziCode: '',
      buildTreeNosaziCode: {},
      buildNewTreeNosaziCode: {},
      tashkilParvandeCopyResult: null
    }
  },
  methods: {
    handleBaseNosaziCodeChanged () {
      let payLoad = {
        pNosaziCode: { ...this.baseNosaziCode },
        pLoadFunc: 'ChildTree',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.apartmentResults = this.requestResult.data
            this.nosaziCodeTrees = this.createNosaziCodeTree(
              this.apartmentResults.ChildTree
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleNewNosaziCodeChanged (code) {
      this.newNosaziCode = code
      let payLoad = {
        pNosaziCode: { ...this.newNosaziCode },
        pLoadFunc: 'ChildTree',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad, {
        config: {
          District: this.newNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.arseResults = this.result.data
            debugger
            this.newNosaziCodeTrees = this.createNosaziCodeTree(
              this.arseResults.ChildTree
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.newNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getBaseLibInNosaziCodeForTree (code) {
      this.baseNosaziCode = code
      let payLoad = {
        pNosaziCode: { ...this.baseNosaziCode },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            this.handleBaseNosaziCodeChanged()
            const strNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    cancel () {
      this.baseNosaziCode = [0, 0, 0, 0, 0, 0, 0]
      this.newNosaziCode = [0, 0, 0, 0, 0, 0, 0]
    },

    handleNosaziCodeSelected (e) {
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
      this.selectedNosaziCode = e
      console.log(this.selectedNosaziCode, 'this.selectedNosaziCode')
      this.currentTab = this.selectedNosaziCode
    },

    newHandleNosaziCodeSelected (e) {
      if (!this.newSelectedNosaziCode) return
      const isShowedAlready = this.tabs.some(
        x => x.name === this.newSelectedNosaziCode
      )
      if (!isShowedAlready) {
        const nosaziCodeObject =
          this.newChildTree.filter(
            x => x.nosaziCodeString === this.newSelectedNosaziCode
          )[0] || {}
        this.tabs.push({
          name: this.newSelectedNosaziCode,
          title:
            nosaziCodeObject.name +
            ' ' +
            this.newSelectedNosaziCode
              .split('')
              .reverse()
              .join(''),
          EumNosaziCodeObjType: nosaziCodeObject.EumNosaziCodeObjType,
          nosaziCodeObject
        })
      }
      this.currentTab = this.newSelectedNosaziCode
      this.newSelectedNosaziCode = e
    },

    buildTree (childTree) {
      if (!childTree || !Array.isArray(childTree)) return
      const parentCode = childTree
        .filter(x => x.EumNosaziCodeObjType > 0) // Some error found here that object type is zer0
        .reduce((state, x) =>
          x.EumNosaziCodeObjType < state.EumNosaziCodeObjType ? x : state
        )
      const convert = nosaziCode => {
        let nSaziCode = null
        if (!nosaziCode.District) {
          nSaziCode = `${nosaziCode.label}`
        } else {
          nSaziCode = `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
        }
        return nSaziCode
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
        if (!nosaziCode) return
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
      this.buildTreeNosaziCode = this.nosaziCodeTrees
    },

    newBuildTree (newChildTree) {
      if (!newChildTree || !Array.isArray(newChildTree)) return
      const parentNewCode = newChildTree
        .filter(x => x.EumNosaziCodeObjType > 0) // Some error found here that object type is zer0
        .reduce((state, x) =>
          x.EumNosaziCodeObjType < state.EumNosaziCodeObjType ? x : state
        )
      const convert = nosaziCode => {
        let nSaziCode = null
        if (!nosaziCode.District) {
          nSaziCode = `${nosaziCode.label}`
        } else {
          nSaziCode = `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
        }
        this.buildNewTreeNosaziCode = nSaziCode
        return nSaziCode
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
        if (!nosaziCode) return
        nosaziCode.name = names[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.icon = icons[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.nosaziCodeString = convert(nosaziCode)
        nosaziCode.children = newChildTree.filter(
          x => nosaziCode.Id === x.ParentId
        )
        nosaziCode.children.forEach(child => getChildren(child))
      }
      getChildren(parentNewCode)
      this.newNosaziCodeTrees = [parentNewCode]
      this.buildNewTreeNosaziCode = this.newNosaziCodeTrees
    },

    copyHistoryToMapControl (e) {
      if (this.selectedNosaziCode === '') {
        this.showError('لطفا یکی از کنترل نقشه های مبدا را انتخاب کنید')
      }
      this.showLoading()
      this.$services.SC.copyHistoryToMapControl(
        this.copyHistoryTomapControlPrequest,
        {
          config: {
            District: this.baseNosaziCode.District
          }
        }
      )
        .then(async ({ data }) => {
          this.copyHistoryTomapControlResult = this.getResponse(data)
          if (this.copyHistoryTomapControlResult.success) {
            this.showSuccess('عملیات با موفقیت انجام شد')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    tashkilParvandeCopy () {
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(
        {
          pNosaziCode: {
            ...this.baseNosaziCode,
            ...this.options,
            NidUser: this.currentUser.NidUser
          }
        },
        {
          config: {
            District: this.baseNosaziCode.District
          }
        }
      )
        .then(response => {
          this.fromNosazi = this.getResponse(response.data)
          this.$services.SA.getBaseLibInNosaziCode(
            {
              pNosaziCode: {
                ...this.newNosaziCode,
                ...this.options,
                NidUser: this.currentUser.NidUser
              }
            },
            {
              config: {
                District: this.baseNosaziCode.District
              }
            }
          )
            .then(async response => {
              this.toNosazi = this.getResponse(response.data)
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.newNosaziCode
              )
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })

              if (
                this.fromNosazi.data.MainObj.EumNosaziCodeObjType !==
                this.toNosazi.data.MainObj.EumNosaziCodeObjType
              ) {
                this.showError('کد نوسازی مبدا و مقصد باید از یک نوع باشد')
                this.hideLoading()
                return
              }

              this.$services.SC.tashkilParvandeCopy(
                this.tashkilParvandeCopyPrequest,
                {
                  config: {
                    District: this.baseNosaziCode.District
                  }
                }
              )
                .then(async response => {
                  this.hideLoading()
                  this.tashkilParvandeCopyResult = this.getResponse(
                    response.data
                  )

                  if (!this.tashkilParvandeCopyResult.hasError) {
                    this.showSuccess('عملیات با موفقیت انجام شد')
                    const strNosaziCode = convertNosaziCodeObjectToString(
                      this.newNosaziCode
                    )
                    await this.log({
                      action: this.logActions.view,
                      bizCode: strNosaziCode,
                      bizCodeTitle: 'کد نوسازی',
                      nosaziCode: strNosaziCode
                    })
                  }
                })
                .catch(error => {
                  this.hideLoading()
                  this.$q.dialog({
                    title: 'خطا در سرور',
                    // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
                    message: error.message
                  })
                })
            })
            .catch(ex => {
              this.hideLoading()
              this.$q.dialog({
                title: 'خطا در سرور',
                // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
                message: ex.message
              })
            })
        })
        .catch(ex => {
          this.hideLoading()
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    }
  }
}
</script>
