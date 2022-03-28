// @ts-nocheck
const cssClasses = {
  NAVIGATION_WRAPPER: 'navigation-wrapper',
  FIXED_NAVIGATION_WRAPPER: 'fixed-navigation-wrapper',
  YEAR_NAVIGATION: 'year-navigation',
  FIXED_YEAR_NAVIGATION: 'fixed-year-navigation',
  MENU: 'menu',
  FIXED_MENU: 'fixed-menu',
  MENU_ITEM: 'menuitem',
  MENU_ITEM_LINK: 'sectionLink',
  CHROME_LOGO: 'chrome-logo',
  YEAR_SECTION: 'inner-card',
  HIDE_NAVIGATION: 'hide-navigation',
  SECTION_2022: 'section2022',
  SECTION_2008: 'section2008',
  SCROLL_SECTION: 'scroll-section',
  BACK_TO_TOP: 'back-to-top',
  HERO_SECTION: 'hero-section',
  CARD_SECTION: 'card-section',
  FOOTER_TOP_SECTION: 'footer-top-section',
};
const imgBaseUrl = 'https://wd.imgix.net/image/H2WDdWf5aPXOtVabf53xIxMJyTF2/';
const chromeLogoVersions = {
  2008: '6Zok8fOGKlKnPmmA3BNM.png',
  2009: '6Zok8fOGKlKnPmmA3BNM.png',
  2010: '6Zok8fOGKlKnPmmA3BNM.png',
  2011: 'AkT3tMmLmIlEphta9Zv0.png',
  2012: 'AkT3tMmLmIlEphta9Zv0.png',
  2013: 'AkT3tMmLmIlEphta9Zv0.png',
  2014: '03FZEfj2hitsD2V7kSGz.png',
  2015: '03FZEfj2hitsD2V7kSGz.png',
  2016: '03FZEfj2hitsD2V7kSGz.png',
  2017: '03FZEfj2hitsD2V7kSGz.png',
  2018: '03FZEfj2hitsD2V7kSGz.png',
  2019: '03FZEfj2hitsD2V7kSGz.png',
  2020: '03FZEfj2hitsD2V7kSGz.png',
  2021: '03FZEfj2hitsD2V7kSGz.png',
  2022: 'ln27L4WEXP4h01jLfNBc.png',
};
class Slider {
  constructor() {
    this.currentIndex = 0;
    this.previousIndex = 0;
    this.initialize();

    const preFooterSection = document.querySelector(
      `.${cssClasses.FOOTER_TOP_SECTION}`
    );
    const yearNav = document.querySelector(`.${cssClasses.NAVIGATION_WRAPPER}`);
    const observer = new IntersectionObserver(entries => {
      entries.map(entry => {
        if (entry.isIntersecting) {
          yearNav.classList.add(cssClasses.HIDE_NAVIGATION);
        } else {
          yearNav.classList.remove(cssClasses.HIDE_NAVIGATION);
        }
      });
    });

    observer.observe(preFooterSection);
  }
  initialize() {
    const scrollToFristSec = document.querySelector(
      `.${cssClasses.SCROLL_SECTION}`
    );
    const scrollToTopSec = document.querySelector(`.${cssClasses.BACK_TO_TOP}`);
    window.addEventListener('load', event => {
      const yearTimeline = gsap.timeline();
      yearTimeline.add(this.startup());
      yearTimeline.add(this.scrollSections());
      yearTimeline.add(this.clickNavLink());
      yearTimeline.add(this.handleTab());
    });
    scrollToFristSec.addEventListener('click', e => {
      e.preventDefault();
      const firstSec = document.querySelector(`#${cssClasses.SECTION_2008}`);
      gsap.to(window, {
        scrollTo: firstSec,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    });
    scrollToTopSec.addEventListener('click', e => {
      e.preventDefault();
      const firstSec = document.querySelector(`.${cssClasses.HERO_SECTION}`);
      gsap.to(window, {
        scrollTo: firstSec,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    });
  }
  startup() {
    const yearNavigationTimeline = gsap.timeline({
      id: 'Loading year navigation',
      defaults: {duration: 0.9},
    });
    yearNavigationTimeline.from(`.${cssClasses.YEAR_NAVIGATION}`, {
      autoAlpha: 0,
      y: 1000,
    });
    yearNavigationTimeline.from(
      `.${cssClasses.MENU_ITEM}`,
      {autoAlpha: 0, y: 100, stagger: 0.1, ease: 'power.out'},
      '<'
    );
    return yearNavigationTimeline;
  }
  scrollSections() {
    let oldScrollValue = 0;
    let newScrollValue = 0;
    const progressNav = document.querySelector(
      `.${cssClasses.YEAR_NAVIGATION}`
    );
    const navItem = progressNav.querySelector(`.${cssClasses.MENU}`);
    const navOffsetHeight = progressNav.offsetHeight;
    const item = navItem.querySelectorAll(`.${cssClasses.MENU_ITEM}`)[0];
    const itemHeight =
      parseInt(window.getComputedStyle(item).height) +
      parseInt(window.getComputedStyle(item).marginBottom) +
      5;
    const firstYearSection = document.querySelector(
      `.${cssClasses.CARD_SECTION}`
    );
    const chromeLogoWrapper = document.querySelector(
      `.${cssClasses.NAVIGATION_WRAPPER}`
    );
    const chromeLogo = document.querySelector(`.${cssClasses.CHROME_LOGO}`);
    gsap.utils.toArray(`.${cssClasses.YEAR_SECTION}`).forEach(section => {
      const activeSection = section.id;
      const menuitem = 'menu__'.concat(activeSection);
      const menulink = document
        .getElementById(menuitem)
        .querySelector(`.${cssClasses.MENU_ITEM_LINK}`);
      // ----create a new timeline
      const yearScrollTimeline = gsap.timeline({
        id: 'Nav Animation',
        defaults: {duration: 5},
        scrollTrigger: {
          trigger: section,
          onToggle: self => {
            newScrollValue = window.pageYOffset;
            const isActive = self.isActive;
            const activeItemIndex = self.trigger.dataset.index;

            chromeLogo.src = `${imgBaseUrl}${
              chromeLogoVersions[self.trigger.id.match(/\d+/g)[0]]
            }`;
            chromeLogo.srcset = `${imgBaseUrl}${
              chromeLogoVersions[self.trigger.id.match(/\d+/g)[0]]
            }`;
            if (oldScrollValue < newScrollValue) {
              if (isActive) {
                this.currentIndex = activeItemIndex;
                if (this.currentIndex > this.previousIndex) {
                  navItem.style.top = `${
                    navOffsetHeight / 2 -
                    (navOffsetHeight * 10) / 100 -
                    this.currentIndex * itemHeight
                  }px`;
                }
              } else {
                this.previousIndex = activeItemIndex;
              }
            } else if (oldScrollValue > newScrollValue) {
              if (isActive) {
                this.currentIndex = activeItemIndex;
                if (this.currentIndex < this.previousIndex) {
                  navItem.style.top = `${
                    navOffsetHeight / 2 -
                    (navOffsetHeight * 10) / 100 -
                    this.currentIndex * itemHeight
                  }px`;
                }
              } else {
                this.previousIndex = activeItemIndex;
              }
            }
            oldScrollValue = newScrollValue;
          },
          start: 'top 20%',
          end: '50%',
          onUpdate: () => {
            if (window.pageYOffset >= firstYearSection.offsetTop) {
              progressNav?.classList.add(cssClasses.FIXED_YEAR_NAVIGATION);
              navItem?.classList.add(cssClasses.FIXED_MENU);
              chromeLogoWrapper?.classList.add(
                cssClasses.FIXED_NAVIGATION_WRAPPER
              );
            } else {
              progressNav?.classList.remove(cssClasses.FIXED_YEAR_NAVIGATION);
              navItem?.classList.remove(cssClasses.FIXED_MENU);
              chromeLogoWrapper?.classList.remove(
                cssClasses.FIXED_NAVIGATION_WRAPPER
              );
            }
          },
          toggleActions: 'play reverse play reverse',
        },
      });

      yearScrollTimeline.to(menulink, {duration: 0.5, scale: '2.5'}, '>');

      return yearScrollTimeline;
    });
  }
  clickNavLink() {
    gsap.utils.toArray(`.${cssClasses.MENU_ITEM_LINK}`).forEach(item => {
      const activeSection = item.getAttribute('href');
      item.addEventListener('click', function (e) {
        e.preventDefault();
        this.previousIndex = item.dataset.index;
        gsap.to(window, {duration: 1, scrollTo: activeSection});
      });
    });
  }
  handleTab() {
    gsap.utils.toArray(`.${cssClasses.MENU_ITEM_LINK}`).forEach(item => {
      item.addEventListener('keyup', event => {
        const code = event.keyCode || event.which;
        this.previousIndex = event.target.dataset.index;
        if (code === 9) {
          gsap.to(window, {
            duration: 1,
            scrollTo: `#section${event.target.dataset.section}`,
          });
        }
      });
    });
  }
}
export default new Slider();
