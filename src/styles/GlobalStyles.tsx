import { Global, css } from '@emotion/react';

const globalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      'Pretendard',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100%;
    max-width: 430px;
    margin: 0 auto;
    position: relative;
    background-color: white;
  }

  body {
    background-color: #f5f5f5;
    line-height: 1.5;
    word-break: keep-all;
    word-wrap: break-word;
  }

  html.wf-loading * {
    opacity: 0;
  }

  html.wf-active *,
  html.wf-inactive * {
    opacity: 1;
    transition: opacity 0.1s ease-out;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  ul,
  ol {
    list-style: none;
  }
`;

export function GlobalStyles() {
  return <Global styles={globalStyles} />;
}
