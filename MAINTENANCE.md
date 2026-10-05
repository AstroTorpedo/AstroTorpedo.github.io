# 个人学术主页维护

基于 Academic Pages / Jekyll，网站地址：https://astrotorpedo.github.io/ 。原有 arXiv 网站由独立仓库维护。

## 页面与编辑入口

| 内容 | 文件 | 地址 |
|---|---|---|
| 简介、研究兴趣、联系信息 | `_pages/about.md` | `/` |
| 公开项目 | `_pages/portfolio.html`、`_portfolio/*.md` | `/projects/` |
| 教育与天文经历 | `_pages/journey.html` | `/journey/` |
| 摄影相册 | `_pages/photography.html`、`_data/photography.yml` | `/photography/` |
| 简历 | `_pages/cv.md` | `/cv/` |
| 左侧资料栏与页面结构 | `_layouts/personal.html` | 所有主要页面共用 |
| 导航 | `_data/navigation.yml` | 真实页面地址 |
| 样式、交互 | `assets/css/personal.css`、`assets/js/personal.js` | — |
| 人像与网页作品副本 | `images/photography/` | — |

## 布局与摄影

- 桌面端左侧资料栏固定在阅读区域顶部，右侧正文正常滚动；手机端资料栏放在正文上方。
- 页面背景使用本人摄影作品，随区块/相册位置交叉淡入。各页面 front matter 的 `backgrounds` 与正文 `data-background` 控制作品顺序。
- 15 张天文作品按星系、星云、星空分类；点图打开完整画幅，支持前后切换、左右方向键与 Escape。
- 网页只使用独立生成的 WebP 副本，不改动原素材。缩略图最长边 1000，大图最长边 2400，背景最长边 1800；不放大低分辨率源图。
- 网页副本不携带 EXIF，保留画幅和原有署名；未提供的设备、曝光时间及地点不自行推断。
- 新增作品：导出 `<id>-thumb.webp` 与 `<id>-large.webp`，再在 `_data/photography.yml` 中加入对应 id、标题与分类。
- 系统“减少动态效果”开启时关闭入场动画，背景改为直接切换。无脚本时仍可阅读并通过图片链接打开大图。

## 本地预览

使用 Ruby 3.3。当前 Mac 通过 Homebrew 安装了 `ruby@3.3`。

```sh
# 使用当前 Mac 的 Ruby 3.3，依赖仅保存在项目中。
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
bundle config set --local path vendor/bundle
bundle install
# 本地 URL 配置位于忽略的 local 目录。
bundle exec jekyll serve --config _config.yml,local/_config_preview.yml --host 127.0.0.1 --port 4000
```

如无 `local/_config_preview.yml`，创建该文件并写入 `url: "http://127.0.0.1:4000"`。修改 `_config.yml` 后需重启预览。

## 构建与发布

```sh
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter --destination local/production-site
```

GitHub Pages 使用 `master` 分支根目录，部署成功后查看 https://astrotorpedo.github.io/ 。

- 英文主页；中文笔记后续增加。
- 两个邮箱已按用户授权公开；无论文，暂不展示 Publications。
- 学校入学年份、CNAO 获奖年份、协会任职起止时间未提供，因此不自行补充。
- 摄影荣誉“北京天文馆 2026 年优秀天文摄影师”依据用户提供的信息记录，不推断比赛奖级或名次。
- 模板示例与旧布局草稿保存于忽略的 `local/`，不参与构建、不上传。
- 保留 Academic Pages / Minimal Mistakes 的许可证及署名；上游基线为 `1629ef8af8756d964ca75d0928291ce28aef16d0`。

## 名称参考

- 团组官网：https://groups.bao.ac.cn/ism/ 。中文名：星际介质演化及恒星形成团组。
- 团组发布的英文招聘：https://aas.org/jobregister/ad/fcab0ff9 。简称 ISM Group，正文写 ISM Evolution and Star Formation group。
- 国台英文介绍：https://english.nao.cas.cn/research/researchdivisions/radioastronomy/202103/t20210321_265669.html 。页面标题采用 Interstellar Medium and Star Formation。
- CNAO：https://www.bjp.org.cn/en/China%20National%20Astronomy%20Olympiad/index.shtml 。
- 导师姓名：https://english.nao.cas.cn/newsevents/researchprogress/202409/t20240902_684613.html 。
