/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 *
 */
export function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function generateHtmlCode() {
  return `<main>
  <h1>Hello world</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam libero velit, euismod sed eros eget, porttitor auctor ante. Morbi finibus nunc non mollis vehicula.</p>

  <blockquote>Praesent ultrices sapien mi, at fringilla odio auctor at. Vestibulum quis eros dapibus enim tristique dictum.</blockquote>

  <p>Ut vitae ex porta, rhoncus felis in, dignissim erat. Nulla est felis, consectetur ac mauris sit amet, venenatis posuere odio. Pellentesque purus lectus, fermentum at elit vitae, aliquam pharetra lectus. Curabitur lacus orci, bibendum eu scelerisque eu, congue sed lacus. Cras non nisl ante. Nullam ullamcorper odio diam, at dapibus diam interdum sed. Aliquam ut tortor at nunc vulputate volutpat eget ac est. Nullam ligula magna, tempor congue fringilla a, semper blandit odio. Suspendisse at laoreet est, nec ultrices magna.</p>

  <ul>
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
    <li>Ut vulputate metus non ante tincidunt posuere.</li>
    <li>Maecenas tempus dui ac porttitor pharetra.</li>
    <li>In id risus semper, semper risus ac, tempus enim.</li>
  </ul>

  <p>Integer at ex at ex porta fringilla. Aenean vel sagittis mi. Mauris vel diam eget ipsum varius gravida. Maecenas luctus, quam at mollis viverra, enim lacus fringilla turpis, sed eleifend dui neque vitae lectus.</p>

  <ol>
    <li>One.</li>
    <li>Two.</li>
    <li>Three.</li>
    <li>Four.</li>
  </ol>


  <p>Praesent ultrices sapien mi, at fringilla odio auctor at. Vestibulum quis eros dapibus enim tristique dictum. Phasellus urna nibh, dapibus in gravida nec, accumsan quis sapien. Maecenas feugiat semper mi suscipit tincidunt. Aliquam ut urna in nisl ornare suscipit. Sed eget maximus nulla. Morbi nec venenatis justo, ut ullamcorper odio. Curabitur consequat eget magna quis condimentum. Pellentesque scelerisque, Sed lacus ligula, sagittis vel tempus ac, tempus a dui. </p>
</main>`;
}

export function generateCssCode() {
  return `body {
    background-color: #f1f1f1;
    color: #222;
    font-family: Georgia, serif;
  }
  
  @media (max-width: 500px) {
    body {
      font-size: 0.875rem;
    }
  }
  
  main {
    margin: 0 auto;
    max-width: 65ch;
  }
  
  h1 {
    text-decoration: underline;
    text-decoration-color: hotpink;
    text-decoration-thickness: 5px;
  }		
  
  blockquote {
    font-size: 1.2rem;
    font-style: italic;
  }
  blockquote::before {
    content: "\"";
  }
  blockquote::after {
    content: "\"";
  }`;
}

export function generateJsCode() {
  return `document.write("<p>Anothe paragraph injected by JavaScript.</p>");`;
}

export function generateFileName() {
  const now = new Date();

  return `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.html`;
}
