# Creator Database 功能模块

## 概述

Creator Database 是为企业用户新增的功能模块，用于管理创作者信息。该功能仅对企业账号可见，位于左侧菜单栏的 WORKSPACE 部分。

## 功能特性

### 1. 单个添加创作者
- **功能提示**: Add a new creator to your database manually
- **表单字段**:
  - **Basic Info**: Name*, GGTK ID*, TikTok ID*, Number ID*, Join Date*, Shorts
  - **Demographics**: Gender, Age, Birthday, Occupation, Job Description, Marital Status
  - **Personality**: Type, Streaming Environment, Communication Skill, Inner Qualities, Cheerfulness, Learning Ability, Production Skills
  - **Agency Info**: In-Part*, Group*, Unit*, Contact Channel, Channel Detail, Recruiter, Manager ID
  - **Dream Info**: Dream, Dream Detail
  - **Status**: Active/Inactive/Trial/Blacklist*
  - **Notes**: 备注信息

### 2. 批量导入
- **功能提示**: Import creators from a CSV or Excel file
- **支持格式**: CSV, Excel (.xlsx, .xls)
- **功能**: 支持下载模板，批量导入创作者数据

### 3. 搜索/筛选/排序
- **搜索**: 支持按创作者姓名、GGTK ID、TikTok ID 搜索
- **筛选**: 可按 Shorts、Gender、Type、In-Part、Status 等筛选
- **排序**: 支持按姓名（A-Z/Z-A）、加入日期排序

### 4. 创作者列表（卡片视图）
- **展示数据**: 头像、Name、GGTK ID、Gender、Age、Type、In-Part、Manager、Status
- **操作按钮**:
  - View Details: 查看创作者详情
  - Performance: 查看表现数据
  - Add Task: 添加任务
  - Edit: 编辑创作者
  - Upload Performance: 上传表现数据
  - Remove: 删除创作者

### 5. 创作者详情（右侧抽屉式展示）
- **Information Tab**: 显示所有创作者信息
- **Performance Tab**: 显示总打赏数、直播时间和打赏金额
- **操作按钮**: Edit、Upload Performance、Add Task、Remove

## 技术实现

### 文件结构
```
components/creator-database/
├── creator-database.tsx      # 主组件
├── creator-card.tsx          # 创作者卡片组件
├── add-creator-form.tsx      # 添加创作者表单
├── creator-details.tsx       # 创作者详情组件
└── batch-import.tsx          # 批量导入组件

types/
└── creator.ts               # 创作者类型定义

app/(app)/creator-database/
└── page.tsx                 # 页面路由
```

### 类型定义
```typescript
interface Creator {
  id: string
  // Basic Info
  name: string
  ggtkId: string
  tiktokId: string
  numberId: string
  joinDate: string
  shorts?: string
  
  // Demographics
  gender?: string
  age?: number
  birthday?: string
  occupation?: string
  jobDescription?: string
  maritalStatus?: string
  
  // Personality
  type?: 'Idol' | 'Calm' | 'Friendly' | 'Talent' | 'Men'
  streamingEnvironment?: string
  communicationSkill?: '高' | '普通' | '低'
  innerQualities?: string
  cheerfulness?: string
  learningAbility?: string
  productionSkills?: string
  
  // Agency Info
  inPart: 'Partner' | 'Inhouse'
  group: string
  unit: string
  contactChannel?: string
  channelDetail?: string
  recruiter?: string
  managerId?: string
  
  // Dream Info
  dream?: string
  dreamDetail?: string
  
  // Status
  status: 'Active' | 'Inactive' | 'Trial' | 'Blacklist'
  
  // Notes
  notes?: string
  
  // Timestamps
  createdAt: string
  updatedAt: string
}
```

### 国际化支持
所有文本都支持国际化，使用 `react-i18next` 进行多语言管理。英文翻译已添加到 `lib/i18n.ts` 文件中。

## 使用方法

### 1. 访问功能
- 确保用户类型为 "business"
- 在左侧菜单栏的 WORKSPACE 部分找到 "Creator Database"
- 点击进入功能页面

### 2. 添加创作者
- 点击 "Add Creator" 按钮
- 填写表单信息（必填字段标有 *）
- 点击 "Save Creator" 保存

### 3. 批量导入
- 点击 "Batch Import" 按钮
- 下载模板文件
- 填写数据后上传文件
- 点击 "Import Creators" 导入

### 4. 查看详情
- 在创作者卡片上点击 "View Details"
- 在右侧抽屉中查看完整信息
- 切换到 "Performance" 标签查看表现数据

### 5. 编辑和删除
- 在创作者卡片的下拉菜单中或详情页面进行操作
- 支持编辑、删除、上传表现数据等功能

## 测试

### 测试页面
访问 `/test-creator-database` 可以独立测试 Creator Database 功能。

### 开发服务器
```bash
npm run dev
```

### 构建
```bash
npm run build
```

## 注意事项

1. 该功能仅对企业用户可见
2. 所有表单都有验证，必填字段不能为空
3. 支持响应式设计，适配不同屏幕尺寸
4. 使用模拟数据进行演示，实际使用时需要连接后端API
5. 文件上传功能目前为模拟实现，需要根据实际需求完善

## 后续开发

1. 连接真实的后端API
2. 实现文件上传和解析功能
3. 添加数据验证和错误处理
4. 实现编辑功能
5. 添加更多的筛选和排序选项
6. 实现数据导出功能
7. 添加权限控制
8. 优化性能和用户体验 