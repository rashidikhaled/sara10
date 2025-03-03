<template>
  <div class="ckr--actions flex items-center q-gutter-x-xs">
    <div class="ckr__btn_wrap text-red-6" @click="$emit('back')">
      <img
        :src="require('../assets/back.svg')"
        height="18px"
        width="18px"
        style="border-radius: 50px"
        title="بازگشت پرونده"
      />
      <label>بازگشت پرونده</label>
    </div>
    <div class="ckr__btn_wrap text-positive" @click="$emit('send')">
      <img
        :src="require('../assets/send.svg')"
        height="18px"
        width="18px"
        style="border-radius: 50px"
        title="ارسال پرونده"
      />
      <label>ارسال پرونده</label>
    </div>
    <div
      class="ckr__btn_wrap text-light-blue-9"
      @click="$emit('gardeshParvandeh')"
    >
      <span class="ckr__btn bg-light-blue-9">
        <q-icon name="restore" size="14px" title="تاریخچه گردش پرونده" />
      </span>
      <label>تاریخچه گردش پرونده</label>
    </div>
    <div class="ckr__btn_wrap text-light-blue-9" @click="$emit('refresh')">
      <span class="ckr__btn bg-light-blue-9">
        <q-icon name="loop" size="14px" title="بروزرسانی کارتابل" />
      </span>
      <label>بروزرسانی کارتابل</label>
    </div>
    <div class="ckr__btn_wrap text-light-blue-9" @click="$emit('resetFilter')">
      <span class="ckr__btn bg-light-blue-9">
        <q-icon name="close" size="14px" title="حذف فیلتر" />
      </span>
      <label>حذف فیلتر</label>
    </div>
    <div
      class="ckr__btn_wrap text-light-blue-9"
      @click="$emit('message:receive')"
    >
      <span class="ckr__btn bg-light-blue-9">
        <q-icon name="mail" size="14px" title="پیام های دریافتی" />
      </span>
      <label>پیام های دریافتی</label>
    </div>
    <div class="ckr__btn_wrap text-light-blue-9" @click="$emit('message:sent')">
      <span class="ckr__btn bg-light-blue-9">
        <q-icon name="forward_to_inbox" size="14px" title="پیام های ارسالی" />
      </span>
      <label>پیام های ارسالی</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "CKRActions"
}
</script>

<style scoped lang="scss">
.ckr__btn {
  background-color: #898989;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.ckr__btn_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  color: #777;
  height: 24px;
  cursor: pointer;
  border-radius: 20px;
  padding: 2px 4px 2px 2px;

  > label {
    margin-left: 4px;
    font-size: 10px;
    pointer-events: none;
  }
}
</style>
