<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
      <template #tableTitle>
          <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
          <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchHandleDelete">
                    <Icon icon="ant-design:delete-outlined"></Icon>
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>批量操作
                <Icon icon="mdi:chevron-down"></Icon>
              </a-button>
        </a-dropdown>
      </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{text}">
         <div v-html="text"></div>
      </template>
       <!--省市区字段回显插槽-->
       <template #pcaSlot="{text}">
         {{ getAreaTextByCode(text) }}
       </template>
      <template #fileSlot="{text}">
         <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
         <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
   <!--子表表格tab-->
    <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="points list" key="1" >
           <AmUserPointList/>
        </a-tab-pane>
        <a-tab-pane tab="token list" key="2" forceRender>
           <AmUserTokenList/>
        </a-tab-pane>
        <a-tab-pane tab="nft list" key="3" forceRender>
           <AmUserNftList/>
        </a-tab-pane>
        <a-tab-pane tab="quest list" key="4" forceRender>
           <AmUserQuestList/>
        </a-tab-pane>
     </a-tabs>
    <!-- 表单区域 -->
    <AmbassadorUserModal @register="registerModal" @success="handleSuccess"></AmbassadorUserModal>
  </div>
</template>

<script lang="ts" name="amuser-ambassadorUser" setup>
  import {ref, computed, unref,provide} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage'
  import {useModal} from '/@/components/Modal';
  import AmbassadorUserModal from './components/AmbassadorUserModal.vue'
  import AmUserPointList from './AmUserPointList.vue'
  import AmUserTokenList from './AmUserTokenList.vue'
  import AmUserNftList from './AmUserNftList.vue'
  import AmUserQuestList from './AmUserQuestList.vue'
  import {columns, searchFormSchema} from './AmbassadorUser.data';
  import {list, deleteOne, syncOne, upgradeOne, batchDelete, getImportUrl,getExportUrl} from './AmbassadorUser.api';
  import {downloadFile} from '/@/utils/common/renderUtils';
  //注册model
  const [registerModal, {openModal}] = useModal();
   //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
      tableProps:{
           title: 'ambassador user list',
           api: list,
           columns,
           canResize:false,
           rowSelection: {type: 'radio'},
           formConfig: {
                schemas: searchFormSchema,
                fieldMapToNumber: [
                ],
                fieldMapToTime: [
                ],
            },
           actionColumn: {
               width: 120,
               fixed:'right'
           },
           pagination:{
               current: 1,
               pageSize: 5,
               pageSizeOptions: ['5', '10', '20'],
           }
        },
        exportConfig: {
            name:"ambassador user list",
            url: getExportUrl,
        },
        importConfig: {
            url: getImportUrl,
            success: handleSuccess
        },
    })

  const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

  const mainId = computed(() => (unref(selectedRowKeys).length > 0 ? unref(selectedRowKeys)[0] : ''));
  //下发 mainId,子组件接收
  provide('mainId', mainId);
   /**
    * 新增事件
    */
  function handleAdd() {
     openModal(true, {
       isUpdate: false,
       showFooter: true,
     });
  }
   /**
    * 编辑事件
    */
  function handleEdit(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: true,
     });
   }
   /**
    * 详情
   */
  function handleDetail(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: false,
     });
   }
   /**
    * 删除事件
    */
  async function handleDelete(record) {
     await deleteOne({id: record.id}, handleSuccess);
   }
   /**
    * 批量删除事件
    */
  async function batchHandleDelete() {
     await batchDelete({ids: selectedRowKeys.value},handleSuccess);
   }
   /**
    * 成功回调
    */
  function handleSuccess() {
      (selectedRowKeys.value = []) && reload();
   }

  async function handleSync(record) {
    await syncOne({id: record.id}, handleSuccess);
  }

  async function handleUpgrade(record) {
    await upgradeOne({id: record.id}, handleSuccess);
  }

   /**
      * 操作栏
      */
  function getTableAction(record){
       return [
         {
           label: '编辑',
           onClick: handleEdit.bind(null, record),
         }
       ]
   }


  /**
   * 下拉操作栏
   */
  function getDropDownAction(record){
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '同步nft',
        popConfirm: {
          title: '是否确认同步',
          confirm: handleSync.bind(null, record),
        }
      },
      {
        label: '升级Ambassador',
        popConfirm: {
          title:`确认升级用户:${record.username} 为Ambassador,该操作不可逆。`,
          confirm: handleUpgrade.bind(null, record),
        },
        disabled: 'ambassador'===record.role
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        }
      }
    ]
  }

</script>

<style scoped>

</style>