function blur(elem) {
  let event = new FocusEvent('blur');
  elem.dispatchEvent(event);
}

export {blur};
