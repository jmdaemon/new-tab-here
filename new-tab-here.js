async function open_new_tab(at) {
  let active_tab = (await browser.tabs.query({active: true, currentWindow: true}))[0];
  if (active_tab == null)
    throw Error("[New Tab Here]: No active tab selected.");

  let here = active_tab.index + at;
  let new_tab_settings = {
    active: true,
    index: here,
  };

  browser.tabs.create(new_tab_settings);
}

// Open new tab after the current active tab
function open_after() { open_new_tab(1); }

// Open new tab before the current active tab
function open_before() { open_new_tab(-1); }

// Main

const commands = {
  'open-tab-before': open_before,
  'open-tab-after': open_after,
};

function main() {
  for (const [name, callback] of Object.entries(commands))
    browser.commands.onCommand.addListener((command) => { if (command == name) callback(); });
}

main();
