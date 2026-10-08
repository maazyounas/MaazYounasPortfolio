import type { Course, CourseSlug, Lesson } from "../types";

const curriculum: Record<CourseSlug, { section: string; titles: string[] }[]> = {
  html: [
    { section: "Beginner", titles: ["Introduction to HTML", "HTML Document Structure", "HTML Headings", "Paragraphs and Text", "Links and Anchors", "Images", "Lists", "Tables", "HTML Attributes", "Div and Span", "Comments", "Semantic HTML Basics"] },
    { section: "Forms", titles: ["Introduction to Forms", "Input Elements", "Textarea, Select and Option", "Buttons", "Form Validation", "Form Attributes", "Advanced Form Controls"] },
    { section: "Media & Embedded Content", titles: ["Audio", "Video", "iframe", "Embedding External Content", "Responsive Images"] },
    { section: "Advanced", titles: ["Semantic HTML", "Accessibility Fundamentals", "ARIA Basics", "SEO-Friendly HTML", "Meta Tags", "Structured Data Basics", "HTML Best Practices", "Modern HTML Features", "Building a Complete HTML Page", "HTML Final Project"] },
  ],
  css: [
    { section: "Beginner", titles: ["Introduction to CSS", "CSS Syntax", "CSS Selectors", "Element, Class and ID Selectors", "CSS Types", "Colors", "Backgrounds", "Fonts", "Text Styling", "Borders", "Width and Height", "Units", "Margin", "Padding", "Box Model"] },
    { section: "Intermediate", titles: ["Display", "Position", "z-index", "Overflow", "Flexbox Introduction", "Flex Direction", "Justify Content", "Align Items", "Flex Wrap", "Gap", "Flex Grow", "Flex Shrink", "Flex Basis", "Align Self", "Order"] },
    { section: "Advanced Layout", titles: ["CSS Grid Introduction", "Grid Columns", "Grid Rows", "Grid Gap", "Grid Areas", "Responsive Grid", "Flexbox vs Grid", "Responsive Design", "Media Queries", "Mobile-First Design"] },
    { section: "Advanced Styling", titles: ["Transitions", "Transform", "Animations", "Keyframes", "Pseudo Classes", "Pseudo Elements", "CSS Variables", "Specificity", "Inheritance", "Advanced Selectors", "Modern CSS Features", "CSS Best Practices", "Responsive Website Project"] },
  ],
  javascript: [
    { section: "Fundamentals", titles: ["Introduction to JavaScript", "Adding JavaScript to HTML", "Variables", "let, const and var", "Data Types", "Operators", "Strings", "Numbers", "Boolean", "Type Conversion", "Conditions", "if / else", "switch", "Loops", "for Loop", "while Loop", "Functions", "Function Parameters", "Return Values", "Arrow Functions"] },
    { section: "Intermediate", titles: ["Arrays", "Array Methods", "Objects", "Object Methods", "Destructuring", "Spread Operator", "Rest Operator", "Template Literals", "Scope", "Hoisting", "Closures", "Error Handling"] },
    { section: "DOM", titles: ["Introduction to DOM", "Selecting Elements", "Changing HTML", "Changing CSS", "Events", "Event Listeners", "Forms with JavaScript", "Form Validation", "Creating Elements", "Removing Elements", "Event Delegation"] },
    { section: "Advanced JavaScript", titles: ["Asynchronous JavaScript", "Callbacks", "Promises", "async / await", "Fetch API", "Working with JSON", "REST APIs", "Local Storage", "Session Storage", "Modules", "JavaScript Classes", "Object-Oriented JavaScript", "Advanced Functions", "Modern ES Features", "JavaScript Best Practices", "Complete JavaScript Project"] },
  ],
};

function exampleFor(slug: CourseSlug, title: string): string {
  const topic = title.toLowerCase();
  if (slug === "html") {
    if (topic.includes("heading")) return "<h1>Page title</h1>\n<h2>Section title</h2>";
    if (topic.includes("paragraph") || topic.includes("text")) return "<p>Write a clear paragraph for your reader.</p>\n<strong>Emphasis</strong> and <em>stress</em>";
    if (topic.includes("link") || topic.includes("anchor")) return '<a href="/about">Learn more about us</a>';
    if (topic.includes("image")) return '<img src="photo.jpg" alt="A descriptive caption" width="640" height="420">';
    if (topic.includes("list")) return "<ul>\n  <li>First item</li>\n  <li>Second item</li>\n</ul>";
    if (topic.includes("table")) return "<table>\n  <thead><tr><th scope=\"col\">Name</th></tr></thead>\n  <tbody><tr><td>Maaz</td></tr></tbody>\n</table>";
    if (topic.includes("form") || topic.includes("input") || topic.includes("button")) return '<form>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Join</button>\n</form>';
    if (topic.includes("textarea") || topic.includes("select")) return '<label for="topic">Choose a topic</label>\n<select id="topic" name="topic"><option>HTML</option></select>';
    if (topic.includes("audio")) return '<audio controls src="lesson.mp3">Your browser does not support audio.</audio>';
    if (topic.includes("video")) return '<video controls width="640" poster="preview.jpg">\n  <source src="lesson.mp4" type="video/mp4">\n</video>';
    if (topic.includes("iframe") || topic.includes("embed")) return '<iframe title="Map showing the studio" src="https://example.com/map" loading="lazy"></iframe>';
    if (topic.includes("semantic")) return "<main>\n  <article>\n    <h1>Story title</h1>\n    <p>Article content</p>\n  </article>\n</main>";
    if (topic.includes("div") || topic.includes("span")) return '<div class="card">A block <span>with inline detail</span>.</div>';
    if (topic.includes("comment")) return "<!-- Explain why this section exists -->\n<section>Content</section>";
    if (topic.includes("meta") || topic.includes("seo")) return '<meta name="description" content="A concise page summary.">';
    return "<!doctype html>\n<html lang=\"en\">\n<head><meta charset=\"utf-8\"><title>My page</title></head>\n<body><main><h1>Hello, web</h1></main></body>\n</html>";
  }
  if (slug === "css") {
    const styles: [RegExp, string][] = [
      [/selector|element|class|id/i, ".notice {\n  color: #be123c;\n}"], [/color/i, ".notice { color: rebeccapurple; background-color: #f5f3ff; }"], [/background/i, ".hero { background: linear-gradient(120deg, #881337, #ef4444); }"], [/font|text/i, "p {\n  font-family: system-ui, sans-serif;\n  font-size: 1rem;\n  line-height: 1.6;\n}"], [/border/i, ".card { border: 1px solid #cbd5e1; border-radius: .75rem; }"], [/width|height|unit/i, ".panel { width: min(100%, 42rem); min-height: 12rem; }"], [/margin/i, ".section { margin-inline: auto; margin-block: 2rem; }"], [/padding|box model/i, ".card { box-sizing: border-box; padding: 1.5rem; }"], [/display/i, ".toolbar { display: flex; gap: 1rem; }"], [/position|z-index/i, ".badge { position: absolute; inset: 1rem 1rem auto auto; z-index: 1; }"], [/overflow/i, ".content { overflow: auto; max-height: 18rem; }"], [/flex|justify|align|order|gap/i, ".row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }"], [/grid|column|row|area/i, ".layout { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }"], [/responsive|media|mobile/i, "@media (max-width: 40rem) {\n  .layout { grid-template-columns: 1fr; }\n}"], [/transition/i, ".button { transition: transform 180ms ease; }\n.button:hover { transform: translateY(-2px); }"], [/transform/i, ".tile { transform: rotate(-2deg) scale(1.02); }"], [/animation|keyframe/i, "@keyframes arrive { from { opacity: 0; } to { opacity: 1; } }\n.card { animation: arrive 300ms ease-out; }"], [/pseudo/i, "a:hover, a:focus-visible { text-decoration: underline; }\nli::marker { color: crimson; }"], [/variable/i, ":root { --space: 1rem; }\n.card { padding: var(--space); }"], [/specificity|inherit|advanced selector/i, ".menu > li + li { margin-inline-start: 1rem; }"],
    ];
    return styles.find(([pattern]) => pattern.test(topic))?.[1] ?? ".card {\n  padding: 1.5rem;\n  border-radius: 1rem;\n  background: #f1f5f9;\n  color: #0f172a;\n}";
  }
  const snippets: [RegExp, string][] = [
    [/variable|let, const|data type|boolean|number|string/i, 'const course = "JavaScript";\nconst lessonCount = 59;\nconsole.log(course, lessonCount);'], [/operator|conversion/i, 'const total = Number("12") + 3;\nconsole.log(total);'], [/condition|if|switch/i, 'const score = 82;\nif (score >= 70) {\n  console.log("Passed");\n} else {\n  console.log("Keep practicing");\n}'], [/loop|for loop|while loop/i, 'for (let step = 1; step <= 3; step += 1) {\n  console.log(`Step ${step}`);\n}'], [/function|arrow|parameter|return|advanced function/i, 'const greet = (name) => `Hello, ${name}!`;\nconsole.log(greet("Sam"));'], [/array|spread|rest|destruct/i, 'const topics = ["HTML", "CSS"];\nconst nextTopics = [...topics, "JavaScript"];\nconsole.log(nextTopics);'], [/object|class|oriented/i, 'const learner = { name: "Sam", completed: 2 };\nconsole.log(learner.name);'], [/scope|hoist|closure/i, 'function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst count = makeCounter();\nconsole.log(count());'], [/error|try/i, 'try {\n  JSON.parse("not json");\n} catch (error) {\n  console.log("Could not read the data");\n}'], [/dom|select|html|css|element|event|listener|form|validation/i, 'const button = document.querySelector("button");\nbutton?.addEventListener("click", () => {\n  document.querySelector("h1").textContent = "Updated";\n});'], [/async|promise|fetch|api|json|callback/i, 'async function loadData() {\n  const response = await fetch("/api/items");\n  const items = await response.json();\n  console.log(items);\n}'], [/storage/i, 'localStorage.setItem("theme", "dark");\nconst theme = localStorage.getItem("theme");'], [/module/i, 'export function add(a, b) {\n  return a + b;\n}'],
  ];
  return snippets.find(([pattern]) => pattern.test(topic))?.[1] ?? 'const message = "Hello, web!";\nconsole.log(message);';
}

const makeLessons = (slug: CourseSlug): Lesson[] => curriculum[slug].flatMap(({ section, titles }) => titles).map((title, index) => ({
  id: index + 1,
  title,
  section: curriculum[slug].find(({ titles }) => titles.includes(title))?.section ?? "Course",
  summary: `${title} is an important part of building modern websites. Learn the core ideas, understand when to use them, and apply them in a small, practical example.`,
  example: exampleFor(slug, title),
  practice: `Create a small example that demonstrates ${title.toLowerCase()}. Explain what each part does, then make one thoughtful improvement of your own.`,
}));

export const courses: Record<CourseSlug, Course> = {
  html: { slug: "html", title: "HTML", subtitle: "Build the structure of the web", description: "Learn HTML from the fundamentals to semantic, accessible and search-friendly page structures. This guided course takes you from your first document to a complete project.", difficulty: "Beginner to advanced", duration: "8–10 hours", skills: ["Document structure", "Semantic elements", "Forms", "Media", "Accessibility", "SEO"], outcomes: ["Build well-structured web pages", "Choose meaningful semantic elements", "Create accessible forms and media", "Apply practical accessibility and SEO foundations"], lessons: makeLessons("html") },
  css: { slug: "css", title: "CSS", subtitle: "Style and lay out the web", description: "Learn CSS from basic styling through responsive layouts, Flexbox, Grid, transitions and modern CSS techniques by building practical interfaces.", difficulty: "Beginner to advanced", duration: "12–15 hours", skills: ["Selectors", "Box model", "Flexbox", "Grid", "Responsive design", "Animation"], outcomes: ["Style readable, consistent interfaces", "Build layouts with Flexbox and Grid", "Adapt pages to different screen sizes", "Use motion and modern CSS thoughtfully"], lessons: makeLessons("css") },
  javascript: { slug: "javascript", title: "JavaScript", subtitle: "Bring websites to life", description: "Learn JavaScript from fundamentals to DOM programming, asynchronous code, APIs and modern language features through a structured project-based path.", difficulty: "Beginner to advanced", duration: "16–20 hours", skills: ["Programming fundamentals", "DOM", "Events", "Async JavaScript", "APIs", "Modern ES"], outcomes: ["Write clear JavaScript programs", "Build interactive browser experiences", "Work with asynchronous data and APIs", "Organize code with modern language features"], lessons: makeLessons("javascript") },
};

export const courseList = Object.values(courses);
export function getCourse(slug: string): Course | undefined {
  return Object.prototype.hasOwnProperty.call(courses, slug) ? courses[slug as CourseSlug] : undefined;
}
