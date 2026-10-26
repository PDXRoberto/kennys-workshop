(() => {
  "use strict";

  const main = document.querySelector("#main-content");
  const dialogRoot = document.querySelector("#dialog-root");
  const toastRoot = document.querySelector("#toast-root");
  const announcer = document.querySelector("#announcer");
  const appShell = document.querySelector(".app-shell");
  const DATA = window.KW_DATA || { questions: [], conversationPrompts: [], stories: [], exploreFacts: [] };

  const STORAGE = {
    progress: "kennys-workshop-progress-v7",
    settings: "kennys-workshop-settings-v7"
  };

  const DEFAULT_SETTINGS = {
    voice: true,
    textSize: "large",
    narrationRate: 0.88,
    sessionLength: 5,
    difficulty: "standard",
    reduceMotion: true,
    includeSubmarines: true,
    musicVolume: 0.16
  };

  const DEFAULT_PROGRESS = {
    sessions: 0,
    questionsAnswered: 0,
    conversationsEnjoyed: 0,
    storiesHeard: 0,
    workshopSeen: [],
    rememberedPrompts: [],
    heardStories: [],
    topicCounts: {},
    favorites: [],
    recentQuestions: [],
    lastActivity: null
  };

  const WORKSHOP_OBJECTS = {
    multimeter: {
      icon: "⚡",
      title: "Bench Multimeter",
      fact: "A multimeter can compare voltage, current, and resistance. A careful technician chooses the function and range before taking a reading.",
      question: "Before measuring resistance on the training bench, what should be done first?",
      choices: ["Remove power from the circuit", "Start the engine", "Increase the voltage"],
      answer: "Remove power from the circuit",
      explanation: "Resistance is checked with the training circuit de-energized."
    },
    blueprint: {
      icon: "📐",
      title: "System Blueprint",
      fact: "A good drawing turns a complicated machine into understandable sections, paths, symbols, and reference points.",
      question: "What is the best first step when reading an unfamiliar diagram?",
      choices: ["Find the legend and major sections", "Guess every symbol", "Ignore the labels"],
      answer: "Find the legend and major sections",
      explanation: "The legend and major sections give the drawing its structure."
    },
    wrenches: {
      icon: "🔧",
      title: "Wrench Board",
      fact: "A correctly sized wrench spreads force across the flats of a fastener and helps protect its corners.",
      question: "Which wrench is the sound choice for a hex fastener?",
      choices: ["The closest exact size", "The largest one available", "One that slips easily"],
      answer: "The closest exact size",
      explanation: "A close exact fit reduces slipping and rounded corners."
    },
    gearbox: {
      icon: "⚙️",
      title: "Gear Train",
      fact: "Meshed gears can trade speed for torque. A small driving gear turning a larger gear generally slows the output and increases torque.",
      question: "A small gear drives a larger gear. What usually happens at the output?",
      choices: ["Speed drops and torque rises", "Speed and torque both vanish", "Direction never changes"],
      answer: "Speed drops and torque rises",
      explanation: "The larger driven gear turns more slowly while providing greater torque."
    },
    engine: {
      icon: "🏁",
      title: "Engine Stand",
      fact: "Smooth operation depends on air, fuel, ignition, compression, lubrication, and cooling working together.",
      question: "Which observation is most useful during diagnosis?",
      choices: ["A repeatable symptom", "A random guess", "The paint color"],
      answer: "A repeatable symptom",
      explanation: "A repeatable symptom gives a technician evidence that can be tested."
    },
    toolbox: {
      icon: "🧰",
      title: "Red Tool Chest",
      fact: "A well-arranged toolbox saves time because every tool has a known home and damage is easier to spot.",
      question: "Why return tools to the same place after a job?",
      choices: ["They are easier to find and inspect", "It makes them heavier", "It changes their size"],
      answer: "They are easier to find and inspect",
      explanation: "Order supports speed, care, and a clean final check."
    }
  };

  const TRACKS = {
    openroad: {
      title: "Kenny, King of the Open Road",
      duration: "3 min 35 sec",
      src: "./assets/audio/kenny-king-open-road.mp3"
    },
    downbelow: {
      title: "Kenny Down Below",
      duration: "2 min 30 sec",
      src: "./assets/audio/kenny-down-below.mp3"
    },
    sailorbelow: {
      title: "Kenny, Sailor Below",
      duration: "3 min 38 sec",
      src: "./assets/audio/kenny-sailor-below.mp3"
    }
  };

  const state = {
    screen: routeFromHash(),
    previousScreen: "home",
    quiz: null,
    promptIndex: 0,
    factCategory: "submarines",
    factIndex: 0,
    storyOpenId: null,
    lastWorkshopObject: null,
    settings: loadObject(STORAGE.settings, DEFAULT_SETTINGS),
    progress: loadObject(STORAGE.progress, DEFAULT_PROGRESS),
    dialogReturnFocus: null,
    toastTimer: null
  };

  let musicPlayer = null;
  let activeTrackId = null;

  function loadObject(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" ? { ...fallback, ...value } : { ...fallback };
    } catch {
      return { ...fallback };
    }
  }

  function saveObject(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The workshop stays usable if private browsing blocks storage.
    }
  }

  function saveProgress() {
    saveObject(STORAGE.progress, state.progress);
  }

  function saveSettings() {
    saveObject(STORAGE.settings, state.settings);
    applySettings();
  }

  function applySettings() {
    document.body.dataset.textSize = state.settings.textSize;
    document.body.classList.toggle("reduce-motion", Boolean(state.settings.reduceMotion));
  }

  function songVolume() {
    const savedLevel = Number(state.settings.musicVolume);
    return Math.min(1, Math.max(0.1, (Number.isFinite(savedLevel) ? savedLevel : 0.16) / 0.35));
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatCategory(value) {
    const labels = {
      mechanics: "Mechanical know-how",
      submarines: "Submarines",
      "race-cars": "Race cars",
      motorcycles: "Motorcycles",
      "music-culture": "Music & culture",
      workshop: "Virtual workshop",
      memory: "Memory & conversation",
      story: "Stories"
    };
    return labels[value] || String(value || "Workshop").replaceAll("-", " ");
  }

  function routeFromHash() {
    const route = location.hash.replace(/^#/, "");
    const allowed = new Set(["home", "mechanical", "workshop", "memory", "explore", "listen", "progress", "favorites", "settings"]);
    return allowed.has(route) ? route : "home";
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function activityIcon(kind) {
    const icons = {
      mechanical: `<svg viewBox="0 0 220 150" aria-hidden="true"><g fill="#f0c45c" stroke="#fff" stroke-width="7"><circle cx="76" cy="77" r="39"/><circle cx="145" cy="88" r="28"/></g><g fill="#173d59"><circle cx="76" cy="77" r="13"/><circle cx="145" cy="88" r="9"/></g><path d="M76 20v16M76 118v17M19 77h17M116 77h17M38 39l12 12M102 103l12 12M38 115l12-12M102 51l12-12M145 46V35M145 130v-11M103 88h11M176 88h12" stroke="#fff" stroke-width="9" stroke-linecap="round"/></svg>`,
      workshop: `<svg viewBox="0 0 220 150" aria-hidden="true"><rect x="27" y="37" width="166" height="88" rx="9" fill="#d8692d" stroke="#fff" stroke-width="7"/><path d="M27 68h166M82 37V21h56v16M58 88h38M124 88h38M58 106h38M124 106h38" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M89 57h42" stroke="#f4cf68" stroke-width="9" stroke-linecap="round"/></svg>`,
      memory: `<svg viewBox="0 0 220 150" aria-hidden="true"><rect x="34" y="28" width="92" height="80" rx="8" fill="#fff7df" stroke="#fff" stroke-width="7" transform="rotate(-7 80 68)"/><rect x="98" y="42" width="88" height="76" rx="8" fill="#fff7df" stroke="#fff" stroke-width="7" transform="rotate(6 142 80)"/><path d="M53 86l22-22 18 15 17-22M116 94l18-20 14 11 20-25" fill="none" stroke="#725092" stroke-width="7"/><path d="M62 126c23-13 75-12 101 0" fill="none" stroke="#f2c14e" stroke-width="10" stroke-linecap="round"/></svg>`,
      explore: `<svg viewBox="0 0 220 150" aria-hidden="true"><path d="M25 100c34-28 55-36 86-33 29 3 46 18 83 14-24 20-51 30-87 28-34-2-55-3-82-9Z" fill="#d9eff8" stroke="#fff" stroke-width="7"/><path d="M79 66V40h45v29M91 40V26h18v14" fill="#d9eff8" stroke="#fff" stroke-width="7"/><circle cx="62" cy="96" r="10" fill="#f2c14e"/><path d="M112 114h77M127 114l-19 22M151 114l-6 24M172 114l10 22" stroke="#f2c14e" stroke-width="7" stroke-linecap="round"/></svg>`,
      listen: `<svg viewBox="0 0 220 150" aria-hidden="true"><path d="M45 34h111v92H45z" fill="#9b5126" stroke="#fff" stroke-width="7"/><path d="M156 55h26v51h-26" fill="#e6a42d" stroke="#fff" stroke-width="7"/><circle cx="95" cy="82" r="33" fill="#4d2b1e" stroke="#f4cf68" stroke-width="7"/><circle cx="95" cy="82" r="9" fill="#f4cf68"/><path d="M169 63V30l24-8v34M190 75V42l20-7" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/></svg>`
    };
    return icons[kind] || "";
  }

  function pageHeader(title, description, backScreen = "home") {
    return `
      <div class="back-row">
        <button class="button" type="button" data-action="navigate" data-screen="${escapeHTML(backScreen)}">← Back</button>
        <button class="button ghost" type="button" data-action="go-home">⌂ Home</button>
      </div>
      <header class="page-header">
        <h1>${escapeHTML(title)}</h1>
        <p>${escapeHTML(description)}</p>
      </header>`;
  }

  function setActiveNav() {
    document.querySelectorAll("[data-nav]").forEach((button) => {
      const active = button.dataset.nav === state.screen;
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function navigate(screen, options = {}) {
    if (screen !== state.screen) state.previousScreen = state.screen;
    if (screen !== "listen") stopMusic(false);
    stopSpeech();
    state.screen = screen;
    state.progress.lastActivity = screen === "home" ? state.progress.lastActivity : screen;
    saveProgress();
    if (options.push !== false) history.pushState({ screen }, "", `#${screen}`);
    render();
    requestAnimationFrame(() => main.focus({ preventScroll: false }));
  }

  function render() {
    closeDialog(false);
    const views = {
      home: renderHome,
      mechanical: renderMechanical,
      workshop: renderWorkshop,
      memory: renderMemory,
      explore: renderExplore,
      listen: renderListen,
      quiz: renderQuiz,
      complete: renderComplete,
      progress: renderProgress,
      favorites: renderFavorites,
      settings: renderSettings
    };
    (views[state.screen] || renderHome)();
    setActiveNav();
  }

  function renderHome() {
    state.screen = "home";
    const activities = [
      { id: "mechanical", title: "Mechanical Puzzles", text: "Solve practical multiple-choice challenges about tools, engines, gears, and electrical basics.", button: "Start puzzles" },
      { id: "workshop", title: "Virtual Workshop", text: "Explore a familiar workbench and open six hands-on technical stations.", button: "Enter workshop" },
      { id: "memory", title: "Memory & Conversation", text: "Enjoy relaxed prompts about work, music, machines, people, and the open road.", button: "Choose a memory" },
      { id: "explore", title: "Submarines, Cars & Motorcycles", text: "Browse fascinating facts, then try a topic challenge whenever you like.", button: "Explore topics" },
      { id: "listen", title: "Music & Stories", text: "Hear three original songs made especially for Kenny, plus original workshop stories.", button: "Listen now" }
    ];

    main.innerHTML = `
      <section class="page home-page" aria-labelledby="home-title">
        <div class="hero">
          <picture aria-hidden="true">
            <source srcset="assets/hero-workshop.webp" type="image/webp" />
            <img class="hero-art" src="assets/hero-workshop.jpg" alt="" />
          </picture>
          <div class="hero-copy">
            <span class="hero-kicker">Good to see you, Kenny</span>
            <h1 id="home-title">Kenny's <span>Workshop</span></h1>
            <p>Let’s explore, tinker, remember, and have some fun. There is no timer and no penalty for skipping a question.</p>
            <div class="hero-actions">
              <button class="button warm" type="button" data-action="start-quiz" data-category="mechanics">Start a quick challenge</button>
              <button class="button" type="button" data-action="speak-page">🔊 Hear welcome</button>
            </div>
          </div>
        </div>

        <div class="welcome-strip">
          <p>Pick anything that looks interesting. You can always return Home.</p>
          <span class="session-pill"><span aria-hidden="true">✓</span> ${state.progress.sessions} relaxed session${state.progress.sessions === 1 ? "" : "s"} enjoyed</span>
        </div>

        <div class="section-heading">
          <h2>What would you like to do?</h2>
          <p>Five workshop areas, each with large controls and spoken help.</p>
        </div>

        <div class="activity-grid">
          ${activities.map((item) => `
            <article class="activity-card" data-testid="activity-card">
              <div class="activity-visual">${activityIcon(item.id)}</div>
              <div class="activity-body">
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.text)}</p>
                <button class="button" type="button" data-action="navigate" data-screen="${item.id}" data-testid="activity-${item.id}">${escapeHTML(item.button)}</button>
              </div>
            </article>`).join("")}
        </div>
      </section>`;
  }

  function renderMechanical() {
    const mechanicsCount = DATA.questions.filter((q) => q.category === "mechanics").length;
    main.innerHTML = `
      <section class="page" aria-labelledby="mechanical-title">
        ${pageHeader("Mechanical Puzzles", "Choose a challenge. Each question has a hint, spoken reading, and a calm explanation.")}
        <div class="topic-grid">
          <article class="topic-card">
            <span class="topic-icon" aria-hidden="true">⚙️</span>
            <div><h2>Tools, Engines & Gears</h2><p>${mechanicsCount} practical workshop questions at several levels.</p></div>
            <button class="button primary" type="button" data-action="start-quiz" data-category="mechanics">Start mechanical puzzles</button>
          </article>
          <article class="topic-card">
            <span class="topic-icon" aria-hidden="true">🧭</span>
            <div><h2>Mixed Workshop Challenge</h2><p>A hand-picked mix from every interest: mechanics, submarines, racing, motorcycles, and music.</p></div>
            <button class="button green" type="button" data-action="start-quiz" data-category="all">Start mixed challenge</button>
          </article>
          <article class="topic-card">
            <span class="topic-icon" aria-hidden="true">🧰</span>
            <div><h2>Prefer to Look Around?</h2><p>Open the virtual workbench and investigate one object at a time.</p></div>
            <button class="button" type="button" data-action="navigate" data-screen="workshop">Enter virtual workshop</button>
          </article>
        </div>
      </section>`;
  }

  function filteredQuestions(category) {
    let pool = DATA.questions.filter((question) => category === "all" || question.category === category);
    if (!state.settings.includeSubmarines) pool = pool.filter((question) => question.category !== "submarines");
    if (state.settings.difficulty === "steady") pool = pool.filter((question) => question.difficulty === "easy");
    if (state.settings.difficulty === "standard") pool = pool.filter((question) => question.difficulty !== "challenge");
    return pool;
  }

  function startQuiz(category, preferredQuestion = null) {
    let pool = filteredQuestions(category);
    const recent = new Set(state.progress.recentQuestions || []);
    const fresh = pool.filter((question) => !recent.has(question.id));
    if (fresh.length >= Math.min(state.settings.sessionLength, pool.length)) pool = fresh;
    pool = shuffle(pool);
    if (preferredQuestion) {
      pool = [preferredQuestion, ...pool.filter((item) => item.id !== preferredQuestion.id)];
    }
    pool = pool.slice(0, Math.max(1, Math.min(Number(state.settings.sessionLength) || 5, pool.length)));
    if (!pool.length) {
      showToast("No questions match those settings. Try another challenge level.");
      return;
    }
    state.quiz = {
      category,
      pool,
      index: 0,
      answered: false,
      selected: null,
      showHint: false,
      completed: false
    };
    navigate("quiz");
  }

  function renderQuiz() {
    if (!state.quiz || !state.quiz.pool.length) {
      navigate("mechanical", { push: false });
      return;
    }
    const question = state.quiz.pool[state.quiz.index];
    const current = state.quiz.index + 1;
    const total = state.quiz.pool.length;
    const isCorrect = state.quiz.answered && state.quiz.selected === question.answer;
    const backScreen = ["mechanics", "all"].includes(state.quiz.category) ? "mechanical" : "explore";
    main.innerHTML = `
      <section class="page" aria-labelledby="quiz-title">
        <div class="back-row">
          <button class="button" type="button" data-action="navigate" data-screen="${backScreen}">← Leave this session</button>
          <button class="button ghost" type="button" data-action="go-home">⌂ Home</button>
        </div>
        <div class="quiz-layout">
          <article class="quiz-card">
            <div class="quiz-progress">
              <span>Question ${current} of ${total}</span>
              <div class="progress-track" aria-label="Session progress"><span style="width:${Math.round((current / total) * 100)}%"></span></div>
            </div>
            <div class="quiz-content">
              <p class="eyebrow">${escapeHTML(formatCategory(question.category))} · ${escapeHTML(question.difficulty)}</p>
              <h1 class="question-text" id="quiz-title" data-testid="quiz-question">${escapeHTML(question.question)}</h1>
              <div class="choice-list" aria-label="Answer choices">
                ${question.choices.map((choice, index) => {
                  let className = "choice-button";
                  if (state.quiz.answered) {
                    if (choice === question.answer) className += " is-correct";
                    else if (choice === state.quiz.selected) className += " is-selected";
                    else className += " is-other";
                  }
                  return `<button class="${className}" type="button" data-action="answer-question" data-choice="${escapeHTML(choice)}" ${state.quiz.answered ? "disabled" : ""} data-testid="quiz-choice"><span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(choice)}</span></button>`;
                }).join("")}
              </div>
              ${state.quiz.showHint && !state.quiz.answered ? `<div class="hint-box"><strong>Hint:</strong> ${escapeHTML(question.hint)}</div>` : ""}
              ${state.quiz.answered ? `
                <div class="feedback ${isCorrect ? "" : "try"}" data-testid="quiz-feedback">
                  <h3>${isCorrect ? "Nicely reasoned." : "Good try. Here is the answer."}</h3>
                  ${isCorrect ? '<span class="sr-only" data-testid="quiz-success">Correct answer</span>' : ""}
                  <p><strong>${escapeHTML(question.answer)}</strong></p>
                  <p>${escapeHTML(question.explanation)}</p>
                </div>
                <div class="action-row">
                  <button class="button primary" type="button" data-action="next-question">${current === total ? "Finish this session" : "Next question"} →</button>
                  <button class="button" type="button" data-action="speak-feedback">🔊 Hear explanation</button>
                  ${favoriteButton(`question:${question.id}`)}
                </div>` : `
                <div class="action-row">
                  <button class="button" type="button" data-action="show-hint">💡 ${state.quiz.showHint ? "Hint shown" : "Show a hint"}</button>
                  <button class="button" type="button" data-action="speak-question">🔊 Hear question</button>
                  <button class="button ghost" type="button" data-action="skip-question">Skip for now</button>
                </div>`}
            </div>
          </article>
          <aside class="quiz-tools" aria-label="Session help">
            <h2>Take your time</h2>
            <p>There is no clock. Pick the answer that seems best, or skip without penalty.</p>
            <button class="button" type="button" data-action="speak-question">🔊 Hear it again</button>
            <button class="button" type="button" data-action="show-hint">💡 Show hint</button>
            <button class="button" type="button" data-action="go-home">⌂ Return Home</button>
          </aside>
        </div>
      </section>`;
  }

  function answerQuestion(choice) {
    if (!state.quiz || state.quiz.answered) return;
    const question = state.quiz.pool[state.quiz.index];
    state.quiz.answered = true;
    state.quiz.selected = choice;
    state.progress.questionsAnswered += 1;
    state.progress.topicCounts[question.category] = (state.progress.topicCounts[question.category] || 0) + 1;
    state.progress.recentQuestions = [question.id, ...(state.progress.recentQuestions || []).filter((id) => id !== question.id)].slice(0, 18);
    saveProgress();
    renderQuiz();
    announce(choice === question.answer ? "Nicely reasoned. The answer is correct." : `Good try. The answer is ${question.answer}.`);
  }

  function nextQuestion(skipped = false) {
    if (!state.quiz) return;
    if (state.quiz.index >= state.quiz.pool.length - 1) {
      if (!state.quiz.completed) {
        state.quiz.completed = true;
        state.progress.sessions += 1;
        saveProgress();
      }
      navigate("complete");
      return;
    }
    state.quiz.index += 1;
    state.quiz.answered = false;
    state.quiz.selected = null;
    state.quiz.showHint = false;
    renderQuiz();
    requestAnimationFrame(() => main.focus());
    if (skipped) announce("Question skipped. Here is the next one.");
  }

  function renderComplete() {
    main.innerHTML = `
      <section class="page" aria-labelledby="complete-title">
        <div class="completion-card">
          <div class="seal" aria-hidden="true">✓</div>
          <h1 id="complete-title">That was a fine workshop session.</h1>
          <p>You explored ${state.quiz?.pool.length || "several"} questions at your own pace. Progress here is about curiosity, not a score.</p>
          <div class="action-row" style="justify-content:center">
            <button class="button primary" type="button" data-action="restart-quiz">Try another session</button>
            <button class="button warm" type="button" data-action="go-home">Return Home</button>
          </div>
        </div>
      </section>`;
  }

  function renderWorkshop() {
    const seen = new Set(state.progress.workshopSeen || []);
    main.innerHTML = `
      <section class="page" aria-labelledby="workshop-title">
        ${pageHeader("Interactive Virtual Workshop", "Choose any station. Each one has a familiar technical idea and a short challenge.")}
        <div class="workbench-wrap">
          <div class="discovery-bar">
            <strong>${seen.size} of 6 stations explored</strong>
            <span>No required order — look around freely.</span>
          </div>
          <div class="workbench" aria-label="Virtual workbench with six stations">
            ${Object.entries(WORKSHOP_OBJECTS).map(([id, item]) => `
              <button class="object-button ${seen.has(id) ? "is-seen" : ""}" type="button" data-action="open-object" data-object="${id}">
                <span aria-hidden="true">${item.icon}</span><span>${escapeHTML(item.title)}</span>
              </button>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function openWorkshopObject(id) {
    const item = WORKSHOP_OBJECTS[id];
    if (!item) return;
    state.lastWorkshopObject = id;
    if (!state.progress.workshopSeen.includes(id)) {
      state.progress.workshopSeen.push(id);
      saveProgress();
      main.querySelector(`[data-object="${id}"]`)?.classList.add("is-seen");
      const discoveryCount = main.querySelector(".discovery-bar strong");
      if (discoveryCount) discoveryCount.textContent = `${state.progress.workshopSeen.length} of 6 stations explored`;
    }
    openDialog(`
      <div class="dialog-header"><div><p class="eyebrow">Workshop station</p><h2>${item.icon} ${escapeHTML(item.title)}</h2></div><button class="dialog-close" type="button" data-action="close-dialog" aria-label="Close">×</button></div>
      <p>${escapeHTML(item.fact)}</p>
      <div class="setting-group">
        <h3>${escapeHTML(item.question)}</h3>
        <div class="choice-list">
          ${item.choices.map((choice) => `<button class="choice-button" type="button" data-action="answer-workshop" data-object="${id}" data-choice="${escapeHTML(choice)}"><span>${escapeHTML(choice)}</span></button>`).join("")}
        </div>
        <div id="workshop-feedback" aria-live="polite"></div>
      </div>
      <div class="action-row"><button class="button" type="button" data-action="speak-object" data-object="${id}">🔊 Hear this station</button><button class="button primary" type="button" data-action="close-dialog">Done here</button></div>`, `Explore ${item.title}`);
  }

  function answerWorkshop(id, choice, button) {
    const item = WORKSHOP_OBJECTS[id];
    const feedback = dialogRoot.querySelector("#workshop-feedback");
    if (!item || !feedback) return;
    dialogRoot.querySelectorAll("[data-action='answer-workshop']").forEach((node) => {
      node.disabled = true;
      if (node.dataset.choice === item.answer) node.classList.add("is-correct");
    });
    if (choice !== item.answer) button.classList.add("is-selected");
    feedback.className = `feedback ${choice === item.answer ? "" : "try"}`;
    feedback.innerHTML = `<h3>${choice === item.answer ? "Good diagnosis." : "Good thinking. Here is the best answer."}</h3><p><strong>${escapeHTML(item.answer)}</strong> — ${escapeHTML(item.explanation)}</p>`;
    announce(choice === item.answer ? "Good diagnosis." : `The best answer is ${item.answer}.`);
  }

  function renderMemory() {
    const prompts = DATA.conversationPrompts || [];
    if (!prompts.length) {
      main.innerHTML = `<section class="page">${pageHeader("Memory & Conversation", "Conversation prompts are being prepared.")}<div class="empty-card">Please return Home and try another activity.</div></section>`;
      return;
    }
    const index = ((state.promptIndex % prompts.length) + prompts.length) % prompts.length;
    const prompt = prompts[index];
    main.innerHTML = `
      <section class="page" aria-labelledby="memory-title">
        ${pageHeader("Memory & Conversation", "There is no right answer here. Enjoy the story that comes to mind, or simply choose another card.")}
        <article class="prompt-card">
          <p class="eyebrow">${escapeHTML(prompt.category)}</p>
          <h1 id="memory-title">${escapeHTML(prompt.title)}</h1>
          <blockquote>“${escapeHTML(prompt.prompt)}”</blockquote>
          <p class="gentle-cue">${escapeHTML(prompt.gentleCue)}</p>
          ${prompt.optionalFollowUp ? `<p><strong>If you feel like continuing:</strong> ${escapeHTML(prompt.optionalFollowUp)}</p>` : ""}
          <div class="action-row" style="justify-content:center">
            <button class="button primary" type="button" data-action="mark-memory">This brought back a memory</button>
            <button class="button" type="button" data-action="speak-prompt">🔊 Hear the prompt</button>
            ${favoriteButton(`prompt:${prompt.id}`)}
            <button class="button warm" type="button" data-action="next-prompt">Another conversation card →</button>
          </div>
        </article>
      </section>`;
  }

  function renderExplore() {
    if (!state.settings.includeSubmarines && state.factCategory === "submarines") state.factCategory = "race-cars";
    const categories = state.settings.includeSubmarines ? ["submarines", "race-cars", "motorcycles"] : ["race-cars", "motorcycles"];
    const facts = DATA.exploreFacts.filter((fact) => fact.category === state.factCategory);
    if (!facts.length) state.factIndex = 0;
    const fact = facts[((state.factIndex % Math.max(facts.length, 1)) + facts.length) % Math.max(facts.length, 1)];
    main.innerHTML = `
      <section class="page" aria-labelledby="explore-title">
        ${pageHeader("Explore Machines & the Sea", "Browse one clear fact at a time, then take a topic challenge whenever you are ready.")}
        <div class="tabs" role="tablist" aria-label="Explore topics">
          ${categories.map((category) => `<button class="tab-button" type="button" role="tab" aria-selected="${category === state.factCategory}" data-action="choose-fact-category" data-category="${category}">${category === "submarines" ? "⚓" : category === "race-cars" ? "🏁" : "🏍"} ${escapeHTML(formatCategory(category))}</button>`).join("")}
        </div>
        ${fact ? `<article class="fact-card">
          <span class="fact-label">${escapeHTML(formatCategory(fact.category))}</span>
          <h1 id="explore-title">${escapeHTML(fact.title)}</h1>
          <p>${escapeHTML(fact.fact)}</p>
          <p class="fact-why"><strong>Why it matters:</strong> ${escapeHTML(fact.whyItMatters)}</p>
          <div class="action-row">
            <button class="button primary" type="button" data-action="next-fact">Next fact →</button>
            <button class="button" type="button" data-action="speak-fact">🔊 Hear this fact</button>
            ${favoriteButton(`fact:${fact.id}`)}
            <button class="button warm" type="button" data-action="start-quiz" data-category="${fact.category}">Try ${escapeHTML(formatCategory(fact.category))} questions</button>
          </div>
        </article>` : `<div class="empty-card"><h1 id="explore-title">More facts are coming soon.</h1></div>`}
      </section>`;
  }

  function renderListen() {
    const stories = DATA.stories || [];
    main.innerHTML = `
      <section class="page" aria-labelledby="listen-title">
        ${pageHeader("Music & Stories", "Nothing starts by itself. Choose one of Kenny's original songs or a short narrated story when you are ready.")}
        <div class="radio-panel">
          <div class="radio-face" aria-hidden="true"><div class="radio-speaker"></div><div class="radio-dial">KENNY'S WORKSHOP RADIO</div></div>
          <div class="radio-copy">
            <p class="eyebrow" style="color:#ffe59b">Original songs for Kenny</p>
            <h1 id="listen-title">Choose a workshop tune</h1>
            <p>These three original songs were made especially for Kenny. Choose any title to play it, and press the same button again to stop.</p>
            <div class="track-list">
              ${Object.entries(TRACKS).map(([id, track]) => `<button class="track-button" type="button" data-action="play-track" data-track="${id}" aria-pressed="${activeTrackId === id}"><span>${activeTrackId === id ? "■ Stop" : "▶ Play"} — ${escapeHTML(track.title)}</span><small>${escapeHTML(track.duration)}</small></button>`).join("")}
            </div>
            <button class="button" type="button" data-action="stop-audio">Stop all audio</button>
          </div>
        </div>
        <div class="section-heading"><h2>Short stories from the workshop</h2><p>Every story is original and can be read on screen or spoken aloud.</p></div>
        <div class="story-grid">
          ${stories.map((story) => `
            <article class="story-card">
              <span class="story-label">${escapeHTML(story.category)} · about ${Math.max(1, Math.round(story.estimatedSeconds / 60))} min</span>
              <h3>${escapeHTML(story.title)}</h3>
              <p>${escapeHTML(story.narration.slice(0, 155))}${story.narration.length > 155 ? "…" : ""}</p>
              <div class="story-transcript ${state.storyOpenId === story.id ? "is-open" : ""}" id="transcript-${escapeHTML(story.id)}"><p>${escapeHTML(story.narration)}</p></div>
              <div class="card-actions">
                <button class="button primary" type="button" data-action="speak-story" data-story="${escapeHTML(story.id)}">🔊 Hear story</button>
                <button class="button" type="button" data-action="toggle-story" data-story="${escapeHTML(story.id)}" aria-expanded="${state.storyOpenId === story.id}">${state.storyOpenId === story.id ? "Hide transcript" : "Read transcript"}</button>
                ${favoriteButton(`story:${story.id}`)}
              </div>
            </article>`).join("")}
        </div>
        <div class="content-card">
          <h2>Music memory challenge</h2>
          <p>Try questions about instruments, formats, performers, and music culture from the 1960s and 1970s — without using song lyrics.</p>
          <button class="button warm" type="button" data-action="start-quiz" data-category="music-culture">Start music & culture questions</button>
        </div>
      </section>`;
  }

  function renderProgress() {
    const topicMax = Math.max(1, ...Object.values(state.progress.topicCounts || {}));
    const topics = ["mechanics", "submarines", "race-cars", "motorcycles", "music-culture"]
      .filter((category) => state.settings.includeSubmarines || category !== "submarines");
    main.innerHTML = `
      <section class="page" aria-labelledby="progress-title">
        ${pageHeader("My Progress", "A gentle record of what you have explored — never a test score.")}
        <div class="progress-grid">
          <article class="progress-card"><span class="progress-number" data-testid="progress-count">${state.progress.questionsAnswered}</span><strong>questions explored</strong></article>
          <article class="progress-card"><span class="progress-number">${state.progress.sessions}</span><strong>sessions enjoyed</strong></article>
          <article class="progress-card"><span class="progress-number">${state.progress.workshopSeen.length}</span><strong>workshop stations opened</strong></article>
          <article class="progress-card"><span class="progress-number">${state.progress.favorites.length}</span><strong>favorites saved</strong></article>
        </div>
        <article class="content-card">
          <div class="section-heading"><h2>Topics you have visited</h2><p>Longer bars simply mean you have spent more time there.</p></div>
          <div class="topic-progress-list">
            ${topics.map((category) => {
              const count = state.progress.topicCounts[category] || 0;
              const width = count ? Math.max(10, Math.round((count / topicMax) * 100)) : 0;
              return `<div class="topic-progress-item"><strong>${escapeHTML(formatCategory(category))}</strong><div class="progress-track" aria-label="${count} questions explored"><span style="width:${width}%"></span></div><span>${count}</span></div>`;
            }).join("")}
          </div>
        </article>
        <article class="content-card">
          <h2>Keep exploring</h2>
          <p>${state.progress.lastActivity ? `Your most recent area was ${escapeHTML(formatCategory(state.progress.lastActivity))}.` : "Choose any workshop area that sounds good today."}</p>
          <div class="action-row"><button class="button primary" type="button" data-action="navigate" data-screen="${state.progress.lastActivity || "mechanical"}">Continue exploring</button><button class="button" type="button" data-action="go-home">Home</button></div>
        </article>
      </section>`;
  }

  function favoriteButton(key) {
    const saved = state.progress.favorites.includes(key);
    return `<button class="favorite-toggle" type="button" data-action="toggle-favorite" data-favorite="${escapeHTML(key)}" aria-pressed="${saved}">${saved ? "★ Saved" : "☆ Save favorite"}</button>`;
  }

  function resolveFavorite(key) {
    const [type, id] = key.split(":");
    if (type === "question") {
      const item = DATA.questions.find((q) => q.id === id);
      return item ? { type, id, title: item.question, detail: `${formatCategory(item.category)} question`, item } : null;
    }
    if (type === "prompt") {
      const item = DATA.conversationPrompts.find((p) => p.id === id);
      return item ? { type, id, title: item.title, detail: item.prompt, item } : null;
    }
    if (type === "fact") {
      const item = DATA.exploreFacts.find((f) => f.id === id);
      return item ? { type, id, title: item.title, detail: item.fact, item } : null;
    }
    if (type === "story") {
      const item = DATA.stories.find((s) => s.id === id);
      return item ? { type, id, title: item.title, detail: `${item.category} story`, item } : null;
    }
    return null;
  }

  function renderFavorites() {
    const favorites = state.progress.favorites.map(resolveFavorite).filter(Boolean);
    main.innerHTML = `
      <section class="page" aria-labelledby="favorites-title">
        ${pageHeader("Favorites", "Questions, facts, prompts, and stories you chose to keep close.")}
        ${favorites.length ? `<div class="favorite-grid">${favorites.map((favorite) => `
          <article class="favorite-item">
            <p class="eyebrow">${escapeHTML(favorite.type)}</p>
            <h2>${escapeHTML(favorite.title)}</h2>
            <p>${escapeHTML(favorite.detail)}</p>
            <div class="card-actions"><button class="button primary" type="button" data-action="open-favorite" data-favorite="${favorite.type}:${favorite.id}">Open</button><button class="button" type="button" data-action="toggle-favorite" data-favorite="${favorite.type}:${favorite.id}">Remove</button></div>
          </article>`).join("")}</div>` : `<div class="empty-card"><h1 id="favorites-title">No favorites yet — and that is perfectly fine.</h1><p>Look for the star button beside a question, memory prompt, fact, or story.</p><button class="button primary" type="button" data-action="go-home">Explore the workshop</button></div>`}
      </section>`;
  }

  function openFavorite(key) {
    const favorite = resolveFavorite(key);
    if (!favorite) return;
    if (favorite.type === "question") startQuiz(favorite.item.category, favorite.item);
    if (favorite.type === "prompt") {
      state.promptIndex = DATA.conversationPrompts.findIndex((item) => item.id === favorite.id);
      navigate("memory");
    }
    if (favorite.type === "fact") {
      state.factCategory = favorite.item.category;
      state.factIndex = DATA.exploreFacts.filter((item) => item.category === favorite.item.category).findIndex((item) => item.id === favorite.id);
      navigate("explore");
    }
    if (favorite.type === "story") {
      state.storyOpenId = favorite.id;
      navigate("listen");
    }
  }

  function renderSettings() {
    main.innerHTML = `
      <section class="page" aria-labelledby="settings-title">
        ${pageHeader("Settings", "Adjust the workshop for comfort. These choices are saved only in this browser.")}
        <article class="settings-card">
          <div class="settings-grid">
            <div class="setting-group"><label for="text-size">Text size</label><select id="text-size" data-setting="textSize"><option value="large" ${state.settings.textSize === "large" ? "selected" : ""}>Large</option><option value="extra-large" ${state.settings.textSize === "extra-large" ? "selected" : ""}>Extra large</option><option value="largest" ${state.settings.textSize === "largest" ? "selected" : ""}>Largest</option></select></div>
            <div class="setting-group"><label for="difficulty">Challenge level</label><select id="difficulty" data-setting="difficulty"><option value="steady" ${state.settings.difficulty === "steady" ? "selected" : ""}>Steady</option><option value="standard" ${state.settings.difficulty === "standard" ? "selected" : ""}>Standard</option><option value="challenge" ${state.settings.difficulty === "challenge" ? "selected" : ""}>Challenge</option></select></div>
            <div class="setting-group"><label for="session-length">Questions in a session</label><select id="session-length" data-setting="sessionLength"><option value="3" ${Number(state.settings.sessionLength) === 3 ? "selected" : ""}>3 questions</option><option value="5" ${Number(state.settings.sessionLength) === 5 ? "selected" : ""}>5 questions</option><option value="8" ${Number(state.settings.sessionLength) === 8 ? "selected" : ""}>8 questions</option><option value="10" ${Number(state.settings.sessionLength) === 10 ? "selected" : ""}>10 questions</option></select></div>
            <div class="setting-group"><label for="narration-rate">Speaking speed: <output id="rate-output">${Math.round(state.settings.narrationRate * 100)}%</output></label><input id="narration-rate" type="range" min="0.65" max="1.15" step="0.05" value="${state.settings.narrationRate}" data-setting="narrationRate" /></div>
            <div class="setting-group"><div class="toggle-row"><label for="voice-toggle">Spoken reading available</label><input class="switch" id="voice-toggle" type="checkbox" ${state.settings.voice ? "checked" : ""} data-setting="voice" /></div><button class="button" type="button" data-action="test-voice">Test the voice</button></div>
            <div class="setting-group"><div class="toggle-row"><label for="motion-toggle">Reduce visual motion</label><input class="switch" id="motion-toggle" type="checkbox" ${state.settings.reduceMotion ? "checked" : ""} data-setting="reduceMotion" /></div><p>Keeps transitions quiet and predictable.</p></div>
            <div class="setting-group"><div class="toggle-row"><label for="submarine-toggle">Include submarine topics</label><input class="switch" id="submarine-toggle" type="checkbox" ${state.settings.includeSubmarines ? "checked" : ""} data-setting="includeSubmarines" /></div><p>Turn off if Navy subjects are not comfortable today.</p></div>
            <div class="setting-group"><label for="music-volume">Song volume: <output id="volume-output">${Math.round(songVolume() * 100)}%</output></label><input id="music-volume" type="range" min="0.05" max="0.35" step="0.05" value="${state.settings.musicVolume}" data-setting="musicVolume" /></div>
          </div>
        </article>
        <aside class="privacy-note"><strong>Privacy:</strong> This app has no account, ads, camera, or microphone. Progress and favorites stay in this browser unless you choose to export them.</aside>
        <div class="content-card">
          <h2>Caregiver tools</h2>
          <p>Export a small backup of settings and progress, or reset the local record. Resetting does not remove the app or its questions.</p>
          <div class="action-row"><button class="button" type="button" data-action="export-progress">Export a backup</button><button class="button danger" type="button" data-action="confirm-reset">Reset local progress</button></div>
        </div>
      </section>`;
  }

  function toggleFavorite(key) {
    const index = state.progress.favorites.indexOf(key);
    if (index >= 0) {
      state.progress.favorites.splice(index, 1);
      showToast("Removed from Favorites.");
    } else {
      state.progress.favorites.push(key);
      showToast("Saved to Favorites.");
    }
    saveProgress();
    render();
  }

  function currentPrompt() {
    const prompts = DATA.conversationPrompts || [];
    return prompts.length ? prompts[((state.promptIndex % prompts.length) + prompts.length) % prompts.length] : null;
  }

  function currentFact() {
    const facts = DATA.exploreFacts.filter((fact) => fact.category === state.factCategory);
    return facts.length ? facts[((state.factIndex % facts.length) + facts.length) % facts.length] : null;
  }

  function speak(text, options = {}) {
    if (!state.settings.voice && !options.force) {
      showToast("Spoken reading is turned off in Settings.");
      return;
    }
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      showToast("Spoken reading is not available in this browser. The full text is shown on screen.");
      return;
    }
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.rate = Number(state.settings.narrationRate) || 0.88;
    utterance.pitch = 0.98;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function pageSpeech() {
    if (state.screen === "home") return "Welcome to Kenny's Workshop. Choose Mechanical Puzzles, Virtual Workshop, Memory and Conversation, Submarines Cars and Motorcycles, or Music and Stories. There is no timer, and you can always return Home.";
    if (state.screen === "quiz" && state.quiz) {
      const question = state.quiz.pool[state.quiz.index];
      return `${question.question}. Choices: ${question.choices.join(". ")}.`;
    }
    if (state.screen === "memory") {
      const prompt = currentPrompt();
      return prompt ? `${prompt.title}. ${prompt.prompt}. ${prompt.gentleCue}` : "Memory and conversation.";
    }
    if (state.screen === "explore") {
      const fact = currentFact();
      return fact ? `${fact.title}. ${fact.fact}. Why it matters: ${fact.whyItMatters}` : "Explore machines and the sea.";
    }
    const descriptions = {
      mechanical: "Mechanical Puzzles. Choose tools, engines and gears, a mixed workshop challenge, or the virtual workshop.",
      workshop: "Interactive Virtual Workshop. Choose any station. There is no required order.",
      listen: "Music and Stories. Nothing starts by itself. Choose one of Kenny's original songs or a short narrated story.",
      progress: "My Progress. This is a gentle record of what you have explored, never a test score.",
      favorites: "Favorites. Open any question, fact, prompt, or story you chose to save.",
      settings: "Settings. Adjust text size, challenge level, session length, spoken reading, motion, topics, and music volume."
    };
    return descriptions[state.screen] || "Kenny's Workshop.";
  }

  function startMusic(trackId) {
    if (activeTrackId === trackId) {
      stopMusic();
      renderListen();
      return;
    }
    stopMusic(false);
    stopSpeech();
    const track = TRACKS[trackId];
    if (!track || typeof Audio === "undefined") {
      showToast("Song playback is not supported in this browser.");
      return;
    }

    if (!musicPlayer) {
      musicPlayer = new Audio();
      musicPlayer.preload = "metadata";
      musicPlayer.addEventListener("ended", () => {
        const finishedTrack = TRACKS[activeTrackId];
        activeTrackId = null;
        if (state.screen === "listen") renderListen();
        if (finishedTrack) showToast(`${finishedTrack.title} finished.`);
      });
      musicPlayer.addEventListener("error", () => {
        if (!activeTrackId) return;
        activeTrackId = null;
        if (state.screen === "listen") renderListen();
        showToast("That song could not be played. Please check the internet connection and try again.");
      });
    }

    activeTrackId = trackId;
    musicPlayer.src = track.src;
    musicPlayer.volume = songVolume();
    const requestedTrackId = trackId;
    const playRequest = musicPlayer.play();
    showToast(`Playing ${track.title}.`);
    renderListen();

    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(() => {
        if (activeTrackId !== requestedTrackId) return;
        activeTrackId = null;
        if (state.screen === "listen") renderListen();
        showToast("That song could not be started. Please try again.");
      });
    }
  }

  function stopMusic(showMessage = true) {
    const hadMusic = Boolean(activeTrackId);
    if (musicPlayer) {
      musicPlayer.pause();
      try { musicPlayer.currentTime = 0; } catch { /* metadata may not be ready yet */ }
    }
    activeTrackId = null;
    if (hadMusic && showMessage) showToast("Music stopped.");
  }

  function showToast(message) {
    window.clearTimeout(state.toastTimer);
    toastRoot.innerHTML = `<div class="toast">${escapeHTML(message)}</div>`;
    announce(message);
    state.toastTimer = window.setTimeout(() => { toastRoot.innerHTML = ""; }, 3600);
  }

  function announce(message) {
    announcer.textContent = "";
    requestAnimationFrame(() => { announcer.textContent = message; });
  }

  function openDialog(content, label = "Dialog") {
    state.dialogReturnFocus = document.activeElement;
    dialogRoot.innerHTML = `<div class="dialog-backdrop" data-action="dialog-backdrop"><section class="dialog" role="dialog" aria-modal="true" aria-label="${escapeHTML(label)}">${content}</section></div>`;
    appShell.inert = true;
    document.addEventListener("keydown", handleDialogKeys);
    requestAnimationFrame(() => dialogRoot.querySelector("button, [href], input, select")?.focus());
  }

  function closeDialog(restoreFocus = true) {
    if (!dialogRoot.innerHTML) return;
    dialogRoot.innerHTML = "";
    appShell.inert = false;
    document.removeEventListener("keydown", handleDialogKeys);
    if (restoreFocus && state.dialogReturnFocus instanceof HTMLElement) state.dialogReturnFocus.focus();
  }

  function handleDialogKeys(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...dialogRoot.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function exportProgress() {
    const payload = {
      app: "Kenny's Workshop",
      exportedAt: new Date().toISOString(),
      settings: state.settings,
      progress: state.progress
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kennys-workshop-backup.json";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Backup prepared.");
  }

  function confirmReset() {
    openDialog(`
      <div class="dialog-header"><div><p class="eyebrow">Caregiver tool</p><h2>Reset local progress?</h2></div><button class="dialog-close" type="button" data-action="close-dialog" aria-label="Close">×</button></div>
      <p>This clears session counts, explored stations, and Favorites from this browser. All questions and stories remain available.</p>
      <div class="action-row"><button class="button danger" type="button" data-action="reset-progress">Yes, reset progress</button><button class="button primary" type="button" data-action="close-dialog">Keep progress</button></div>`, "Confirm progress reset");
  }

  function handleClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;

    if (action === "go-home") navigate("home");
    if (action === "navigate") navigate(button.dataset.screen || "home");
    if (action === "show-progress") navigate("progress");
    if (action === "show-favorites") navigate("favorites");
    if (action === "open-settings") navigate("settings");
    if (action === "speak-page") speak(pageSpeech(), { force: true });
    if (action === "start-quiz") startQuiz(button.dataset.category || "all");
    if (action === "answer-question") answerQuestion(button.dataset.choice);
    if (action === "show-hint" && state.quiz) { state.quiz.showHint = true; renderQuiz(); }
    if (action === "speak-question" && state.quiz) {
      const question = state.quiz.pool[state.quiz.index];
      speak(`${question.question}. Choices: ${question.choices.join(". ")}.`, { force: true });
    }
    if (action === "speak-feedback" && state.quiz) {
      const question = state.quiz.pool[state.quiz.index];
      speak(`The answer is ${question.answer}. ${question.explanation}`, { force: true });
    }
    if (action === "next-question") nextQuestion();
    if (action === "skip-question") nextQuestion(true);
    if (action === "restart-quiz" && state.quiz) startQuiz(state.quiz.category);
    if (action === "open-object") openWorkshopObject(button.dataset.object);
    if (action === "answer-workshop") answerWorkshop(button.dataset.object, button.dataset.choice, button);
    if (action === "speak-object") {
      const item = WORKSHOP_OBJECTS[button.dataset.object];
      if (item) speak(`${item.title}. ${item.fact}. ${item.question}`, { force: true });
    }
    if (action === "close-dialog") {
      closeDialog();
    }
    if (action === "dialog-backdrop" && event.target === button) {
      closeDialog();
    }
    if (action === "next-prompt") { state.promptIndex = (state.promptIndex + 1) % DATA.conversationPrompts.length; renderMemory(); }
    if (action === "speak-prompt") {
      const prompt = currentPrompt();
      if (prompt) speak(`${prompt.prompt}. ${prompt.gentleCue}. ${prompt.optionalFollowUp || ""}`, { force: true });
    }
    if (action === "mark-memory") {
      const prompt = currentPrompt();
      if (prompt && !state.progress.rememberedPrompts.includes(prompt.id)) {
        state.progress.rememberedPrompts.push(prompt.id);
        state.progress.conversationsEnjoyed += 1;
        saveProgress();
      }
      showToast("Memory enjoyed. Thank you for sharing it.");
    }
    if (action === "choose-fact-category") { state.factCategory = button.dataset.category; state.factIndex = 0; renderExplore(); }
    if (action === "next-fact") {
      const facts = DATA.exploreFacts.filter((fact) => fact.category === state.factCategory);
      state.factIndex = facts.length ? (state.factIndex + 1) % facts.length : 0;
      renderExplore();
    }
    if (action === "speak-fact") {
      const fact = currentFact();
      if (fact) speak(`${fact.title}. ${fact.fact}. Why it matters: ${fact.whyItMatters}`, { force: true });
    }
    if (action === "play-track") startMusic(button.dataset.track);
    if (action === "stop-audio") { stopMusic(); stopSpeech(); renderListen(); }
    if (action === "toggle-story") { state.storyOpenId = state.storyOpenId === button.dataset.story ? null : button.dataset.story; renderListen(); }
    if (action === "speak-story") {
      const story = DATA.stories.find((item) => item.id === button.dataset.story);
      if (story) {
        stopMusic(false);
        speak(`${story.title}. ${story.narration}`, { force: true });
        if (!state.progress.heardStories.includes(story.id)) {
          state.progress.heardStories.push(story.id);
          state.progress.storiesHeard += 1;
          saveProgress();
        }
      }
    }
    if (action === "toggle-favorite") toggleFavorite(button.dataset.favorite);
    if (action === "open-favorite") openFavorite(button.dataset.favorite);
    if (action === "test-voice") speak("Hello Kenny. The workshop voice is ready when you want it.", { force: true });
    if (action === "export-progress") exportProgress();
    if (action === "confirm-reset") confirmReset();
    if (action === "reset-progress") {
      state.progress = { ...DEFAULT_PROGRESS, workshopSeen: [], rememberedPrompts: [], heardStories: [], topicCounts: {}, favorites: [], recentQuestions: [] };
      saveProgress();
      closeDialog(false);
      showToast("Local progress has been reset.");
      renderSettings();
    }
  }

  function handleSetting(event) {
    const input = event.target.closest("[data-setting]");
    if (!input) return;
    const key = input.dataset.setting;
    let value = input.type === "checkbox" ? input.checked : input.value;
    if (["sessionLength"].includes(key)) value = Number(value);
    if (["narrationRate", "musicVolume"].includes(key)) value = Number(value);
    state.settings[key] = value;
    saveSettings();
    if (key === "narrationRate") document.querySelector("#rate-output").textContent = `${Math.round(value * 100)}%`;
    if (key === "musicVolume") {
      if (musicPlayer) musicPlayer.volume = songVolume();
      const output = document.querySelector("#volume-output");
      if (output) output.textContent = `${Math.round(songVolume() * 100)}%`;
    }
    announce("Setting saved.");
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("change", handleSetting);
  document.addEventListener("input", (event) => {
    const input = event.target.closest("input[type='range'][data-setting]");
    if (input) handleSetting(event);
  });

  window.addEventListener("popstate", (event) => {
    const screen = event.state?.screen || routeFromHash();
    state.screen = screen;
    stopMusic(false);
    stopSpeech();
    render();
    requestAnimationFrame(() => main.focus());
  });

  window.addEventListener("beforeunload", () => {
    stopMusic(false);
    stopSpeech();
  });

  applySettings();
  if (!history.state) history.replaceState({ screen: state.screen }, "", `#${state.screen}`);
  render();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
})();

