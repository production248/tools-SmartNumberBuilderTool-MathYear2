(() => {
  "use strict";

  const requestedLevel = new URLSearchParams(window.location.search).get("grade");
  const configuredLevel = /^d[1-6]$/.test(window.NUMBER_BUILDER_GRADE || "")
    ? window.NUMBER_BUILDER_GRADE
    : (/^d[1-6]$/.test(requestedLevel || "") ? requestedLevel : null);

  const translations = {
    bm: {
      appTitle: "Jom Bina Nombor!", appSubtitle: "Susun, tukar dan fahami nilai nombor.",
      soundOn: "Bunyi: Buka", soundOff: "Bunyi: Tutup",
      modeReadwrite: "Baca & Tulis", modeBuild: "Bina Nombor", modeDecompose: "Cerai Nombor",
      modeExtreme: "Terbesar / Terkecil", modeOrder: "Susun Nombor",
      chooseLevel: "Pilih tahap", level: "Tahap",
      levelD1: "D1 (0–100)", levelD2: "D2 (0–1,000)", levelD3: "D3 (0–10,000)",
      levelD4: "D4 (0–100,000)", levelD5: "D5 (0–1,000,000)", levelD6: "D6 (0–10,000,000)",
      questionType: "Jenis soalan", practiceType: "Jenis latihan", randomOption: "Rawak",
      numberToWordsOption: "Nombor → perkataan", wordsToNumberOption: "Perkataan → nombor",
      largestOption: "Nombor terbesar", smallestOption: "Nombor terkecil",
      newQuestion: "Cuba soalan lain", yourTask: "Mari cuba!", reset: "Mula semula",
      check: "Semak", next: "Soalan seterusnya",
      stepLook: "Lihat nilai tempat", stepMove: "Susun kad nombor", stepCheck: "Semak dan faham",
      readSteps: ["Lihat dengan teliti", "Pilih pasangan", "Semak jawapan"],
      cardBank: "Kad nombor", bankHint: "Tekan atau seret kad", bankEmpty: "Semua kad sudah diletakkan.",
      empty: "Kosong", howTo: "Tekan satu kad, kemudian tekan petak yang betul.",
      readHowTo: "Lihat soalan, kemudian pilih kad yang sepadan.",
      prompts: {
        readwrite: "Padankan nombor dengan perkataan yang betul.", build: "Bina nombor daripada nilai yang diberi.",
        decompose: "Cerai nombor mengikut nilai tempat.", extreme: "Gunakan semua kad sekali sahaja.",
        order: "Susun semua nombor mengikut arahan."
      },
      readPrompts: {
        numberToWords: "Yang manakah cara menulis nombor ini?",
        wordsToNumber: "Yang manakah nombor yang betul?"
      },
      challengeLabels: {
        readwrite: "Cari pasangan", build: "Nilai diberi", decompose: "Nombor diberi",
        extreme: "Misi kamu", order: "Arah susunan"
      },
      readLabels: { numberToWords: "Baca nombor ini", wordsToNumber: "Baca perkataan ini" },
      largest: "Bina nombor paling besar", smallest: "Bina nombor paling kecil",
      ascending: "Kecil ke besar", descending: "Besar ke kecil",
      ascendingShort: "kecil → besar", descendingShort: "besar → kecil",
      ready: {
        readwrite: "Pilih satu jawapan yang membawa nilai yang sama.",
        build: "Pilih kad dan letakkan setiap digit pada nilai tempat yang betul.",
        decompose: "Padankan setiap nilai dengan tempatnya.",
        extreme: "Fikir digit manakah patut berada di sebelah kiri dahulu.",
        order: "Bandingkan nilai tempat dari kiri sebelum menyusun."
      },
      missing: "Isi semua petak dahulu.", chooseAnswer: "Pilih satu jawapan dahulu.", correct: "Betul!",
      wrongRead: "Belum tepat. Semak nilai tempat dan kedudukan sifar.",
      wrongPlace: "Belum tepat. Semak nilai {place}.",
      wrongExtreme: "Belum tepat. Bandingkan digit dari sebelah kiri.",
      wrongOrder: "Belum tepat. Bandingkan nilai {place} dahulu.",
      places: {
        tenMillions: "Puluh Juta", millions: "Juta", hundredThousands: "Ratus Ribu",
        tenThousands: "Puluh Ribu", thousands: "Ribu", hundreds: "Ratus", tens: "Puluh", ones: "Sa"
      }
    },
    zh: {
      appTitle: "一起来建构数字！", appSubtitle: "排列、转换，理解每个数字的数值。",
      soundOn: "声音：开", soundOff: "声音：关",
      modeReadwrite: "数字读写", modeBuild: "建构数字", modeDecompose: "分解数字",
      modeExtreme: "最大数 / 最小数", modeOrder: "排列数字",
      chooseLevel: "选择程度", level: "程度",
      levelD1: "一年级（0–100）", levelD2: "二年级（0–1,000）", levelD3: "三年级（0–10,000）",
      levelD4: "四年级（0–100,000）", levelD5: "五年级（0–1,000,000）", levelD6: "六年级（0–10,000,000）",
      questionType: "题目类型", practiceType: "练习类型", randomOption: "随机",
      numberToWordsOption: "数字 → 文字", wordsToNumberOption: "文字 → 数字",
      largestOption: "最大数", smallestOption: "最小数",
      newQuestion: "换一道题", yourTask: "试试看！", reset: "重新开始", check: "检查", next: "下一题",
      stepLook: "观察数位", stepMove: "排列数字卡", stepCheck: "检查并理解",
      readSteps: ["仔细观察", "选择配对", "检查答案"],
      cardBank: "数字卡", bankHint: "点击或拖动卡片", bankEmpty: "所有卡片都已放入。",
      empty: "空格", howTo: "先点击一张卡片，再点击正确的格子。",
      readHowTo: "看清楚题目，再选择数值相同的卡片。",
      prompts: {
        readwrite: "把数字和正确的文字配对。", build: "根据所给的数值建构数字。",
        decompose: "按照数位分解这个数字。", extreme: "每张数字卡只能使用一次。",
        order: "按照指示排列所有数字。"
      },
      readPrompts: {
        numberToWords: "哪一个是这个数字的正确写法？",
        wordsToNumber: "哪一个数字是正确的？"
      },
      challengeLabels: {
        readwrite: "找出配对", build: "所给数值", decompose: "所给数字", extreme: "你的任务", order: "排列方向"
      },
      readLabels: { numberToWords: "读一读这个数字", wordsToNumber: "读一读这些文字" },
      largest: "组成最大的数", smallest: "组成最小的数",
      ascending: "从小到大", descending: "从大到小", ascendingShort: "小 → 大", descendingShort: "大 → 小",
      ready: {
        readwrite: "选择一个数值相同的答案。", build: "把每张卡片放在正确的数位。",
        decompose: "把每个数值放在相应的数位。", extreme: "先想一想最左边应该放哪一个数字。",
        order: "从最高数位开始比较，再排列数字。"
      },
      missing: "请先填满所有格子。", chooseAnswer: "请先选择一个答案。", correct: "答对了！",
      wrongRead: "还不正确，请检查数位和零的位置。", wrongPlace: "还不正确，请检查{place}。",
      wrongExtreme: "还不正确，请从左边开始比较数字。", wrongOrder: "还不正确，请先比较{place}。",
      places: {
        tenMillions: "千万位", millions: "百万位", hundredThousands: "十万位", tenThousands: "万位",
        thousands: "千位", hundreds: "百位", tens: "十位", ones: "个位"
      }
    },
    en: {
      appTitle: "Let's Build Numbers!", appSubtitle: "Arrange, convert and understand place value.",
      soundOn: "Sound: On", soundOff: "Sound: Off",
      modeReadwrite: "Read & Write", modeBuild: "Build a Number", modeDecompose: "Break It Apart",
      modeExtreme: "Largest / Smallest", modeOrder: "Order Numbers",
      chooseLevel: "Choose a level", level: "Level",
      levelD1: "Y1 (0–100)", levelD2: "Y2 (0–1,000)", levelD3: "Y3 (0–10,000)",
      levelD4: "Y4 (0–100,000)", levelD5: "Y5 (0–1,000,000)", levelD6: "Y6 (0–10,000,000)",
      questionType: "Question type", practiceType: "Practice type", randomOption: "Random",
      numberToWordsOption: "Number → words", wordsToNumberOption: "Words → number",
      largestOption: "Largest number", smallestOption: "Smallest number",
      newQuestion: "Try another question", yourTask: "Let's try!", reset: "Start again", check: "Check", next: "Next question",
      stepLook: "Look at place value", stepMove: "Arrange the cards", stepCheck: "Check and understand",
      readSteps: ["Look carefully", "Choose the match", "Check the answer"],
      cardBank: "Number cards", bankHint: "Tap or drag a card", bankEmpty: "All cards have been placed.",
      empty: "Empty", howTo: "Tap a card, then tap the correct box.",
      readHowTo: "Study the question, then choose the card with the same value.",
      prompts: {
        readwrite: "Match the number to the correct words.", build: "Build the number from the values shown.",
        decompose: "Break the number apart by place value.", extreme: "Use every card exactly once.",
        order: "Arrange all numbers in the given order."
      },
      readPrompts: {
        numberToWords: "Which is the correct way to write this number?",
        wordsToNumber: "Which is the correct number?"
      },
      challengeLabels: {
        readwrite: "Find the match", build: "Values given", decompose: "Number given", extreme: "Your mission", order: "Order"
      },
      readLabels: { numberToWords: "Read this number", wordsToNumber: "Read these words" },
      largest: "Build the largest number", smallest: "Build the smallest number",
      ascending: "Smallest to largest", descending: "Largest to smallest",
      ascendingShort: "small → large", descendingShort: "large → small",
      ready: {
        readwrite: "Choose the answer with the same value.", build: "Place each digit in the correct place-value box.",
        decompose: "Match every value to its place.", extreme: "Think about which digit should be furthest left first.",
        order: "Compare place values from the left before ordering."
      },
      missing: "Fill every box first.", chooseAnswer: "Choose an answer first.", correct: "Correct!",
      wrongRead: "Not yet. Check the place values and the positions of zeroes.",
      wrongPlace: "Not yet. Check the {place} place.", wrongExtreme: "Not yet. Compare the digits from the left.",
      wrongOrder: "Not yet. Compare the {place} place first.",
      places: {
        tenMillions: "Ten millions", millions: "Millions", hundredThousands: "Hundred thousands",
        tenThousands: "Ten thousands", thousands: "Thousands", hundreds: "Hundreds", tens: "Tens", ones: "Ones"
      }
    }
  };

  const allPlaces = [
    { key: "tenMillions", value: 10000000 }, { key: "millions", value: 1000000 },
    { key: "hundredThousands", value: 100000 }, { key: "tenThousands", value: 10000 },
    { key: "thousands", value: 1000 }, { key: "hundreds", value: 100 },
    { key: "tens", value: 10 }, { key: "ones", value: 1 }
  ];

  const levelConfigs = {
    d1: { max: 100, standardDigits: 2 }, d2: { max: 1000, standardDigits: 3 },
    d3: { max: 10000, standardDigits: 4 }, d4: { max: 100000, standardDigits: 5 },
    d5: { max: 1000000, standardDigits: 6 }, d6: { max: 10000000, standardDigits: 7 }
  };

  const state = {
    lang: "bm", sound: true, mode: "build", level: configuredLevel || "d2", readDirection: "random",
    extremeObjective: "random", question: null, placements: [], selectedCardId: null,
    selectedReadAnswer: null, wrongReadAnswer: null, draggedCardId: null, solved: false
  };

  let cardSerial = 0;
  let audioContext = null;

  const modeTabs = document.getElementById("modeTabs");
  const levelSelect = document.getElementById("levelSelect");
  const levelField = levelSelect.closest(".field");
  const levelEyebrow = document.getElementById("levelEyebrow");
  const readDirectionField = document.getElementById("readDirectionField");
  const readDirectionSelect = document.getElementById("readDirectionSelect");
  const extremeObjectiveField = document.getElementById("extremeObjectiveField");
  const extremeObjectiveSelect = document.getElementById("extremeObjectiveSelect");
  const soundToggle = document.getElementById("soundToggle");
  const modeTitle = document.getElementById("modeTitle");
  const howToText = document.getElementById("howToText");
  const promptText = document.getElementById("promptText");
  const levelBadge = document.getElementById("levelBadge");
  const challengeDisplay = document.getElementById("challengeDisplay");
  const conceptStage = document.getElementById("conceptStage");
  const cardBankSection = document.querySelector(".card-bank-section");
  const cardBankTitle = document.getElementById("cardBankTitle");
  const bankHint = document.getElementById("bankHint");
  const cardBank = document.getElementById("cardBank");
  const feedback = document.getElementById("feedback");
  const resetBtn = document.getElementById("resetBtn");
  const checkBtn = document.getElementById("checkBtn");
  const newQuestionBtn = document.getElementById("newQuestionBtn");
  const celebrationLayer = document.getElementById("celebrationLayer");
  const stepTexts = [document.getElementById("stepLookText"), document.getElementById("stepMoveText"), document.getElementById("stepCheckText")];

  function t() { return translations[state.lang]; }
  function levelName() {
    const year = state.level.slice(1);
    const chineseYears = { "1": "一", "2": "二", "3": "三", "4": "四", "5": "五", "6": "六" };
    if (state.lang === "zh") return `数学${chineseYears[year]}年级`;
    if (state.lang === "en") return `Math Year ${year}`;
    return `Matematik Tahun ${year}`;
  }
  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function formatNumber(value) {
    const formatted = Number(value).toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US");
    return state.lang === "bm" ? formatted.replaceAll(",", " ") : formatted;
  }
  function getPlacesForLength(length) { return allPlaces.slice(-Math.min(length, allPlaces.length)); }
  function getPlaces() { return state.question?.places || getPlacesForLength(levelConfigs[state.level].standardDigits); }
  function createDigits(length, options = {}) {
    const digits = [randomInt(1, 9)];
    for (let i = 1; i < length; i += 1) digits.push(options.noZero ? randomInt(1, 9) : randomInt(0, 9));
    if (options.preferZero && !digits.includes(0) && length > 1) digits[randomInt(1, length - 1)] = 0;
    return digits;
  }
  function generateLevelNumber(boundaryChance = .08) {
    const config = levelConfigs[state.level];
    if (Math.random() < boundaryChance) return config.max;
    return randomInt(10 ** (config.standardDigits - 1), config.max - 1);
  }
  function makeCards(values, kind) {
    return shuffle(values.map(value => ({ id: `card-${++cardSerial}`, value, kind })));
  }

  function generateQuestion() {
    celebrationLayer.replaceChildren();
    let question;
    if (state.mode === "readwrite") {
      const target = generateLevelNumber(.12);
      const direction = state.readDirection === "random" ? (Math.random() < .5 ? "numberToWords" : "wordsToNumber") : state.readDirection;
      question = { target, direction, options: makeReadingOptions(target), places: getPlacesForLength(String(target).length) };
    } else if (state.mode === "build" || state.mode === "decompose") {
      const target = generateLevelNumber();
      const digits = String(target).split("").map(Number);
      const places = getPlacesForLength(digits.length);
      const values = digits.map((digit, index) => digit * places[index].value);
      const buildMode = state.mode === "build";
      question = {
        target, places, expected: buildMode ? digits : values,
        cards: makeCards(buildMode ? digits : values, buildMode ? "digit" : "value"), expandedValues: values
      };
    } else if (state.mode === "extreme") {
      const length = levelConfigs[state.level].standardDigits;
      let digits = createDigits(length, { preferZero: Math.random() < .58 });
      while (new Set(digits).size < 2) digits = createDigits(length, { preferZero: Math.random() < .58 });
      const objective = state.extremeObjective === "random" ? (Math.random() < .5 ? "largest" : "smallest") : state.extremeObjective;
      question = {
        objective,
        expected: objective === "largest" ? [...digits].sort((a, b) => b - a) : [...digits].sort((a, b) => a - b),
        cards: makeCards(digits, "digit"), places: getPlacesForLength(length)
      };
    } else {
      const values = makeOrderingValues(4);
      const objective = Math.random() < .5 ? "ascending" : "descending";
      question = {
        objective, expected: [...values].sort((a, b) => objective === "ascending" ? a - b : b - a),
        cards: makeCards(values, "order"), places: getPlacesForLength(levelConfigs[state.level].standardDigits)
      };
    }
    state.question = question;
    state.placements = Array(question.expected?.length || 0).fill(null);
    state.selectedCardId = null;
    state.selectedReadAnswer = null;
    state.wrongReadAnswer = null;
    state.draggedCardId = null;
    state.solved = false;
    renderQuestion();
  }

  function makeReadingOptions(target) {
    const maximum = levelConfigs[state.level].max;
    const candidates = new Set([target]);
    const placeValues = getPlacesForLength(String(target).length).map(place => place.value);
    for (const placeValue of shuffle(placeValues)) {
      if (candidates.size >= 4) break;
      if (target + placeValue <= maximum) candidates.add(target + placeValue);
      if (target - placeValue >= 0) candidates.add(target - placeValue);
    }
    const digits = String(target).split("");
    for (let index = digits.length - 1; index >= 0 && candidates.size < 4; index -= 1) {
      const changed = [...digits];
      changed[index] = String((Number(changed[index]) + randomInt(1, 8)) % 10);
      const value = Number(changed.join(""));
      if (value <= maximum) candidates.add(value);
    }
    const minimum = 10 ** (levelConfigs[state.level].standardDigits - 1);
    while (candidates.size < 4) candidates.add(randomInt(minimum, maximum));
    return shuffle([...candidates].slice(0, 4));
  }

  function makeOrderingValues(length) {
    const values = new Set();
    const config = levelConfigs[state.level];
    const lowerSpan = 10 ** (config.standardDigits - 1);
    const sameLeadingPlace = Math.random() < .68;
    const leading = randomInt(1, Math.min(8, Math.floor((config.max - 1) / lowerSpan)));
    while (values.size < length) {
      values.add(sameLeadingPlace ? leading * lowerSpan + randomInt(0, lowerSpan - 1) : randomInt(lowerSpan, config.max - 1));
    }
    return [...values];
  }

  function numberToWords(value) {
    if (state.lang === "zh") return numberToChinese(value);
    if (state.lang === "en") return numberToEnglish(value);
    return numberToMalay(value);
  }

  function numberToMalay(value) {
    const ones = ["sifar", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "lapan", "sembilan"];
    if (value < 10) return ones[value];
    if (value === 10) return "sepuluh";
    if (value === 11) return "sebelas";
    if (value < 20) return `${ones[value - 10]} belas`;
    if (value < 100) return `${ones[Math.floor(value / 10)]} puluh${value % 10 ? ` ${ones[value % 10]}` : ""}`;
    if (value < 1000) {
      const remainder = value % 100;
      const prefix = value < 200 ? "seratus" : `${ones[Math.floor(value / 100)]} ratus`;
      return `${prefix}${remainder ? ` ${numberToMalay(remainder)}` : ""}`;
    }
    if (value < 1000000) {
      const thousands = Math.floor(value / 1000);
      const remainder = value % 1000;
      const prefix = thousands === 1 ? "seribu" : `${numberToMalay(thousands)} ribu`;
      return `${prefix}${remainder ? ` ${numberToMalay(remainder)}` : ""}`;
    }
    const millions = Math.floor(value / 1000000);
    const remainder = value % 1000000;
    return `${numberToMalay(millions)} juta${remainder ? ` ${numberToMalay(remainder)}` : ""}`;
  }

  function numberToEnglish(value) {
    const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    if (value < 20) return ones[value];
    if (value < 100) return `${tens[Math.floor(value / 10)]}${value % 10 ? `-${ones[value % 10]}` : ""}`;
    if (value < 1000) {
      const remainder = value % 100;
      return `${ones[Math.floor(value / 100)]} hundred${remainder ? ` and ${numberToEnglish(remainder)}` : ""}`;
    }
    if (value < 1000000) {
      const thousands = Math.floor(value / 1000);
      const remainder = value % 1000;
      const connector = remainder && remainder < 100 ? " and " : " ";
      return `${numberToEnglish(thousands)} thousand${remainder ? `${connector}${numberToEnglish(remainder)}` : ""}`;
    }
    const millions = Math.floor(value / 1000000);
    const remainder = value % 1000000;
    const connector = remainder && remainder < 100 ? " and " : " ";
    return `${numberToEnglish(millions)} million${remainder ? `${connector}${numberToEnglish(remainder)}` : ""}`;
  }

  function numberToChinese(value) {
    if (value === 0) return "零";
    const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const units = ["", "十", "百", "千"];
    function sectionToChinese(section, omitLeadingOne) {
      let result = "";
      let zeroPending = false;
      for (let position = 3; position >= 0; position -= 1) {
        const divisor = 10 ** position;
        const digit = Math.floor(section / divisor) % 10;
        if (digit === 0) {
          if (result && section % divisor !== 0) zeroPending = true;
        } else {
          if (zeroPending) { result += "零"; zeroPending = false; }
          if (!(omitLeadingOne && digit === 1 && position === 1 && result === "")) result += digits[digit];
          result += units[position];
        }
      }
      return result;
    }
    const tenThousands = Math.floor(value / 10000);
    const remainder = value % 10000;
    if (!tenThousands) return sectionToChinese(remainder, true);
    let result = `${sectionToChinese(tenThousands, true)}万`;
    if (remainder) {
      if (remainder < 1000) result += "零";
      result += sectionToChinese(remainder, false);
    }
    return result;
  }

  function applyTranslations() {
    document.documentElement.lang = state.lang === "zh" ? "zh-Hans" : state.lang;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(t(), key) && typeof t()[key] === "string") element.textContent = t()[key];
    });
    soundToggle.querySelector("span:last-child").textContent = state.sound ? t().soundOn : t().soundOff;
    levelSelect.value = state.level;
    levelField.hidden = Boolean(configuredLevel);
    if (configuredLevel) {
      levelEyebrow.textContent = levelName();
      document.title = `${t().appTitle} · ${levelName()}`;
    }
    readDirectionField.hidden = state.mode !== "readwrite";
    extremeObjectiveField.hidden = state.mode !== "extreme";
    readDirectionSelect.value = state.readDirection;
    extremeObjectiveSelect.value = state.extremeObjective;
    modeTitle.textContent = t()[`mode${state.mode.charAt(0).toUpperCase()}${state.mode.slice(1)}`];
    howToText.textContent = state.mode === "readwrite" ? t().readHowTo : t().howTo;
    promptText.textContent = state.mode === "readwrite" && state.question ? t().readPrompts[state.question.direction] : t().prompts[state.mode];
    cardBankTitle.textContent = t().cardBank;
    bankHint.textContent = t().bankHint;
    const steps = state.mode === "readwrite" ? t().readSteps : [t().stepLook, t().stepMove, t().stepCheck];
    stepTexts.forEach((element, index) => { element.textContent = steps[index]; });
  }

  function renderQuestion() {
    applyTranslations();
    levelBadge.textContent = configuredLevel ? levelName() : state.level.toUpperCase();
    cardBankSection.hidden = state.mode === "readwrite";
    resetBtn.hidden = state.mode === "readwrite";
    renderChallenge();
    renderConceptStage();
    renderCardBank();
    setFeedback(t().ready[state.mode]);
    updateCheckButton();
  }

  function renderChallenge() {
    challengeDisplay.replaceChildren();
    const wrapper = document.createElement("div");
    const label = document.createElement("div");
    const value = document.createElement("div");
    label.className = "challenge-label";
    value.className = "challenge-value";
    if (state.mode === "readwrite") {
      label.textContent = t().readLabels[state.question.direction];
      if (state.question.direction === "numberToWords") value.textContent = formatNumber(state.question.target);
      else { value.classList.add("reading-words"); value.textContent = numberToWords(state.question.target); }
    } else {
      label.textContent = t().challengeLabels[state.mode];
      if (state.mode === "build") {
        value.textContent = state.question.expandedValues.map(formatNumber).join(" + ");
        if (state.question.expandedValues.length >= 5) value.classList.add("expanded-long");
      }
      else if (state.mode === "decompose") value.textContent = formatNumber(state.question.target);
      else {
        value.classList.add("words");
        value.textContent = state.mode === "extreme"
          ? (state.question.objective === "largest" ? t().largest : t().smallest)
          : (state.question.objective === "ascending" ? t().ascending : t().descending);
      }
    }
    wrapper.append(label, value);
    challengeDisplay.append(wrapper);
  }

  function renderConceptStage() {
    conceptStage.replaceChildren();
    if (state.mode === "readwrite") { renderReadingChoices(); return; }
    const places = getPlaces();
    if (state.mode === "order") {
      const board = document.createElement("div");
      board.className = "order-board";
      board.style.setProperty("--column-count", state.placements.length);
      const direction = document.createElement("div");
      direction.className = "order-direction";
      const directionLabel = state.question.objective === "ascending" ? t().ascendingShort : t().descendingShort;
      direction.innerHTML = `<span class="direction-arrow" aria-hidden="true">${state.question.objective === "ascending" ? "↗" : "↘"}</span><span>${directionLabel}</span>`;
      board.append(direction);
      state.placements.forEach((cardId, index) => {
        const position = document.createElement("div");
        position.className = "order-position";
        const number = document.createElement("div");
        number.className = "order-index";
        number.textContent = String(index + 1);
        position.append(number, createSlot(index, cardId, null));
        board.append(position);
      });
      conceptStage.append(board);
      return;
    }
    const board = document.createElement("div");
    board.className = "place-value-board";
    board.dataset.columns = String(places.length);
    board.style.setProperty("--column-count", places.length);
    places.forEach((place, index) => {
      const column = document.createElement("div");
      column.className = "place-column";
      const name = document.createElement("div");
      const multiplier = document.createElement("div");
      name.className = "place-name";
      multiplier.className = "place-multiplier";
      name.textContent = t().places[place.key];
      multiplier.textContent = state.mode === "decompose" ? "" : `× ${formatNumber(place.value)}`;
      multiplier.hidden = state.mode === "decompose";
      column.append(name, multiplier, createSlot(index, state.placements[index], place));
      board.append(column);
    });
    conceptStage.append(board);
  }

  function renderReadingChoices() {
    const board = document.createElement("div");
    board.className = "reading-board";
    state.question.options.forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "reading-choice";
      button.classList.toggle("is-selected", state.selectedReadAnswer === option);
      button.classList.toggle("is-wrong", state.wrongReadAnswer === option);
      button.classList.toggle("is-correct", state.solved && option === state.question.target);
      button.setAttribute("aria-pressed", String(state.selectedReadAnswer === option));
      button.textContent = state.question.direction === "numberToWords" ? numberToWords(option) : formatNumber(option);
      button.addEventListener("click", () => {
        if (state.solved) return;
        state.selectedReadAnswer = option;
        state.wrongReadAnswer = null;
        playClick();
        renderConceptStage();
        setFeedback(t().ready.readwrite);
      });
      board.append(button);
    });
    conceptStage.append(board);
  }

  function createSlot(index, cardId, place) {
    const slot = document.createElement("div");
    slot.className = "number-slot";
    slot.dataset.slotIndex = String(index);
    slot.setAttribute("role", "button");
    slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-label", place ? `${t().places[place.key]}: ${t().empty}` : `${index + 1}: ${t().empty}`);
    slot.addEventListener("click", () => { if (state.selectedCardId) placeCard(state.selectedCardId, index); });
    slot.addEventListener("keydown", event => {
      if ((event.key === "Enter" || event.key === " ") && state.selectedCardId) { event.preventDefault(); placeCard(state.selectedCardId, index); }
    });
    slot.addEventListener("dragover", event => { event.preventDefault(); slot.classList.add("is-drop-target"); });
    slot.addEventListener("dragleave", () => slot.classList.remove("is-drop-target"));
    slot.addEventListener("drop", event => {
      event.preventDefault(); slot.classList.remove("is-drop-target");
      if (state.draggedCardId) placeCard(state.draggedCardId, index);
    });
    if (cardId) {
      const card = getCard(cardId);
      slot.replaceChildren(createCardButton(card));
      slot.setAttribute("aria-label", place ? `${t().places[place.key]}: ${formatNumber(card.value)}` : `${index + 1}: ${formatNumber(card.value)}`);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "slot-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = "?";
      slot.append(placeholder);
    }
    return slot;
  }

  function renderCardBank() {
    cardBank.replaceChildren();
    if (state.mode === "readwrite") return;
    const placed = new Set(state.placements.filter(Boolean));
    const available = state.question.cards.filter(card => !placed.has(card.id));
    if (!available.length) {
      const empty = document.createElement("span");
      empty.className = "bank-empty";
      empty.textContent = t().bankEmpty;
      cardBank.append(empty);
    } else available.forEach(card => cardBank.append(createCardButton(card)));
  }

  function createCardButton(card) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "digit-card";
    if (card.kind === "value") button.classList.add("value-card");
    if (card.kind === "order") button.classList.add("order-card");
    if (state.selectedCardId === card.id) button.classList.add("is-selected");
    button.dataset.cardId = card.id;
    button.draggable = !state.solved;
    button.textContent = formatNumber(card.value);
    button.setAttribute("aria-pressed", String(state.selectedCardId === card.id));
    button.addEventListener("click", event => { event.stopPropagation(); selectCard(card.id); });
    button.addEventListener("dragstart", event => {
      if (state.solved) { event.preventDefault(); return; }
      state.draggedCardId = card.id;
      button.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", card.id);
    });
    button.addEventListener("dragend", () => {
      state.draggedCardId = null;
      document.querySelectorAll(".is-drop-target").forEach(element => element.classList.remove("is-drop-target"));
    });
    return button;
  }

  function getCard(cardId) { return state.question.cards.find(card => card.id === cardId); }
  function selectCard(cardId) {
    if (state.solved) return;
    state.selectedCardId = state.selectedCardId === cardId ? null : cardId;
    playClick(); renderConceptStage(); renderCardBank();
  }
  function placeCard(cardId, targetIndex) {
    if (state.solved || !getCard(cardId)) return;
    const oldIndex = state.placements.indexOf(cardId);
    const displacedCardId = state.placements[targetIndex];
    if (oldIndex === targetIndex) {
      state.selectedCardId = null; renderConceptStage(); renderCardBank(); return;
    }
    if (oldIndex >= 0) state.placements[oldIndex] = displacedCardId || null;
    state.placements[targetIndex] = cardId;
    state.selectedCardId = null;
    clearWrongSlots(); setFeedback(t().ready[state.mode]); playMove(); renderConceptStage(); renderCardBank();
  }
  function returnDraggedCardToBank() {
    if (!state.draggedCardId || state.solved) return;
    const index = state.placements.indexOf(state.draggedCardId);
    if (index >= 0) {
      state.placements[index] = null; state.selectedCardId = null; playMove(); renderConceptStage(); renderCardBank();
    }
  }
  function resetPlacements() {
    if (state.solved) { generateQuestion(); return; }
    state.placements.fill(null); state.selectedCardId = null; clearWrongSlots();
    setFeedback(t().ready[state.mode]); playClick(); renderConceptStage(); renderCardBank();
  }

  function checkAnswer() {
    if (state.solved) { generateQuestion(); return; }
    if (state.mode === "readwrite") { checkReadingAnswer(); return; }
    if (state.placements.some(cardId => !cardId)) {
      setFeedback(t().missing, "error"); markIncompleteSlots(); playError(); return;
    }
    const actual = state.placements.map(cardId => getCard(cardId).value);
    const correct = actual.every((value, index) => value === state.question.expected[index]);
    if (correct) {
      state.solved = true; state.selectedCardId = null;
      setFeedback(makeSuccessMessage(actual), "success", true); playSuccess(); celebrate();
      renderConceptStage(); renderCardBank(); updateCheckButton(); return;
    }
    markWrongSlots(actual); setFeedback(makeHint(actual), "error"); playError();
  }

  function checkReadingAnswer() {
    if (state.selectedReadAnswer === null) { setFeedback(t().chooseAnswer, "error"); playError(); return; }
    if (state.selectedReadAnswer === state.question.target) {
      state.solved = true; state.wrongReadAnswer = null;
      setFeedback(makeSuccessMessage([]), "success", true); playSuccess(); celebrate(); renderConceptStage(); updateCheckButton();
    } else {
      state.wrongReadAnswer = state.selectedReadAnswer;
      setFeedback(t().wrongRead, "error"); playError(); renderConceptStage();
    }
  }

  function makeSuccessMessage(actual) {
    const prefix = `<strong>${t().correct}</strong> `;
    if (state.mode === "readwrite") {
      return `${prefix}<span class="place-explanation"><span class="explain-part">${formatNumber(state.question.target)}</span><span>=</span><span class="explain-part">${numberToWords(state.question.target)}</span></span>`;
    }
    if (state.mode === "build" || state.mode === "decompose") {
      const equation = `${formatNumber(state.question.target)} = ${state.question.expandedValues.map(formatNumber).join(" + ")}`;
      return `${prefix}<span class="place-explanation"><span class="explain-part">${equation}</span></span>`;
    }
    if (state.mode === "extreme") return `${prefix}<span class="explain-part">${actual.join("")}</span>`;
    return `${prefix}<span class="place-explanation">${actual.map(value => `<span class="explain-part">${formatNumber(value)}</span>`).join(" → ")}</span>`;
  }

  function makeHint(actual) {
    if (state.mode === "extreme") return t().wrongExtreme;
    if (state.mode === "order") return t().wrongOrder.replace("{place}", t().places[findOrderComparisonPlace(actual)]);
    const wrongIndex = actual.findIndex((value, index) => value !== state.question.expected[index]);
    return t().wrongPlace.replace("{place}", t().places[getPlaces()[Math.max(0, wrongIndex)].key]);
  }
  function findOrderComparisonPlace(values) {
    for (let index = 0; index < values.length - 1; index += 1) {
      const outOfOrder = state.question.objective === "ascending" ? values[index] > values[index + 1] : values[index] < values[index + 1];
      if (outOfOrder) return firstDifferentPlace(values[index], values[index + 1]);
    }
    return getPlaces()[0].key;
  }
  function firstDifferentPlace(first, second) {
    const length = getPlaces().length;
    const a = String(first).padStart(length, "0");
    const b = String(second).padStart(length, "0");
    const index = [...a].findIndex((digit, position) => digit !== b[position]);
    return getPlaces()[Math.max(0, index)].key;
  }
  function markIncompleteSlots() {
    document.querySelectorAll(".number-slot").forEach((slot, index) => slot.classList.toggle("is-wrong", !state.placements[index]));
  }
  function markWrongSlots(actual) {
    document.querySelectorAll(".number-slot").forEach((slot, index) => slot.classList.toggle("is-wrong", actual[index] !== state.question.expected[index]));
  }
  function clearWrongSlots() { document.querySelectorAll(".number-slot.is-wrong").forEach(slot => slot.classList.remove("is-wrong")); }
  function setFeedback(message, type = "", allowHtml = false) {
    feedback.className = `feedback${type ? ` ${type}` : ""}`;
    if (allowHtml) feedback.innerHTML = message; else feedback.textContent = message;
  }
  function updateCheckButton() {
    checkBtn.querySelector("span:last-child").textContent = state.solved ? t().next : t().check;
    checkBtn.querySelector("span:first-child").textContent = state.solved ? "→" : "✓";
  }

  function celebrate() {
    const colors = ["#ffca4f", "#35a58c", "#3579b9", "#ef9837", "#d64f4f"];
    celebrationLayer.replaceChildren();
    for (let i = 0; i < 26; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.setProperty("--confetti-color", colors[i % colors.length]);
      piece.style.setProperty("--confetti-x", `${randomInt(-350, 350)}px`);
      piece.style.setProperty("--confetti-y", `${randomInt(-230, 230)}px`);
      piece.style.setProperty("--confetti-r", `${randomInt(-540, 540)}deg`);
      piece.style.animationDelay = `${i * 9}ms`;
      celebrationLayer.append(piece);
    }
    window.setTimeout(() => celebrationLayer.replaceChildren(), 1000);
  }
  function ensureAudioContext() {
    if (!state.sound) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }
  function playTone(frequency, duration, delay = 0, type = "sine", volume = .045) {
    const context = ensureAudioContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + delay;
    oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(start); oscillator.stop(start + duration + .02);
  }
  function playClick() { playTone(420, .06, 0, "sine", .025); }
  function playMove() { playTone(360, .07, 0, "sine", .035); playTone(520, .08, .055, "sine", .03); }
  function playSuccess() { playTone(523, .14, 0, "sine", .05); playTone(659, .14, .1, "sine", .05); playTone(784, .2, .2, "sine", .055); }
  function playError() { playTone(210, .1, 0, "triangle", .035); playTone(165, .14, .09, "triangle", .03); }

  modeTabs.addEventListener("click", event => {
    const button = event.target.closest("[data-mode]");
    if (!button || button.dataset.mode === state.mode) return;
    state.mode = button.dataset.mode;
    document.querySelectorAll(".mode-tab").forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("active", active); tab.setAttribute("aria-pressed", String(active));
    });
    playClick(); generateQuestion();
  });
  levelSelect.addEventListener("change", () => {
    if (configuredLevel) return;
    state.level = levelSelect.value; playClick(); generateQuestion();
  });
  readDirectionSelect.addEventListener("change", () => { state.readDirection = readDirectionSelect.value; playClick(); generateQuestion(); });
  extremeObjectiveSelect.addEventListener("change", () => { state.extremeObjective = extremeObjectiveSelect.value; playClick(); generateQuestion(); });
  document.querySelectorAll(".language-btn").forEach(button => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      document.querySelectorAll(".language-btn").forEach(languageButton => {
        const active = languageButton === button;
        languageButton.classList.toggle("active", active); languageButton.setAttribute("aria-pressed", String(active));
      });
      playClick(); renderQuestion();
    });
  });
  soundToggle.addEventListener("click", () => {
    state.sound = !state.sound;
    soundToggle.setAttribute("aria-pressed", String(state.sound));
    soundToggle.querySelector("span:first-child").textContent = state.sound ? "🔊" : "🔇";
    soundToggle.querySelector("span:last-child").textContent = state.sound ? t().soundOn : t().soundOff;
    if (state.sound) playClick();
  });
  cardBank.addEventListener("dragover", event => { event.preventDefault(); cardBank.classList.add("is-drop-target"); });
  cardBank.addEventListener("dragleave", () => cardBank.classList.remove("is-drop-target"));
  cardBank.addEventListener("drop", event => { event.preventDefault(); cardBank.classList.remove("is-drop-target"); returnDraggedCardToBank(); });
  resetBtn.addEventListener("click", resetPlacements);
  checkBtn.addEventListener("click", checkAnswer);
  newQuestionBtn.addEventListener("click", () => { playClick(); generateQuestion(); });

  if (configuredLevel) document.body.classList.add("fixed-grade");
  generateQuestion();
})();
