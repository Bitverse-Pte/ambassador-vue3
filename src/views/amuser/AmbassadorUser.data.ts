import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: 'evm address',
    align:"center",
    dataIndex: 'address'
   },
   {
    title: '邮箱',
    align:"center",
    dataIndex: 'email'
   },
   {
    title: '用户名',
    align:"center",
    dataIndex: 'username'
   },
   {
    title: '头像',
    align:"center",
    dataIndex: 'avatar',
    customRender:render.renderImage,
   },
   {
    title: '角色',
    align:"center",
    dataIndex: 'role_dictText'
   },
   {
    title: '国家/地区',
    align:"center",
    dataIndex: 'location'
   },
   {
    title: '当前token数量',
    align:"center",
    dataIndex: 'token'
   },
   {
    title: '当前points数量',
    align:"center",
    dataIndex: 'point'
   },
   {
    title: '当前未收集的points',
    align:"center",
    dataIndex: 'pointCache'
   },
   {
    title: '当前等级',
    align:"center",
    dataIndex: 'level_dictText'
   },
   {
    title: 'discord id',
    align:"center",
    dataIndex: 'discordId'
   },
   {
    title: 'twitter id',
    align:"center",
    dataIndex: 'twitterId'
   },
   {
    title: 'telegram id',
    align:"center",
    dataIndex: 'telegramId'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "evm address",
      field: "address",
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "邮箱",
      field: "email",
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "用户名",
      field: "username",
      component: 'JInput',
      colProps: {span: 6},
 	},
	{
      label: "角色",
      field: "role",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"user_role"
      },
      colProps: {span: 6},
 	},
	{
      label: "当前等级",
      field: "level",
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"user_level"
      },
      colProps: {span: 6},
 	},
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: 'evm address',
    field: 'address',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入evm address!'},
                 {...rules.duplicateCheckRule('ambassador_user', 'address',model,schema)[0]},
          ];
     },
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入邮箱!'},
                 {...rules.duplicateCheckRule('ambassador_user', 'email',model,schema)[0]},
          ];
     },
  },
  {
    label: '用户名',
    field: 'username',
    component: 'Input',
  },
  {
    label: '头像',
    field: 'avatar',
     component: 'JImageUpload',
     componentProps:{
      },
  },
  {
    label: '角色',
    field: 'role',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"user_role"
     },
  },
  {
    label: '国家/地区',
    field: 'location',
    component: 'Input',
  },
  {
    label: '当前token数量',
    field: 'token',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: false},
                 { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!'},
          ];
     },
  },
  {
    label: '当前points数量',
    field: 'point',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: false},
                 { pattern: /^-?\d+$/, message: '请输入整数!'},
          ];
     },
  },
  {
    label: '当前未收集的points',
    field: 'pointCache',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: false},
                 { pattern: /^-?\d+$/, message: '请输入整数!'},
          ];
     },
  },
  {
    label: '当前等级',
    field: 'level',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"user_level"
     },
  },
  {
    label: 'discord id',
    field: 'discordId',
    component: 'Input',
  },
  {
    label: 'twitter id',
    field: 'twitterId',
    component: 'Input',
  },
  {
    label: 'telegram id',
    field: 'telegramId',
    component: 'Input',
  },
  {
    label: 'Contributor历史分数(只有Ambassador)',
    field: 'historyPoint',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: false},
                 { pattern: /^-?\d+$/, message: '请输入整数!'},
          ];
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];

//子表列表数据
export const amUserPointColumns: BasicColumn[] = [
   {
    title: '发放数量',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '发放原因',
    align:"center",
    dataIndex: 'issueBy'
   },
   {
    title: '关联gleam任务',
    align:"center",
    dataIndex: 'actionUrl'
   },
   {
    title: '确认发放时间',
    align:"center",
    dataIndex: 'confirmTime'
   },
];
//子表表单数据
export const amUserPointFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
  {
    label: '发放数量',
    field: 'amount',
    component: 'InputNumber',
  },
  {
    label: '发放原因',
    field: 'issueBy',
    component: 'Input',
  },
  {
    label: '关联gleam任务',
    field: 'actionUrl',
    component: 'Input',
  },
  {
    label: '确认发放时间',
    field: 'confirmTime',
    component: 'DatePicker',
    componentProps: {
       showTime:true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
];
//子表列表数据
export const amUserTokenColumns: BasicColumn[] = [
   {
    title: 'Name',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: 'Amount',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: 'Status',
    align:"center",
    dataIndex: 'status_dictText'
   },
   {
    title: 'Issue By',
    align:"center",
    dataIndex: 'issueBy'
   },
   {
    title: 'Claimed At',
    align:"center",
    dataIndex: 'claimed'
   },
   {
    title: 'Issue Date',
    align:"center",
    dataIndex: 'issueDate'
   },
   {
    title: 'Lock Time',
    align:"center",
    dataIndex: 'lockTime'
   },
];
//子表表单数据
export const amUserTokenFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
  {
    label: 'Name',
    field: 'name',
    component: 'Input',
  },
  {
    label: 'Amount',
    field: 'amount',
    component: 'InputNumber',
  },
  {
    label: 'Status',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"user_token_state"
     },
  },
  {
    label: 'Issue By',
    field: 'issueBy',
    component: 'Input',
  },
  {
    label: 'Claimed At',
    field: 'claimed',
    component: 'DatePicker',
    componentProps: {
       showTime:true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: 'Issue Date',
    field: 'issueDate',
    component: 'DatePicker',
    componentProps: {
       showTime:true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: 'Lock Time',
    field: 'lockTime',
    component: 'DatePicker',
    componentProps: {
       showTime:true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
];
//子表列表数据
export const amUserNftColumns: BasicColumn[] = [
  {
   title: 'Token ID',
   align:"center",
   dataIndex: 'tokenId'
  },
  {
   title: 'Sender',
   align:"center",
   dataIndex: 'issueBy'
  },
  {
   title: 'Send Time',
   align:"center",
   dataIndex: 'issueTime'
  },
  {
   title: 'NFT合约地址',
   align:"center",
   dataIndex: 'address'
  },
  {
   title: '交易hash',
   align:"center",
   dataIndex: 'txHash'
  },
  {
   title: '交易url',
   align:"center",
   dataIndex: 'url'
  },
];
//子表表单数据
export const amUserNftFormSchema: FormSchema[] = [
 // TODO 子表隐藏字段，目前写死为ID
 {
   label: '',
   field: 'id',
   component: 'Input',
   show: false
 },
 {
   label: 'Token ID',
   field: 'tokenId',
   component: 'InputNumber',
   dynamicDisabled:true,
 },
 {
   label: 'Sender',
   field: 'issueBy',
   component: 'Input',
 },
 {
   label: 'Send Time',
   field: 'issueTime',
   component: 'DatePicker',
   componentProps: {
      showTime:true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
 },
 {
   label: 'NFT合约地址',
   field: 'address',
   component: 'Input',
 },
 {
   label: '交易hash',
   field: 'txHash',
   component: 'Input',
 },
 {
   label: '交易url',
   field: 'url',
   component: 'Input',
 },
 {
   label: 'NFT拥有种类',
   field: 'nftType',
   component: 'Input',
 },
];
//子表列表数据
export const amUserQuestColumns: BasicColumn[] = [
   {
    title: 'gleam.io competition',
    align:"center",
    dataIndex: 'questId'
   },
   {
    title: 'gleam.io action',
    align:"center",
    dataIndex: 'actionId'
   },
   {
    title: '上次同步时间',
    align:"center",
    dataIndex: 'syncTime'
   },
];
//子表表单数据
export const amUserQuestFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
  {
    label: 'gleam.io competition',
    field: 'questId',
    component: 'Input',
  },
  {
    label: 'gleam.io action',
    field: 'actionId',
    component: 'Input',
  },
  {
    label: '上次同步时间',
    field: 'syncTime',
    component: 'DatePicker',
    componentProps: {
       showTime:true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
];
