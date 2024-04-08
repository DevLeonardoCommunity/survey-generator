# Survey Generator

_What's the best way to test a form library if not creating a dynamic form that generates dynamic forms? 🧠_

A side project to have fun and experiment with [TanStack Form](https://tanstack.com/form/latest) and [shadcn/ui](https://ui.shadcn.com/).

## Contributing

This is not **my** side project, it's **our** side project. I'm happy to accept suggestions and contributions if you want to learn with me, or a star ⭐️ to spread the word.

## Roadmap

I'll keep [Issue #1](https://github.com/Balastrong/survey-generator/issues/1) updated with an outline of what I'd like to see here.

A high-level overview of the project:

- "Create survey" page to create surveys
  - A Survey has a title and a list of questions
  - Questions can be any number and of any type
  - Types include text, number, radio, checkbox, select, date, etc.
  - Save button
- "Take survey" page to take surveys
  - Survey is generated dynamically
  - A user can take a survey
  - A user can see the results of a survey

Let's stick with `localStorage` because I'm too lazy to set up a database and it's out of scope as of today, but at some point it will be nice.

Oh and why not, adding some tests could be fun! 🧪

## Running the project

No special instructions needed!

```bash
npm install
npm run dev
```

and you're good to go!
