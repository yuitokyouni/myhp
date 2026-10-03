# 長谷川結音 / Yuito Hasegawa

HTML / CSS / JavaScript だけで動く、日英対応の研究者プロフィールです。
ビルドや依存パッケージは不要で、GitHub Pages のルートからそのまま配信できます。

[Rama Cont 氏の研究者ページ](https://www.maths.ox.ac.uk/people/rama.cont)を参考に、
プロフィールと研究内容を分けた構成に整理しています。
上部には本人から提供された東京大学のロゴと、公式サイト由来の新領域創成科学研究科ロゴを配置しています。
それぞれのロゴから、大学と研究科のトップページへ移動できます。
他の研究者の業績は使用していません。

## 構成

- ホーム: 左列に氏名・所属・関連リンク、右列に研究・研究経験・学歴・スキル
- 共通ヘッダー: 薄い水色の帯、大学ロゴ、別ページへのナビゲーション
- 関連するコード: financial-abm-lab / lobcore の紹介とリンク、研究の問いの詳細
- ナビゲーション: ホーム、ABMを試す、関連するコードの3項目。学歴・スキルはホーム本文に掲載
- ABM入門・実験: 以前の公開 playground を移植（詳細は abm/README.md）
- スマートフォン: 1 列に切り替え
- 日英切り替え、OS 設定に応じたダークモード、印刷用スタイルに対応
- ホームと関連コードページは外部CDN不使用。ABM実験ではPyodideとPlotlyのCDNを使用
- トラッキングは不使用

```text
index.html          研究・研究経験・学歴・スキルをまとめたホーム
research.html       関連するコード
education.html      旧URL互換（ホームの学歴へ転送）
skills.html         旧URL互換（ホームのスキルへ転送）
abm/                ABM入門とブラウザ実験
assets/style.css    配色・2列レイアウト・スマートフォン・印刷
assets/main.js      言語切り替え・ページ情報・年号
assets/utokyo-logo.jpg  提供された大学ロゴ（色・余白・縦横比を保持）
assets/gsfs-logo.svg   新領域創成科学研究科の英語ロゴ
.nojekyll           GitHub Pages 向け設定
```

ロゴは提供されたカラー JPEG をそのまま使用しています。画像ファイル自体は白背景のままですが、
CSS の `mix-blend-mode: multiply` で白がヘッダー背景になじむように表示しています。
合成対象は `isolation: isolate` を指定したヘッダー内に限定しています。
薄い水色との乗算合成のため表示色はわずかに影響を受けますが、元の文字・図形・余白は変更しません。
ヘッダーの色は
`assets/style.css` の `--header-bg`、高さは `.header-inner` の `min-height`、
ロゴの表示幅は `.site-logo` の `width` で調整できます。
スマートフォンでは2つのロゴを横並びに保ち、ナビゲーションと言語ボタンをその下に配置します。

GSFSロゴの形状は[公式英語サイトのSVG](https://www.k.u-tokyo.ac.jp/en/assets/images/common/logo-en.svg)を使用しています。
淡い背景でも読めるよう文字の塗りだけを緑 `#345a2b` に変更しています。
この色は[公式の色指定資料](https://www.k.u-tokyo.ac.jp/assets/images/gsfs/logo_color.jpg)の緑スウォッチから採取したRGB値です。
資料にWeb用HEX値の指定はなく、印刷色はPANTONE 357Cです。樹の色・形状・縦横比は保持し、背景は透明です。

## 内容を更新する

日本語と英語をセットで更新します。

```html
<span class="ja">日本語の文</span><span class="en">English text</span>
```

HTML の `lang` 属性に応じて片方だけ表示します。JavaScript が無効でも日本語の本文が読めます。
言語の優先順位は `?lang=ja` / `?lang=en` → 前回の選択 → ブラウザ言語 → 日本語です
（日本語以外のブラウザは英語表示）。無効な言語値は無視します。
ページ名・説明は各HTMLの title / description の `data-ja` / `data-en` に定義します。
内部リンクには `data-page-link="research.html"` のようにパスを指定すると、言語選択を引き継ぎます。
ホームの `#research` / `#education` / `#skills` は本文の各節を指します。
旧 `education.html` / `skills.html` は言語を引き継いでホームの対応する節へ転送します。
JavaScript無効時も、転送先へのリンクを表示します。

### 次に追加・確認する情報

未記入の記入例は公開ページから外しています。以下は編集者向けのメモです。
業績がないと断定しているわけではありません。

- [ ] 予測の習熟度（FQ）の厳密な指標・定義を確定する（現状は一般的な言葉で紹介）
- [ ] 公開用メールアドレス（GitHub アカウントのメールを自動では転用しない）
- [ ] 卒業論文の要旨、公開できる PDF または資料へのリンク
- [ ] 論文・プレプリント: 著者、題名、掲載先、年、DOI / URL、公開状況
- [ ] 学会発表: 発表者、題名、学会名、年月、口頭 / ポスター、資料リンク
- [ ] 受賞・助成: 年、名称、授与機関
- [ ] 英語の習熟度など、具体的に掲載したい補足
- [ ] 学位・コース・研究室の英語表記の最終確認

学歴の期間は日英とも年だけで表記します。

論文などを追加するときは、`main` 内に次の構造を追加します。
見出しだけの空欄は公開せず、少なくとも 1 件の情報を記入してから追加してください。

```html
<section id="publications" class="content-section" aria-labelledby="publications-heading">
  <h2 id="publications-heading"><span class="ja">論文</span><span class="en">Publications</span></h2>
  <ol>
    <!-- 実際の著者・題名・掲載先・年・リンクを li に記入する -->
  </ol>
</section>
```

新しい節にナビゲーションを追加する場合は、日英の表示と実在する節の ID を合わせてください。
卒業論文はホームの「研究経験」に置いています。

## ローカルで開く

プロフィールは `index.html` を直接開けます。ABM実験ではPythonファイルを読み込むためHTTPサーバーを使います:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

`http://127.0.0.1:8765/` を開きます。日本語は `?lang=ja`、英語は `?lang=en` で指定できます。

## GitHub Pages

リポジトリの Settings → Pages で Source を「Deploy from a branch」に設定し、
公開するブランチと `/ (root)` を選択します。既存の設定がある場合はその設定を維持してください。
