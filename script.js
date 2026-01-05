/* TOGGLE STAGES */
document.querySelectorAll('.stage-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lessons = btn.nextElementSibling;
    lessons.style.display =
      lessons.style.display === 'block' ? 'none' : 'block';
  });
});

/* NOTES DATA */
const notes = {
  l1: "CSS syntax, element / class / id selectors",
  l2: "Box model: margin, border, padding, content",
  l3: "Display: block, inline, inline-block, none",
  l4: "Overflow & visibility handling",
  l5: "Position: relative, absolute, fixed, sticky",

  l6: "Flex container, main axis, cross axis",
  l7: "justify-content & align-items",

  l8: "Grid columns, rows, fr unit",
  l9: "Grid areas & line numbers",

  l10: "Media queries basics",
  l11: "Responsive flex & grid layouts",

  l12: "Font-family, rem, hierarchy",
  l13: "Line-height & spacing",

  l14: "Primary, text, background, surface colors",
  l15: "Borders, radius, shadow, hover & focus"
};

/* ELEMENTS */
const lessonBtns = document.querySelectorAll('.lesson-btn');
const notesBox = document.getElementById('notes-box');
const progressFill = document.querySelector('.progress-fill');

/* PROGRESS */
const total = lessonBtns.length;
let completed = JSON.parse(localStorage.getItem('completed')) || [];

lessonBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.note;
    notesBox.innerText = notes[key];

    if (!completed.includes(key)) {
      completed.push(key);
      localStorage.setItem('completed', JSON.stringify(completed));
    }

    updateProgress();
  });
});

function updateProgress() {
  const percent = Math.round((completed.length / total) * 100);
  progressFill.style.width = percent + '%';
}

/* DARK MODE */
const darkToggle = document.getElementById('darkToggle');

if (localStorage.getItem('dark') === 'on') {
  document.body.classList.add('dark');
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem(
    'dark',
    document.body.classList.contains('dark') ? 'on' : 'off'
  );
});

updateProgress();

