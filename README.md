# Frontend Mentor - Frontend quiz app solution

This is a solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Frontend quiz app solution](#frontend-mentor---frontend-quiz-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [AI Collaboration](#ai-collaboration)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark

### Screenshot

![Screenshot](/assets/images/Screenshot.png)

### Links

- Solution URL: [Frontend Mentor solution](https://github.com/arne-witteler/frontend-quiz-app)
- Live Site URL: [Live demo](https://frontend-quiz-app-ruby.vercel.app)

## My process

### Built with


- Semantic HTML5  
- CSS custom properties (design system with variables)  
- Flexbox & CSS Grid  
- Mobile-first workflow  
- Vanilla JavaScript (DOM manipulation, state handling)  
- Local JSON data 

### What I learned

This project helped me deepen my understanding of **state management without frameworks** and building fully interactive UI with vanilla JavaScript.

Key learnings:

- Managing quiz state (current question, score, selected answer)
- Structuring UI updates with reusable functions
- Handling conditional UI states (selected, correct, incorrect)
- Implementing a **dark mode using CSS variables**
- Dynamically rendering content from JSON

Example (dynamic answer rendering):

```js
questionData.options.forEach((option, index) => {
  const btn = document.createElement('button');
  btn.className = 'quiz__button';

  btn.innerHTML = `
    <div class="quiz__button-icon-wrapper">
      <span>${letters[index]}</span>
    </div>
    <p class="quiz__button-text">${option}</p>
  `;

  btn.addEventListener('click', () => {
    selectedAnswer = option;
  });

  optionsContainer.appendChild(btn);
});
```

### Continued development

In future projects, I want to focus on:
- Improving accessibility (ARIA roles, screen reader support)
- Better keyboard navigation patterns
- Adding subtle animations (transitions between questions)
- Refactoring into reusable components (possibly with a framework like React)
- Improving code structure (modular JS)

### AI Collaboration

I used ChatGPT during this project as a development assistant

How I used it:
- Debugging JavaScript issues
- Structuring logic (quiz flow, state handling)
- Improving CSS architecture (dark mode with variables)
- Refining UI behavior and edge cases

## Author

- Frontend Mentor - [@arne-witteler](https://www.frontendmentor.io/profile/arne-witteler)