/* =====================================
   STAGE TOGGLE (open / close)
   ===================================== */
document.querySelectorAll('.stage-btn').forEach(stageBtn => {
  stageBtn.addEventListener('click', () => {
    const lessons = stageBtn.nextElementSibling;
    lessons.style.display =
      lessons.style.display === 'block' ? 'none' : 'block';
  });
});


/* =====================================
   NOTES DATA (STAGE 1 COMPLETE)
   ===================================== */
const notes = {

  l1: `
LESSON 1 – CSS SYNTAX & SELECTORS

• CSS rule = selector + property + value
• Element selector → p, div, h1
• Class selector (.) → most used
• ID selector (#) → unique, limited use

GOLDEN RULE:
• Styling ke liye class use karo
`,

  l2: `
LESSON 2 – COLORS & UNITS

• Hex colors (#333, #fff) most common
• rem → text ke liye best
• % → parent ke hisaab se
• vh / vw → viewport based

GOLDEN RULE:
• Text = rem
• Layout = %, fr, vw
`,

  l3: `
LESSON 3 – BOX MODEL

• Box model order:
  margin → border → padding → content
• padding & border size badha dete hain
• box-sizing: border-box size fix karta hai

GOLDEN RULE:
• Project start me
  box-sizing: border-box lagao
`,

  l4: `
LESSON 4 – DISPLAY

• block → full width leta hai
• inline → width / height ignore karta hai
• inline-block → same line + size allowed
• none → element + space dono remove

GOLDEN RULE:
• Width kaam nahi kare
  to display check karo
`,

  l5: `
LESSON 5 – OVERFLOW & VISIBILITY

• overflow: hidden → extra content chhupa deta hai
• overflow: auto → zarurat par scroll
• visibility: hidden → invisible, space rehta hai
• display: none → invisible, space bhi nahi

GOLDEN RULE:
• visibility ≠ display
`,

  l6: `
LESSON 6 – POSITIONING

• static → default, no control
• relative → move hota hai, space rehta hai
• absolute → normal flow se bahar
• absolute nearest relative parent follow karta hai
• fixed → viewport se chipak jata hai
• sticky → scroll ke baad fixed jaisa

GOLDEN RULE:
• Absolute use karo
  to parent relative hona chahiye
`,

  l7: `
LESSON 7 – Z-INDEX & STACKING CONTEXT

• z-index overlap order control karta hai
• z-index tabhi kaam karta hai jab position ho
• bigger number = upar layer
• parent ka z-index child ko limit karta hai

STACKING CONTEXT:
• position + z-index
• opacity < 1
• transform / filter

GOLDEN RULE:
• z-index issue ho
  to stacking context check karo
`
};


/* =====================================
   ELEMENT REFERENCES
   ===================================== */
const lessonButtons = document.querySelectorAll('.lesson-btn');
const notesBox = document.getElementById('notes-box');
const progressFill = document.querySelector('.progress-fill');
const completedText = document.querySelector('.summary div:nth-child(2)');
const darkToggle = document.getElementById('darkToggle');


/* =====================================
   PROGRESS STATE (AUTO + MEMORY)
   ===================================== */
const totalLessons = lessonButtons.length;
let completedLessons =
  JSON.parse(localStorage.getItem('completedLessons')) || [];


/* Restore completed lessons on reload */
completedLessons.forEach(id => {
  const btn = document.querySelector(`[data-note="${id}"]`);
  if (btn) btn.classList.add('active');
});

updateProgress();


/* =====================================
   LESSON CLICK HANDLER
   ===================================== */
lessonButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    /* Active lesson highlight */
    lessonButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    /* Show notes */
    const key = btn.getAttribute('data-note');
    notesBox.innerText = notes[key] || 'Notes not found';

    /* Update progress */
    if (!completedLessons.includes(key)) {
      completedLessons.push(key);
      localStorage.setItem(
        'completedLessons',
        JSON.stringify(completedLessons)
      );
    }

    updateProgress();
  });
});


/* =====================================
   PROGRESS UPDATE FUNCTION
   ===================================== */
function updateProgress() {
  const percent = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  progressFill.style.width = percent + '%';
  completedText.innerHTML =
    `<strong>Completed</strong><br>${percent}%`;
}


/* =====================================
   DARK MODE (SAFE + MEMORY)
   ===================================== */
if (localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark');
}

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'darkMode',
      document.body.classList.contains('dark') ? 'on' : 'off'
    );
  });
}
