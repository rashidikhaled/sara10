const icons = {
  kartable: 'inbox',
  map: 'location_on',
  umap: 'location_on',
  newmap: 'location_on',
  dashboard: 'space_dashboard',
  task: 'feed',
  archive: 'archive',
  profile: 'account_box',
  monitoring: 'dvr',
  'manage_search': 'archive',
  'gardesh-parvandeh': 'feed',
  'kartable-pasokhgo': 'find_in_page',
  'three-d': '3d_rotation'
}

const defaultFormSide = 'right'

const defaultFormTemplate = {
  formName: '', events: {}, props: {}, group: '', color: 'var(--q-color-primary)', lock: false, pin: false, icon: '', side: defaultFormSide
}

const checkIsLock = form => form.lock
const checkIsPin = form => form.pin
const checkIsKartable = form => form.formKey === 'kartable' || form.formName === 'kartable'
const checkIsInRight = form => form.side === 'right'
const defaultActiveForm = 'kartable'
const defaultLeftActiveForm = 'map-layout'

export default {
  namespaced: true,
  state () {
    const defaultForms = [
      {
        ...defaultFormTemplate,
        formKey: 'BulletinBoardContainer',
        title: 'تابلو اعلانات',
        group: 'system',
        color: '#ef8a6f',
        lock: true,
        pin: true,
        icon: 'campaign'
      // icon: 'img:icons/bulletin-board.png',
      },
      {
        ...defaultFormTemplate,
        formKey: 'AllUserMessages',
        formName: 'AllUserMessages',
        title: 'صندوق پیام ها',
        group: 'system',
        color: '#ef8a6f',
        lock: true,
        pin: true,
        icon: 'mark_email_unread'
        // icon: 'img:icons/bulletin-board.png',
      },
      { // نمایش پنل مانیتورینگ به صورت تب مجزا در سرا 10
        ...defaultFormTemplate,
        formKey: 'monitoring',
        title: 'مانیتورینگ',
        group: 'system',
        color: 'var(--q-color-secondary)',
        lock: true,
        pin: true,
        icon: icons['monitoring']
      },
      /*  {
        ...defaultFormTemplate,
        formKey: 'dashboard',
        formName: 'Dashboard',
        title: 'آنالیز سیستم',
        group: 'system',
        color: 'blue',
        lock: true,
        pin: true,
        icon: icons['dashboard']
    }, */
      {
        ...defaultFormTemplate,
        formKey: 'kartable',
        title: 'کارتابل',
        group: 'system',
        color: 'var(--q-color-positive)',
        lock: true,
        pin: true,
        icon: icons['kartable']
      },
      /* {
      ...defaultFormTemplate,
      formKey: 'KartablePasokhgoo',
      title: 'کارتابل پاسخگو',
      group: 'system',
      color: '#4534b9',
      lock: true,
      pin: true,
      icon: icons['kartable-pasokhgo']
    } */
      // , {
      //   ...defaultFormTemplate,
      //   // formKey: 'UKartableMessage',
      //   formKey: 'UKartableMessage',
      //   title: 'ارسال / دریافت پیام',
      //   group: 'system',
      //   color: '#b14ba4',
      //   lock: true,
      //   pin: true,
      //   icon: icons['message']
      // }
      {
        ...defaultFormTemplate,
        formKey: 'map-layout',
        title: 'نقشه',
        group: 'system',
        color: '#cb6245',
        lock: true,
        pin: true,
        icon: icons['map'],
        side: 'left'
      }
    ]
    return {
      // forms: [{formKey: 'legal', title: '', icon: '', props: {},group: '', color: '', lock: false, pin: false}]
      forms: [...defaultForms], activeForm: defaultActiveForm, leftActiveForm: defaultLeftActiveForm, maxLength: 12
    }
  },
  getters: {
    // .map(key => state.forms[key]).sort((a, b) => Number(b.pin) - Number(a.pin))
    forms: state => state.forms.sort((a, b) => Number(b.pin) - Number(a.pin)),
    rightForms: state => state.forms.sort((a, b) => Number(b.pin) - Number(a.pin)).filter(({ side }) => side === 'right'),
    leftForms: state => state.forms.sort((a, b) => Number(b.pin) - Number(a.pin)).filter(({ side }) => side === 'left'),
    formsCount: state => state.forms.length,
    activeForm: state => state.activeForm,
    activeFormIndex: state => state.forms.findIndex(x => x.formKey === state.activeForm),
    leftActiveForm: state => state.leftActiveForm,
    leftActiveFormIndex: state => state.forms.findIndex(x => x.formKey === state.leftActiveForm),
    formByIds: (state) => state.forms.reduce((out, item) => {
      out[item.formKey] = item
      return out
    }, {})
  },
  mutations: {
    setActiveForm (state, formKey) {
      state.activeForm = formKey
    },
    setLeftActiveForm (state, formKey) {
      state.leftActiveForm = formKey
    },
    updateFormTitle (state, { formKey, title }) {
      const findIndex = state.forms.findIndex(f => f.formKey === formKey)
      if (findIndex > -1) {
        state.forms[findIndex].title = title
      }
    },
    setForm (state, form) {
      if (typeof form === 'string') form = { formKey: form }
      form.formKey = form.formKey === 'system' ? form.formName : form.formKey
      const findIndex = state.forms.findIndex(f => [f.formKey, f.formName].includes(form.formKey))
      let payload = {
        ...defaultFormTemplate, icon: icons[form.formKey] || '', ...form
      }
      if (findIndex > -1) {
        payload = {
          ...payload, ...state.forms[findIndex], formKey: form.formKey
        }
      }

      if (checkIsKartable(payload) || checkIsKartable(payload)) {
        payload.lock = true
        payload.pin = true
      }

      if (findIndex > -1) {
        state.forms.splice(findIndex, 1, payload)
      } else {
        if (state.forms.length > state.maxLength) return alert(`امکان نمایش بیش از ${state.maxLength} تب وجود نداره.`)

        // console.log('-------index', form.index)
        if (form.hasOwnProperty('index') && form.index > -1) {
          state.forms.splice(form.index, 0, payload)
        } else {
          state.forms.push(payload)
        }
      }
      if (checkIsInRight(payload)) {
        state.activeForm = payload.formKey
      } else {
        state.leftActiveForm = payload.formKey
      }
    },
    updateForm (state, form) {
      const findIndex = state.forms.findIndex(f => [f.formKey, f.formName].includes(form.formKey))
      const defaultFormState = state.forms[findIndex]

      const payload = {
        // ...defaultFormTemplate,
        // icon: icons[form.formKey] || '',
        ...defaultFormState,
        ...form,
        formKey: form.formKey === 'system' ? form.formName : form.formKey
      }
      if (checkIsKartable(form) || checkIsKartable(form)) {
        payload.lock = true
        payload.pin = true
      }

      if (findIndex > -1) {
        state.forms.splice(findIndex, 1, payload)
        const allSideForms = state.forms.filter(({ side }) => side === defaultFormState.side)
        if (checkIsInRight(form)) {
          state.activeForm = payload.formKey
          if (payload.side !== defaultFormState.side) {
            state.leftActiveForm = allSideForms[allSideForms.length - 1].formKey
          }
        } else {
          state.leftActiveForm = payload.formKey
          if (payload.side !== defaultFormState.side) {
            state.activeForm = allSideForms[allSideForms.length - 1].formKey
          }
        }
      }
    },
    removeForm (state, formKey) {
      const generalIndex = state.forms.findIndex(f => f.formKey === formKey)

      if (generalIndex > -1) {
        const form = state.forms[generalIndex]
        if (form.formKey === 'monitoring') {
          // حذف تب مانیتورینگ
          state.forms = [...state.forms].filter(f => f.formKey !== form.formKey)
        }
        if (checkIsLock(form) || checkIsPin(form) || checkIsKartable(form)) return
        state.forms = [...state.forms].filter(f => f.formKey !== form.formKey)
        const allSideForms = state.forms.filter(({ side }) => side === form.side)
        if (checkIsInRight(form)) {
          state.activeForm = allSideForms[allSideForms.length - 1].formKey
        } else {
          state.leftActiveForm = allSideForms[allSideForms.length - 1].formKey
        }
      }
    },
    removeAllForm (state, formSide = defaultFormSide) {
      state.forms = state.forms.filter(f => checkIsLock(f) || checkIsPin(f) || checkIsKartable(f) || f.side !== formSide)
      if (checkIsInRight({ side: formSide })) {
        state.activeForm = defaultActiveForm // state.forms[0].formKey
      } else {
        state.leftActiveForm = defaultLeftActiveForm
      }
    },
    removeAllExpectForm (state, formKey) {
      const checkIsCurrentTab = form => {
        return form.formKey === formKey || form.formName === formKey
      }
      const currentFormSide = state.forms.find(e => e.formKey === formKey).side || defaultFormSide

      state.forms = state.forms.filter(f => checkIsLock(f) || checkIsPin(f) || checkIsKartable(f) || checkIsCurrentTab(f) || f.side !== currentFormSide)
      const index = state.forms.findIndex(f => checkIsCurrentTab(f)) || 0

      if (checkIsInRight({ side: currentFormSide })) {
        state.activeForm = state.forms[index].formKey
      } else {
        state.leftActiveForm = state.forms[index].formKey
      }
    },
    updateItemsOrder (state, { newIndex, oldIndex }) {
      // state.forms.splice(newIndex, 0, state.forms.splice(oldIndex, 1)[0])
    },
    activeNextForm (state) {
      const findIndex = state.forms.findIndex(f => f.formKey === state.activeForm)
      if (state.forms.length >= findIndex) {
        state.activeForm = state.forms[findIndex + 1].formKey
      }
    },
    activePrevForm (state) {
      const findIndex = state.forms.findIndex(f => f.formKey === state.activeForm)
      if (findIndex > 0) {
        state.activeForm = state.forms[findIndex - 1].formKey
      }
    }
  },
  actions: {
    setForm ({ commit }, form) {
      if (typeof form === 'object' && (form.formKey === 'task' || form.formName === 'task')) {
        commit('removeForm', 'task')
      }
      commit('setForm', form)
    },
    updateForm ({ commit }, form) {
      commit('updateForm', form)
    },
    updateFormTitle ({ commit }, { formKey, title }) {
      commit('updateFormTitle', { formKey, title })
    },
    removeForm ({ commit }, formKey) {
      commit('removeForm', formKey)
    },
    removeActiveForm ({ commit, state }) {
      console.log(state.activeForm)
      commit('removeForm', state.activeForm)
    },
    removeLeftActiveForm ({ commit, state }) {
      console.log(state.leftActiveForm)
      commit('removeLeftForm', state.leftActiveForm)
    },
    removeAllForm ({ commit }, formSide) {
      commit('removeAllForm', formSide)
    },
    removeAllExpectForm ({ commit }, formKey) {
      commit('removeAllExpectForm', formKey)
    },
    updateItemsOrder ({ commit }, { newIndex, oldIndex }) {
      commit('updateItemsOrder', { newIndex, oldIndex })
    },
    setActiveForm ({ commit }, formKey) {
      commit('setActiveForm', formKey)
    },
    setLeftActiveForm ({ commit }, formKey) {
      commit('setLeftActiveForm', formKey)
    },
    activeNextForm ({ commit }) {
      commit('activeNextForm')
    },
    activePrevForm ({ commit }) {
      commit('activePrevForm')
    }
  }
}
