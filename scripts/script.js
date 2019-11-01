
class Accordion {
  constructor(accordionId, options = {}) {
    this.accordion              = document.getElementById(accordionId);
    this.shouldCloseOtherPanels = (options.shouldCloseOtherPanels === false) ? false : true;
    this.openPanel              = options.openPanel || false;
    this.init();
  }


  /* ===========================================================================
                                    init
  =========================================================================== */


  init(){
    const self = this;


    /* ==============================
          setInitialPanel
    ============================== */


    (function setInitialPanel(){
      if (self.openPanel) {
        const buttons = self.accordion.getElementsByClassName('accordion-button');
        const buttonIndex      = self.openPanel - 1; //Convert to 0-based index.
        const panelIndex       = buttonIndex;
        const button           = buttons[buttonIndex];

        const panel = self.accordion.getElementsByClassName('panel')[panelIndex];
        panel.style.transitionProperty = "none";


        //I'm not sure why we need to force reflow here, but it works.
        setTimeout(() => { button.click(); }, 0);

        //This is kind of hacky... A Promise would probably be better.
        setTimeout(() => panel.style.transitionProperty = "all", 100);
      }
    })();


    /* ==============================
    addAccordionButtonEventListeners
    ============================== */


    (function addAccordionButtonEventListeners() {
      const accordionButtons = self.accordion.getElementsByClassName("accordion-button");

      for (let i = 0; i < accordionButtons.length; i++) {
        const accordionButton = accordionButtons[i];
        accordionButton.addEventListener("click", function(){
          const button = this;

          self.togglePanel(button);
          self.toggleActiveButton(button);

          if (self.shouldCloseOtherPanels) {
            const toggledPanel = button.nextElementSibling;
            self.closeOtherPanels(toggledPanel);
          }
        });
      }
    })();//End of IIFE
  } //End of init()


  /* ===========================================================================
                                 toggleActiveButton
  =========================================================================== */


  toggleActiveButton(button){
    button.classList.toggle("active");
  }


  /* ===========================================================================
                              closeOtherPanels
  =========================================================================== */


  closeOtherPanels(toggledPanel){
    const panels = this.accordion.getElementsByClassName('panel');
    for (let i = 0; i < panels.length; i++){
      const panel  = panels[i];
      const button = panel.previousElementSibling;
      if (panel !== toggledPanel){
        panel.style.maxHeight = null;
        button.classList.remove("active");
      }
    }
  }


  /* ===========================================================================
                                  togglePanel
  =========================================================================== */


  togglePanel(button){
    const toggledPanel = button.nextElementSibling;
    if (toggledPanel.style.maxHeight){
      toggledPanel.style.maxHeight = null;
    } else {
      toggledPanel.style.maxHeight = toggledPanel.scrollHeight + "px";
    }
  }
}//End of class Accordion


window.onload = function(){
  const accordion1 = new Accordion('accordion1', { shouldCloseOtherPanels: false });
  const accordion2 = new Accordion('accordion2', { openPanel: 1 });
}

//https://www.sitepoint.com/jquery-document-ready-plain-javascript/
// document.addEventListener("DOMContentLoaded", function(){
//   const accordion1 = new Accordion('accordion1', { shouldCloseOtherPanels: false });
//   const accordion2 = new Accordion('accordion2', { shouldCloseOtherPanels: true, openPanel: 1 });
// });
