# git rebase -i 交互式变基

Git 的交互式变基是其最强大、最灵活的命令之一，允许倒回历史并进行任何所需的更改。如果想要删除旧的提交、更改旧的提交消息或者将旧的提交压缩成其他的提交

## 删除旧提交

```bash
git rebase -ir <id>
```

此命令将启动一个文本编辑器

```bash
pick id1 message1
pick id2 message2
pick id3 message3
```

要删除 id1 对应的提交，需要将 pick 命令更改为 drop（或 d）并保持其他不变

```bash
drop id1 message1
pick id2 message2
pick id3 message3
```

关闭并保存文件。在已删除提交之后的所有提交哈希都将被重新计算

## 改写提交消息

```bash
git rebase -i <id>
```

只需将任何要更改其消息的提交的 pick 替换为 r（或 reword）

```bash
reword id1 message1
pick id2 message2
pick id3 message3
```

关闭并保存文件，对于想要改写的每个提交，git 将打开编辑器，就像正在修改该提交一样，允许编辑消息

## 编辑旧提交

允许修改提交添加文件

```bash
git rebase -i <id>
```

将 pick 替换为 edit

```bash
edit id1 message1
pick id2 message2
pick id3 message3
```

关闭并保存文件，应该从 git 中看到这条消息：

```bash
Stopped at id1 message1
You can amend the commit now, with

        git commit --amend

Once you are satisfied with your changes, run

        git rebase --continue
```

运行命令进行修改或添加文件：

```bash
git commit --amend
```

需要继续 rebase：

```bash
git rebase --continue
```

## 压缩

压缩可以将 n 个提交合并为一个，使提交历史更加紧凑，这有时很有用。但是，如果将来需要，将无法恢复或修改旧的提交

```bash
git rebase -i <id>
```

我们会将最后两个提交压缩到第一个提交中，所以将它们的 pick 命令更改为 squash：

```bash
pick id1 message1
squash  id2 message2
squash  id3 message3
```

保存并退出，git 将打开编辑器，通知我们将要合并三个提交，保存并退出即可
