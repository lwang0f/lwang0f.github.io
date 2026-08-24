# Website Content Guidelines

This file records the conventions used for the homepage news and research pages. Follow these patterns when adding future content so that new entries remain consistent with the existing site.

## Homepage News

### Ordering

Use one heading per month with an ISO-style `datetime` value:

```html
<h3><time datetime="YYYY-MM">Month YYYY</time></h3>
```

The default editorial rule is newest to oldest. When a requested editorial placement conflicts with the calendar order, preserve the displayed order requested by the page owner without changing the event date.

### List structure

Every month must use the same semantic list structure. The CSS supplies visible round bullets, spacing, and responsive behavior.

```html
<ul class="home-news-list">
  <li class="home-news-item">
    <p class="home-news-item__text">A concise factual news sentence in the past tense.</p>
    <figure class="home-news-photo">
      <img src="{{ base_path }}/images/example.png" alt="Descriptive alternative text" loading="lazy">
    </figure>
  </li>
</ul>
```

The photo is optional and belongs inside the same list item as the related sentence. Homepage news photos use `.home-news-photo`; its maximum display width is 340px and the image scales down to the available mobile width.

### Wording and tense

News records completed events, so use the simple past: `was admitted`, `published`, `received`, or `was recognized`. Keep each item factual and concise. Avoid first-person subjects such as `I` and `we`; use the person's name, the group, or an impersonal construction. Link related papers with a bold reference label, for example `<a href="/research/#J9"><strong>J9</strong></a>`.

## Research Figures

Use the shared figure classes on all research subpages:

```html
<figure class="research-figure research-figure--left">
  <img src="/images/example.png" alt="Descriptive alternative text" loading="lazy">
  <figcaption>What the figure shows. Source: <a href="SOURCE_URL">Publisher or resource</a>. Credit: Creator or institution.</figcaption>
</figure>
```

Use `research-figure--left` when a figure should align with the article text. Images are constrained by `max-width: 100%` so they cannot overflow on a phone. The normal figure width is 860px; a deliberately compact figure can use a page-specific modifier such as `research-figure--tomography`.

For an adapted scholarly figure, use a standard attribution sentence and make the publication reference a link:

```html
<figcaption>Example reconstruction, adapted from Author et al. (Year), <a href="/research/#J6">[J6]</a>.</figcaption>
```

Do not write `Credit: adapted from ... J6`; `J6` is a citation, not the credit itself. Credit the original creator or institution when that information is available.

## Research Page Writing

The intended audience includes undergraduate and graduate students who may be encountering the topic for the first time. Each page should move from simple to technical in this order:

1. Explain what physical system or observation the page concerns and why it matters.
2. Describe what instruments measure and what information is missing or uncertain.
3. Introduce the scientific problem in plain language before naming specialized methods.
4. Explain the relevant theory, estimator, or signal-processing method and define acronyms at first use.
5. Connect the method to real applications, limitations, and open questions.
6. End with a short list of related publications.

Prefer objective scientific language over repeated `I` or `we` statements. Technical terms are welcome after the reader has been given an intuitive explanation. The three research pages should share the same section names, figure classes, left-alignment behavior, and restrained caption style.

## Course Tables

For a large course table, keep the source CSV in `files/` with an ASCII filename and embed the complete data in a `<div class="teaching-grade-table-wrapper">`. Use the `teaching-grade-table` class so the table remains readable on desktop and can scroll horizontally on mobile. Preserve multi-row headers and original cell values; do not squeeze a wide grade sheet into a narrow responsive layout.
