/**
 * Application Passeport Fidélité Viteos - React 18 Vanilla
 */

const { useState, useEffect, createElement: h } = React;

// --------------------------------------------------------------------------
// 1. COMPOSANTS D'ICÔNES & LOGO
// --------------------------------------------------------------------------

function ViteosLogoIcon({ className, style }) {
  return h('img', {
    src: "assets/viteos-icon.png",
    alt: "Viteos",
    className: className || "brand-icon",
    style: style
  });
}

const Icons = {
  Home: () => (
    h('svg', { width: 20, height: 20, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" })
    )
  ),
  Quiz: () => (
    h('svg', { width: 20, height: 20, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
    )
  ),
  Qr: () => (
    h('svg', { width: 20, height: 20, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" })
    )
  ),
  Leaf: () => (
    h('svg', { width: 20, height: 20, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" })
    )
  ),
  Star: () => (
    h('svg', { className: "trophy-star-icon", viewBox: "0 0 20 20", fill: "currentColor" },
      h('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    )
  ),
  ImageSlot: () => (
    h('svg', { width: 20, height: 20, fill: "none", viewBox: "0 0 24 24", stroke: "#9CA3AF", strokeWidth: 1.5 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })
    )
  ),
  Menu: () => (
    h('svg', { width: 20, height: 20, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" })
    )
  ),
  Close: () => (
    h('svg', { width: 20, height: 20, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
    )
  ),
  Check: () => (
    h('svg', { width: 16, height: 16, fill: "none", viewBox: "0 0 24 24", stroke: "#10B981", strokeWidth: 2.5 },
      h('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
    )
  )
};

function ProductImageSlot({ image, label }) {
  if (image) {
    return h('div', { className: "product-image-slot real-image-slot" },
      h('img', { src: image, alt: label, className: "product-image-img" })
    );
  }
  return h('div', { className: "product-image-slot" },
    h(Icons.ImageSlot, null),
    h('span', null, label || "Image")
  );
}

// --------------------------------------------------------------------------
// 2. HEADER & MENU DRAWER
// --------------------------------------------------------------------------

function Header({ user, onOpenProfile, currentTab, setCurrentTab }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return h(React.Fragment, null,
    h('header', { className: "app-header" },
      h('div', { className: "brand-wrapper", onClick: () => setCurrentTab('dashboard') },
        h('img', {
          src: "assets/viteos-icon.png",
          alt: "Viteos",
          className: "brand-icon brand-icon-mobile"
        }),
        h('img', {
          src: "assets/viteos-logo.png",
          alt: "Viteos",
          className: "brand-logo-desktop"
        }),
        h('h1', { className: "brand-title" }, "Passeport fidélité")
      ),

      // Navigation Desktop (Accueil, Quiz, Vision)
      h('nav', { className: "desktop-nav" },
        h('button', {
          onClick: () => setCurrentTab('dashboard'),
          className: `desktop-nav-link ${currentTab === 'dashboard' ? 'active' : ''}`
        },
          h(Icons.Home, null),
          h('span', null, "Accueil")
        ),
        h('button', {
          onClick: () => setCurrentTab('quiz'),
          className: `desktop-nav-link ${currentTab === 'quiz' ? 'active' : ''}`
        },
          h(Icons.Quiz, null),
          h('span', null, "Quiz")
        ),
        h('button', {
          onClick: () => setCurrentTab('vision'),
          className: `desktop-nav-link ${currentTab === 'vision' ? 'active' : ''}`
        },
          h(Icons.Leaf, null),
          h('span', null, "Vision")
        )
      ),

      // Bouton menu burger (affiché sur PC et mobile)
      h('button', {
        onClick: () => setDrawerOpen(true),
        className: "header-menu-btn",
        "aria-label": "Menu"
      }, h(Icons.Menu, null))
    ),

    drawerOpen && h('div', { className: "drawer-backdrop anim-fade-in" },
      h('div', { className: "drawer-panel anim-slide-left" },
        h('div', { className: "drawer-header" },
          h('span', { className: "drawer-title" }, "Menu"),
          h('button', { onClick: () => setDrawerOpen(false), className: "drawer-close-btn" },
            h(Icons.Close, null)
          )
        ),
        h('div', { className: "drawer-body" },
          h('div', { className: "drawer-user-card" },
            h('div', { className: "avatar-sm" },
              h('img', { src: "assets/profile.png", alt: "Profile" })
            ),
            h('div', { style: { minWidth: 0, flex: 1 } },
              h('p', { className: "drawer-user-name" }, user.name),
              h('p', { className: "drawer-user-points" }, `${user.points} points`)
            )
          ),
          h('div', { className: "drawer-nav-list" },
            h('button', {
              onClick: () => { setCurrentTab('dashboard'); setDrawerOpen(false); },
              className: `drawer-nav-item ${currentTab === 'dashboard' ? 'active' : ''}`
            }, "Accueil"),
            h('button', {
              onClick: () => { setCurrentTab('quiz'); setDrawerOpen(false); },
              className: `drawer-nav-item ${currentTab === 'quiz' ? 'active' : ''}`
            }, "Quiz"),
            h('button', {
              onClick: () => { setCurrentTab('vision'); setDrawerOpen(false); },
              className: `drawer-nav-item ${currentTab === 'vision' ? 'active' : ''}`
            }, "Vision")
          ),
          h('div', { className: "drawer-footer" },
            h('button', {
              onClick: () => { setDrawerOpen(false); onOpenProfile(); },
              className: "drawer-footer-btn"
            }, "Modifier mon nom"),
            h('button', {
              onClick: () => {
                if (confirm("Réinitialiser les données ?")) {
                  window.ViteosStore.resetState();
                  window.location.reload();
                }
              },
              className: "drawer-footer-btn danger"
            }, "Réinitialiser la démo")
          )
        )
      )
    )
  );
}

// --------------------------------------------------------------------------
// 3. VUE DASHBOARD RESPONSIVE (Avec catalogue saisonnier + slots d'images)
// --------------------------------------------------------------------------

function DashboardView({ user, onClaimReward, onOpenScan, setCurrentTab }) {
  const [season, setSeason] = useState('winter');
  const [partnersModalOpen, setPartnersModalOpen] = useState(false);
  const items = window.VITEOS_DATA.seasonalCatalog[season] || [];

  const pointsRemaining = Math.max(0, user.maxPointsTier - user.points);
  const progressPercent = Math.min(100, Math.round((user.points / user.maxPointsTier) * 100));

  return h('div', { className: "dashboard-view anim-fade-in" },

    // 1. CARTE PROFIL UNIFIÉE (Avatar, Nom, Progression des points)
    h('div', { className: "dashboard-profile-hero" },
      h('div', { className: "hero-top-row" },
        h('div', { className: "hero-profile-info" },
          h('div', { className: "hero-avatar" },
            h('img', { src: "assets/profile.png", alt: "Profile" })
          ),
          h('div', { className: "hero-text" },
            h('h2', { className: "hero-name" }, user.name)
          )
        )
      ),

      h('div', { className: "hero-progress-section" },
        h('div', { className: "points-header-row" },
          h('span', { className: "points-val-accent" }, `${user.points} / ${user.maxPointsTier}`)
        ),
        h('div', { className: "progress-track" },
          h('div', { className: "progress-fill", style: { width: `${progressPercent}%` } })
        ),
        h('p', { className: "points-remaining-note" },
          pointsRemaining > 0
            ? `Encore ${pointsRemaining} points avant votre prochain cadeau`
            : `Félicitations, palier de 150 points atteint !`
        )
      )
    ),

    // 2. DISPOSITION EN DESSOUS (Desktop 2 colonnes / Mobile empilé)
    h('div', { className: "dashboard-content-grid" },

      // Colonne de gauche : Trophées & Événements
      h('div', { className: "dashboard-side-col" },

        // Trophées / Participations
        h('div', { className: "section-box" },
          h('h2', { className: "section-box-title" }, "Dernières participations"),
          h('div', { className: "trophy-box" },
            user.trophies.map((trophy, idx) =>
              h('div', { key: idx, className: "trophy-row" },
                h(Icons.Star, null),
                h('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, trophy.title)
              )
            )
          )
        ),

        // Prochains Événements (Liste verticale avec liens externes officiels)
        h('div', { className: "section-box" },
          h('h2', { className: "section-box-title" }, "Prochains événements"),
          h('div', { className: "events-grid-box" },
            h('div', { className: "events-grid" },
              window.VITEOS_DATA.events.map((evt) =>
                h('a', {
                  key: evt.id,
                  href: evt.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "event-card event-link-card",
                  title: `Visiter le site officiel : ${evt.title}`
                },
                  h('div', { className: "event-title-row" },
                    h('p', { className: "event-title" }, evt.title),
                    h('svg', {
                      className: "event-external-icon",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    },
                      h('path', {
                        d: "M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                      }),
                      h('path', {
                        d: "M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                      })
                    )
                  ),
                  h('p', { className: "event-date" }, evt.date)
                )
              )
            )
          )
        )
      ),

      // Colonne de droite : Catalogue Saisonnier de Récompenses
      h('div', { className: "dashboard-main-col" },
        h('div', { className: "section-box" },
          h('h2', { className: "section-box-title" }, "Récompenses à débloquer"),

          // Onglets Collection Hiver / Été
          h('div', { className: "season-tabs" },
            h('button', {
              onClick: () => setSeason('winter'),
              className: `season-tab-btn ${season === 'winter' ? 'active' : ''}`
            }, "Collection Hiver"),
            h('button', {
              onClick: () => setSeason('summer'),
              className: `season-tab-btn ${season === 'summer' ? 'active' : ''}`
            }, "Collection Été")
          ),

          // Grille des récompenses avec emplacements pour les images
          h('div', { className: "rewards-grid" },
            items.map((item) => {
              const canAfford = user.points >= item.points;
              return h('div', { key: item.id, className: `reward-card ${item.isLiquidation ? 'is-liquidation' : ''}` },
                h('div', { className: "reward-info-header" },
                  h('div', { className: "reward-title-row" },
                    h('h3', { className: "reward-title" }, item.title),
                    item.isLiquidation && h('span', { className: "liquidation-badge" }, "Liquidation")
                  ),
                  h('div', { className: "reward-subtitle-row" },
                    h('span', { className: "reward-subtitle" }, item.subtitle),
                    item.hasInfo && h('button', {
                      type: 'button',
                      onClick: (e) => {
                        e.stopPropagation();
                        setPartnersModalOpen(true);
                      },
                      className: "info-btn-badge",
                      title: "Voir les commerces partenaires",
                      "aria-label": "Informations commerces partenaires"
                    }, "i")
                  )
                ),
                h(ProductImageSlot, { image: item.image, label: item.title }),
                h('div', { className: "reward-bottom-row" },
                  h('span', { className: "reward-points-badge" }, `${item.points} pts`),
                  h('button', {
                    onClick: () => onClaimReward(item),
                    disabled: !canAfford,
                    className: "reward-claim-btn"
                  }, canAfford ? 'Échanger' : `Manque ${item.points - user.points} pts`)
                )
              );
            })
          )
        )
      )

    ),

    h(CidPartnersModal, {
      isOpen: partnersModalOpen,
      onClose: () => setPartnersModalOpen(false)
    })
  );
}

// --------------------------------------------------------------------------
// 4. VUE QUIZ
// --------------------------------------------------------------------------

function QuizView({ user, onAddPoints, onGoHome }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [pointsEarnedTotal, setPointsEarnedTotal] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = window.VITEOS_DATA.quizQuestions;
  const currentQ = questions[currentIdx];

  const handleSelect = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (currentQ.options[idx].isCorrect) {
      setScore(prev => prev + 1);
      setPointsEarnedTotal(prev => prev + currentQ.rewardPoints);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      if (pointsEarnedTotal > 0) {
        onAddPoints(pointsEarnedTotal, "Quiz Viteos terminé");
      }
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return h('div', { className: "quiz-finished-card anim-fade-in" },
      h('div', { className: "quiz-badge-icon" },
        h(ViteosLogoIcon, null)
      ),
      h('h2', { style: { fontSize: '18px', fontWeight: '700', color: 'var(--color-black)' } }, "Quiz terminé"),
      h('p', { style: { fontSize: '12px', color: 'var(--color-text-muted)' } },
        "Score : ",
        h('strong', { style: { color: 'var(--color-black)' } }, `${score} / ${questions.length}`)
      ),
      h('div', { className: "quiz-score-summary" },
        h('p', { className: "quiz-score-highlight" }, `+${pointsEarnedTotal} points ajoutés à votre jauge`),
        h('p', { style: { fontSize: '11px', color: 'var(--color-text-muted)' } }, "5 points par bonne réponse (25 points par quiz complet).")
      ),
      h('button', {
        onClick: onGoHome,
        className: "btn-primary",
        style: { width: '100%', padding: '10px' }
      }, "Retourner à l'accueil")
    );
  }

  return h('div', { className: "quiz-view anim-fade-in" },
    h('div', { className: "quiz-header-bar" },
      h('div', null,
        h('span', { className: "quiz-category-tag" }, currentQ.category),
        h('h2', { className: "quiz-progress-title" }, `Question ${currentIdx + 1} / ${questions.length}`)
      ),
      h('span', { className: "quiz-reward-badge" }, `+${currentQ.rewardPoints} pts`)
    ),

    h('div', { className: "quiz-question-box" },
      h('h3', { className: "quiz-question-text" }, currentQ.question),

      h('div', { className: "quiz-options-list" },
        currentQ.options.map((opt, idx) => {
          let stateClass = "";
          if (selectedOption !== null) {
            if (opt.isCorrect) {
              stateClass = "correct anim-pulse-green";
            } else if (selectedOption === idx) {
              stateClass = "incorrect";
            } else {
              stateClass = "muted";
            }
          }
          return h('button', {
            key: idx,
            disabled: selectedOption !== null,
            onClick: () => handleSelect(idx),
            className: `quiz-option-btn ${stateClass}`
          },
            h('span', null, opt.text),
            selectedOption !== null && opt.isCorrect && h(Icons.Check, null)
          );
        })
      ),

      selectedOption !== null && h('div', { style: { marginTop: '12px' } },
        h('button', {
          onClick: nextQuestion,
          className: "btn-primary",
          style: { width: '100%', padding: '10px' }
        }, currentIdx < questions.length - 1 ? "Question suivante" : "Voir mon score")
      )
    )
  );
}

// --------------------------------------------------------------------------
// 5. VUE VISION & MANIFESTE
// --------------------------------------------------------------------------

function VisionView() {
  return h('div', { className: "vision-view anim-fade-in" },
    h('div', { className: "manifesto-banner" },
      h('span', { className: "manifesto-badge" }, "Notre Vision & Engagement"),
      h('h2', { className: "manifesto-title" }, "Comprendre vos besoins, dynamiser Neuchâtel et faire vivre l'économie circulaire."),
      h('p', { className: "manifesto-text" },
        "Ce passeport fidélité réinvente la relation entre Viteos, ses clients et le tissu régional. En ciblant les récompenses qui comptent vraiment pour vous, nous créons un cercle vertueux local et durable pour tout le canton."
      )
    ),

    h('div', { className: "vision-grid" },
      h('div', { className: "vision-card" },
        h('h3', { className: "vision-card-title" }, "Comprendre les vraies envies de nos clients"),
        h('p', { className: "vision-card-desc" },
          "Finis les objets imposés : cette plateforme permet de mesurer ce qui vous est réellement utile au quotidien et d'adapter en continu nos offres selon vos choix."
        )
      ),
      h('div', { className: "vision-card" },
        h('h3', { className: "vision-card-title" }, "Promouvoir les événements régionaux"),
        h('p', { className: "vision-card-desc" },
          "Viteos soutient activement la vie neuchâteloise (Fête des Vendanges, HCC, Viteos NUC, BCN Tour). Le passeport encourage la participation aux grands rendez-vous qui font vibrer le canton."
        )
      ),
      h('div', { className: "vision-card" },
        h('h3', { className: "vision-card-title" }, "Fabrication par des ateliers protégés"),
        h('p', { className: "vision-card-desc" },
          "Tous nos goodies sont conçus et confectionnés en partenariat avec des structures d'insertion et ateliers protégés locaux, valorisant l'artisanat social neuchâtelois."
        )
      ),
      h('div', { className: "vision-card" },
        h('h3', { className: "vision-card-title" }, "Favoriser les commerçants et artisans locaux"),
        h('p', { className: "vision-card-desc" },
          "Grâce aux bons d'achat CID (Commerce et Industrie de Neuchâtel), chaque point transformé réinjecte directement du pouvoir d'achat dans les commerces de proximité."
        )
      ),
      h('div', { className: "vision-card vision-card-full" },
        h('h3', { className: "vision-card-title" }, "Économie circulaire : de l'objet matériel vers l'expérience"),
        h('p', { className: "vision-card-desc" },
          "Notre objectif à terme est de réduire progressivement la production de goodies matériels au profit d'expériences locales : billets de match, entrées de piscine, bons commerçants et avantages exclusifs. Les goodies signalés en « Liquidation » (bonnets, tours de cou, graines, mugs, gants) sont mis à disposition pour valoriser et écouler le stock existant sans gaspillage, mais ce type d'articles est appelé à disparaître définitivement de notre offre."
        )
      )
    )
  );
}

// --------------------------------------------------------------------------
// 6. MODALES (QR Scanner & Profile)
// --------------------------------------------------------------------------

function CidPartnersModal({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  if (!isOpen) return null;

  const partners = window.VITEOS_DATA.cidPartners || [];
  const filteredPartners = partners.filter(p =>
    p.toLowerCase().includes(search.toLowerCase().trim())
  );

  return h('div', { className: "modal-backdrop anim-fade-in", onClick: onClose },
    h('div', {
      className: "modal-dialog partners-modal-dialog",
      onClick: (e) => e.stopPropagation()
    },
      h('div', { className: "modal-header" },
        h('span', { className: "modal-title" }, "Commerces partenaires (Bons CID)"),
        h('button', { onClick: onClose, className: "drawer-close-btn" },
          h(Icons.Close, null)
        )
      ),
      h('div', { className: "modal-body" },
        h('div', { className: "partners-search-box" },
          h('input', {
            type: "text",
            placeholder: "Rechercher un commerce ou artisan...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "form-input"
          })
        ),
        h('p', { className: "partners-count-badge" },
          `${filteredPartners.length} commerce${filteredPartners.length > 1 ? 's' : ''} disponible${filteredPartners.length > 1 ? 's' : ''} dans le canton`
        ),
        h('div', { className: "partners-list-container" },
          filteredPartners.length > 0
            ? filteredPartners.map((partner, idx) =>
              h('div', { key: idx, className: "partner-item" }, partner)
            )
            : h('p', { style: { fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'center', padding: '16px' } },
              "Aucun commerce trouvé correspondant à votre recherche."
            )
        )
      ),
      h('div', { className: "modal-footer" },
        h('button', { onClick: onClose, className: "btn-primary", style: { width: '100%' } }, "Fermer")
      )
    )
  );
}

function QrScannerModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return h('div', { className: "modal-backdrop anim-fade-in" },
    h('div', { className: "modal-dialog" },
      h('div', { className: "modal-header" },
        h('span', { className: "modal-title" }, "Scanner un QR Code"),
        h('button', { onClick: onClose, className: "drawer-close-btn" },
          h(Icons.Close, null)
        )
      ),
      h('div', { className: "modal-body", style: { backgroundColor: 'var(--color-bg-card)', textAlign: 'center', padding: '24px 16px' } },
        h('div', { className: "scanner-viewport" },
          h(ViteosLogoIcon, { className: "brand-icon", style: { opacity: 0.3 } })
        ),
        h('p', { style: { fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '12px' } },
          "Pointez votre appareil vers le QR code d'un événement partenaire Viteos."
        )
      )
    )
  );
}

function ProfileModal({ isOpen, onClose, userName, onSaveName }) {
  const [nameInput, setNameInput] = useState(userName);
  if (!isOpen) return null;
  return h('div', { className: "modal-backdrop anim-fade-in" },
    h('div', { className: "modal-dialog", style: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' } },
      h('h3', { style: { fontSize: '14px', fontWeight: '700', color: 'var(--color-black)' } }, "Modifier le nom"),
      h('input', {
        type: "text",
        value: nameInput,
        onChange: (e) => setNameInput(e.target.value),
        className: "form-input"
      }),
      h('div', { style: { display: 'flex', gap: '8px' } },
        h('button', { onClick: onClose, className: "btn-secondary" }, "Annuler"),
        h('button', { onClick: () => { onSaveName(nameInput); onClose(); }, className: "btn-primary" }, "Enregistrer")
      )
    )
  );
}

// --------------------------------------------------------------------------
// 7. APPLICATION ROOT
// --------------------------------------------------------------------------

function App() {
  const [user, setUser] = useState(() => window.ViteosStore.getInitialState());
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    window.ViteosStore.saveState(user);
  }, [user]);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddPoints = (amount, reason) => {
    setUser(prev => ({ ...prev, points: prev.points + amount }));
    showToast(`+${amount} points (${reason})`);
  };

  const handleClaimReward = (reward) => {
    if (user.points < reward.points) {
      alert(`Il vous manque ${reward.points - user.points} points.`);
      return;
    }
    if (confirm(`Échanger ${reward.points} points contre "${reward.title}" ?`)) {
      setUser(prev => ({ ...prev, points: prev.points - reward.points }));
      showToast(`Récompense obtenue : ${reward.title}`);
    }
  };

  const handleSaveName = (newName) => {
    if (!newName.trim()) return;
    setUser(prev => ({ ...prev, name: newName.trim() }));
    showToast(`Nom mis à jour : ${newName}`);
  };

  return h('div', { className: "app-container" },
    h('div', { className: "app-wrapper" },
      h(Header, {
        user,
        onOpenProfile: () => setProfileOpen(true),
        currentTab,
        setCurrentTab
      }),

      notification && h('div', { className: "toast-container anim-fade-in" },
        h('p', null, notification)
      ),

      h('main', { className: "main-content" },
        currentTab === 'dashboard' && h(DashboardView, {
          user,
          onClaimReward: handleClaimReward,
          onOpenScan: () => setScannerOpen(true),
          setCurrentTab
        }),
        currentTab === 'quiz' && h(QuizView, {
          user,
          onAddPoints: handleAddPoints,
          onGoHome: () => setCurrentTab('dashboard')
        }),
        currentTab === 'vision' && h(VisionView, null)
      ),

      // Bottom Bar Mobile (Accueil, Scanner, Quiz, Vision)
      h('nav', { className: "bottom-nav" },
        h('button', {
          onClick: () => setCurrentTab('dashboard'),
          className: `bottom-nav-item ${currentTab === 'dashboard' ? 'active' : ''}`
        },
          h(Icons.Home, null),
          h('span', { style: { marginTop: '2px' } }, "Accueil")
        ),
        h('button', {
          onClick: () => setCurrentTab('quiz'),
          className: `bottom-nav-item ${currentTab === 'quiz' ? 'active' : ''}`
        },
          h(Icons.Quiz, null),
          h('span', { style: { marginTop: '2px' } }, "Quiz")
        ),
        h('button', { onClick: () => setScannerOpen(true), className: "bottom-nav-scan-btn" },
          h('div', { className: "scan-icon-bubble" },
            h(Icons.Qr, null)
          ),
          h('span', { className: "scan-label" }, "Scanner")
        ),
        h('button', {
          onClick: () => setCurrentTab('vision'),
          className: `bottom-nav-item ${currentTab === 'vision' ? 'active' : ''}`
        },
          h(Icons.Leaf, null),
          h('span', { style: { marginTop: '2px' } }, "Vision")
        )
      ),

      h(QrScannerModal, { isOpen: scannerOpen, onClose: () => setScannerOpen(false) }),
      h(ProfileModal, { isOpen: profileOpen, onClose: () => setProfileOpen(false), userName: user.name, onSaveName: handleSaveName })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App, null));
