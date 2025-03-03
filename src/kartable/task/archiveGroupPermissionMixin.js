import { useCiComboPermission } from "src/plugins/CiComboPermission"

export default {
  data () {
    return {
      allowedArchiveGroupCiIds: [],
      archiveGroupID: window.getConfigValue(
        "Archive.GroupResource.ID",
        "7FF291B1-8720-4C66-A21E-D1E64F6DD343"
      ),
      archiveGroupTitle: window.getConfigValue(
        "Archive.GroupResource.Title",
        "گروه های آرشیو"
      ),
      archiveGroupName: window.getConfigValue(
        "Archive.GroupResource.Name",
        "ArchiveGroup"
      )
    }
  },
  methods: {
    async checkArchiveGroupsCiByUserPermission () {
      const comboPermission = useCiComboPermission({
        NidParent: null,
        ComboResourceID: this.archiveGroupID,
        ComboResourceTitle: this.archiveGroupTitle,
        ComboResourceName: this.archiveGroupName,
        CiName: 'CI_ArchiveGroup',
        CiDomain: 'CI_SaraM1'
      })

      const comboList = await comboPermission.getComboList()
      this.allowedArchiveGroupCiIds = comboList.map(x => x.ID)
    }
  }
}
