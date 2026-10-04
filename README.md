# 長谷川結音 / Yuito Hasegawa

研究・研究経験・学歴・スキルと、金融市場のエージェントベースモデル（ABM）の学習ノートをまとめた、日英対応のWebサイトです。HTML / CSS / JavaScriptで構成しています。

## 公開URL

- ホーム: https://yuitokyouni.github.io/myhp/
- ABMを試す: https://yuitokyouni.github.io/myhp/abm/
- 関連するコード: https://yuitokyouni.github.io/myhp/research.html

## ページの内容

ホームは、左列に氏名・所属・連絡先・関連リンク、右列に研究・研究経験・学歴・スキルを掲載しています。ヘッダーの「東京大学」「大学院新領域創成科学研究科」の所属名テキストリンクから、それぞれの公式サイトへ移動できます。スマートフォンでは本文が1列になります。

「ABMを試す」には、ABMの入門説明と6つのブラウザ実験があります。モデル一覧と各実験ページの「基本の考え方・Python元コード」トグルで、考え方、計算の流れ、パラメータの意味、モデル本体と元の実行入口を読めます。各実験ページでは、ブラウザで実際に使うPython実行コード（DRIVER）も表示できます。

| 実験 | 内容 |
| --- | --- |
| YH001 · Cont–Bouchaud | 群れと価格変動 |
| YH002 · Lux–Marchesi | 取引スタイルの切り替え |
| YH003 · Minority Game | 少数派に入るゲーム |
| YH004 · Grand Canonical Minority Game | 参加する・見送る |
| YH005 · Speculation Game | 認知と往復売買 |
| YH005_1 · Speculation Gameの分析 | YH005と同じモデルを五つの図で読む |

実験はPyodideでPythonを実行し、Plotlyで図を描きます。初回実行にはCDNから実行環境を読み込む時間がかかります。説明と元コードの閲覧にシミュレーション実行は不要です。モデルの出典、ライセンス、実行上の制約は [abm/README.md](abm/README.md) に記載しています。

「関連するコード」には、financial-abm-lab / lobcoreの紹介・リンクと、研究の問いの詳細を掲載しています。

## ファイル構成

```text
index.html                  ホーム
research.html               関連するコード
education.html              ホームの学歴への転送（旧URL互換）
skills.html                 ホームのスキルへの転送（旧URL互換）
assets/style.css            共通の配色・レイアウト・印刷スタイル
assets/main.js              言語切り替え・ページ情報・旧URL転送
abm/index.html              ABM入門・モデル一覧・解説トグル
abm/yh*.html                6つの実験ページ・解説トグル
abm/style.css               ABMページのスタイル
abm/assets/runner.js        Python実行・入力・グラフの共通処理
abm/assets/source-viewer.js Python元コードの表示・再読み込み
abm/assets/sf.py            統計処理
abm/models/                 実行用モデルと閲覧用の元実行スクリプト
```

## 内容を更新する

サイト本文は日本語と英語をセットで更新します。実験の操作画面とブラウザ実行コードの説明は日本語です。

```html
<span class="ja">日本語の文</span><span class="en" lang="en">English text</span>
```

言語の優先順位は `?lang=ja` / `?lang=en` → 前回の選択 → ブラウザ言語 → 日本語です。内部リンクには `data-page-link` を付けて、言語選択を引き継ぎます。ページ名・説明は各HTMLの `data-ja` / `data-en` に定義します。

ABMの解説は一覧と各実験ページの両方にあるため、更新時は両方を合わせます。Python元コードはトグルを開いたときに `data-source-url` が指すファイルを読み込みます。モデル本体をHTMLへ複製する必要はありません。元の実行スクリプトは出典のスナップショットを保持し、ブラウザのシミュレーションからは実行しません。

通常の更新は、既存の運用に従いPRを作らず、既定ブランチ `codex/multipage-research-profile` へコミット・プッシュします。プッシュ前に最新のリモート状態と表示を確認します。
