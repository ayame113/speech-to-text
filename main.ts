/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference types="npm:@types/dom-speech-recognition" />

const resultOutput = document.getElementById("result")!;
const errorResultOutput = document.getElementById("error-result")!;

// 結果出力用のdivタグ
let currentOutputDiv: HTMLDivElement | undefined;

const SpeechRecognition = globalThis.webkitSpeechRecognition ||
  globalThis.SpeechRecognition;

const recognition = new SpeechRecognition();

// 設定項目
recognition.lang = "ja-JP"; // 日本語
recognition.interimResults = true; // 音声認識が途中でも出力する

// 音声認識が行われた時の処理
recognition.addEventListener("result", (e) => {
  currentOutputDiv ??= resultOutput.appendChild(document.createElement("div"));
  currentOutputDiv.scrollIntoView();

  console.log("==========");
  let resultText = "";

  for (let i = 0; i < e.results.length; i++) {
    console.log(e.results[i][0], { isFinal: e.results[i].isFinal });
    resultText += e.results[i][0].transcript;
  }

  currentOutputDiv.innerText = resultText;
});

// エラー発生時の処理
recognition.addEventListener("error", (e) => {
  console.error(e);
  const div = document.createElement("div");
  div.innerText = `error: ${e.error} ${e.message}`;
  errorResultOutput.append(div);
});
recognition.addEventListener("nomatch", (e) => {
  console.error(e);
  const div = document.createElement("div");
  div.innerText = "error: 音声が認識されませんでした。";
  errorResultOutput.append(div);
});

// 発言が終了したら、再度音声認識を再開する
recognition.addEventListener("end", () => {
  currentOutputDiv = undefined;
  recognition.start();
});

recognition.start();
