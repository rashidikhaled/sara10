# Ci Plugin:

```javascript
const name = await this.$ci.getName({value, name, domain})

const ciItem = await this.$ci.getItem({value, name, domain})

const list = await this.$ci.getAsync({ name: 'CI_ArchiveGroup', domain: 'CI_SaraM1' })

this.$ci.get({name, domain, list => {
console.log(list)
}})

this.$ci.clear() // حذف کامل ci های کش شده

this.$ci.delete({name, domain})  // حذف ci موردی
```

--------------------------

# Security endpoints:

```javascript
import { services as securityServices } from "ui-security"
```

```javascript
securityServices.resourceAddFetch(payload)
```

### All endpoints:

```typescript
export const signOut: (payload: any, config?: {}) => any;
export const getMyinfo: (payload: any, config?: {}) => any;
export const getPublicKey: (payload: any, config?: {}) => any;
export const createUrgForSubstitute: (payload: any, config?: {}) => any;
export const getClientIp: (payload: any, config?: {}) => any;
export const getgroup: (payload: any, config?: {}) => any;
export const getGroupList: (payload: any, config?: {}) => any;
export const getSubstitution: (payload: any, config?: {}) => any;
export const getDomainList: (payload: any, config?: {}) => any;
export const getSubsetList: (payload: any, config?: {}) => any;
export const editMyinfo: (payload: any, config?: {}) => any;
export const changePassword: (payload: any, config?: {}) => any;
export const resetPassword: (payload: any, config?: {}) => any;
export const addWorkspace: (payload: any, config?: {}) => any;
export const getPermissions: (payload: any, config?: {}) => any;
export const addResource: (payload: any, config?: {}) => any;
export const resourceFetch: (payload: any, config?: {}) => any;
export const resourceAddFetch: (payload: any, config?: {}) => any;
export const authHistory: (payload: any, config?: {}) => any;
export const myAuthHistory: (payload: any, config?: {}) => any;
export const postMyimage: (payload: any, config?: {}) => any;
export const remove: (payload: any, config?: {}) => any;

export function setUserStorage(StorageKey: any, body: any, config?: {}): Promise<any>;
export function getUserStorage(StorageKey: any, defaultValue?: any, config?: {}): Promise<any>;
```

------------------

# Combo Ci Permission:

```javascript
const comboPermission = useCiComboPermission({
  NidParent: null,
  ComboResourceID: this.archiveGroupID,
  ComboResourceTitle: this.archiveGroupTitle,
  ComboResourceName: this.archiveGroupName,
  CiName: 'CI_ArchiveGroup',
  CiDomain: 'CI_SaraM1'
})

const comboList = await comboPermission.getComboList()
```
