function open_new_tab(at) {
  let active_tab = tabs.getCurrent();
  let here = active_tab.index + at;
  let new_tab_settings = {
    active: true,
    index: here,
  };
  tabs.create(new_tab_settings);
}

// Open new tab after the current active tab
function open_after() {
  open_new_tab(1);
}

// Open new tab before the current active tab
function open_before() {
  open_new_tab(-1);
}

//
// Main
//

function load_extension() {
  // Create the shortcut listener
  document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
      if (event.key == '<') { open_before(); }
      if (event.key == '>') { open_after(); }
    }
  }, false);
}

document.addEventListener("DOMContentLoaded", load_extension);
