
// ASIDE IS ACESSIBILITY CHECKED AND ALL GOOD, only todo left and render info

const toggleSidebarBtn = document.getElementById(
  "sidebar-toggle",
) as HTMLButtonElement;
const sidebarRoot = document.getElementById("sidebar-root") as HTMLElement;

if (
  toggleSidebarBtn instanceof HTMLButtonElement &&
  sidebarRoot instanceof HTMLElement
) {
  // TODO: fix toggle sidebar når isloggedin finksjonen er klar
  const isloggedin = true;
  toggleSidebarBtn.hidden = !isloggedin;
  if (!isloggedin) sidebarRoot.hidden = true;

  const setOpen = (open: boolean): void => {
    sidebarRoot.dataset.open = String(open)
    toggleSidebarBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      sidebarRoot.querySelector<HTMLElement>("button, a, [tabindex]")?.focus();
    } else {
      toggleSidebarBtn.focus();
    }
  };
  toggleSidebarBtn.addEventListener("click", () => {
    setOpen(toggleSidebarBtn.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = toggleSidebarBtn.getAttribute("aria-expanded") === "true";
    if (
      event.key === "Escape" &&
      isOpen &&
      !toggleSidebarBtn.hidden 
    ) {
      setOpen(false);
    }
  });

  document.addEventListener("click", (e) => {
    const isOpen = toggleSidebarBtn.getAttribute("aria-expanded") === "true";
    const target = e.target
    if(isOpen &&
      target instanceof Node &&
      !sidebarRoot.contains(target) &&
      !toggleSidebarBtn.contains(target)
    ){
      setOpen(false)
    }
  } )
  renderSidebar(sidebarRoot)
}

function renderSidebar(sidebarRoot: HTMLElement): void {

  const balanceSection = document.createElement("section");
  balanceSection.setAttribute("aria-labelledby", "balance-heading");
  balanceSection.classList.add(
    "content-container",
    "divide-y",
    "divide-line-light",
  );

  const balanceHeading = document.createElement("h2");
  balanceHeading.id = "balance-heading";
  balanceHeading.textContent = "Your credit balance";
  balanceHeading.classList.add("sub-heading");

  const creditBalance = document.createElement("p");
  creditBalance.textContent = "1000,-";
  // TODO: hvis den oppdaterer seg oftere enn full page reload så må den ha linjen under, da leser den opp det nye tallet uten å skifte fokus
  // creditBalance.setAttribute("role", "status")
  creditBalance.classList.add("text-3xl", "font-bold", "text-center");

  balanceSection.append(balanceHeading, creditBalance);

  const sidebarListDiv = document.createElement("div");
  sidebarListDiv.classList.add(
    "content-container",
    "divide-y",
    "divide-line-light",
    "min-h-100",
  );

  const listHeading = document.createElement("h2");
  listHeading.id = "list-heading";
  listHeading.textContent = "Your active bids";
  listHeading.classList.add("sub-heading");

  const listDiv = document.createElement("div");
  listDiv.setAttribute("aria-labelledby", "list-heading");
  listDiv.textContent = "No bids yet";

  sidebarListDiv.append(listHeading, listDiv);
  sidebarRoot.append(balanceSection, sidebarListDiv);
}


