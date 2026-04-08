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
const themeOverview = document.getElementById("theme-overview");
const themeMap = document.getElementById("theme-map");
const themeDetailTitle = document.getElementById("theme-detail-title");
const themeDetailSummary = document.getElementById("theme-detail-summary");
const themeDetailEpisodes = document.getElementById("theme-detail-episodes");
const themeDetailThemes = document.getElementById("theme-detail-themes");

let activeGuestId = "";

const transcriptClusters = [
  {
    id: "career-paths",
    title: "Career Pathways",
    summary: "Across the series, guests return to non-linear careers, stepping into quantum from adjacent disciplines, and learning in public rather than waiting for perfect credentials.",
    themeFamily: "career",
    themes: ["Career pivots", "Interdisciplinary paths", "Commercial translation"],
    episodes: ["Anna Beata", "Sabine", "Sara", "Petra", "Jennifer", "Sahar"]
  },
  {
    id: "human-signals",
    title: "Human Signals",
    summary: "The conversations repeatedly center confidence, curiosity, leadership, and the practical challenge of sustaining ambition without losing the human part of the work.",
    themeFamily: "human",
    themes: ["Curiosity", "Confidence", "Leadership", "Community", "Mentorship"],
    episodes: ["Anna Beata", "Devika", "Sabine", "Jennifer", "Sierra", "Sahar"]
  },
  {
    id: "technical-signals",
    title: "Technical Signals",
    summary: "A second cluster connects applied themes such as networking, security, useful infrastructure, and making quantum approachable beyond pure research settings.",
    themeFamily: "technical",
    themes: ["Security by design", "Quantum networking", "Accessibility", "Applied infrastructure", "Real-world translation"],
    episodes: ["Devika", "Marie-Eve", "Petra", "Sara", "Sahar"]
  }
];

const transcriptNodes = [
  {
    id: "episode-1",
    type: "episode",
    guestId: "anna-beata-hedegaard",
    guestName: "Anna Beata Hedegaard",
    label: "Episode 1",
    subtitle: "Fearless curiosity and human-centered leadership",
    left: 16,
    top: 16,
    themes: ["curiosity", "leadership", "accessibility"],
    detailSummary: "Anna Beata anchors the map around fearless curiosity, human-centered leadership, and making quantum feel navigable for people entering from different backgrounds."
  },
  {
    id: "episode-2",
    type: "episode",
    guestId: "devika-mehra",
    guestName: "Devika Mehra",
    label: "Episode 2",
    subtitle: "Confidence, resilience, and security-first thinking",
    left: 16,
    top: 42,
    themes: ["confidence", "leadership", "security"],
    detailSummary: "Devika links the human side of confidence and resilience to a more infrastructure-oriented conversation about building secure systems from the start."
  },
  {
    id: "episode-3",
    type: "episode",
    guestId: "sabine-mehr",
    guestName: "Sabine Mehr",
    label: "Episode 3",
    subtitle: "Bridging business, engineering, and family life",
    left: 16,
    top: 70,
    themes: ["career-pivots", "leadership", "community"],
    detailSummary: "Sabine’s episode reinforces that quantum careers can sit at the intersection of business, engineering, and real-life tradeoffs, not just research credentials."
  },
  {
    id: "episode-4",
    type: "episode",
    guestId: "sara-metwalli",
    guestName: "Sara Metwalli",
    label: "Episode 4",
    subtitle: "Breaking in through curiosity, coding, and applications",
    left: 36,
    top: 86,
    themes: ["accessibility", "career-pivots", "applied-infrastructure"],
    detailSummary: "Sara pushes the graph toward practical access: entering through engineering, learning by doing, and connecting abstract quantum ideas to real applications."
  },
  {
    id: "episode-5",
    type: "episode",
    guestId: "jennifer-prendki",
    guestName: "Jennifer Prendki",
    label: "Episode 5",
    subtitle: "Confidence, leadership, and ignoring the noise",
    left: 64,
    top: 86,
    themes: ["confidence", "leadership", "career-pivots"],
    detailSummary: "Jennifer sharpens the confidence cluster and adds a strong signal around executive presence, leadership, and continuing forward despite noise."
  },
  {
    id: "episode-6",
    type: "episode",
    guestId: "sierra-clouse",
    guestName: "Sierra Clouse",
    label: "Episode 6",
    subtitle: "Taking chances and building through trust",
    left: 84,
    top: 70,
    themes: ["confidence", "community", "career-pivots"],
    detailSummary: "Sierra extends the community and confidence clusters, emphasizing opportunity, trust, and the importance of people willing to take a chance on emerging talent."
  },
  {
    id: "episode-7",
    type: "episode",
    guestId: "petra-soderling",
    guestName: "Petra Soderling",
    label: "Episode 7",
    subtitle: "Breaking the PhD stereotype around quantum work",
    left: 84,
    top: 42,
    themes: ["accessibility", "career-pivots", "applied-infrastructure"],
    detailSummary: "Petra is a major bridge node for accessibility, showing that quantum work does not require a single academic path and can benefit from business fluency."
  },
  {
    id: "episode-8",
    type: "episode",
    guestId: "marie-eve-boulonger",
    guestName: "Marie-Eve Boulanger",
    label: "Episode 8",
    subtitle: "Security-forward networking infrastructure",
    left: 84,
    top: 16,
    themes: ["security", "networking", "applied-infrastructure"],
    detailSummary: "Marie-Eve concentrates the technical side of the map around networking, infrastructure, and designing future systems with security in mind."
  },
  {
    id: "episode-9",
    type: "episode",
    guestId: "sahar-hejazi",
    guestName: "Sahar Hejazi",
    label: "Episode 9",
    subtitle: "Leadership, mentorship, and translating quantum beyond academia",
    left: 50,
    top: 88,
    themes: ["confidence", "leadership", "mentorship", "real-world-translation"],
    detailSummary: "Sahar adds a strong bridge between leadership, mentorship, and the practical work of translating quantum from research into real-world impact."
  }
];

const themeNodes = [
  {
    id: "curiosity",
    type: "theme",
    family: "human",
    label: "Curiosity",
    subtitle: "The recurring permission to explore without having every answer first.",
    left: 34,
    top: 18
  },
  {
    id: "leadership",
    type: "theme",
    family: "human",
    label: "Leadership",
    subtitle: "Human-centered leadership, voice, and responsibility show up across multiple episodes.",
    left: 50,
    top: 28
  },
  {
    id: "security",
    type: "theme",
    family: "technical",
    label: "Security By Design",
    subtitle: "Build security into quantum infrastructure early instead of bolting it on later.",
    left: 66,
    top: 18
  },
  {
    id: "career-pivots",
    type: "theme",
    family: "career",
    label: "Career Pivots",
    subtitle: "Non-linear paths into quantum are normal, useful, and often an advantage.",
    left: 34,
    top: 54
  },
  {
    id: "accessibility",
    type: "theme",
    family: "career",
    label: "Accessibility",
    subtitle: "Quantum becomes stronger when the field is understandable beyond a narrow expert circle.",
    left: 50,
    top: 66
  },
  {
    id: "networking",
    type: "theme",
    family: "technical",
    label: "Quantum Networking",
    subtitle: "Infrastructure, communication, and entanglement-aware systems form a distinct technical thread.",
    left: 66,
    top: 54
  },
  {
    id: "confidence",
    type: "theme",
    family: "human",
    label: "Confidence",
    subtitle: "Several guests describe confidence as persistence, not certainty.",
    left: 50,
    top: 44
  },
  {
    id: "community",
    type: "theme",
    family: "human",
    label: "Community",
    subtitle: "Progress often depends on trust, advocates, and people willing to open doors.",
    left: 24,
    top: 42
  },
  {
    id: "mentorship",
    type: "theme",
    family: "human",
    label: "Mentorship",
    subtitle: "Supportive mentors and visible allies help people navigate the field without losing themselves.",
    left: 34,
    top: 82
  },
  {
    id: "applied-infrastructure",
    type: "theme",
    family: "technical",
    label: "Applied Infrastructure",
    subtitle: "The show repeatedly returns to systems, tools, and usable deployment rather than theory alone.",
    left: 76,
    top: 42
  },
  {
    id: "real-world-translation",
    type: "theme",
    family: "technical",
    label: "Real-World Translation",
    subtitle: "A recurring challenge is moving quantum ideas out of the lab and into language, products, and decisions people can use.",
    left: 66,
    top: 82
  }
];

const transcriptEdges = transcriptNodes.flatMap((episodeNode) =>
  episodeNode.themes.map((themeId) => ({
    from: episodeNode.id,
    to: themeId
  }))
);

function releaseRank(guest) {
  if (Number.isFinite(guest.releaseOrder)) {
    return guest.releaseOrder;
  }

  return null;
}

function parseEpisodeOrder(episodeLabel = "") {
  const seasonMatch = episodeLabel.match(/season\s+(\d+)/i);
  const episodeMatch = episodeLabel.match(/episode\s+(\d+)/i);

  if (!seasonMatch || !episodeMatch) {
    return null;
  }

  return {
    season: Number(seasonMatch[1]),
    episode: Number(episodeMatch[1])
  };
}

function compareGuestsByEpisode(leftGuest, rightGuest) {
  const leftReleaseRank = releaseRank(leftGuest);
  const rightReleaseRank = releaseRank(rightGuest);

  if (leftReleaseRank !== null && rightReleaseRank !== null) {
    return leftReleaseRank - rightReleaseRank;
  }

  if (leftReleaseRank !== null) {
    return -1;
  }

  if (rightReleaseRank !== null) {
    return 1;
  }

  const leftEpisode = parseEpisodeOrder(leftGuest.episode);
  const rightEpisode = parseEpisodeOrder(rightGuest.episode);

  if (leftEpisode && rightEpisode) {
    if (leftEpisode.season !== rightEpisode.season) {
      return leftEpisode.season - rightEpisode.season;
    }

    if (leftEpisode.episode !== rightEpisode.episode) {
      return leftEpisode.episode - rightEpisode.episode;
    }
  } else if (leftEpisode) {
    return -1;
  } else if (rightEpisode) {
    return 1;
  }

  return leftGuest.name.localeCompare(rightGuest.name);
}

const sortedGuests = [...guests].sort(compareGuestsByEpisode);

function renderTranscriptOverview() {
  if (!themeOverview) {
    return;
  }

  themeOverview.innerHTML = transcriptClusters
    .map(
      (cluster) => `
        <article class="theme-cluster-card">
          <div>
            <p class="section-kicker">${cluster.title}</p>
            <h3>${cluster.summary}</h3>
          </div>
          <div class="theme-chip-row">
            ${cluster.themes
              .map(
                (theme) =>
                  `<span class="theme-chip theme-chip--${cluster.themeFamily}">${theme}</span>`
              )
              .join("")}
          </div>
          <div class="theme-card-links">
            ${cluster.episodes
              .map((episode) => `<span class="theme-link-pill">${episode}</span>`)
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderTranscriptMap() {
  if (!themeMap || !themeDetailTitle || !themeDetailSummary || !themeDetailEpisodes || !themeDetailThemes) {
    return;
  }

  const nodes = [...themeNodes, ...transcriptNodes];
  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  themeMap.innerHTML = `
    <svg aria-hidden="true">
      ${transcriptEdges
        .map((edge, index) => {
          const fromNode = nodeById.get(edge.from);
          const toNode = nodeById.get(edge.to);

          return `
            <line
              class="theme-map-line"
              data-edge-index="${index}"
              data-from="${edge.from}"
              data-to="${edge.to}"
              x1="${fromNode.left}%"
              y1="${fromNode.top}%"
              x2="${toNode.left}%"
              y2="${toNode.top}%"
            ></line>
          `;
        })
        .join("")}
    </svg>
    ${nodes
      .map((node) => {
        const isTheme = node.type === "theme";
        const nodeClass = isTheme ? "theme-node" : "episode-node";
        const eyebrow = isTheme ? node.family : node.label;
        const title = isTheme ? node.label : node.guestName;
        const meta = isTheme ? node.subtitle : node.subtitle;

        return `
          <button
            class="theme-map-node ${nodeClass}"
            type="button"
            data-node-id="${node.id}"
            ${isTheme ? `data-family="${node.family}"` : ""}
            style="left:${node.left}%; top:${node.top}%"
            aria-label="Open ${title}"
          >
            <p class="theme-map-node__eyebrow">${eyebrow}</p>
            <h4 class="theme-map-node__title">${title}</h4>
            <p class="theme-map-node__meta">${meta}</p>
          </button>
        `;
      })
      .join("")}
  `;

  const nodeButtons = [...themeMap.querySelectorAll(".theme-map-node")];
  const lineEls = [...themeMap.querySelectorAll(".theme-map-line")];

  function setListItems(target, items) {
    target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }

  function highlightNode(nodeId) {
    const selectedNode = nodeById.get(nodeId);

    if (!selectedNode) {
      return;
    }

    const connectedNodeIds = new Set(
      transcriptEdges
        .filter((edge) => edge.from === nodeId || edge.to === nodeId)
        .flatMap((edge) => [edge.from, edge.to])
    );
    connectedNodeIds.add(nodeId);

    nodeButtons.forEach((button) => {
      const isConnected = connectedNodeIds.has(button.dataset.nodeId);
      button.classList.toggle("is-active", button.dataset.nodeId === nodeId);
      button.classList.toggle("is-dimmed", !isConnected);
    });

    lineEls.forEach((line) => {
      const isActive = line.dataset.from === nodeId || line.dataset.to === nodeId;
      line.classList.toggle("is-active", isActive);
      line.classList.toggle("is-dimmed", !isActive);
    });

    if (selectedNode.type === "theme") {
      const relatedEpisodes = transcriptNodes.filter((episodeNode) =>
        episodeNode.themes.includes(selectedNode.id)
      );
      const siblingThemes = [...new Set(
        relatedEpisodes.flatMap((episodeNode) => episodeNode.themes).filter((themeId) => themeId !== selectedNode.id)
      )]
        .map((themeId) => themeNodes.find((themeNode) => themeNode.id === themeId)?.label)
        .filter(Boolean);

      themeDetailTitle.textContent = selectedNode.label;
      themeDetailSummary.textContent = selectedNode.subtitle;
      setListItems(
        themeDetailEpisodes,
        relatedEpisodes.map((episodeNode) => `${episodeNode.label}: ${episodeNode.guestName}`)
      );
      setListItems(themeDetailThemes, siblingThemes);
      return;
    }

    const relatedThemes = selectedNode.themes
      .map((themeId) => themeNodes.find((themeNode) => themeNode.id === themeId)?.label)
      .filter(Boolean);
    const relatedEpisodes = transcriptNodes
      .filter(
        (episodeNode) =>
          episodeNode.id !== selectedNode.id &&
          episodeNode.themes.some((themeId) => selectedNode.themes.includes(themeId))
      )
      .map((episodeNode) => {
        const sharedThemeLabels = episodeNode.themes
          .filter((themeId) => selectedNode.themes.includes(themeId))
          .map((themeId) => themeNodes.find((themeNode) => themeNode.id === themeId)?.label)
          .filter(Boolean)
          .join(", ");

        return `${episodeNode.label}: ${episodeNode.guestName} (${sharedThemeLabels})`;
      });

    themeDetailTitle.textContent = `${selectedNode.label}: ${selectedNode.guestName}`;
    themeDetailSummary.textContent = selectedNode.detailSummary;
    setListItems(themeDetailEpisodes, relatedEpisodes);
    setListItems(themeDetailThemes, relatedThemes);

    const selectedGuest = guests.find((guest) => guest.id === selectedNode.guestId);

    if (selectedGuest) {
      renderDetail(selectedGuest);
    }
  }

  nodeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      highlightNode(button.dataset.nodeId);
    });
  });

  highlightNode("leadership");
}

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

    const groupedGuests = sortedGuests.filter((guest) => guest.group === group.id);

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
      const guest = sortedGuests.find((entry) => entry.id === button.dataset.guestId);

      if (guest) {
        renderDetail(guest);
      }
    });
  });
}

renderPortraits();
renderTranscriptOverview();
renderTranscriptMap();

const defaultGuest =
  sortedGuests.find((guest) => guest.group === "women-in-quantum") || sortedGuests[0];

if (defaultGuest && !activeGuestId) {
  renderDetail(defaultGuest);
}
