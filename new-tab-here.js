function open_new_tab(at) {
  //let active_tab = browser.tabs.getCurrent();
  let active_tab = browser.tabs.query({active: true, currentWindow: true});
  console.log(active_tab);
  active_tab.then(
  (active_tab) => {
    var active_tab = active_tab[0];
    if (active_tab == null) {
      console.log("Active tab is null");
      //console.log(active_tab);
      return;
    }
    let here = active_tab.index + at;
    let new_tab_settings = {
      active: true,
      index: here,
    };

    browser.tabs.create(new_tab_settings);
  },
  (error) => { console.log(error); });
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

//function load_extension() {
function new_tab_listener() {
  // Create the shortcut listener
  document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
      if (event.key == '<') { open_before(); }
      if (event.key == '>') { open_after(); }
    }
  }, false);
}

//document.addEventListener("DOMContentLoaded", load_extension);

//browser.commands.onCommand.addListener(open_before, "open-tab-before");
//browser.commands.onCommand.addListener(open_after, "open-tab-after");

browser.commands.onCommand.addListener((command) => {
  if (command == 'open-tab-before') { console.log(command); open_before(); }
});
browser.commands.onCommand.addListener((command) => {
  if (command == 'open-tab-after') { console.log(command); open_after(); }
});

//browser.commands.onCommand.addListener(new_tab_listener, "open-tab-before");
//browser.commands.onCommand.addListener(new_tab_listener, "open-tab-after");
