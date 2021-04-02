<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="{row}">
          <el-button @click="handleUpdate(row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <el-dialog :visible.sync="dialogVisible" width="50%" title="新增">
        <base-form
          :form-items="formItems"
          :api="formApi"
          :merge-form="mergeForm"
          reset
          @after-submit="showTableData"
          @cancle="hideDIalog"
        >
          <template v-slot:slotInput="{scope}">
            <el-input v-model="scope.slotInput" @focus="myfocus">插槽输入框
            </el-input>
          </template>
          <!-- <template v-slot:footer="{scope}">
            <el-button type="primary" @click="handleClick(scope)">111</el-button>
          </template> -->
        </base-form>
      </el-dialog>
      <Update ref="update" />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { formApi } from '@/api/example'
import { formItems } from './formItem'
import Update from './update'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    Update
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      formApi,
      formItems,
      myfocuscopy: null,
      mergeForm: {
        id: '11',
        slotInput: '' // 通过插槽插入的组件
      }

    }
  },
  computed: {},
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    showTableData(res) {
      this.tableData = res.tableData
    },
    hideDIalog() {
      // this.mergeForm = { slotInput: '' }
      this.dialogVisible = false
    },
    myfocus() {
      console.log('onFocus')
    },
    handleClick(scope) {
      console.log(scope, 'scope')
      console.log('1111')
    },
    handleUpdate(id) {
      this.$refs.update.show(id)
    }
  }
}
</script>
<style lang="scss">
.testclass{
  // border: 1px solid rgb(, green, blue);

}
</style>
