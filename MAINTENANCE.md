# 个人学术主页维护

- 上游模板：`academicpages/academicpages.github.io`，基线提交 `1629ef8af8756d964ca75d0928291ce28aef16d0`。
- 个人主页：`https://astrotorpedo.github.io/`。
- 原有论文网站：`https://astrotorpedo.github.io/arXiv/`，由独立仓库维护。
- 第一版使用英文，个人简介来源于用户提供的信息；邮箱按用户授权公开，论文栏目暂不展示。

## 编辑入口

| 内容 | 文件 |
|---|---|
| 网站名称、侧栏、个人信息 | `_config.yml` |
| 首页 | `_pages/about.md` |
| 导航 | `_data/navigation.yml` |
| 项目总览 | `_pages/portfolio.html` |
| 项目详情 | `_portfolio/*.md` |
| 简历 | `_pages/cv.md` |
| 临时头像 | `images/radio-galaxy.svg` |

## 本地预览

使用 Ruby 3.3，避免 macOS 系统 Ruby 2.6。

```sh
# 将依赖保存在项目内，避免写入系统 gem 目录。
bundle config set --local path vendor/bundle
bundle install
# 只监听本机，预览不对外公开。
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --livereload
```

修改 `_config.yml` 后需重启预览。

## 发布

1. 从 Academic Pages 模板创建公开仓库 `AstroTorpedo.github.io`。
2. 将个人版本提交到该仓库默认分支。
3. 在 Settings → Pages 选择 Deploy from a branch、默认分支、`/(root)`。
4. 在 Actions 确认 Pages 构建和部署成功。

模板示例内容和上游专用维护工作流移至 `local/template-samples/`，不参与构建且不提交到远端。
保留模板许可证；更新上游时单独迁移必要修复，避免覆盖个人内容。
学校入学年份、获奖年份和任职起止时间尚未提供，因此不自行推断。
后续可以加入中文笔记和用户提供的深空摄影作品。

## 英文名称参考

- 团组：https://english.nao.cas.cn/research/researchdivisions/radioastronomy/202103/t20210321_265669.html
- CNAO：https://www.bjp.org.cn/en/China%20National%20Astronomy%20Olympiad/index.shtml

- 导师姓名参考：https://english.nao.cas.cn/newsevents/researchprogress/202409/t20240902_684613.html
