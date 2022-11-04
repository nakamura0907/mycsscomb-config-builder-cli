const prompts = require("prompts");

const questions = [
  {
    type: "confirm",
    name: "remove-empty-rulesets",
    message: "空のルールセットを残す",
    initial: true,
  },
  {
    type: "confirm",
    name: "always-semicolon",
    message: "常にセミコロンを追加する",
    initial: true,
  },
  {
    type: "select",
    name: "color-case",
    message: "色の書式",
    choices: [
      { title: "小文字", description: "#fff", value: "lower" },
      { title: "大文字", description: "#FFF", value: "upper" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "block-indent",
    message: "メディアクエリやネストされたルールのインデント",
    choices: [
      { title: "タブ", value: "\t" },
      { title: "2スペース", value: "  " },
      { title: "4スペース", value: "    " },
    ],
  },
  {
    type: "select",
    name: "color-shorthand",
    message: "色の省略形を許可する？",
    choices: [
      { title: "ショートハンドを使用する", value: true },
      {
        title: "ショートハンドを拡張する",
        description: "#fc0 →  #ffcc00",
        value: false,
      },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "element-case",
    message: "セレクタの書式",
    choices: [
      { title: "小文字", value: "lower" },
      { title: "大文字", value: "upper" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "eof-newline",
    message: "EOFで改行/削除する",
    choices: [
      { title: "EOFを追加する", value: true },
      { title: "EOFを削除する", value: false },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "leading-zero",
    message: "寸法の0を追加/削除する",
    choices: [
      { title: "0を追加する", description: "padding: 0.5rem", value: true },
      { title: "0を削除する", description: "padding: .5rem", value: false },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "quotes",
    message: "クォーテーションの形式",
    choices: [
      { title: "シングルクォート", value: "single" },
      { title: "ダブルクォート", value: "double" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "sort-order-fallback",
    message: "プロパティの並び順",
    choices: [
      { title: "ABC順", value: "abc" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-before-colon",
    message: "コロン左側にスペースを追加/削除する",
    choices: [
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-after-colon",
    message: "コロン右側にスペースを追加/削除する",
    choices: [
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-before-combinator",
    message: "コンビネーター左側にスペースを追加/削除する（例: p > a）",
    choices: [
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-after-combinator",
    message: "コンビネーター左側にスペースを追加/削除する（例: p > a）",
    choices: [
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-between-declarations",
    message: "宣言間のスペース",
    choices: [
      { title: "改行する", value: "\n" },
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-before-opening-brace",
    message: "開き括弧前のスペース",
    choices: [
      { title: "改行する", value: "\n" },
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-after-opening-brace",
    message: "開き括弧後ろのスペース",
    choices: [
      { title: "改行する", value: "\n" },
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-after-selector-delimiter",
    message: "セレクタ区切り文字後ろのスペース",
    choices: [
      { title: "改行する", value: "\n" },
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-before-selector-delimiter",
    message: "セレクタ区切り文字前のスペース",
    choices: [
      { title: "改行する", value: "\n" },
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "select",
    name: "space-before-closing-brace",
    message: "閉じ括弧のスペース",
    choices: [
      { title: "改行する", value: "\n" },
      { title: "スペースを追加する", value: " " },
      { title: "スペースを削除する", value: "" },
      { title: "変更しない", value: "undefined" },
    ],
  },
  {
    type: "confirm",
    name: "strip-spaces",
    message: "末尾のスペースを削除する",
    initial: true,
  },
  {
    type: "confirm",
    name: "unitless-zero",
    message: "値が0の単位を削除する（例: padding: 0px）",
    initial: true,
  },
  {
    type: "confirm",
    name: "vendor-prefix-align",
    message: "プロパティとプレフィックスのプロパティを合わせる",
    initial: true,
  },
];

(async () => {
  // コマンドライン呼び出し
  const response = await prompts(questions);

  // 無効な設定項目の削除
  const filteredResponse = {};
  Object.keys(response).forEach((key) => {
    const value = response[key];
    if (value === "undefined" || value === false) return;
    filteredResponse[key] = value;
  });

  // 結果出力
  console.log(".csscomb.json");
  console.log(JSON.stringify(filteredResponse, undefined, 1));
})();
