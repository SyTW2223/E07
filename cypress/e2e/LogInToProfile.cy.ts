it("visits the app root url", () => {
  cy.visit("http://127.0.0.1:5173/E07/");
});

describe("Visual Tests", () => {
  it("snackbar should pop up with logged out message", () => {
    cy.get('[data-testid="snackbar"]').contains("You need to be logged in");
  });
  it("should render logo image", () => {
    cy.get('[data-testid="login-logo"]')
      .find("img")
      .should("have.attr", "src")
      .should("include", "logo.png");
  });
  it("should render form", () => {
    cy.get('[data-testid="login-form"]').should("be.visible");
  });
  it("login button should be disabled", () => {
    cy.get('[data-testid="login-button"]').should("be.disabled");
  });
});

describe("Input Tests", () => {
  it("writing an invalid email", () => {
    cy.get('[data-testid="login-email-field"]').type("test@test.test");
    cy.get('[data-testid="login-email-field"]').get("input").clear();
  });
  it("login button should be disabled", () => {
    cy.get('[data-testid="login-button"]').should("be.disabled");
  });
  it("writing an invalid password", () => {
    cy.get('[data-testid="login-password-field"]').type("Test123456");
    cy.get('[data-testid="login-password-field"]').get("input").clear();
  });
  it("login button should be disabled", () => {
    cy.get('[data-testid="login-button"]').should("be.disabled");
  });

  it("writing a correct email", () => {
    cy.get('[data-testid="login-email-field"]').type("test@test.test");
  });
  it("writing a correct password", () => {
    cy.get('[data-testid="login-password-field"]').type("Test123456");
  });
  it("login button should be enabled", () => {
    cy.get('[data-testid="login-button"]').should("be.enabled");
  });
  it("moving to home", () => {
    cy.get('[data-testid="login-button"]').click();
  });
});

describe("Home tests", () => {
  it("moving to profile", () => {
    cy.get('[data-testid="top-navbar-profile"]').click();
  });
});

describe("Profile tests", () => {
  it("username must be 'test'", () => {
    cy.get('[data-testid="profile-user-name"]').should("contain.text", "test");
  });
  it("pfp must be the default one and rendered", () => {
    cy.get('[data-testid="profile-user-name"]').should("contain.text", "test");
  });
  it("should render logo image", () => {
    cy.get('[data-testid="profile-user-pfp"]')
      .find("img")
      .should("have.attr", "src")
      .should("include", "logo_without_letters");
  });
});
