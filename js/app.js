/**
 * SeoBuk ON (서북온) - Hybrid Travel Companion Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentSimMode = 'real'; // 'real' | 'day' | 'night'
  let activeFilter = 'all';
  let activeMood = 'peaceful-alley';
  let activeSpot = APP_DATA.places[0];
  let mapInstance = null;
  let markersLayer = null;
  let mapMarkers = [];

  // DOM Elements
  const statusBarClock = document.getElementById('statusBarClock');
  const visitingStatusBanner = document.getElementById('visitingStatusBanner');
  const visitingStatusText = document.getElementById('visitingStatusText');
  const visitingInfoBtn = document.getElementById('visitingInfoBtn');
  
  const simRealBtn = document.getElementById('simRealTime');
  const simDayBtn = document.getElementById('simDaytime');
  const simNightBtn = document.getElementById('simNighttime');

  const appsCarouselContainer = document.getElementById('appsCarouselContainer');
  const whyAppsLink = document.getElementById('whyAppsLink');

  const mapFilterPills = document.getElementById('mapFilterPills');
  const spotDrawer = document.getElementById('spotDrawer');
  const drawerCategory = document.getElementById('drawerCategory');
  const drawerNameEn = document.getElementById('drawerNameEn');
  const drawerNameKr = document.getElementById('drawerNameKr');
  const drawerBadge = document.getElementById('drawerBadge');
  const drawerEtiquette = document.getElementById('drawerEtiquette');
  const drawerNavBtn = document.getElementById('drawerNavBtn');
  const drawerTaxiCardBtn = document.getElementById('drawerTaxiCardBtn');

  const moodChipsGroup = document.getElementById('moodChipsGroup');
  const aiSpotlightCard = document.getElementById('aiSpotlightCard');
  const aiCardTagline = document.getElementById('aiCardTagline');
  const aiCardTitleEn = document.getElementById('aiCardTitleEn');
  const aiCardTitleKr = document.getElementById('aiCardTitleKr');
  const aiCardStory = document.getElementById('aiCardStory');
  const aiCardTip = document.getElementById('aiCardTip');
  const aiCardNavBtn = document.getElementById('aiCardNavBtn');
  const aiCardDriverBtn = document.getElementById('aiCardDriverBtn');

  const etiquetteGridContainer = document.getElementById('etiquetteGridContainer');
  const takePledgeBtn = document.getElementById('takePledgeBtn');
  const pledgeStampBadge = document.getElementById('pledgeStampBadge');
  const pledgeTitle = document.getElementById('pledgeTitle');
  const pledgeDesc = document.getElementById('pledgeDesc');

  const phraseCardsContainer = document.getElementById('phraseCardsContainer');
  const phraseFilterPills = document.getElementById('phraseFilterPills');
  const openTaxiModalQuickBtn = document.getElementById('openTaxiModalQuickBtn');
  const flashcardModal = document.getElementById('flashcardModal');
  const modalKoreanText = document.getElementById('modalKoreanText');
  const modalPhonetic = document.getElementById('modalPhonetic');
  const modalEnglishMeaning = document.getElementById('modalEnglishMeaning');
  const modalSpeakBtn = document.getElementById('modalSpeakBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const appToast = document.getElementById('appToast');
  const openApiModalBtn = document.getElementById('openApiModalBtn');
  const apiSettingsModal = document.getElementById('apiSettingsModal');
  const closeApiModalBtn = document.getElementById('closeApiModalBtn');
  const seoulApiKeyInput = document.getElementById('seoulApiKeyInput');
  const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
  const syncLiveApiBtn = document.getElementById('syncLiveApiBtn');
  const apiSyncStatusMessage = document.getElementById('apiSyncStatusMessage');
  const datasourceStatusText = document.getElementById('datasourceStatusText');

  const mainScroll = document.getElementById('mainScroll');
  const navTabs = document.querySelectorAll('.nav-tab-item');

  // =========================================================================
  // 1. Clock & Visiting Hours Policy Engine
  // =========================================================================
  function updateVisitingHoursStatus() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (currentSimMode === 'day') {
      hours = 14; // 2:00 PM
      minutes = 15;
    } else if (currentSimMode === 'night') {
      hours = 20; // 8:00 PM
      minutes = 30;
    }

    // Format clock
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    statusBarClock.textContent = formattedTime;

    // Policy Rule: Bukchon Red Zone visiting hours are 10:00 to 17:00
    const isWithinHours = (hours >= 10 && hours < 17);

    if (isWithinHours) {
      visitingStatusBanner.className = 'status-alert-banner visiting-active';
      visitingStatusText.innerHTML = `<strong>Visiting Active (10:00 - 17:00)</strong> • Please whisper in alleys`;
    } else {
      visitingStatusBanner.className = 'status-alert-banner rest-time visiting-restricted';
      visitingStatusText.innerHTML = `<strong>Residential Rest Time (17:00 - 10:00)</strong> • Bukchon residential alleys restricted`;
    }
  }

  // Setup simulation toggle buttons
  function setSimMode(mode, activeBtn) {
    currentSimMode = mode;
    [simRealBtn, simDayBtn, simNightBtn].forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
    updateVisitingHoursStatus();
    showToast(`Simulating: ${activeBtn.textContent}`);
  }

  simRealBtn.addEventListener('click', () => setSimMode('real', simRealBtn));
  simDayBtn.addEventListener('click', () => setSimMode('day', simDayBtn));
  simNightBtn.addEventListener('click', () => setSimMode('night', simNightBtn));

  setInterval(updateVisitingHoursStatus, 10000);
  updateVisitingHoursStatus();

  visitingInfoBtn.addEventListener('click', () => {
    openFlashcardModal(
      "북촌 한옥마을 특별관리지역 관광 에티켓 안내",
      "Buk-chon ha-nok-ma-eul teuk-byeol-gwan-ri-ji-yeok",
      "Bukchon Red Zone (Gahoe-dong) strictly restricts tourist visits from 5:00 PM to 10:00 AM to protect resident sleep and privacy. Fines apply for loud noises."
    );
  });

  // =========================================================================
  // 2. Render Essential Korean Apps Carousel
  // =========================================================================
  function renderEssentialApps() {
    appsCarouselContainer.innerHTML = '';
    APP_DATA.essentialApps.forEach(app => {
      const card = document.createElement('div');
      card.className = 'app-card';
      card.style.setProperty('--app-color', app.color);

      card.innerHTML = `
        <div>
          <div class="app-card-top">
            <div class="app-icon-badge">
              <img src="${app.iconImage}" alt="${app.name}" class="app-brand-icon" loading="lazy">
            </div>
            <div class="app-names">
              <span class="app-name-en">${app.name}</span>
              <span class="app-name-kr">${app.nameKr}</span>
            </div>
          </div>
          <span class="app-tag-pill" style="color: ${app.color}; background: ${app.color}15;">${app.tag}</span>
          <p class="app-desc">${app.summary}</p>
          <div class="app-pro-tip" style="border-left-color: ${app.color};">
            💡 <strong>Foreigner Tip:</strong> ${app.travelerTip}
          </div>
        </div>
        <div class="app-links-row">
          <a href="${app.iosUrl}" target="_blank" rel="noopener noreferrer" class="app-store-btn btn-apple" title="Download on App Store">
            <img src="assets/icons/app_store.png" alt="App Store" class="store-icon">
            <span>App Store</span>
          </a>
          <a href="${app.androidUrl}" target="_blank" rel="noopener noreferrer" class="app-store-btn btn-google" title="Get it on Google Play">
            <img src="assets/icons/google_play.png" alt="Google Play" class="store-icon">
            <span>Google Play</span>
          </a>
        </div>
      `;
      appsCarouselContainer.appendChild(card);
    });
  }
  renderEssentialApps();

  whyAppsLink.addEventListener('click', () => {
    openFlashcardModal(
      "왜 한국에서는 구글맵 대신 네이버지도를 써야 하나요?",
      "Wae han-guk-e-seo-neun naver-ji-do-reul sseo-ya ha-na-yo?",
      "Due to South Korean National Security & Spatial Information laws, Google Maps cannot export high-precision vector walking data. Naver Map provides 100% accurate subway, bus, and alley walking paths in English."
    );
  });

  // =========================================================================
  // 3. Interactive Leaflet Map & Facilities
  // =========================================================================
  function initMap() {
    if (typeof L === 'undefined') {
      console.warn('Leaflet library is loading or blocked. Retrying...');
      setTimeout(initMap, 500);
      return;
    }

    // Centered between Bukchon and Seochon (around Gyeongbokgung)
    mapInstance = L.map('travelMap', {
      center: [37.5805, 126.9775],
      zoom: 15,
      zoomControl: true
    });

    // Official OpenStreetMap (Humanitarian OSM style) - 100% Free, authentic OSM, no 403 block on file:///
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles by <a href="https://www.hotosm.org/" target="_blank">HOT</a>',
      subdomains: 'abc',
      maxZoom: 19
    }).addTo(mapInstance);

    // Resilient fallback if user's local network restricts OSM France
    osmLayer.on('tileerror', function() {
      if (!mapInstance._hasFallbackLayer) {
        mapInstance._hasFallbackLayer = true;
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri, OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(mapInstance);
      }
    });

    markersLayer = L.layerGroup().addTo(mapInstance);
    renderMapMarkers();
    updateFilterCounts();
  }

  function getMarkerIcon(type) {
    let iconChar = '📍';
    let bgColor = '#1B6EF3';

    if (type === 'tourism') {
      iconChar = '🏛️';
      bgColor = '#4F46E5'; // Indigo/Purple
    } else if (type === 'restroom') {
      iconChar = '🚾';
      bgColor = '#0284C7'; // Sky/Ocean Blue
    } else if (type === 'trash_bin') {
      iconChar = '🗑️';
      bgColor = '#059669'; // Emerald
    } else if (type === 'craft') {
      iconChar = '🏮';
      bgColor = '#D97706'; // Amber
    } else if (type === 'culture') {
      iconChar = '📖';
      bgColor = '#7C3AED';
    } else if (type === 'market') {
      iconChar = '🥢';
      bgColor = '#E11D48'; // Rose
    } else if (type === 'heritage') {
      iconChar = '🏯';
      bgColor = '#C25B38'; // Terracotta
    }

    return L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="
        background: ${bgColor};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
        border: 2px solid #FFFFFF;
        font-size: 14px;
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
      ">${iconChar}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
  }

  function renderMapMarkers() {
    if (!markersLayer) return;
    markersLayer.clearLayers();
    mapMarkers = [];

    const filtered = APP_DATA.places.filter(place => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'tourism') return place.type === 'tourism';
      if (activeFilter === 'restroom') return place.type === 'restroom';
      if (activeFilter === 'trash_bin') return place.type === 'trash_bin';
      if (activeFilter === 'heritage') return place.type === 'heritage';
      if (activeFilter === 'craft') return place.type === 'craft' || place.type === 'culture';
      return true;
    });

    filtered.forEach(place => {
      const marker = L.marker([place.lat, place.lng], {
        icon: getMarkerIcon(place.type)
      }).addTo(markersLayer);

      marker.on('click', () => {
        selectSpot(place);
      });

      mapMarkers.push({ place, marker });
    });

    if (filtered.length > 0 && !filtered.includes(activeSpot)) {
      selectSpot(filtered[0]);
    }
  }

  function selectSpot(place) {
    activeSpot = place;
    drawerCategory.textContent = place.categoryLabel || place.type;
    drawerNameEn.textContent = place.name;
    drawerNameKr.textContent = place.nameKr;
    const isRestricted = place.isRestrictedZone || place.badge === 'Restricted Hours';
    drawerBadge.textContent = place.badge || (isRestricted ? 'Restricted Zone' : 'Open');
    drawerBadge.className = isRestricted ? 'spot-badge-tag restricted' : 'spot-badge-tag';
    
    let extraMeta = '';
    if (place.tel) extraMeta += ` • 📞 ${place.tel}`;
    if (place.link) extraMeta += ` • <a href="${place.link}" target="_blank" rel="noopener noreferrer" style="color: #1B6EF3; text-decoration: underline;">Website</a>`;
    drawerEtiquette.innerHTML = `ℹ️ <strong>Tips & Etiquette:</strong> ${place.etiquetteRule || place.description}${extraMeta}`;

    drawerNavBtn.onclick = () => {
      const naverSearchUrl = `https://map.naver.com/p/search/${encodeURIComponent(place.nameKr)}`;
      window.open(naverSearchUrl, '_blank');
    };

    drawerTaxiCardBtn.onclick = () => {
      openFlashcardModal(
        `${place.nameKr}로 가주세요.`,
        `주소: ${place.addressKr}`,
        `Please take me to ${place.name}. Address: ${place.address}`
      );
    };

    // Pan map smoothly
    if (mapInstance) {
      mapInstance.panTo([place.lat, place.lng], { animate: true, duration: 0.6 });
    }
  }

  // Dynamic Filter Counts Updater
  function updateFilterCounts() {
    if (!APP_DATA || !APP_DATA.places) return;
    const totalCount = APP_DATA.places.length;
    const tourismCount = APP_DATA.places.filter(p => p.type === 'tourism').length;
    const restroomCount = APP_DATA.places.filter(p => p.type === 'restroom').length;
    const trashCount = APP_DATA.places.filter(p => p.type === 'trash_bin').length;
    const craftCount = APP_DATA.places.filter(p => p.type === 'craft' || p.type === 'culture').length;

    const pillAll = document.getElementById('pillAll');
    const pillTourism = document.getElementById('pillTourism');
    const pillRestroom = document.getElementById('pillRestroom');
    const pillTrash = document.getElementById('pillTrash');
    const pillCraft = document.getElementById('pillCraft');

    if (pillAll) pillAll.textContent = `⭐ All (${totalCount})`;
    if (pillTourism) pillTourism.textContent = `🏛️ Attractions (${tourismCount})`;
    if (pillRestroom) pillRestroom.textContent = `🚾 Restrooms (${restroomCount})`;
    if (pillTrash) pillTrash.textContent = `🗑️ Trash Bins (${trashCount})`;
    if (pillCraft) pillCraft.textContent = `🏮 Craft & Culture (${craftCount})`;

    if (datasourceStatusText) {
      datasourceStatusText.textContent = `Seoul Open Data • Attractions ${tourismCount} · Restrooms ${restroomCount} · Trash Bins ${trashCount}`;
    }
  }

  /**
   * Safe Horizontal Drag & Scroll Engine
   * - Touch devices: Native browser touch swipe (untouched, 100% reliable)
   * - Desktop Mouse: Wheel to horizontal scroll conversion
   * - Desktop Mouse: Click & Drag to swipe (only activates when mouse moves > 10px)
   * - Never blocks normal button clicks
   */
  function setupHorizontalSwipeScroller(container) {
    if (!container) return;

    let isMouseDown = false;
    let startX = 0;
    let scrollStart = 0;
    let isDragging = false;
    const DRAG_THRESHOLD = 10; // px

    // Mouse wheel horizontal conversion
    container.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY * 1.3,
          behavior: 'smooth'
        });
      }
    }, { passive: false });

    // Desktop Mouse Drag only (touch is handled natively by CSS overflow-x: auto)
    container.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Primary mouse button only
      isMouseDown = true;
      isDragging = false;
      startX = e.clientX;
      scrollStart = container.scrollLeft;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      const diff = e.clientX - startX;
      if (!isDragging && Math.abs(diff) > DRAG_THRESHOLD) {
        isDragging = true;
        container.style.cursor = 'grabbing';
      }
      if (isDragging) {
        container.scrollLeft = scrollStart - diff;
      }
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      container.style.cursor = '';

      if (isDragging) {
        // Prevent click if mouse actually dragged across the bar
        const suppressClick = (ev) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        container.addEventListener('click', suppressClick, { capture: true, once: true });
        setTimeout(() => {
          container.removeEventListener('click', suppressClick, { capture: true });
          isDragging = false;
        }, 50);
      }
    });
  }

  function scrollItemIntoCenter(item, container) {
    if (!item) return;
    item.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }

  // Map Filter Buttons
  if (mapFilterPills) {
    const mapButtons = mapFilterPills.querySelectorAll('.filter-pill');
    mapButtons.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        mapButtons.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        scrollItemIntoCenter(pill, mapFilterPills);
        activeFilter = pill.dataset.filter;
        renderMapMarkers();
      });
    });
  }

  // API Settings Modal Handlers
  if (openApiModalBtn && apiSettingsModal) {
    openApiModalBtn.addEventListener('click', () => {
      if (typeof SeoulOpenApi !== 'undefined' && seoulApiKeyInput) {
        seoulApiKeyInput.value = SeoulOpenApi.getApiKey();
      }
      if (apiSyncStatusMessage) {
        apiSyncStatusMessage.style.display = 'none';
      }
      apiSettingsModal.classList.add('active');
    });
  }

  if (closeApiModalBtn && apiSettingsModal) {
    closeApiModalBtn.addEventListener('click', () => {
      apiSettingsModal.classList.remove('active');
    });
  }

  if (apiSettingsModal) {
    apiSettingsModal.addEventListener('click', (e) => {
      if (e.target === apiSettingsModal) {
        apiSettingsModal.classList.remove('active');
      }
    });
  }

  if (saveApiKeyBtn && typeof SeoulOpenApi !== 'undefined') {
    saveApiKeyBtn.addEventListener('click', () => {
      const key = seoulApiKeyInput ? seoulApiKeyInput.value.trim() : '';
      SeoulOpenApi.saveApiKey(key);
      showToast(key ? '인증키가 저장되었습니다.' : '인증키가 삭제되었습니다.');
      if (apiSyncStatusMessage) {
        apiSyncStatusMessage.style.display = 'block';
        apiSyncStatusMessage.className = 'api-sync-status success';
        apiSyncStatusMessage.innerHTML = `✅ <strong>저장 완료:</strong> ${key ? '인증키가 안전하게 저장되었습니다.' : '인증키가 비워졌습니다. 기본 내장 공식 데이터가 유지됩니다.'}`;
      }
    });
  }

  if (syncLiveApiBtn && typeof SeoulOpenApi !== 'undefined') {
    syncLiveApiBtn.addEventListener('click', async () => {
      const key = seoulApiKeyInput ? seoulApiKeyInput.value.trim() : '';
      if (!key) {
        if (apiSyncStatusMessage) {
          apiSyncStatusMessage.style.display = 'block';
          apiSyncStatusMessage.className = 'api-sync-status warning';
          apiSyncStatusMessage.innerHTML = '⚠️ 서울 열린데이터광장 일반 인증키를 입력해주세요.';
        }
        return;
      }

      syncLiveApiBtn.disabled = true;
      syncLiveApiBtn.textContent = '동기화 중...';
      if (apiSyncStatusMessage) {
        apiSyncStatusMessage.style.display = 'block';
        apiSyncStatusMessage.className = 'api-sync-status info';
        apiSyncStatusMessage.innerHTML = '⏳ 서울시 공공데이터 서버에서 실시간 종로구 화장실 데이터를 조회 중입니다...';
      }

      try {
        let syncedMsg = [];
        const liveRestrooms = await SeoulOpenApi.fetchLiveRestrooms(key);
        if (liveRestrooms && liveRestrooms.length > 0) {
          APP_DATA.updatePlacesWithLiveRestrooms(liveRestrooms);
          syncedMsg.push(`화장실 ${liveRestrooms.length}개소`);
        }
        try {
          const liveTourism = await SeoulOpenApi.fetchLiveTourismEng(key);
          if (liveTourism && liveTourism.length > 0) {
            APP_DATA.updatePlacesWithLiveTourism(liveTourism);
            syncedMsg.push(`관광지 ${liveTourism.length}개소`);
          }
        } catch (tourErr) {
          console.warn('Live tourism sync note:', tourErr);
        }

        renderMapMarkers();
        updateFilterCounts();
        apiSyncStatusMessage.className = 'api-sync-status success';
        apiSyncStatusMessage.innerHTML = `🎉 <strong>동기화 성공!</strong> 종로구 ${syncedMsg.join(', ')}를 실시간으로 지도에 반영했습니다.`;
        showToast(`실시간 공공데이터 동기화 완료!`);
      } catch (err) {
        console.error('Live sync error:', err);
        apiSyncStatusMessage.className = 'api-sync-status error';
        apiSyncStatusMessage.innerHTML = `⚠️ <strong>연동 안내:</strong> ${err.message}<br><small>* 현재는 서울시 열린데이터 광장 공식 정제 데이터셋(관광 25선 / 화장실 22개소 / 휴지통 20개소)으로 정상 서비스 중입니다.</small>`;
      } finally {
        syncLiveApiBtn.disabled = false;
        syncLiveApiBtn.textContent = '🔄 실시간 API 동기화';
      }
    });
  }

  // =========================================================================
  // 4. Low-Token 1-Card AI Spotlight (MVP)
  // =========================================================================
  function renderAiCard(moodKey) {
    const item = APP_DATA.aiCurationMoods[moodKey];
    if (!item) return;

    activeMood = moodKey;
    aiSpotlightCard.style.opacity = '0';

    setTimeout(() => {
      aiCardTagline.innerHTML = `<span>✨</span> ${item.tag} • ${item.area}`;
      aiCardTitleEn.textContent = item.title;
      aiCardTitleKr.textContent = item.titleKr;
      aiCardStory.textContent = item.story;
      aiCardTip.innerHTML = `🤫 <strong>Respect Tip:</strong> ${item.respectTip}`;

      aiCardNavBtn.onclick = () => {
        const url = `https://map.naver.com/p/search/${encodeURIComponent(item.titleKr)}`;
        window.open(url, '_blank');
      };

      aiCardDriverBtn.onclick = () => {
        openFlashcardModal(
          `${item.titleKr}로 가주세요.`,
          item.koreanAddress,
          `Please take me to ${item.title}. Address: ${item.koreanAddress}`
        );
      };

      aiSpotlightCard.style.opacity = '1';
    }, 150);
  }

  if (moodChipsGroup) {
    const moodChips = moodChipsGroup.querySelectorAll('.mood-chip');
    moodChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        moodChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        scrollItemIntoCenter(chip, moodChipsGroup);
        renderAiCard(chip.dataset.mood);
      });
    });
  }

  renderAiCard(activeMood);

  // =========================================================================
  // 5. Resident Etiquette Principles & Pledge
  // =========================================================================
  function renderEtiquettePrinciples() {
    etiquetteGridContainer.innerHTML = '';
    APP_DATA.etiquettePrinciples.forEach(rule => {
      const card = document.createElement('div');
      card.className = 'etiquette-card';
      card.innerHTML = `
        <div class="etiquette-icon">${rule.icon}</div>
        <div class="etiquette-title">${rule.title}</div>
        <p class="etiquette-rule">${rule.action}</p>
      `;
      etiquetteGridContainer.appendChild(card);
    });
  }
  renderEtiquettePrinciples();

  // Check saved pledge
  if (localStorage.getItem('seobuk_pledge_signed') === 'true') {
    markPledgeCompleted(false);
  }

  takePledgeBtn.addEventListener('click', () => {
    markPledgeCompleted(true);
  });

  function markPledgeCompleted(animate) {
    localStorage.setItem('seobuk_pledge_signed', 'true');
    pledgeStampBadge.classList.add('stamped');
    pledgeStampBadge.textContent = '🏅';
    pledgeTitle.textContent = 'Verified Kind Traveler!';
    pledgeDesc.textContent = 'Thank you for protecting Bukchon & Seochon with your mindful respect. You are welcomed with warmth by local residents.';
    takePledgeBtn.textContent = '✓ Pledge Active & Honored';
    takePledgeBtn.disabled = true;

    if (animate) {
      showToast('🎉 Thank you! You earned the Kind Traveler Badge!');
    }
  }

  // =========================================================================
  // 6. Driver & Local Communication Flashcards
  // =========================================================================
  let activePhraseFilter = 'all';

  function updatePhraseFilterCounts() {
    if (!phraseFilterPills || !APP_DATA || !APP_DATA.driverPhrases) return;
    const totalCount = APP_DATA.driverPhrases.length;
    const tourismCount = APP_DATA.driverPhrases.filter(p => p.category === 'tourism').length;
    const restroomCount = APP_DATA.driverPhrases.filter(p => p.category === 'restroom').length;
    const trashCount = APP_DATA.driverPhrases.filter(p => p.category === 'trash').length;
    const etiquetteCount = APP_DATA.driverPhrases.filter(p => p.category === 'etiquette').length;

    phraseFilterPills.querySelectorAll('.phrase-filter-pill').forEach(pill => {
      const filter = pill.dataset.filter;
      if (filter === 'all') pill.textContent = `⭐ All (${totalCount})`;
      else if (filter === 'tourism') pill.textContent = `🏛️ Attractions (${tourismCount})`;
      else if (filter === 'restroom') pill.textContent = `🚾 Restrooms (${restroomCount})`;
      else if (filter === 'trash') pill.textContent = `🗑️ Trash Bins (${trashCount})`;
      else if (filter === 'etiquette') pill.textContent = `🤫 Etiquette (${etiquetteCount})`;
    });
  }

  function renderPhraseCards(filter = activePhraseFilter) {
    phraseCardsContainer.innerHTML = '';
    activePhraseFilter = filter;

    const filtered = APP_DATA.driverPhrases.filter(p => {
      if (activePhraseFilter === 'all') return true;
      return p.category === activePhraseFilter;
    });

    if (filtered.length === 0) {
      phraseCardsContainer.innerHTML = `
        <div style="text-align: center; padding: 24px 16px; color: #64748B; background: #FFFFFF; border-radius: 12px; border: 1px dashed #D1D5DB; font-size: 0.85rem;">
          No phrases found in this category.
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const item = document.createElement('div');
      item.className = 'phrase-card';
      item.innerHTML = `
        <span class="phrase-situation">${p.situation}</span>
        <div class="phrase-kr">${p.phraseKr}</div>
        <div class="phrase-phonetic">${p.phonetic}</div>
        <div class="phrase-english">"${p.english}"</div>
        <div class="phrase-card-bottom">
          <button class="btn-phrase-tool btn-speak-phrase" data-phrase="${encodeURIComponent(p.phraseKr)}">
            <span>🔊</span> Listen
          </button>
          <button class="btn-phrase-tool btn-show-phrase" data-kr="${encodeURIComponent(p.phraseKr)}" data-ph="${encodeURIComponent(p.phonetic)}" data-en="${encodeURIComponent(p.english)}">
            <span>🔍</span> Enlarge
          </button>
        </div>
      `;
      phraseCardsContainer.appendChild(item);
    });
  }

  // Phrase Filter Pill Click Event
  if (phraseFilterPills) {
    const phraseButtons = phraseFilterPills.querySelectorAll('.phrase-filter-pill');
    phraseButtons.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        phraseButtons.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        scrollItemIntoCenter(pill, phraseFilterPills);
        renderPhraseCards(pill.dataset.filter);
      });
    });
  }

  updatePhraseFilterCounts();
  renderPhraseCards('all');

  // Activate Horizontal Swipe Scrollers
  setupHorizontalSwipeScroller(appsCarouselContainer);
  setupHorizontalSwipeScroller(mapFilterPills);
  setupHorizontalSwipeScroller(moodChipsGroup);
  setupHorizontalSwipeScroller(phraseFilterPills);

  phraseCardsContainer.addEventListener('click', (e) => {
    const speakBtn = e.target.closest('.btn-speak-phrase');
    if (speakBtn) {
      const phrase = decodeURIComponent(speakBtn.dataset.phrase);
      speakKoreanText(phrase);
      return;
    }

    const showBtn = e.target.closest('.btn-show-phrase');
    if (showBtn) {
      openFlashcardModal(
        decodeURIComponent(showBtn.dataset.kr),
        decodeURIComponent(showBtn.dataset.ph),
        decodeURIComponent(showBtn.dataset.en)
      );
    }
  });

  if (openTaxiModalQuickBtn) {
    openTaxiModalQuickBtn.addEventListener('click', () => {
      openFlashcardModal(
        activeSpot.nameKr + "로 가주세요.",
        activeSpot.addressKr,
        `Please take me to ${activeSpot.name}. Address: ${activeSpot.address}`
      );
    });
  }

  // Modal controls
  function openFlashcardModal(korean, phonetic, english) {
    modalKoreanText.textContent = korean;
    modalPhonetic.textContent = phonetic;
    modalEnglishMeaning.textContent = english;
    flashcardModal.classList.add('open');
  }

  function closeFlashcardModal() {
    flashcardModal.classList.remove('open');
  }

  modalCloseBtn.addEventListener('click', closeFlashcardModal);
  flashcardModal.addEventListener('click', (e) => {
    if (e.target === flashcardModal) closeFlashcardModal();
  });

  modalSpeakBtn.addEventListener('click', () => {
    speakKoreanText(modalKoreanText.textContent);
  });

  function speakKoreanText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85; // slightly slower for clarity
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Speaking Korean pronunciation...');
    } else {
      showToast('Text-to-speech not supported on this browser.');
    }
  }

  // Toast Helper
  let toastTimer = null;
  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    appToast.textContent = msg;
    appToast.classList.add('show');
    toastTimer = setTimeout(() => {
      appToast.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // 7. Mobile Bottom Tab Navigation
  // =========================================================================
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.dataset.target;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Initialize Map
  initMap();
});
