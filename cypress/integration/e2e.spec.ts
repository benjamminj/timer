describe("End-to-end", () => {
  const timers = [
    ["02:12:12", "/timers/1"],
    ["02:04:04", "/timers/2"],
    ["Named Timer!", "/timers/3"],
    ["00:01:01", "/timers/4"],
  ];

  beforeEach(() => {
    cy.server();
  });

  describe("Timers list page", () => {
    it("displays a list of all created timers", () => {
      cy.visit("/");

      cy.contains("All timers").should("exist");

      cy.wrap(timers).each(([$name, $url]: [string, string]) => {
        cy.contains($name).should("have.attr", "href", $url);
      });
    });

    it("allows clicking into a timer", () => {
      cy.visit("/");
      const [$name, $href] = timers[0];

      cy.contains($name).click();
      cy.url().should("contain", $href);
    });
  });

  describe("Individual timer page", () => {
    it("displays the timer", () => {
      cy.visit("/timers/1");
      cy.contains("02:12:12");
    });

    it("should allow running the timer", () => {
      cy.visit("/timers/5");
      cy.contains("00:00:05").should("exist");

      cy.clock();
      cy.contains("Start").click();

      cy.contains("Pause").should("exist");
      cy.contains("Reset").should("exist");

      const ticks = [
        "00:00:04",
        "00:00:03",
        "00:00:02",
        "00:00:01",
        "00:00:00",
      ];

      cy.wrap(ticks).each(($tick: string) => {
        cy.tick(1000);
        cy.contains($tick).should("exist");
      });

      cy.contains("Tada! 🔥").should("exist");
      cy.contains("Reset").should("exist");
    });

    it("should allow pausing the timer", () => {
      cy.visit("/timers/5");
      cy.clock();
      cy.contains("Start").click();
      cy.tick(3000);
      cy.contains("Pause").click();
      cy.contains("00:00:02").should("exist");
      cy.tick(1000);
      cy.contains("00:00:02").should("exist");
      cy.contains("Resume").click();
      cy.tick(1000);
      cy.contains("00:00:01").should("exist");
    });
  });

  describe("Create a timer", () => {
    it.only("allows creating a timer", () => {
      cy.visit("/new");

      cy.contains("Hours").click();
      cy.focused().type("2");

      cy.contains("Minutes").click();
      cy.focused().type("3");

      cy.contains("Seconds").click();
      cy.focused().type("5");

      cy.contains(/^Create$/).click();
      cy.url().should("contain", "timers");
      cy.contains("02:03:05").should("exist");
    });
  });
});
