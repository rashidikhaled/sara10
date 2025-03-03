<template>
  <form-wrapper
    fullscreen
    title="تابلو اعلانات"
    :padding="false"
    class="fit"
    @close="redirectToKartable"
  >
    <template v-slot:before-close>
      <span>
        <q-btn
          @click="reloadObj"
          dense
          icon="refresh"
          round
          unelevated
          size="13px"
          style="color: #607598"
          title="بازآوری اطلاعات"
        ></q-btn>
      </span>
    </template>
    <fit>
      <bulletin-board ref="BulletinBoard" />
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "BulletinBoardContainer",

  mixins: [baseFormMixin],

  methods: {
    async reloadObj () {
      this.$nextTick(async () => {
        this.$refs.BulletinBoard.reloadObj()
      })
    }
  }
}
</script>
