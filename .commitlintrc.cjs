const { RuleConfigSeverity } = require('cz-git');
/** @type {import('cz-git').UserConfig} */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always'],
  },
  prompt: {
    useEmoji: true,
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择提交类型 :',
      scope: '选择提交范围（可选）:',
      customScope: '输入自定义提交范围 :',
      subject: '简述变更内容 :\n',
      body: '详细描述变更内容（可选）。使用 "|" 换行 :\n',
      breaking: '描述破坏性更新内容（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联 issue 前缀（可选）:',
      customFooterPrefix: '输入自定义 issue 前缀 :',
      footer: '列举关联 issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '提交 commit ?',
    },
    skipQuestions: ['scope', 'breaking', 'footerPrefix', 'footer'],
    types: [
      {
        value: 'feat',
        name: 'feat:     ✨ 新增功能 | A new feature',
        emoji: ':sparkles:',
      },
      {
        value: 'fix',
        name: 'fix:      🐛 修复缺陷 | A bug fix',
        emoji: ':bug:',
      },
      {
        value: 'docs',
        name: 'docs:     📚 文档更新 | Documentation only changes',
        emoji: ':book:',
      },
      {
        value: 'style',
        name: 'style:    💄 代码格式 | Changes that do not affect the meaning of the code',
        emoji: ':lipstick:',
      },
      {
        value: 'refactor',
        name: 'refactor: 🔨 代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: ':hammer:',
      },
      {
        value: 'perf',
        name: 'perf:     🚀 性能提升 | A code change that improves performance',
        emoji: ':rocket:',
      },
      {
        value: 'test',
        name: 'test:     ✅ 测试相关 | Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    📦️ 构建相关 | Changes that affect the build system or external dependencies',
        emoji: ':package:',
      },
      {
        value: 'ci',
        name: 'ci:       🤖 持续集成 | Changes to our CI configuration files and scripts',
        emoji: ':robot:',
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️ 回退代码 | Revert to a commit',
        emoji: ':rewind:',
      },
      {
        value: 'chore',
        name: 'chore:    🧹 其他修改 | Other changes that do not modify src or test files',
        emoji: ':broom:',
      },
    ],
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    issuePrefixes: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
