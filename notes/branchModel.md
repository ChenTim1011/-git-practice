Git flow 模型的分支策略適用於大型和小型專案，能夠提高團隊合作效率和程式碼管理。

---

### **主要分支（Main Branches）**

1. **主分支（main）：**
   - **用途：** 存放可在生產環境運行的穩定程式碼。
   - **特點：** 程式碼已經過充分測試、設計良好、可維護、可擴展並有完整文件。
   - **操作：** 當開發完成並準備發佈時，將程式碼合併至此分支，並標記版本號。

2. **開發分支（develop）：**
   - **用途：** 保存下一個發佈版本的最新開發程式碼。
   - **特點：** 新功能的整合和自動化測試均基於此分支。
   - **操作：** 功能分支從此分支分離，開發完成後再合併回來。

---

### **支援分支（Supporting Branches）**

這些分支在完成任務後會被刪除，用於支援主要開發流程。

1. **功能分支（Feature Branches）：**
   - **來源分支：** develop
   - **合併目標：** develop
   - **命名規則：** `feature/*`，如 `feature/login-page`
   - **用途：** 開發新功能，獨立進行，避免影響主幹程式碼。
   - **操作步驟：**
     ```bash
     # 建立功能分支
     git checkout -b feature/新功能 develop
     # 開發並提交更改
     git commit -m "新增功能"
     # 合併回開發分支
     git checkout develop
     git merge --no-ff feature/新功能
     # 刪除功能分支
     git branch -d feature/新功能
     ```

2. **發佈分支（Release Branches）：**
   - **來源分支：** develop
   - **合併目標：** master 和 develop
   - **命名規則：** `release-*`，如 `release-1.0`
   - **用途：** 準備新版本發佈，進行最終測試、修正小錯誤、設定版本號等。
   - **操作步驟：**
     ```bash
     # 從開發分支建立發佈分支
     git checkout -b release-1.0 develop
     # 設定版本號並提交
     git commit -m "設定版本號為 1.0"
     # 合併到主分支並標記版本
     git checkout master
     git merge --no-ff release-1.0
     git tag -a 1.0
     # 合併回開發分支
     git checkout develop
     git merge --no-ff release-1.0
     # 刪除發佈分支
     git branch -d release-1.0
     ```

3. **修補分支（Hotfix Branches）：**
   - **來源分支：** master
   - **合併目標：** master 和 develop
   - **命名規則：** `hotfix-*`，如 `hotfix-1.0.1`
   - **用途：** 緊急修復生產環境中的嚴重問題，不影響當前開發流程。
   - **操作步驟：**
     ```bash
     # 從主分支建立修補分支
     git checkout -b hotfix-1.0.1 master
     # 修復問題並提交
     git commit -m "修復緊急問題"
     # 合併回主分支並標記新版本
     git checkout master
     git merge --no-ff hotfix-1.0.1
     git tag -a 1.0.1
     # 合併回開發分支
     git checkout develop
     git merge --no-ff hotfix-1.0.1
     # 刪除修補分支
     git branch -d hotfix-1.0.1
     ```

---

### **總結**

- **主要分支**（master/main 和 develop）始終存在，分別用於保存穩定的生產程式碼和最新的開發程式碼。
- **支援分支**（feature、release、hotfix）在完成特定任務後即被刪除，保持分支結構清晰。
- 使用 `--no-ff` 參數合併分支，可以保留完整的開發歷史，方便日後追蹤和回溯。

---

**心得：**

Git flow 分支模型提供了一個清晰且有條理的開發流程，讓團隊成員能夠明確分工，同時進行不同階段的開發工作。透過功能分支，
開發人員可以專注於各自的新功能開發，而不影響他人。發佈分支的存在，使得團隊能夠在正式發佈前進行充分的測試和調整，
確保產品品質。修補分支則提供了迅速應對緊急問題的途徑，保障生產環境的穩定性。

在實際應用中，我體會到這種分支策略能夠提高開發效率和團隊合作效果。然而，也需要根據專案的規模和團隊人數進行適當的調整。
例如，小型團隊或簡單專案可能不需要這麼複雜的分支結構，可以適當簡化。

總的來說，深入理解並靈活運用 Git 的分支模型，不僅能提升個人開發技能，更能促進團隊合作，確保專案順利進行。




#### 參考資料

- [Git 版本控制教學 - 分支模型(branching model)](https://myapollo.com.tw/blog/git-tutorial-branching-model/)