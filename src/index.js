const prompts = require("prompts");

const questions = [
  {
    type: "confirm",
    name: "remove-empty-rulesets",
    message: "空のルールセットを残しますか？",
    initial: true,
  },
  {
    type: "confirm",
    name: "always-semicolon",
    message: "常にセミコロンを追加しますか？",
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
];

(async () => {
  // コマンドライン呼び出し
  const response = await prompts(questions);

  // 無効な設定項目の削除
  const filteredResponse = {};
  Object.keys(response).forEach((key) => {
    const value = response[key];
    if (value === "undefined") return;
    filteredResponse[key] = value;
  });

  // 結果出力
  console.log("\n");
  console.log(JSON.stringify(filteredResponse, undefined, 1));
})();
