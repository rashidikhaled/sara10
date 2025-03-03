<template>
  <div dir="ltr" :title="tooltipText" class="bizcode justify-start flex no-wrap items-center"
       v-html="generateTag"></div>
</template>

<script>
export default {
  name: 'BizCode',
  props: {
    code: String
  },
  computed: {
    generateTag () {
      const val = this.code
      if (typeof val === 'string' && val.indexOf('-')) {
        let strResult = []
        val.split('-').forEach(s => {
          strResult.push(`<span>${s}</span>`)
        })
        return strResult.join(' <b>-</b> ')
      }
      return `<strong>${val}</strong>`
    },
    tooltipText () {
      const val = this.code
      if (typeof val === 'string' && val.indexOf('-')) {
        let strResult = []
        val.split('-').forEach(s => {
          strResult.push(s)
        })
        return strResult.join(' - ')
      }
      return val
    }
  }
}
</script>

<style lang="scss">
.bizcode {
  margin: 0 auto;

  > span {
    display: inline-block;
    min-width: 20px;
    padding: 0;
    font-size: 12px;
    text-align: center;
    color: #585858;
    position: relative;

    body.body--dark & {
      color: var(--dark-text-color);
    }
  }

  > b {
    font-size: 14px;
    color: #1c90c7;
  }

  > *:nth-child(7),
  > *:nth-child(1),
  > *:nth-child(3),
  > *:nth-child(5) {
    color: var(--q-color-primary);
    font-weight: normal;
  }

  > * {
    flex: 0 0 auto;
    width: auto;
    min-width: 0;
    max-width: 100%;
  }
}
</style>
