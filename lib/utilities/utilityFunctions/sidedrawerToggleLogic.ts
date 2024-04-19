export const DashboardSideDrawerToggleLogic = () => {
  const sideMenu = document.querySelector("aside") as HTMLElement;
  const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement;
  const closeBtn = document.getElementById("close-btn") as HTMLButtonElement;

  if (sideMenu === null) {
    return;
  }

  menuBtn.addEventListener("click", () => {
    sideMenu.style.display = "block";
    sideMenu.style.transform = "translateX(0%)";
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.style.transform = "translateX(-100%)";
  });
};

export const ShowSideDrawerForLargeScreens = () => {
  //* if window size is above 768px then style="display: block; transform: translateX(0%);" to aside
  addEventListener("resize", () => {
    const sideMenu = document.querySelector("aside") as HTMLElement;
    if (sideMenu === null) {
      return;
    }

    if (window.innerWidth > 1200) {
      sideMenu.style.display = "block";
      sideMenu.style.transform = "translateX(0%)";
    }
    if (window.innerWidth < 1200) {
      sideMenu.style.display = "none";
      sideMenu.style.transform = "translateX(-100%)";
    }
  });
};
