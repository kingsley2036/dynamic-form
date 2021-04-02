<template>
  <el-dialog :visible.sync="dialogVisible" width="50%" title="新增">
    <base-form
      :form-items="formItems"
      :api="formApi"
      :merge-form="mergeForm"
      reset
      @cancle="hideDIalog"
    >
      <template v-slot:slotInput="{scope}">
        <el-input v-model="scope.slotInput">插槽输入框
        </el-input>
      </template>
    </base-form>
  </el-dialog>
</template>

<script>
import { formApi } from '@/api/example'
import { formItems } from './formItem'
export default {
  data() {
    return {
      dialogVisible: false,
      formApi,
      formItems,
      mergeForm: {
        id: ''
      }
    }
  },
  methods: {
    show(id) {
      this.dialogVisible = true
      this.mergeForm = {
        id,
        deviceid: '111',
        code: '222',
        SIM: '333',
        status: '1',
        slotInput: '555'
      }
    },
    hideDIalog() {
      this.dialogVisible = false
      console.log(this.$parent, 'parents')
      this.$parent.fetchData()
    }
  }

}
</script>

<style>

</style>
