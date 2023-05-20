# 用法

## 修改提交作者和邮箱

```bash
// 设置全局
git config --global user.name "Author Name"
git config --global user.email "Author Email"

// 或者设置本地项目库配置
git config user.name "Author Name"
git config user.email "Author Email"

```

只设置当次提交

```bash
git commit --author="author <email@address.com>"
```

## 基本命令

- `git init`：用于初始化一个 Git 仓库
- `git status`：用于查看当前 Git 状态
- `git log`：查看提交过的 git 历史，按 q 退出
- `git add`：它的使用场景有三个：1、将一个尚未被 Git 跟踪的文件纳入 Git 跟踪；2、将一个已经被 Git 跟踪的文件且这个文件处于修改状态，通过 add，可以将它纳入暂存区；3、将 merge 或者 rebase 后产生的冲突文件标记为冲突已解决。
- `git commit`：将暂存区内容纳入 Git 提交记录
- `git restore`：取消对某个文件的修改
- `git diff`：查看文件修改详情
- `git checkout`：切换分支
- `git branch`：新建分支
- `git merge`：合并分支
- `git stash`：临时保存当前分支的工作状态，方便切换到其它分支。恢复-`git stash pop`
- `git revert`：撤销某次修改，此次操作之前和之后的 commit 和 history 都会保留，并且把这次撤销，作为一次最新的提交
- `git reset`：回退版本，可以遗弃不再使用的提交
- `git reflog`: 打印所有的 commit 操作记录，便于错误操作后找回记录

## git stash

#### 介绍

stash 命令能够将还未 commit 的代码存起来，让你的工作目录变得干净。

#### 应用场景

当正在 `feature` 分支开发新需求，突然需要修复 bug，此时有文件更改了，需要提交 commit 保持工作区干净才能切分支，如果不使用 `stash` 只有急忙 `commit` 上去，`commit` 信息也随便写了个“暂存代码”，于是该分支提交记录就留了一条黑历史…

#### 相关命令

```bash
# 保存当前未commit的代码
git stash

# 保存当前未commit的代码并添加备注
git stash save "备注的内容"

# 列出stash的所有记录
git stash list

# 删除stash的所有记录
git stash clear

# 应用最近一次的stash
git stash apply

# 应用最近一次的stash，随后删除该记录
git stash pop

# 删除最近的一次stash
git stash drop
```

当有多条 stash，可以指定操作 stash，首先使用 stash list 列出所有记录：

```bash
$ git stash list
stash@{0}: WIP on ...
stash@{1}: WIP on ...
stash@{2}: On ...
```

应用第二条记录：

```bash
$ git stash apply stash@{1}
```

pop，drop 同理。

## git cherry-pick

#### 介绍

将已经提交的 commit，复制出新的 commit 应用到分支里

#### 应用场景

- 有时候版本的一些优化需求开发到一半，可能其中某一个开发完的需求要临时上，或者某些原因导致待开发的需求卡住了已开发完成的需求上线。这时候就需要把 commit 抽出来，单独处理。

- 有时候开发分支中的代码记录被污染了，导致开发分支合到线上分支有问题，这时就需要拉一条干净的开发分支，再从旧的开发分支中，把 commit 复制到新分支。

#### 相关命令

```bash
# 在目标分支应用，commitHash 和之前的不一样，但是提交时间还是保留之前的
git cherry-pick "commitHash"

# 一次转移多个提交
git cherry-pick commit1 commit2

# 多个连续的commit，也可区间复制，将 commit1 到 commit2 这个区间的 commit
# 都应用到当前分支（包含commit1、commit2），commit1 是最早的提交
git cherry-pick commit1^..commit2

# cherry-pick --continue时代码冲突，解决完重新提交到暂存区，执行以下命令继续
git cherry-pick --continue

# 放弃 cherry-pick。回到操作前的样子，就像什么都没发生过
git cherry-pick --abort

# 退出 cherry-pick。保留已经cherry-pick成功的 commit，并退出cherry-pick流程
git cherry-pick --quit
```

## git checkout

```bash
# 用于创建并切换到一个名为 feat/X 的新分支。
git checkout -b feature-branch
# 从一个已经存在的分支上创建一个新的分支
git checkout -b feature-branch main
```

```bash
git checkout <pathspec>
```

这里，`pathspec` 可以是任何有效的路径说明符，例如：. 对于当前目录、`path/to/file`、`file.extension`，甚至是正则表达式。

这将清除对指定文件的所有未暂存更改并恢复当前分支的文件的未修改版本。此命令不会影响暂存文件——只会清除未暂存的更改。

例如，如果想清除当前目录中所有未暂存的更改并从头开始，最简单的方法是使用 `git checkout .`

```bash
git checkout origin/master -- <pathspec>
```

我们也可以使用 `git checkout` 来恢复文件的本地或远程版本。这个命令的作用是将远程分支 `origin/master` 上指定的文件 `pathspec` 签出到本地分支上。该命令会用远程分支上的文件覆盖本地分支上的同名文件，即用远程分支的版本替换本地分支的版本，从而确保本地分支与远程分支保持同步。
