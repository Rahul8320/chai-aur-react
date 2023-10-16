function customRender(element, container) {
  const domElement = document.createElement(element.type);
  domElement.innerHTML = element.children;

  for (const [key, value] of Object.entries(element.props)) {
    if (key === "children") continue;

    domElement.setAttribute(key, value);
  }

  container.appendChild(domElement);
}

const reactElement = {
  type: "a",
  props: {
    href: "https://youtube.com/@chaiaurcode",
    target: "_blank",
  },
  children: "Click here to visit chai aur code",
};

const mainContainer = document.getElementById("root");
customRender(reactElement, mainContainer);
