<template>
  <!-- <iframe
    width="100%"
    class="bordered rounded-borders"
    style="height:calc(100vh - 90px);"
    src="http://srv1.safarayaneh.com:8010/index.html"
    frameborder="0"
  ></iframe> -->
  <!-- <ManageWorkspace></ManageWorkspace> -->
  <!-- <ArchiveWrap name="bb" pass="123"></ArchiveWrap> -->
  <!-- <Archive username="bb" password="123" bizCode="6"></Archive> -->
  <!-- <MiniArchiveUploader name="bb" pass="123" showDescription="true" bizcode="6"></MiniArchiveUploader> -->
  <ArchiveWrap :userLoginName="username" :userLoginId="nidUser" :name="archiveConfig.username"
               :pass="archiveConfig.password"></ArchiveWrap>
</template>

<script>
export default {
  name: 'archive-form',
  route: '/archive/template',
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore') || {}
    },
    nidUser () {
      return this.$stSecurity.getters['authorize/userId']
    },
    username () {
      return this.$stSecurity.getters['authorize/username']
    }
  }
}
</script>
