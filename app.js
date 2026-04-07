const guests = window.womenInQuantumData || [];
const GROUPS = [
  { id: "women-in-quantum", gridId: "women-portrait-grid" },
  { id: "impact-quantum", gridId: "impact-portrait-grid" }
];

const portraitGrids = Object.fromEntries(
  GROUPS.map((group) => [group.id, document.getElementById(group.gridId)])
);
const detailEmpty = document.getElementById("detail-empty");
const featureCard = document.getElementById("feature-card");
const featureName = document.getElementById("feature-name");
const featureRole = document.getElementById("feature-role");
const featureCompany = document.getElementById("feature-company");
const featureQuote = document.getElementById("feature-quote");
const featureLinkedin = document.getElementById("feature-linkedin");
const featureClipLabel = document.getElementById("feature-clip-label");
const featureClipSlot = document.getElementById("feature-clip-slot");
const featureInfoLabel = document.getElementById("feature-info-label");
const featureInfoSlot = document.getElementById("feature-info-slot");
const featureEpisode = document.getElementById("feature-episode");
const featureFocus = document.getElementById("feature-focus");

let activeGuestId = "";

function detailRole(guest) {
  const genericRoles = ["Guest from the show", "Guest from Impact Quantum"];
  return genericRoles.includes(guest.role) ? "" : guest.role;
}

function initialsFor(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function createPortraitMarkup(guest) {
  if (guest.imageSrc) {
    return `<img src="${guest.imageSrc}" alt="${guest.imageAlt || guest.name}">`;
  }

  return `<div class="avatar-fallback" aria-hidden="true">${initialsFor(guest.name)}</div>`;
}

function renderClip(guest) {
  if (guest.clipSrc) {
    const poster = guest.clipPoster ? ` poster="${guest.clipPoster}"` : "";
    return `
      <video controls preload="metadata"${poster}>
        <source src="${guest.clipSrc}">
        Your browser does not support the video tag.
      </video>
    `;
  }

  if (guest.clipExternalUrl) {
    return `
      <div class="clip-fallback">
        <p>Add a hosted clip link for this guest.</p>
        <a class="asset-link" href="${guest.clipExternalUrl}" target="_blank" rel="noreferrer">Open clip</a>
      </div>
    `;
  }

  return `
    <div class="clip-fallback">
      <p>No clip added yet. Drop in a local MP4 or use an external link for this episode.</p>
    </div>
  `;
}

function renderInfographic(guest) {
  if (guest.infographicSrc) {
    return `
      <a href="${guest.infographicSrc}" target="_blank" rel="noreferrer" aria-label="Open full-size infographic for ${guest.name}">
        <img src="${guest.infographicSrc}" alt="${guest.infographicAlt || `Infographic for ${guest.name}`}">
      </a>
    `;
  }

  if (guest.infographicUrl) {
    return `
      <a href="${guest.infographicUrl}" target="_blank" rel="noreferrer" aria-label="Open full-size infographic for ${guest.name}">
        <img src="${guest.infographicUrl}" alt="${guest.infographicAlt || `Infographic for ${guest.name}`}">
      </a>
    `;
  }

  return `
    <div class="info-fallback">
      <p>No infographic added yet. Add a PNG or JPG from the episode assets to complete this card.</p>
    </div>
  `;
}

function renderDetail(guest) {
  activeGuestId = guest.id;

  detailEmpty.classList.add("is-hidden");
  featureCard.classList.remove("is-hidden");

  featureRole.textContent = detailRole(guest);
  featureName.textContent = guest.name;
  featureCompany.textContent = guest.company;
  featureQuote.textContent = `"${guest.quote}"`;
  featureLinkedin.href = guest.linkedinUrl || "#";
  featureClipLabel.textContent = guest.clipLabel || "";
  featureInfoLabel.textContent = guest.infographicLabel || "";
  featureEpisode.textContent = guest.episode;
  featureFocus.textContent = guest.focus;
  featureClipSlot.innerHTML = renderClip(guest);
  featureInfoSlot.innerHTML = renderInfographic(guest);

  document.querySelectorAll(".portrait-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.guestId === guest.id);
  });
}

function renderPortraits() {
  if (!guests.length) {
    Object.values(portraitGrids).forEach((grid) => {
      if (grid) {
        grid.innerHTML = "<p>No guests have been added yet.</p>";
      }
    });

    return;
  }

  GROUPS.forEach((group) => {
    const grid = portraitGrids[group.id];

    if (!grid) {
      return;
    }

    const groupedGuests = guests.filter((guest) => guest.group === group.id);

    if (!groupedGuests.length) {
      grid.innerHTML = "<p>No guests in this section yet.</p>";
      return;
    }

    grid.innerHTML = groupedGuests
      .map(
        (guest) => `
          <button class="portrait-button" type="button" data-guest-id="${guest.id}" aria-label="Open ${guest.name}">
            <div class="portrait-media">
              ${createPortraitMarkup(guest)}
            </div>
            <div class="portrait-copy">
              <h3>${guest.name}</h3>
            </div>
          </button>
        `
      )
      .join("");
  });

  document.querySelectorAll(".portrait-button").forEach((button) => {
    button.addEventListener("click", () => {
      const guest = guests.find((entry) => entry.id === button.dataset.guestId);

      if (guest) {
        renderDetail(guest);
      }
    });
  });
}

renderPortraits();

const defaultGuest = guests.find((guest) => guest.group === "women-in-quantum") || guests[0];

if (defaultGuest && !activeGuestId) {
  renderDetail(defaultGuest);
}
