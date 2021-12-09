// ChallengeBar.js
// Taken from Lab 7

/**
 * Creates recipe card and appends it to the main page.
 * @param {json} data The json containing the data to create the card.
 */
class ChallengeBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    if (!data) return;

    const challenge = document.createElement('article');
    const style = document.createElement('style');

    style.innerHTML = `
      h3 {
        font-family: 'Mochiy Pop P One', sans-serif;
        cursor: pointer;
      }

      .progress {
        width: 100%;
        background-color: var(--ec-white);
        border-radius: 20px
      }

      .my-bar {
        width: 0%;
        height: 30px;
        background-color: var(--ec-spicy5);
        text-align: center;
        line-height: 30px;
        color: black;
        border-radius: 388px;
      }

      .challenge-badge {
        height: 45px;
        width: 45px;
        display: inline;
        position: relative;
        margin-left: 10px;
        margin-bottom: -10px;
         
      }

      @media (prefers-color-scheme: dark) {

        h3 {
          color: var(--font-color);
        }

        .progress {
          background-color: var(--border-color);
        }

        .my-bar {
          background-color: rgb(202, 85, 7);
          color: var(--bg-color-red);
        }
      }
    `;

    const elem = document.createElement('div');
    elem.classList.add('challenge-bar');

    const title = document.createElement('h3');
    title.classList.add('challenge-title');
    title.innerText = data.title;
    elem.appendChild(title);

    const badge = document.createElement('img');
    badge.classList.add('challenge-badge')
    badge.src = data.icon;
    title.appendChild(badge);

    const progress = document.createElement('div');
    progress.classList.add('progress');
    const bar = document.createElement('div');
    bar.classList.add('my-bar');
    progress.appendChild(bar);
    elem.appendChild(progress);

    const width = Math.round((data.numberCompleted / data.total) * 100);
    const id = setInterval(frame, 10);
    /**
     * Sets the interval for the progress bar
     */
    function frame() {
      if (width > 100) {
        clearInterval(id);
      } else {
        bar.style.width = `${width}%`;
        bar.innerHTML = `${width}%`;
      }
    }

    challenge.append(elem);
    this.shadowRoot.append(style, elem);
  }
}

customElements.define('challenge-bar', ChallengeBar);
