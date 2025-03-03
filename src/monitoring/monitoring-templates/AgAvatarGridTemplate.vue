
<template>
  <user-avatar
    :src="params.data.userCode || params.data.NidUser"
    :title="params.data.userName || params.data.NidUser"
    size="24px"
    class="shadow-1"
  />
  <!-- <Avatar
    :size="22"
    :nidUser="params.data.userCode || params.data.NidUser"
    :alt="params.data.userName || params.data.NidUser"
    class="shadow-1"
  /> -->
</template>

<script>
// import Avatar from './Avatar.vue'
export default {
  // components: { Avatar },
  data () {
    return {
      name: "AvatarGridTemplate"
    }
  }
}
</script>
