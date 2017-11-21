# MPA-scaffold
a multiple page application scaffold with Webpack and Vue

## 开发背景

目前各种基于webpack打包的教程（包括很多CLI工具）都是针对SPA单页应用的，特点是，整个项目只有一个，无论多少个页面，都是走的同一个打包流程，如果是非SPA项目的话，各种子页面汇聚在一个工程下，每次打包都重新打一遍，是很愚蠢和低效率的行为。
此项目用于非SPA项目的webpack打包,这套方案解决的痛点是，webpack配置文件不用重复编写，目录结构不用重复搭建，真正做到了一次搭建，多次复用。

## 创建新项目流程

进入views文件夹，新建项目文件夹, 然后在此文件夹下新建page.conf配置文件、package.json、入口js etc.

具体参照示例项目`view/test/`文件夹。
