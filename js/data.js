// SeoBuk ON (서북온) - Bukchon & Seochon Tourism App Data

/**
 * Seoul Open Data Plaza API Module (서울시 열린데이터 광장 공공데이터 연동 모듈)
 * 종로구 공중화장실 (SearchPublicToiletPOIService) 및 가로휴지통 실제 데이터
 */
const SeoulOpenApi = (function() {
  const STORAGE_KEY_API_KEY = 'seoul_open_data_api_key';
  const TOILET_SERVICE = 'SearchPublicToiletPOIService';

  // 종로구 실제 공중화장실 데이터 (서울시 공중화장실 위치정보 기준 22곳)
  const JONGNO_REAL_RESTROOMS = [
    {
      id: "r-jongno-01",
      area: "bukchon",
      type: "restroom",
      name: "Anguk Station Underground Restroom",
      nameKr: "안국역 지하 1층 공중화장실 (3호선)",
      lat: 37.5768,
      lng: 126.9856,
      address: "B1, 62 Yulgok-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 율곡로 지하 62 (안국역 대합실)",
      hours: "05:30 - 24:00 (Subway Operating Hours)",
      categoryLabel: "Public Subway Restroom",
      badge: "Clean & Wheelchair Accessible",
      description: "종로구 관내 주요 역사 공중화장실로 장애인 화장실 및 기저귀 교환대가 구비되어 있습니다.",
      etiquetteRule: "Use designated paper bins and keep sinks tidy for fellow commuters and travelers."
    },
    {
      id: "r-jongno-02",
      area: "seochon",
      type: "restroom",
      name: "Gyeongbokgung Station Public Restroom",
      nameKr: "경복궁역 2번 출구 대합실 공중화장실",
      lat: 37.5759,
      lng: 126.9736,
      address: "B1, 1 Jahamun-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로 지하 1 (경복궁역 3호선)",
      hours: "05:30 - 24:00 (Subway Operating Hours)",
      categoryLabel: "Public Subway Restroom",
      badge: "Seochon Gateway",
      description: "서촌마을 진입로에 위치한 대형 공중화장실로 청결도가 매우 우수합니다.",
      etiquetteRule: "Conveniently located before entering Seochon's quiet residential alleys."
    },
    {
      id: "r-jongno-03",
      area: "bukchon",
      type: "restroom",
      name: "Bukchon Traditional Culture Center Restroom",
      nameKr: "북촌문화센터 개방 화장실",
      lat: 37.5794,
      lng: 126.9865,
      address: "37 Gyedong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 계동길 37 북촌문화센터 내",
      hours: "09:00 - 18:00 (Year-round open)",
      categoryLabel: "Public Open Restroom",
      badge: "Hanok Courtyard",
      description: "종로구청 및 서울시가 운영하는 전통 한옥 문화센터 내 개방형 공중화장실입니다.",
      etiquetteRule: "Please walk gently on the wooden deck outside the courtyard."
    },
    {
      id: "r-jongno-04",
      area: "bukchon",
      type: "restroom",
      name: "Baek In-je House Visitor Restroom",
      nameKr: "백인제 가옥 방문객 공중화장실",
      lat: 37.5818,
      lng: 126.9848,
      address: "62 Bukchon-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 북촌로 62 (가회동)",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Heritage Site Restroom",
      badge: "Free Public Access",
      description: "근대 한옥 백인제 가옥 입구에 마련된 방문객 전용 청결 화장실입니다.",
      etiquetteRule: "Accessible during estate visiting hours."
    },
    {
      id: "r-jongno-05",
      area: "bukchon",
      type: "restroom",
      name: "Samcheong Park Entrance Restroom",
      nameKr: "삼청공원 입구 공중화장실",
      lat: 37.5898,
      lng: 126.9853,
      address: "134-1 Bukchon-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 북촌로 134-1 삼청공원 입구",
      hours: "24 Hours (Open Daily)",
      categoryLabel: "Park Public Restroom",
      badge: "24H Open • Emergency Bell",
      description: "북악산 산책로와 연결되는 삼청공원 입구 공중화장실로 안심비상벨이 설치되어 있습니다.",
      etiquetteRule: "Keep clean after walking forest trails."
    },
    {
      id: "r-jongno-06",
      area: "seochon",
      type: "restroom",
      name: "Tongin Market Customer Center Restroom",
      nameKr: "통인시장 고객만족센터 공중화장실",
      lat: 37.5809,
      lng: 126.9695,
      address: "18 Jahamun-ro 15-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로15길 18 통인시장 2층",
      hours: "09:00 - 20:00 (Market Hours)",
      categoryLabel: "Traditional Market Restroom",
      badge: "Market Customer Center",
      description: "통인시장 중간에 위치한 고객만족센터 내 화장실로 여행자 쉼터와 함께 운영됩니다.",
      etiquetteRule: "Market shoppers and lunchbox visitors are welcome."
    },
    {
      id: "r-jongno-07",
      area: "seochon",
      type: "restroom",
      name: "Sajik Park Public Restroom",
      nameKr: "사직단 사직공원 공중화장실",
      lat: 37.5758,
      lng: 126.9672,
      address: "89 Sajik-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 사직로 89 사직공원 내",
      hours: "24 Hours (Open Daily)",
      categoryLabel: "Park Public Restroom",
      badge: "Historic Park Facility",
      description: "종로구 사직단 역사문화공원 내 상시 개방 공중화장실입니다.",
      etiquetteRule: "Preserve park cleanliness."
    },
    {
      id: "r-jongno-08",
      area: "seochon",
      type: "restroom",
      name: "Suseongdong Valley Public Restroom",
      nameKr: "인왕산 수성동계곡 공중화장실",
      lat: 37.5804,
      lng: 126.9612,
      address: "179-1 Okin-dong, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 옥인동 179-1 수성동계곡 입구",
      hours: "24 Hours (Open Daily)",
      categoryLabel: "Ecological Restroom",
      badge: "Mountain Trailhead",
      description: "인왕산 한양도성 탐방로 시작점에 위치한 친환경 공중화장실입니다.",
      etiquetteRule: "No trash dumping in mountain streams."
    },
    {
      id: "r-jongno-09",
      area: "jongno",
      type: "restroom",
      name: "Gwanghwamun Square Haechi Madang Restroom",
      nameKr: "광화문광장 해치마당 공중화장실",
      lat: 37.5717,
      lng: 126.9768,
      address: "172 Sejong-daero, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 세종대로 172 광화문역 연결통로",
      hours: "06:00 - 23:00",
      categoryLabel: "Civic Plaza Restroom",
      badge: "High Accessibility",
      description: "새롭게 단장된 광화문광장 해치마당에 위치한 현대식 대형 공중화장실입니다.",
      etiquetteRule: "Spacious with modern diaper-changing amenities."
    },
    {
      id: "r-jongno-10",
      area: "jongno",
      type: "restroom",
      name: "Sejong Center Open Restroom",
      nameKr: "세종문화회관 1층 개방 화장실",
      lat: 37.5724,
      lng: 126.9754,
      address: "175 Sejong-daero, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 세종대로 175 세종문화회관 1층",
      hours: "09:00 - 22:00",
      categoryLabel: "Cultural Center Restroom",
      badge: "Public Open Facility",
      description: "종로구 대표 공연예술 복합시설인 세종문화회관 1층 로비 개방화장실입니다.",
      etiquetteRule: "Quietly accessible during performance and hall open hours."
    },
    {
      id: "r-jongno-11",
      area: "jongno",
      type: "restroom",
      name: "Jonggak Station Underground Arcade Restroom",
      nameKr: "종각역 지하도상가 공중화장실",
      lat: 37.5702,
      lng: 126.9829,
      address: "B1, 55 Jong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 종로 지하 55 (종각역)",
      hours: "05:30 - 24:00",
      categoryLabel: "Underground Arcade Restroom",
      badge: "Transit Hub",
      description: "지하철 1호선 종각역 지하도상가 10번 출구 인근에 위치한 공중화장실입니다.",
      etiquetteRule: "High-traffic transit restroom."
    },
    {
      id: "r-jongno-12",
      area: "jongno",
      type: "restroom",
      name: "Tapgol Park Public Restroom",
      nameKr: "탑골공원 공중화장실",
      lat: 37.5712,
      lng: 126.9882,
      address: "99 Jong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 종로 99 탑골공원 경내",
      hours: "06:00 - 18:00",
      categoryLabel: "Historic Site Restroom",
      badge: "Jongno-gu Direct Care",
      description: "3·1독립선언서가 울려 퍼진 사적 제354호 탑골공원 관리사무소 뒤편 화장실입니다.",
      etiquetteRule: "Respect historic grounds while visiting."
    },
    {
      id: "r-jongno-13",
      area: "insadong",
      type: "restroom",
      name: "Insa-dong Naminsa Tourist Info Restroom",
      nameKr: "남인사마당 관광안내소 공중화장실",
      lat: 37.5721,
      lng: 126.9866,
      address: "12 Insadong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 인사동길 12 남인사마당 입구",
      hours: "09:00 - 21:00",
      categoryLabel: "Tourism Zone Restroom",
      badge: "Tourist Assistance Center",
      description: "인사동 문화의거리 남측 입구 관광안내소 바로 옆에 위치하여 외국인 관광객에게 친화적입니다.",
      etiquetteRule: "Multilingual guidance available at the adjacent desk."
    },
    {
      id: "r-jongno-14",
      area: "insadong",
      type: "restroom",
      name: "Ssamziegil Open Restroom",
      nameKr: "인사동 쌈지길 지하 개방화장실",
      lat: 37.5744,
      lng: 126.9849,
      address: "44 Insadong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 인사동길 44 쌈지길 B1",
      hours: "10:30 - 20:30",
      categoryLabel: "Artisan Mall Open Restroom",
      badge: "Crafts Complex",
      description: "인사동 대표 복합문화공간 쌈지길 지하 1층에 자리한 공공 개방화장실입니다.",
      etiquetteRule: "Accessible during Ssamziegil operating hours."
    },
    {
      id: "r-jongno-15",
      area: "jongno",
      type: "restroom",
      name: "Jongno 3-ga Transfer Passage Restroom",
      nameKr: "종로3가역 환승통로 공중화장실 (1·3·5호선)",
      lat: 37.5714,
      lng: 126.9918,
      address: "30 Donhwamun-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 돈화문로 30 종로3가역 내부",
      hours: "05:30 - 24:00",
      categoryLabel: "Subway Hub Restroom",
      badge: "Triple Line Hub",
      description: "종로3가역 1호선-3호선-5호선 환승 구역에 위치한 대형 공중화장실입니다.",
      etiquetteRule: "Clean and well-maintained commuter facility."
    },
    {
      id: "r-jongno-16",
      area: "bukchon",
      type: "restroom",
      name: "Changdeokgung Donhwamun Ticket Booth Restroom",
      nameKr: "창덕궁 돈화문 매표소 옆 공중화장실",
      lat: 37.5778,
      lng: 126.9908,
      address: "99 Yulgok-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 율곡로 99 창덕궁 정문 우측",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Palace Plaza Restroom",
      badge: "UNESCO World Heritage Gateway",
      description: "유네스코 세계문화유산 창덕궁 정문 돈화문 광장에 위치한 개방형 화장실입니다.",
      etiquetteRule: "Free entry without palace admission ticket."
    },
    {
      id: "r-jongno-17",
      area: "jongno",
      type: "restroom",
      name: "Gwangjang Market East Gate Restroom",
      nameKr: "광장시장 동문 앞 공중화장실",
      lat: 37.5701,
      lng: 127.0003,
      address: "88 Changgyeonggung-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 창경궁로 88 광장시장 입구",
      hours: "08:00 - 22:00",
      categoryLabel: "Market Hub Restroom",
      badge: "Market Food Alley",
      description: "먹거리 골목으로 유명한 광장시장 방문객을 위한 종로구 관리 공중화장실입니다.",
      etiquetteRule: "Please wash hands thoroughly after enjoying market finger foods."
    },
    {
      id: "r-jongno-18",
      area: "daehakro",
      type: "restroom",
      name: "Marronnier Park Public Restroom",
      nameKr: "대학로 마로니에공원 공중화장실",
      lat: 37.5807,
      lng: 127.0028,
      address: "1 Daehak-ro 8-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 대학로8길 1 마로니에공원",
      hours: "24 Hours (Open Daily)",
      categoryLabel: "Arts Park Restroom",
      badge: "24H Open • Safe Zone",
      description: "대학로 문화예술거리 중심부 마로니에공원에 위치한 상시개방 공중화장실입니다.",
      etiquetteRule: "Equipped with direct-line police safety bells."
    },
    {
      id: "r-jongno-19",
      area: "daehakro",
      type: "restroom",
      name: "Hyehwa Station Exit 1 Restroom",
      nameKr: "혜화역 1번 출구 지하철 화장실",
      lat: 37.5822,
      lng: 127.0019,
      address: "120 Daehak-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 대학로 지하 120 (혜화역)",
      hours: "05:30 - 24:00",
      categoryLabel: "Subway Public Restroom",
      badge: "Theater District",
      description: "대학로 소극장 거리 접근로에 위치한 4호선 혜화역 공중화장실입니다.",
      etiquetteRule: "High crowd flow on weekend performance times."
    },
    {
      id: "r-jongno-20",
      area: "seochon",
      type: "restroom",
      name: "Cheongun Literature Library Restroom",
      nameKr: "청운문학도서관 한옥 공중화장실",
      lat: 37.5919,
      lng: 126.9686,
      address: "40 Jahamun-ro 36-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로36길 40 (청운동)",
      hours: "10:00 - 19:00 (Closed Mondays)",
      categoryLabel: "Hanok Library Restroom",
      badge: "Scenic Traditional Hanok",
      description: "인왕산 자락 아래 기와와 폭포수가 어우러진 한옥도서관 내 아름다운 공중화장실입니다.",
      etiquetteRule: "Whispering quiet zone within library grounds."
    },
    {
      id: "r-jongno-21",
      area: "jongno",
      type: "restroom",
      name: "Gyeonghuigung Park Public Restroom",
      nameKr: "경희궁공원 공중화장실",
      lat: 37.5711,
      lng: 126.9683,
      address: "55 Saemunan-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 새문안로 55 경희궁 입구",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Palace Park Restroom",
      badge: "Historical Park",
      description: "경희궁 숭정전 진입로와 서울역사박물관 사이에 위치한 공중화장실입니다.",
      etiquetteRule: "Maintain quiet palace park atmosphere."
    },
    {
      id: "r-jongno-22",
      area: "jongno",
      type: "restroom",
      name: "Seoul Museum of History Lobby Restroom",
      nameKr: "서울역사박물관 1층 로비 개방화장실",
      lat: 37.5704,
      lng: 126.9708,
      address: "55 Saemunan-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 새문안로 55 서울역사박물관 1층",
      hours: "09:00 - 18:00",
      categoryLabel: "Museum Public Restroom",
      badge: "Barrier-Free Verified",
      description: "무료로 관람할 수 있는 서울역사박물관 1층 로비에 위치한 배리어프리 공공 화장실입니다.",
      etiquetteRule: "Free access through main museum glass foyer."
    }
  ];

  // 종로구 실제 가로휴지통 설치정보 (서울시 종로구 가로휴지통 기준 20곳)
  const JONGNO_REAL_TRASH_BINS = [
    {
      id: "t-jongno-01",
      area: "bukchon",
      type: "trash_bin",
      name: "Anguk Station Exit 1 Smart Solar Bin",
      nameKr: "안국역 1번 출구 앞 가로변 태양광 스마트 휴지통",
      lat: 37.5765,
      lng: 126.9845,
      address: "45 Yulgok-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 율곡로 45 (안국역 1번 출구 앞)",
      hours: "24 Hours (Always Accessible)",
      categoryLabel: "Solar Smart Compactor",
      badge: "Recycle & General Partition",
      description: "종로구청 설치 태양광 자동 압축형 가로휴지통으로 플라스틱/캔 분리투입구가 분리되어 있습니다.",
      etiquetteRule: "Please discard empty liquid take-out cups into the plastic compartment."
    },
    {
      id: "t-jongno-02",
      area: "bukchon",
      type: "trash_bin",
      name: "Anguk Station Exit 6 Insadong Entry Bin",
      nameKr: "안국역 6번 출구 (인사동 입구) 가로휴지통",
      lat: 37.5762,
      lng: 126.9871,
      address: "58 Yulgok-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 율곡로 58 가로변",
      hours: "24 Hours",
      categoryLabel: "Street Dual Bin",
      badge: "High-Traffic Pedestrian Spot",
      description: "북촌과 인사동 북측 진입로 횡단보도 앞에 설치된 재활용/일반 겸용 분리수거함입니다.",
      etiquetteRule: "Ideal stop before entering Bukchon's residential alleys."
    },
    {
      id: "t-jongno-03",
      area: "bukchon",
      type: "trash_bin",
      name: "Samcheong-ro MMCA Front Street Bin",
      nameKr: "삼청로 국립현대미술관(MMCA) 앞 가로휴지통",
      lat: 37.5788,
      lng: 126.9803,
      address: "30 Samcheong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 삼청로 30 가로변",
      hours: "24 Hours",
      categoryLabel: "Art Street Bin",
      badge: "Seoul Standard Clean Bin",
      description: "경복궁 동십자각에서 삼청동으로 이어지는 가로수길에 배치된 서울형 표준 가로쓰레기통입니다.",
      etiquetteRule: "Preserve palace wall cleanliness."
    },
    {
      id: "t-jongno-04",
      area: "bukchon",
      type: "trash_bin",
      name: "Samcheong-dong Center Street Bin",
      nameKr: "삼청동 주민센터 앞 가로변 분리수거함",
      lat: 37.5852,
      lng: 126.9818,
      address: "107 Samcheong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 삼청로 107 가로변",
      hours: "24 Hours",
      categoryLabel: "Public Alley Station",
      badge: "Resident & Tourist Station",
      description: "삼청동 카페거리 중간 지점에 설치된 공공 가로휴지통입니다.",
      etiquetteRule: "Do not leave bags on private hanok gates; use this official receptacle."
    },
    {
      id: "t-jongno-05",
      area: "bukchon",
      type: "trash_bin",
      name: "Jaedong Elementary Bus Stop Bin",
      nameKr: "북촌로 재동초등학교 앞 버스정류소 휴지통",
      lat: 37.5786,
      lng: 126.9854,
      address: "19 Bukchon-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 북촌로 19 버스정류장 가로변",
      hours: "24 Hours",
      categoryLabel: "Bus Stop Public Bin",
      badge: "Bukchon Gateway",
      description: "마을버스 정류소 옆에 설치된 종로구 공식 스테인리스 분리배출함입니다.",
      etiquetteRule: "Recycle clear PET bottles in the transparent slot."
    },
    {
      id: "t-jongno-06",
      area: "seochon",
      type: "trash_bin",
      name: "Jahamun-ro Tongui Post Office Bin",
      nameKr: "자하문로 통의동우체국 앞 가로휴지통",
      lat: 37.5782,
      lng: 126.9725,
      address: "10 Jahamun-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로 10 가로변",
      hours: "24 Hours",
      categoryLabel: "Seochon Main Street Bin",
      badge: "Clean Alley Initiative",
      description: "경복궁역에서 자하문터널 방향 서촌 메인 대로변에 설치된 분리수거대입니다.",
      etiquetteRule: "Place coffee cups in designated cup recycling rings."
    },
    {
      id: "t-jongno-07",
      area: "seochon",
      type: "trash_bin",
      name: "Tongin Market West Gate Okin Junction Bin",
      nameKr: "통인시장 서문 옥인길 교차로 가로분리수거대",
      lat: 37.5811,
      lng: 126.9688,
      address: "1 Okin-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 옥인길 1 통인시장 서문 출구 앞",
      hours: "24 Hours",
      categoryLabel: "Market Eco Receptacle",
      badge: "Market Snack Zone",
      description: "통인시장 서문 출구 가로변에 설치된 테이크아웃 간식 분리수거대입니다.",
      etiquetteRule: "Wooden skewers go into general waste; separate drink cups."
    },
    {
      id: "t-jongno-08",
      area: "seochon",
      type: "trash_bin",
      name: "Gyeongbokgung Station Exit 3 Bus Shelter Bin",
      nameKr: "경복궁역 3번 출구 시내버스 정류소 휴지통",
      lat: 37.5761,
      lng: 126.9731,
      address: "2 Jahamun-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로 2 버스쉘터 옆",
      hours: "24 Hours",
      categoryLabel: "Transit Shelter Bin",
      badge: "Bus Transit Stop",
      description: "대중교통 환승객을 위한 종로구 표준 스테인리스 가로쓰레기통입니다.",
      etiquetteRule: "Empty liquids before disposal."
    },
    {
      id: "t-jongno-09",
      area: "jongno",
      type: "trash_bin",
      name: "Gwanghwamun Plaza King Sejong Bus Stop Bin",
      nameKr: "세종대로 광화문광장 세종대왕상 앞 가로휴지통",
      lat: 37.5719,
      lng: 126.9772,
      address: "172 Sejong-daero, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 세종대로 172 광화문광장 버스정류소",
      hours: "24 Hours",
      categoryLabel: "Plaza Smart Receptacle",
      badge: "Seoul Icon Plaza",
      description: "광화문광장 동편 버스정류소 가로변에 설치된 고용량 청결 분리수거대입니다.",
      etiquetteRule: "Keep the national historic plaza clean and spotless."
    },
    {
      id: "t-jongno-10",
      area: "jongno",
      type: "trash_bin",
      name: "Jongno 1-ga Le Meilleur Bus Stop Bin",
      nameKr: "종로1가 르메이에르 종로타운 앞 가로휴지통",
      lat: 37.5706,
      lng: 126.9798,
      address: "19 Jong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 종로 19 중앙버스전용차로 정류소",
      hours: "24 Hours",
      categoryLabel: "Central Bus Lane Bin",
      badge: "Heavy Transit Corridor",
      description: "종로 중앙버스전용차로 승강장에 위치한 대형 가로휴지통입니다.",
      etiquetteRule: "Dispose newspapers and drink containers into proper partitions."
    },
    {
      id: "t-jongno-11",
      area: "jongno",
      type: "trash_bin",
      name: "Jongno Tower Plaza Front Bin",
      nameKr: "종각역 3번 출구 종로타워 광장 가로휴지통",
      lat: 37.5701,
      lng: 126.9836,
      address: "51 Jong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 종로 51 종로타워 앞 보도",
      hours: "24 Hours",
      categoryLabel: "Urban Core Bin",
      badge: "Subway Exit Spot",
      description: "종각역 교차로 보행자 도로에 설치된 서울형 분리수거함입니다.",
      etiquetteRule: "High pedestrian volume - please ensure trash is placed fully inside."
    },
    {
      id: "t-jongno-12",
      area: "insadong",
      type: "trash_bin",
      name: "Bukinsa Plaza Insadong Entrance Bin",
      nameKr: "북인사마당 (인사동 북측 입구) 가로분리수거대",
      lat: 37.5758,
      lng: 126.9868,
      address: "62 Insadong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 인사동길 62 북인사마당",
      hours: "24 Hours",
      categoryLabel: "Traditional Street Bin",
      badge: "Culture Street Entry",
      description: "인사동 문화의거리 북쪽 붓 조형물 마당에 위치한 전통 미관형 분리수거대입니다.",
      etiquetteRule: "Help preserve the traditional culture street cleanliness."
    },
    {
      id: "t-jongno-13",
      area: "insadong",
      type: "trash_bin",
      name: "Insadong Sudo Pharmacy Intersection Bin",
      nameKr: "인사동길 수도약국 사거리 가로휴지통",
      lat: 37.5735,
      lng: 126.9857,
      address: "37 Insadong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 인사동길 37 삼거리 가로변",
      hours: "24 Hours",
      categoryLabel: "Pedestrian Alley Bin",
      badge: "Street Snack Hub",
      description: "인사동 메인 보행전용거리 중심부에 설치된 가로휴지통입니다.",
      etiquetteRule: "Separate plastic drink cups from traditional confectionery paper."
    },
    {
      id: "t-jongno-14",
      area: "jongno",
      type: "trash_bin",
      name: "Tapgol Park Front Bus Stop Bin",
      nameKr: "종로3가 탑골공원 정문 앞 가로휴지통",
      lat: 37.5710,
      lng: 126.9898,
      address: "99 Jong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 종로 99 보도변",
      hours: "24 Hours",
      categoryLabel: "Heritage Perimeter Bin",
      badge: "Historic Park Sidewalk",
      description: "탑골공원 정문 앞 보행자 가로변에 설치된 종로구 공식 휴지통입니다.",
      etiquetteRule: "Keep sidewalks clean."
    },
    {
      id: "t-jongno-15",
      area: "jongno",
      type: "trash_bin",
      name: "Nakwon Musical Instrument Arcade Underpass Bin",
      nameKr: "낙원악기상가 하부 삼일대로 가로휴지통",
      lat: 37.5728,
      lng: 126.9875,
      address: "428 Samil-daero, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 삼일대로 428 하부 가로변",
      hours: "24 Hours",
      categoryLabel: "Thoroughfare Bin",
      badge: "Instrument Arcade Zone",
      description: "인사동과 낙원상가를 연결하는 삼일대로 하부 횡단보도 앞 가로휴지통입니다.",
      etiquetteRule: "High foot traffic crossover zone."
    },
    {
      id: "t-jongno-16",
      area: "jongno",
      type: "trash_bin",
      name: "Gwangjang Market Gate 1 Bus Stop Bin",
      nameKr: "광장시장 북1문 앞 버스정류소 가로휴지통",
      lat: 37.5708,
      lng: 126.9995,
      address: "198 Jong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 종로 198 (종로5가역 방면)",
      hours: "24 Hours",
      categoryLabel: "Market Perimeter Bin",
      badge: "Food Street Station",
      description: "광장시장 마약김밥·빈대떡 골목 북측 출입로에 위치한 가로분리수거함입니다.",
      etiquetteRule: "Discard paper food wrappings into general bin; drink cans into recycling."
    },
    {
      id: "t-jongno-17",
      area: "daehakro",
      type: "trash_bin",
      name: "Hyehwa Station Exit 4 Daemyeong Street Bin",
      nameKr: "혜화역 4번 출구 대명거리 입구 가로휴지통",
      lat: 37.5828,
      lng: 127.0006,
      address: "1 Daemyeong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 대명길 1 가로변",
      hours: "24 Hours",
      categoryLabel: "Youth & Theater Hub Bin",
      badge: "High-Capacity Bin",
      description: "대학로 최대 번화가인 대명거리 진입부에 위치한 대용량 가로휴지통입니다.",
      etiquetteRule: "Youth shopping and cafe street bin."
    },
    {
      id: "t-jongno-18",
      area: "daehakro",
      type: "trash_bin",
      name: "Marronnier Park Sidewalk Public Bin",
      nameKr: "대학로 마로니에공원 보도변 가로휴지통",
      lat: 37.5815,
      lng: 127.0022,
      address: "104 Daehak-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 대학로 104 공원 앞 가로변",
      hours: "24 Hours",
      categoryLabel: "Park Sidewalk Bin",
      badge: "Culture Street Spot",
      description: "마로니에공원 붉은 벽돌 담장 앞 대학로 보도에 위치한 분리수거대입니다.",
      etiquetteRule: "Keep the theater district pavement sparkling clean."
    },
    {
      id: "t-jongno-19",
      area: "jongno",
      type: "trash_bin",
      name: "Donhwamun-ro Jongno 3-ga Exit 7 Bin",
      nameKr: "종로3가역 7번 출구 돈화문로 가로휴지통",
      lat: 37.5733,
      lng: 126.9912,
      address: "45 Donhwamun-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 돈화문로 45 가로변",
      hours: "24 Hours",
      categoryLabel: "Historic Axis Bin",
      badge: "Palace Way Spot",
      description: "창덕궁 돈화문으로 직진하는 돈화문로 국악의거리 가로변에 설치된 분리배출함입니다.",
      etiquetteRule: "Walking route from Jongno to Changdeokgung."
    },
    {
      id: "t-jongno-20",
      area: "seochon",
      type: "trash_bin",
      name: "Hyoja-ro National Palace Museum Bus Stop Bin",
      nameKr: "효자로 국립고궁박물관 서문 버스정류장 가로휴지통",
      lat: 37.5769,
      lng: 126.9741,
      address: "12 Hyoja-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 효자로 12 버스정류소 가로변",
      hours: "24 Hours",
      categoryLabel: "Palace West Perimeter Bin",
      badge: "Serene Walkway",
      description: "경복궁 서쪽 돌담길을 따라 걷는 효자로 가로변에 위치한 청결 휴지통입니다.",
      etiquetteRule: "Preserve the peaceful palace stone-wall walk."
    }
  ];

  // 종로구 실제 관광데이터 (서울시 종로구 관광데이터정보(영어) - SebcJongnoTourEng 기준 25선)
  const JONGNO_REAL_TOURISM = [
    {
      id: "tour-jongno-01",
      area: "seochon",
      type: "tourism",
      name: "Gyeongbokgung Palace",
      nameKr: "경복궁 (광화문)",
      lat: 37.5796,
      lng: 126.9770,
      address: "161 Sajik-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 사직로 161 (세종로)",
      hours: "09:00 - 18:00 (Closed Tuesdays)",
      categoryLabel: "Royal Palace",
      badge: "UNESCO Historic Core",
      tel: "02-3700-3900",
      link: "https://royal.khs.go.kr",
      description: "Main royal palace of the Joseon Dynasty, built in 1395. Features Gwanghwamun Gate, Geunjeongjeon Hall, and Gyeonghoeru Pavilion.",
      etiquetteRule: "Free entry for visitors wearing Hanbok. Quiet footsteps and respectful photography inside palace halls."
    },
    {
      id: "tour-jongno-02",
      area: "bukchon",
      type: "tourism",
      name: "Changdeokgung Palace & Secret Garden",
      nameKr: "창덕궁 및 후원 (비원)",
      lat: 37.5794,
      lng: 126.9910,
      address: "99 Yulgok-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 율곡로 99 (와룡동)",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "UNESCO World Heritage",
      badge: "World Cultural Heritage",
      tel: "02-3668-2300",
      link: "https://royal.khs.go.kr",
      description: "UNESCO World Heritage palace renowned for its harmonious balance with natural topography and the famous Huwon (Secret Garden).",
      etiquetteRule: "Secret Garden requires reservation. Follow the designated natural walking paths."
    },
    {
      id: "tour-jongno-03",
      area: "bukchon",
      type: "tourism",
      name: "National Museum of Modern and Contemporary Art (MMCA Seoul)",
      nameKr: "국립현대미술관 서울관",
      lat: 37.5788,
      lng: 126.9800,
      address: "30 Samcheong-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 삼청로 30 (소격동)",
      hours: "10:00 - 18:00 (Wed/Sat until 21:00)",
      categoryLabel: "Contemporary Art",
      badge: "Art & Architecture",
      tel: "02-3701-9500",
      link: "https://www.mmca.go.kr",
      description: "Leading national art museum blending historic military compound buildings with open modern courtyards.",
      etiquetteRule: "Maintain quiet gallery etiquette; flash photography is prohibited."
    },
    {
      id: "tour-jongno-04",
      area: "bukchon",
      type: "tourism",
      name: "Bukchon Hanok Village",
      nameKr: "북촌 한옥마을 (가회동)",
      lat: 37.5828,
      lng: 126.9835,
      address: "37 Gyedong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 계동길 37 (가회동 31번지 일대)",
      hours: "10:00 - 17:00 (Visiting curfew enforced after 17:00)",
      categoryLabel: "Traditional Hanok Village",
      badge: "Living Heritage Zone",
      tel: "02-2148-4161",
      link: "https://hanok.seoul.go.kr",
      description: "Over 600-year-old historic neighborhood with traditional tile-roofed hanoks where citizens actively reside.",
      etiquetteRule: "Strict residential quiet zone (under 40dB). Keep trash with you and respect residents' privacy."
    },
    {
      id: "tour-jongno-05",
      area: "bukchon",
      type: "tourism",
      name: "Baek In-je House",
      nameKr: "백인제 가옥",
      lat: 37.5818,
      lng: 126.9848,
      address: "62 Bukchon-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 북촌로 62 (가회동)",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Historic Hanok Estate",
      badge: "Registered Cultural Property",
      tel: "02-724-0232",
      link: "https://museum.seoul.go.kr",
      description: "A monumental 1913 modern hanok combining Korean traditional wood carpentry with western glass elements.",
      etiquetteRule: "Indoor shoes must be switched to slippers upon entering the wooden floors."
    },
    {
      id: "tour-jongno-06",
      area: "bukchon",
      type: "tourism",
      name: "Bukchon Traditional Culture Center",
      nameKr: "북촌문화센터",
      lat: 37.5796,
      lng: 126.9862,
      address: "37 Gyedong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 계동길 37 (계동)",
      hours: "09:00 - 18:00 (Daily)",
      categoryLabel: "Cultural Experience",
      badge: "Free Admission",
      tel: "02-2133-1372",
      link: "https://hanok.seoul.go.kr",
      description: "Restored historic residence of Joseon aristocrat Min Hyeong-sik. Offers traditional tea ceremonies and craft workshops.",
      etiquetteRule: "Quiet contemplation appreciated. Multilingual maps and rest amenities available."
    },
    {
      id: "tour-jongno-07",
      area: "bukchon",
      type: "tourism",
      name: "Arario Museum in Space",
      nameKr: "아라리오뮤지엄 인 스페이스",
      lat: 37.5771,
      lng: 126.9886,
      address: "83 Yulgok-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 율곡로 83 (원서동)",
      hours: "10:00 - 19:00 (Closed Mondays)",
      categoryLabel: "Contemporary Art Museum",
      badge: "Architectural Landmark",
      tel: "02-790-1188",
      link: "http://www.arariomuseum.org",
      description: "Masterpiece by Korean architect Kim Swoo-geun, housing an avant-garde international contemporary art collection.",
      etiquetteRule: "Watch your step on narrow spiral staircases; silence cellphones."
    },
    {
      id: "tour-jongno-08",
      area: "bukchon",
      type: "tourism",
      name: "Seoul Museum of Craft Art (SeMoCA)",
      nameKr: "서울공예박물관",
      lat: 37.5763,
      lng: 126.9840,
      address: "4 Yulgok-ro 3-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 율곡로3길 4 (안국동)",
      hours: "10:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Craft Art Museum",
      badge: "Korea's 1st Craft Museum",
      tel: "02-6450-7000",
      link: "https://craftmuseum.seoul.go.kr",
      description: "Korea's first public craft museum showcasing ceramics, embroidery, mother-of-pearl lacquerware, and metal crafts.",
      etiquetteRule: "Open public courtyard with tranquil outdoor craft exhibitions."
    },
    {
      id: "tour-jongno-09",
      area: "bukchon",
      type: "tourism",
      name: "Donglim Knot Workshop",
      nameKr: "동림매듭공방",
      lat: 37.5835,
      lng: 126.9856,
      address: "10 Bukchon-ro 12-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 북촌로12길 10 (가회동)",
      hours: "10:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Traditional Artisan Workshop",
      badge: "Intangible Cultural Asset",
      tel: "02-3673-2778",
      link: "http://www.koreaknot.com",
      description: "Preserving the delicate Joseon art of Maedeup (traditional decorative Korean silk knot-making).",
      etiquetteRule: "Hands-on knotting lessons available with prior reservation."
    },
    {
      id: "tour-jongno-10",
      area: "bukchon",
      type: "tourism",
      name: "Gahoe Museum (Folk Painting)",
      nameKr: "가회민화박물관",
      lat: 37.5840,
      lng: 126.9852,
      address: "17 Bukchon-ro 12-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 북촌로12길 17 (가회동)",
      hours: "10:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Folk Painting & Talisman Museum",
      badge: "Traditional Folk Arts",
      tel: "02-741-0838",
      link: "http://www.gahoemuseum.org",
      description: "Charming museum dedicated to Minhwa (traditional Korean folk painting) and protective talisman iconography.",
      etiquetteRule: "Experience painting your own protective talisman on hanji paper."
    },
    {
      id: "tour-jongno-11",
      area: "seochon",
      type: "tourism",
      name: "National Palace Museum of Korea",
      nameKr: "국립고궁박물관",
      lat: 37.5765,
      lng: 126.9749,
      address: "12 Hyoja-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 효자로 12 (세종로)",
      hours: "10:00 - 18:00 (Wed/Sat until 21:00)",
      categoryLabel: "Royal Heritage Museum",
      badge: "Joseon Royal Artifacts",
      tel: "02-3701-7500",
      link: "https://www.gogung.go.kr",
      description: "Dedicated museum preserving over 45,000 precious treasures, royal seals, astronomical clocks, and ceremonial carriages of the Joseon court.",
      etiquetteRule: "Located right outside Gyeongbokgung Station exit 5 with free admission."
    },
    {
      id: "tour-jongno-12",
      area: "seochon",
      type: "tourism",
      name: "Tongin Traditional Market",
      nameKr: "통인시장 (도시락 카페)",
      lat: 37.5807,
      lng: 126.9698,
      address: "18 Jahamun-ro 15-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로15길 18 (통인동)",
      hours: "07:00 - 21:00 (Dosirak Cafe: 11:00 - 16:00)",
      categoryLabel: "Traditional Market",
      badge: "Brass Coin Market",
      tel: "02-722-0912",
      link: "https://tonginmarket.modoo.at",
      description: "Famous for its antique brass coin (Yeopjeon) lunchbox cafe and handmade spicy oil tteokbokki.",
      etiquetteRule: "Return plastic trays to designated sorting stations after eating."
    },
    {
      id: "tour-jongno-13",
      area: "seochon",
      type: "tourism",
      name: "Yi Sang's House",
      nameKr: "이상의 집 (문학 살롱)",
      lat: 37.5798,
      lng: 126.9712,
      address: "9-2 Jahamun-ro 7-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로7길 9-2 (통의동)",
      hours: "10:00 - 19:00 (Daily)",
      categoryLabel: "Literary Memorial",
      badge: "Modern Literature Salon",
      tel: "070-8837-8340",
      link: "https://www.instagram.com/yisanghouse",
      description: "Historic residence of Korea's visionary modernist poet and architect Yi Sang, designed with an ambient interior glass terrace.",
      etiquetteRule: "Free entry and quiet reading atmosphere; tea available by donation."
    },
    {
      id: "tour-jongno-14",
      area: "seochon",
      type: "tourism",
      name: "Daelim Museum",
      nameKr: "대림미술관",
      lat: 37.5779,
      lng: 126.9733,
      address: "21 Jahamun-ro 4-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로4길 21 (통의동)",
      hours: "11:00 - 19:00 (Thu/Sat until 20:00, Closed Mondays)",
      categoryLabel: "Photography & Design",
      badge: "Trendy Contemporary",
      tel: "02-720-0667",
      link: "https://www.daelimmuseum.org",
      description: "Dynamic photography and contemporary design museum nestled in a renovated Seochon residential alley.",
      etiquetteRule: "Online ticket reservation recommended during popular weekend exhibitions."
    },
    {
      id: "tour-jongno-15",
      area: "seochon",
      type: "tourism",
      name: "Cheongun Literature Library",
      nameKr: "청운문학도서관",
      lat: 37.5925,
      lng: 126.9680,
      address: "40 Jahamun-ro 36-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로36길 40 (청운동)",
      hours: "10:00 - 19:00 (Closed Mondays)",
      categoryLabel: "Hanok Library & Pavilion",
      badge: "Inwangsan Scenic Spot",
      tel: "070-4680-4032",
      link: "https://lib.jongno.go.kr",
      description: "Seoul's first hanok public library situated at the foot of Mount Inwangsan with an open pond pavilion overlooking pine forests.",
      etiquetteRule: "Shoes off when entering the traditional wooden library floor."
    },
    {
      id: "tour-jongno-16",
      area: "seochon",
      type: "tourism",
      name: "Whanki Museum",
      nameKr: "환기미술관",
      lat: 37.5928,
      lng: 126.9648,
      address: "63 Jahamun-ro 40-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로40길 63 (부암동)",
      hours: "10:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Modern Fine Arts",
      badge: "Kim Whanki Memorial",
      tel: "02-391-7701",
      link: "http://whankimuseum.org",
      description: "Dedicated to the father of Korean abstract painting, Kim Whanki, featuring serene stone garden architecture in Buam-dong.",
      etiquetteRule: "Flash and video recording strictly prohibited inside galleries."
    },
    {
      id: "tour-jongno-17",
      area: "jongno",
      type: "tourism",
      name: "Jogyesa Temple",
      nameKr: "조계사 (대한불교조계종 총본산)",
      lat: 37.5735,
      lng: 126.9825,
      address: "55 Ujeongguk-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 우정국로 55 (견지동)",
      hours: "24 Hours (Temple grounds open)",
      categoryLabel: "Buddhist Temple",
      badge: "Center of Zen Buddhism",
      tel: "02-768-8600",
      link: "http://www.jogyesa.kr",
      description: "The chief temple of Korean Zen Buddhism, famous for its ancient 500-year-old lacebark pine tree and colorful lotus lantern festivals.",
      etiquetteRule: "Remove shoes before entering the main Dharma hall; bow respectfully to worshippers."
    },
    {
      id: "tour-jongno-18",
      area: "insadong",
      type: "tourism",
      name: "Ssamziegil Artisan Complex",
      nameKr: "인사동 쌈지길",
      lat: 37.5744,
      lng: 126.9849,
      address: "44 Insadong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 인사동길 44 (관훈동)",
      hours: "10:30 - 20:30 (Daily)",
      categoryLabel: "Craft Complex & Sky Garden",
      badge: "Spiral Architecture",
      tel: "02-736-0088",
      link: "http://ssamzigil.com",
      description: "Unique spiral pedestrian shopping complex filled with artisan boutiques, traditional stationery, and a sky garden courtyard.",
      etiquetteRule: "Spiral ramp allows wheelchair access all the way to the rooftop."
    },
    {
      id: "tour-jongno-19",
      area: "insadong",
      type: "tourism",
      name: "Unhyeongung Royal Residence",
      nameKr: "운현궁",
      lat: 37.5760,
      lng: 126.9877,
      address: "464 Samil-daero, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 삼일대로 464 (운니동)",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Historic Royal Residence",
      badge: "Historic Site No. 257",
      tel: "02-766-9090",
      link: "http://www.unhyeongung.or.kr",
      description: "The historic home of Heungseon Daewongun and childhood residence of Emperor Gojong, hosting royal wedding reenactments.",
      etiquetteRule: "Hanbok experience booth located near the entrance courtyard."
    },
    {
      id: "tour-jongno-20",
      area: "jongno",
      type: "tourism",
      name: "Gwanghwamun Square & King Sejong Statue",
      nameKr: "광화문광장 (세종대왕·이순신 동상)",
      lat: 37.5724,
      lng: 126.9769,
      address: "172 Sejong-daero, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 세종대로 172 (세종로)",
      hours: "24 Hours Open",
      categoryLabel: "National Historic Square",
      badge: "Iconic Public Plaza",
      tel: "02-2133-7734",
      link: "https://gwanghwamun.seoul.go.kr",
      description: "Seoul's national civic plaza featuring the statues of King Sejong the Great and Admiral Yi Sun-sin with underground historical exhibition halls.",
      etiquetteRule: "Underground story hall 'The Story of King Sejong' is free and fully air-conditioned."
    },
    {
      id: "tour-jongno-21",
      area: "jongno",
      type: "tourism",
      name: "Seoul Museum of History",
      nameKr: "서울역사박물관",
      lat: 37.5704,
      lng: 126.9708,
      address: "55 Saemunan-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 새문안로 55 (신문로2가)",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "City History Museum",
      badge: "Seoul Urban Story",
      tel: "02-724-0274",
      link: "https://museum.seoul.go.kr",
      description: "Chronicles the transformation of Seoul from the prehistoric era through the Joseon dynasty to today's vibrant metropolis.",
      etiquetteRule: "Audio guides in English, Chinese, and Japanese available at the info desk."
    },
    {
      id: "tour-jongno-22",
      area: "jongno",
      type: "tourism",
      name: "Gyeonghuigung Palace",
      nameKr: "경희궁 (서궐)",
      lat: 37.5714,
      lng: 126.9682,
      address: "45 Saemunan-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 새문안로 45 (신문로2가)",
      hours: "09:00 - 18:00 (Closed Mondays)",
      categoryLabel: "Secondary Royal Palace",
      badge: "Tranquil Heritage",
      tel: "02-724-0128",
      link: "https://museum.seoul.go.kr",
      description: "The serene 'Western Palace' of the late Joseon era, celebrated for its quiet courtyards away from large tourist crowds.",
      etiquetteRule: "Free entry and quiet natural walking trails behind Sungjeongjeon Hall."
    },
    {
      id: "tour-jongno-23",
      area: "daehakro",
      type: "tourism",
      name: "Marronnier Park & Daehak-ro Theater Street",
      nameKr: "대학로 마로니에공원 및 연극거리",
      lat: 37.5815,
      lng: 127.0024,
      address: "104 Daehak-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 대학로 104 (동숭동)",
      hours: "24 Hours Open",
      categoryLabel: "Arts & Theater District",
      badge: "Youth Culture Street",
      tel: "02-2148-2842",
      link: "https://www.jongno.go.kr",
      description: "The heartbeat of Korea's performing arts scene with over 150 small theaters, red-brick art centers, and outdoor busking.",
      etiquetteRule: "Enjoy weekend street performances and quiet strolls among historic red-brick buildings."
    },
    {
      id: "tour-jongno-24",
      area: "daehakro",
      type: "tourism",
      name: "Ihwa Mural Village & Naksan Park",
      nameKr: "이화벽화마을 & 낙산공원 한양도성",
      lat: 37.5809,
      lng: 127.0070,
      address: "49 Naksan 4-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 낙산4길 49 (이화동)",
      hours: "24 Hours Open (Park), Murals visible daylight",
      categoryLabel: "Mural Village & City Wall",
      badge: "Sunset & Night View",
      tel: "02-743-7985",
      link: "https://parks.seoul.go.kr",
      description: "Charming hillside village along the historic Seoul City Wall featuring vibrant outdoor murals and panoramic sunset city views.",
      etiquetteRule: "Strict residential quiet zone. Avoid loud conversations near houses and take all trash."
    },
    {
      id: "tour-jongno-25",
      area: "bukchon",
      type: "tourism",
      name: "Changgyeonggung Palace",
      nameKr: "창경궁 & 대온실 (식물원)",
      lat: 37.5788,
      lng: 126.9948,
      address: "185 Changgyeonggung-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 창경궁로 185 (와룡동)",
      hours: "09:00 - 21:00 (Closed Mondays, Night view available)",
      categoryLabel: "Royal Palace & Greenhouse",
      badge: "Night Palace Open",
      tel: "02-762-4868",
      link: "https://royal.khs.go.kr",
      description: "Palace built by King Seongjong for royal family elders, famous for the historic Grand Greenhouse (Daeonsil) and nighttime illumination.",
      etiquetteRule: "Night admission allowed until 20:00. Romantic pond walking paths along Chundangji."
    }
  ];

  function getApiKey() {
    return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
  }

  function saveApiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_API_KEY);
    }
  }

  async function fetchLiveRestrooms(apiKey) {
    const key = apiKey || getApiKey();
    if (!key) {
      throw new Error('서울시 열린데이터 광장 인증키(API Key)를 입력해주세요.');
    }

    const targetUrl = `http://openAPI.seoul.go.kr:8088/${encodeURIComponent(key)}/json/${TOILET_SERVICE}/1/1000/`;
    let data = null;
    try {
      const response = await fetch(targetUrl);
      data = await response.json();
    } catch (corsErr) {
      console.warn('Direct fetch blocked by CORS. Using fallback proxy...', corsErr);
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
      const proxyRes = await fetch(proxyUrl);
      data = await proxyRes.json();
    }

    if (!data || !data[TOILET_SERVICE] || !data[TOILET_SERVICE].row) {
      if (data && data.RESULT) {
        throw new Error(`API 오류: ${data.RESULT.MESSAGE || data.RESULT.CODE}`);
      }
      throw new Error('서울시 공중화장실 API로부터 데이터를 불러오지 못했습니다.');
    }

    const rawRows = data[TOILET_SERVICE].row;
    const jongnoRows = rawRows.filter(row => {
      const rname = row.RNAME || '';
      const hname = row.HNAME || '';
      const aname = row.ANAME || '';
      return rname.includes('종로구') || hname.includes('종로구') || aname.includes('종로구');
    });

    return jongnoRows.map((item, index) => {
      const lat = parseFloat(item.Y_WGS84 || item.CENTER_Y1);
      const lng = parseFloat(item.X_WGS84 || item.CENTER_X1);
      return {
        id: `live-toilet-${index + 1}`,
        area: (item.RNAME && item.RNAME.includes('북촌') || item.ANAME && item.ANAME.includes('가회')) ? 'bukchon' : 'seochon',
        type: 'restroom',
        name: item.FNAME || 'Seoul Public Restroom',
        nameKr: item.FNAME || '서울시 공중화장실',
        lat: isNaN(lat) ? 37.5805 : lat,
        lng: isNaN(lng) ? 126.9775 : lng,
        address: item.RNAME || item.HNAME || 'Jongno-gu, Seoul',
        addressKr: item.RNAME || item.HNAME || '서울특별시 종로구',
        hours: item.OPENTIME || '상시 개방',
        categoryLabel: 'Seoul Public Restroom (Live API)',
        badge: 'Seoul Open Data Verified',
        description: `서울시 공중화장실 위치정보 실시간 연동 데이터입니다. 구분: ${item.ANAME || '일반'}.`,
        etiquetteRule: 'Please keep facility clean and respect public amenities.'
      };
    });
  }

  async function fetchLiveTourismEng(apiKey) {
    const key = apiKey || getApiKey();
    if (!key) {
      throw new Error('서울시 열린데이터 광장 인증키(API Key)를 입력해주세요.');
    }
    const TOUR_SERVICE = 'SebcJongnoTourEng';
    const targetUrl = `http://openAPI.jongno.go.kr:8088/${encodeURIComponent(key)}/json/${TOUR_SERVICE}/1/50/`;
    let data = null;
    try {
      const response = await fetch(targetUrl);
      data = await response.json();
    } catch (corsErr) {
      console.warn('Direct fetch blocked by CORS. Using fallback proxy...', corsErr);
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
      const proxyRes = await fetch(proxyUrl);
      data = await proxyRes.json();
    }

    if (!data || !data[TOUR_SERVICE] || !data[TOUR_SERVICE].row) {
      if (data && data.RESULT) {
        throw new Error(`API 오류: ${data.RESULT.MESSAGE || data.RESULT.CODE}`);
      }
      throw new Error('종로구 관광데이터정보 API로부터 데이터를 불러오지 못했습니다.');
    }

    return data[TOUR_SERVICE].row.map((item, index) => {
      const lat = parseFloat(item.WGS84_Y);
      const lng = parseFloat(item.WGS84_X);
      return {
        id: `live-tour-${index + 1}`,
        area: (item.H_ENG_DONG && item.H_ENG_DONG.includes('Gahoe') || item.NAME_ENG && item.NAME_ENG.includes('Bukchon')) ? 'bukchon' : 'seochon',
        type: 'tourism',
        name: item.NAME_ENG || 'Jongno Tourist Spot',
        nameKr: item.NAME_KOR || item.NAME_ENG,
        lat: isNaN(lat) ? 37.5796 : lat,
        lng: isNaN(lng) ? 126.9770 : lng,
        address: `${item.H_ENG_CITY || 'Seoul'}, ${item.H_ENG_GU || 'Jongno-gu'}, ${item.H_ENG_DONG || ''}`,
        addressKr: `서울특별시 종로구 ${item.H_KOR_DONG || ''}`,
        hours: item.OPER_TIME || '09:00 - 18:00',
        categoryLabel: item.CATE_NAME || 'Jongno Tourism (Official Eng)',
        badge: 'Seoul Open Data Verified',
        tel: item.TEL || '',
        link: item.LINK || '',
        description: `서울시 종로구 관광데이터정보(영어) 공식 등록 관광지입니다. 문의: ${item.TEL || '종로구청'}.`,
        etiquetteRule: 'Please respect cultural properties and local neighborhoods.'
      };
    });
  }

  return {
    getApiKey,
    saveApiKey,
    getJongnoRealRestrooms: () => JONGNO_REAL_RESTROOMS,
    getJongnoRealTrashBins: () => JONGNO_REAL_TRASH_BINS,
    getJongnoRealTourism: () => JONGNO_REAL_TOURISM,
    fetchLiveRestrooms,
    fetchLiveTourismEng
  };
})();

window.SeoulOpenApi = SeoulOpenApi;

const APP_DATA = {
  // 1. Essential Korean Apps for Foreign Travelers
  essentialApps: [
    {
      id: "naver-map",
      name: "Naver Map",
      nameKr: "네이버 지도",
      tag: "Navigation & Walking",
      color: "#03C75A",
      iconImage: "assets/icons/naver_map.png",
      summary: "The #1 walking navigation app in Korea. Google Maps has restricted walking directions in Korea by national mapping law.",
      travelerTip: "Switch app language to English in settings. Search Subway stations or paste Korean addresses directly for 100% precision.",
      iosUrl: "https://apps.apple.com/app/naver-map-navigation/id311867728",
      androidUrl: "https://play.google.com/store/apps/details?id=com.nhn.android.nmap"
    },
    {
      id: "naver",
      name: "Naver Portal & Lens",
      nameKr: "네이버",
      tag: "Search & Visual Lens",
      color: "#03C75A",
      iconImage: "assets/icons/naver.png",
      summary: "Korea's leading search engine. Use 'Smart Lens' to point your camera at any Korean sign, menu, or monument for instant visual translation.",
      travelerTip: "Use the green camera icon (Smart Lens) to translate intricate handwritten calligraphy in traditional tea houses.",
      iosUrl: "https://apps.apple.com/app/naver/id393499958",
      androidUrl: "https://play.google.com/store/apps/details?id=com.nhn.android.search"
    },
    {
      id: "kakao-t",
      name: "Kakao T",
      nameKr: "카카오 T",
      tag: "Taxi & Mobility",
      color: "#FEE500",
      iconImage: "assets/icons/kakao_t.png",
      summary: "Korea's Uber equivalent. Seamlessly hails regular, deluxe, or jumbo taxis across Seoul with guaranteed fixed meter rates.",
      travelerTip: "Supports foreign credit cards (Visa/Mastercard) and doesn't require a Korean phone number in Kakao T Global mode.",
      iosUrl: "https://apps.apple.com/app/kakao-t/id981110422",
      androidUrl: "https://play.google.com/store/apps/details?id=com.kakao.taxi"
    },
    {
      id: "ddareungi",
      name: "Ddareungi (Seoul Bike)",
      nameKr: "서울자전거 따릉이",
      tag: "Public Bike Sharing",
      color: "#00A651",
      iconImage: "assets/icons/ddareungi.svg",
      summary: "Seoul's official public bike rental. Seochon has gently sloping alleys ideal for cycling along Inwangsan foothill paths.",
      travelerTip: "Foreign tourists can purchase a 24-hour pass with a foreign card directly on the English website or mobile app without domestic registration.",
      iosUrl: "https://apps.apple.com/app/seoul-bike-ddareungi/id1037272004",
      androidUrl: "https://play.google.com/store/apps/details?id=com.dki.spb_android"
    },
    {
      id: "catchtable",
      name: "CatchTable Global",
      nameKr: "캐치테이블",
      tag: "Dining & Waiting Queue",
      color: "#FF385C",
      iconImage: "assets/icons/catchtable.svg",
      summary: "Essential for reserving top hanok dining, trendy cafes, and joining live digital queues without standing on cold streets.",
      travelerTip: "Many popular dining spots in Seochon and Samcheong-dong only accept queue tickets via CatchTable tablet at the door.",
      iosUrl: "https://apps.apple.com/app/catchtable-global/id1527712204",
      androidUrl: "https://play.google.com/store/apps/details?id=co.catchtable.catchtable_app"
    }
  ],

  // 2. Map POIs & Convenience Facilities in Bukchon & Seochon
  places: [
    // --- Bukchon (북촌) Heritage & Culture ---
    {
      id: "p1",
      area: "bukchon",
      type: "heritage",
      name: "Bukchon Hanok Village (Alley 5 & 6)",
      nameKr: "북촌 한옥마을 (가회동 31번지 골목길)",
      lat: 37.5828,
      lng: 126.9835,
      address: "37, Gyedong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 계동길 37 (가회동 31번지 일대)",
      hours: "10:00 AM - 5:00 PM (Visiting restricted after 17:00)",
      isRestrictedZone: true,
      categoryLabel: "Historic Hanok Alley",
      badge: "Restricted Hours (Red Zone)",
      image: "assets/images/bukchon.jpg",
      description: "Seoul's premier traditional residential neighborhood with over 600 years of Joseon dynasty legacy. Curved tiled eaves overlap gracefully under the Seoul sky.",
      etiquetteRule: "Quiet Zone! Over 6,000 residents live here. Strictly whispering only. No drone flights. Keep visits within 10:00 - 17:00."
    },
    {
      id: "p2",
      area: "bukchon",
      type: "heritage",
      name: "Baek In-je House",
      nameKr: "백인제 가옥",
      lat: 37.5818,
      lng: 126.9848,
      address: "62 Bukchon-ro, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 북촌로 62",
      hours: "09:00 AM - 6:00 PM (Closed on Mondays)",
      isRestrictedZone: false,
      categoryLabel: "Public Hanok Museum",
      badge: "Open to Public",
      image: "assets/images/bukchon.jpg",
      description: "A magnificent 1913 modern hanok estate blending traditional Korean wooden carpentry with Japanese Tatami elements and western glass corridors.",
      etiquetteRule: "Indoor shoes must be switched to slippers. Photography without flash allowed."
    },
    {
      id: "p3",
      area: "bukchon",
      type: "craft",
      name: "Bukchon Traditional Culture Center",
      nameKr: "북촌문화센터",
      lat: 37.5796,
      lng: 126.9862,
      address: "37 Gye-dong-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 계동길 37",
      hours: "09:00 AM - 6:00 PM (Daily)",
      isRestrictedZone: false,
      categoryLabel: "Artisan Hub & Rest Area",
      badge: "Free Admission",
      image: "assets/images/seochon.jpg",
      description: "Restored historic residence of Joseon aristocrat Min Hyeong-sik. Offers hanok architecture exhibits, artisan craft workshops, and tranquil wooden courtyards.",
      etiquetteRule: "Quiet contemplation appreciated. Free maps and clean public facilities available."
    },

    // --- Seochon (서촌) Heritage & Local Culture ---
    {
      id: "p4",
      area: "seochon",
      type: "culture",
      name: "Yi Sang's House (House of Poet Yi Sang)",
      nameKr: "이상의 집 (시인 이상의 가옥)",
      lat: 37.5798,
      lng: 126.9712,
      address: "9-2 Jahamun-ro 7-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로7길 9-2",
      hours: "10:00 AM - 7:00 PM (Daily)",
      isRestrictedZone: false,
      categoryLabel: "Literary Hanok Cafe",
      badge: "Cultural Memorial",
      image: "assets/images/seochon.jpg",
      description: "The birthplace and home of Korea's groundbreaking avant-garde poet and architect Yi Sang. Modern glass library nestled inside a traditional wooden hanok.",
      etiquetteRule: "Free entry. Please consider ordering a cup of hot tea to support literary preservation."
    },
    {
      id: "p5",
      area: "seochon",
      type: "market",
      name: "Tongin Traditional Market",
      nameKr: "통인시장 (엽전 도시락)",
      lat: 37.5807,
      lng: 126.9698,
      address: "18 Jahamun-ro 15-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 자하문로15길 18",
      hours: "07:00 AM - 9:00 PM (Cafeteria: 11:00 - 16:00)",
      isRestrictedZone: false,
      categoryLabel: "Local Food & Tradition",
      badge: "Brass Coin Market",
      image: "assets/images/seochon.jpg",
      description: "Historic 1941 market famous for its antique brass coin (Yeopjeon) lunchbox system and legendary stir-fried spicy oil tteokbokki.",
      etiquetteRule: "Return used lunchbox trays to designated washing stations. Dispose skewers in wooden bins."
    },
    {
      id: "p6",
      area: "seochon",
      type: "craft",
      name: "Dajeong Hanok Artisan & Tea House",
      nameKr: "다정 한옥 찻집 & 공방거리",
      lat: 37.5815,
      lng: 126.9715,
      address: "24 Okin-gil, Jongno-gu, Seoul",
      addressKr: "서울특별시 종로구 옥인길 24",
      hours: "11:00 AM - 8:00 PM",
      isRestrictedZone: false,
      categoryLabel: "Local Craft & Tea",
      badge: "Resident Workshop",
      image: "assets/images/seochon.jpg",
      description: "Warm, ambient tea house and pottery studio where local artisans craft Celadon ceramics and serve slow-brewed Omija and ginger tea.",
      etiquetteRule: "Shoes off at the wooden deck. Support neighborhood potters by exploring hand-crafted souvenirs."
    },

    // --- Official Public Restrooms, Street Trash Bins & Tourism (Seoul Open Data Plaza) ---
    ...(typeof SeoulOpenApi !== 'undefined' ? [
      ...SeoulOpenApi.getJongnoRealRestrooms(),
      ...SeoulOpenApi.getJongnoRealTrashBins(),
      ...SeoulOpenApi.getJongnoRealTourism()
    ] : [
      {
        id: "r1",
        area: "bukchon",
        type: "restroom",
        name: "Anguk Station Exit 2 Public Restroom",
        nameKr: "안국역 2·3번 출구 공중화장실",
        lat: 37.5768,
        lng: 126.9856,
        address: "Subway Line 3 Anguk Station B1",
        addressKr: "지하철 3호선 안국역 지하 1층 대합실",
        hours: "05:30 AM - 24:00 (Subway hours)",
        categoryLabel: "Public Restroom",
        badge: "Clean & Accessible",
        description: "Free, spacious public restroom equipped with diaper changing stations and wheelchair accessibility.",
        etiquetteRule: "Please keep clean and discard paper towels into provided bins."
      }
    ])
  ],

  // 3. Low-Token 1-Card AI Curation Presets
  aiCurationMoods: {
    "peaceful-alley": {
      tag: "#PeacefulAlley",
      label: "Peaceful Hanok Walk",
      title: "Wonseo-dong Palace Stone Wall Alley",
      titleKr: "원서동 창덕궁 돌담길 & 빨래터",
      area: "Bukchon East",
      story: "While central Bukchon alleys get crowded, Wonseo-dong hugs the western stone wall of Changdeokgung Palace in total serenity. You'll hear gentle breezes rustling bamboo leaves over warm brick boundaries.",
      respectTip: "Locals cultivate modest flower pots along stone steps. Walk quietly and enjoy the ambient bird songs without loudspeaker guides.",
      koreanAddress: "서울특별시 종로구 창덕궁길 124 (원서동)",
      lat: 37.5839,
      lng: 126.9885
    },
    "traditional-tea": {
      tag: "#TraditionalTea",
      label: "Artisan Tea & Rest",
      title: "Dajeong Hanok Heritage Tea Room",
      titleKr: "다정 한옥 전통 찻집",
      area: "Seochon Village",
      story: "Tucked inside an intimate wooden alleyway, this 80-year-old hanok brews hand-picked wild tea leaves over clay charcoal warmers. Soft sunlight filters through handmade Hanji mulberry screens.",
      respectTip: "Take off shoes before stepping onto wooden Maru floor. Order warm Omija tea and whisper quietly as you sip.",
      koreanAddress: "서울특별시 종로구 옥인길 24 (서촌)",
      lat: 37.5815,
      lng: 126.9715
    },
    "artisan-craft": {
      tag: "#ArtisanCraft",
      label: "Handmade Crafts",
      title: "Gahoe Folk Knot & Hanji Studio",
      titleKr: "가회동 전통 매듭 & 규방공예 공방",
      area: "Bukchon Central",
      story: "Master artisans preserve Joseon dynasty silk knotting (Maedeup) and botanical-dyed ramie fabric right in their workshop. You can observe painstaking needlework that has survived centuries.",
      respectTip: "Always ask permission before photographing artisan masters at work. Purchases directly support cultural heritage continuation.",
      koreanAddress: "서울특별시 종로구 북촌로12길 17",
      lat: 37.5842,
      lng: 126.9840
    },
    "literary-history": {
      tag: "#LiteraryHistory",
      label: "Literature & Art",
      title: "Poet Yi Sang's Memorial House",
      titleKr: "서촌 시인 이상의 집",
      area: "Seochon West",
      story: "Step into the avant-garde world of Korea's most influential 1930s modernist poet. A sleek steel-and-glass contemplation room stands boldly within antique wooden roof beams.",
      respectTip: "Admission is free. Write a reflective postcard on the communal wooden table and place books back neatly.",
      koreanAddress: "서울특별시 종로구 자하문로7길 9-2",
      lat: 37.5798,
      lng: 126.9712
    },
    "local-food": {
      tag: "#LocalFood",
      label: "Authentic Local Bites",
      title: "Tongin Famous Brass-Coin Cafeteria",
      titleKr: "통인시장 원조 엽전 도시락 & 기름떡볶이",
      area: "Seochon Center",
      story: "Exchange Korean Won for a string of Joseon brass coins (Yeopjeon) and build your personal lunch tray by visiting dozens of grandmother-run banchan stalls across the covered arcade.",
      respectTip: "Finish food inside the 2nd floor designated customer cafeteria rather than eating while walking through narrow residential alleys.",
      koreanAddress: "서울특별시 종로구 자하문로15길 18",
      lat: 37.5807,
      lng: 126.9698
    }
  },

  // 4. Resident Etiquette Principles
  etiquettePrinciples: [
    {
      id: "quiet",
      icon: "🤫",
      title: "Whisper Alleys (Keep Volume Down)",
      rule: "Bukchon & Seochon are real homes to 15,000 residents. Sound echoes off stone walls.",
      action: "Turn phone volume to vibrate and speak in soft whispers under 40dB."
    },
    {
      id: "trash",
      icon: "🚯",
      title: "Pack It In, Pack It Out",
      rule: "Historic residential alleys have no street bins to prevent litter pileups.",
      action: "Carry a small bag for your trash until you reach our mapped Smart Solar Bins."
    },
    {
      id: "privacy",
      icon: "🚪",
      title: "Respect Private Courtyards",
      rule: "Wooden hanok gates lead directly into private bedrooms and family kitchens.",
      action: "Do not touch doorbells, push open doors, peek inside, or fly aerial drones."
    },
    {
      id: "hours",
      icon: "⏰",
      title: "Honor Visiting Hours (10:00 - 17:00)",
      rule: "Bukchon Red Zone strictly restricts tourist sightseeing after 5:00 PM.",
      action: "After 17:00, explore dining along Samcheong-ro or Seochon Jahamun-ro main streets."
    }
  ],

  // 5. Driver & Local Communication Flashcards
  driverPhrases: [
    // --- 관광지 (Tourism) ---
    {
      id: "dp-tour-1",
      category: "tourism",
      situation: "Going to Bukchon Hanok Village Entrance",
      phraseKr: "북촌 한옥마을 입구로 가주세요.",
      phonetic: "Buk-chon ha-nok-ma-eul ip-gu-ro ga-ju-se-yo.",
      english: "Please take me to the entrance of Bukchon Hanok Village."
    },
    {
      id: "dp-tour-2",
      category: "tourism",
      situation: "Going to Seochon Tongin Market",
      phraseKr: "서촌 통인시장 앞으로 가주세요.",
      phonetic: "Seo-chon tong-in-si-jang ap-eu-ro ga-ju-se-yo.",
      english: "Please take me to Seochon Tongin Market entrance."
    },
    {
      id: "dp-tour-3",
      category: "tourism",
      situation: "Going to Samcheong-dong Cafe Street",
      phraseKr: "삼청동 카페거리 입구에서 내려주세요.",
      phonetic: "Sam-cheong-dong ka-pe-geo-ri ip-gu-e-seo nae-ryeo-ju-se-yo.",
      english: "Please drop me off at the entrance of Samcheong-dong Cafe Street."
    },
    {
      id: "dp-tour-4",
      category: "tourism",
      situation: "Going to Gyeongbokgung National Folk Museum",
      phraseKr: "경복궁 국립민속박물관 매표소로 가주세요.",
      phonetic: "Gyeong-bok-gung guk-rip-min-sok-bak-mul-gwan mae-pyo-so-ro ga-ju-se-yo.",
      english: "Please take me to the National Folk Museum / Gyeongbokgung ticket booth."
    },
    {
      id: "dp-tour-5",
      category: "tourism",
      situation: "Going to Cheong Wa Dae (Blue House) Sarangchae",
      phraseKr: "청와대 사랑채 분수대 광장 쪽으로 가주세요.",
      phonetic: "Cheong-wa-dae sa-rang-chae bun-su-dae gwang-jang jjo-geu-ro ga-ju-se-yo.",
      english: "Please take me toward Cheong Wa Dae Sarangchae Fountain Plaza."
    },
    {
      id: "dp-tour-6",
      category: "tourism",
      situation: "Going to Changdeokgung Palace Main Gate",
      phraseKr: "창덕궁 돈화문(정문) 앞으로 가주세요.",
      phonetic: "Chang-deok-gung don-hwa-mun ap-eu-ro ga-ju-se-yo.",
      english: "Please take me in front of Changdeokgung Palace main gate (Donhwamun)."
    },

    // --- 화장실 (Restroom) ---
    {
      id: "dp-rest-1",
      category: "restroom",
      situation: "Finding Nearest Public Restroom",
      phraseKr: "근처 가장 가까운 공중화장실이 어디인가요?",
      phonetic: "Geun-cheo ga-jang ga-kka-un gong-jung-hwa-jang-sil-i eo-di-in-ga-yo?",
      english: "Where is the nearest public restroom around here?"
    },
    {
      id: "dp-rest-2",
      category: "restroom",
      situation: "Asking for Subway Station Restroom",
      phraseKr: "지하철역 화장실은 어느 출구 쪽으로 가야 하나요?",
      phonetic: "Ji-ha-cheol-yeok hwa-jang-sil-eun eo-neu chul-gu jjo-geu-ro ga-ya ha-na-yo?",
      english: "Which exit should I head toward for the subway station restroom?"
    },
    {
      id: "dp-rest-3",
      category: "restroom",
      situation: "Asking to Use Restroom Politely",
      phraseKr: "실례지만 화장실 좀 잠시 이용할 수 있을까요?",
      phonetic: "Sil-lye-ji-man hwa-jang-sil jom jam-si i-yong-hal su it-eul-kka-yo?",
      english: "Excuse me, may I please use the restroom for a moment?"
    },
    {
      id: "dp-rest-4",
      category: "restroom",
      situation: "Asking for Restroom Code or Key",
      phraseKr: "화장실 비밀번호나 열쇠가 필요한가요?",
      phonetic: "Hwa-jang-sil bi-mil-beon-ho-na yeol-swae-ga pil-yo-han-ga-yo?",
      english: "Does the restroom require an entrance passcode or key?"
    },
    {
      id: "dp-rest-5",
      category: "restroom",
      situation: "Asking for Baby Diaper Changing Station",
      phraseKr: "아기 기저귀를 갈 수 있는 화장실이 있나요?",
      phonetic: "A-gi gi-jeo-gwi-reul gal su it-neun hwa-jang-sil-i it-na-yo?",
      english: "Is there a restroom equipped with a baby diaper changing station?"
    },

    // --- 쓰레기통 (Trash & Recycling) ---
    {
      id: "dp-trash-1",
      category: "trash",
      situation: "Asking Where to Throw Trash / Recycling",
      phraseKr: "이 쓰레기를 버릴 수 있는 분리수거함이 어디 있나요?",
      phonetic: "I sseu-re-gi-reul beo-ril su it-neun bun-ri-su-geo-ham-i eo-di it-na-yo?",
      english: "Where can I find a recycling or trash bin for this?"
    },
    {
      id: "dp-trash-2",
      category: "trash",
      situation: "Disposing of Takeout Drink Cup",
      phraseKr: "일회용 음료 컵을 버릴 수 있는 전용 수거함이 있나요?",
      phonetic: "Il-hoe-yong eum-ryo keop-eul beo-ril su it-neun jeon-yong su-geo-ham-i it-na-yo?",
      english: "Is there a dedicated collection bin to dispose of this takeout drink cup?"
    },
    {
      id: "dp-trash-3",
      category: "trash",
      situation: "Asking Store to Accept Used Drink Cup",
      phraseKr: "다 마신 음료 컵을 잠시 버려주실 수 있나요?",
      phonetic: "Da ma-sin eum-ryo keop-eul jam-si beo-ryeo-ju-sil su it-na-yo?",
      english: "Could you kindly take and dispose of this empty beverage cup for me?"
    },
    {
      id: "dp-trash-4",
      category: "trash",
      situation: "Sorting Plastic and Cans",
      phraseKr: "플라스틱과 캔은 어디에 따로 분리수거하나요?",
      phonetic: "Peul-la-seu-tik-gwa kaen-eun eo-di-e tta-ro bun-ri-su-geo-ha-na-yo?",
      english: "Where should I separate and dispose of plastic bottles and cans?"
    },
    {
      id: "dp-trash-5",
      category: "trash",
      situation: "Asking for Alley Trash Bag Collection Spot",
      phraseKr: "골목에 쓰레기통이 없는데, 어디에 가져다 두어야 하나요?",
      phonetic: "Gol-mok-e sseu-re-gi-tong-i eop-neun-de, eo-di-e ga-jyeo-da du-eo-ya ha-na-yo?",
      english: "There are no bins in this alley; where is the proper place to bring this?"
    },

    // --- 에티켓 (Local Etiquette) ---
    {
      id: "dp-eti-1",
      category: "etiquette",
      situation: "Asking for Quiet / Residential Check",
      phraseKr: "여기가 주민 거주구역인가요? 조용히 지나가겠습니다.",
      phonetic: "Yeo-gi-ga ju-min geo-ju-gu-yeok-in-ga-yo? Jo-yong-hi ji-na-ga-get-seum-ni-da.",
      english: "Is this a residential zone? I will pass through quietly."
    },
    {
      id: "dp-eti-2",
      category: "etiquette",
      situation: "Asking Permission Before Taking Photo",
      phraseKr: "여기서 사진 한 장 찍어도 괜찮을까요?",
      phonetic: "Yeo-gi-seo sa-jin han jang jjik-eo-do gwaen-chan-eul-kka-yo?",
      english: "Is it okay if I take a photo here?"
    }
  ]
};

APP_DATA.updatePlacesWithLiveRestrooms = function(liveRestrooms) {
  const nonRestroom = APP_DATA.places.filter(p => p.type !== 'restroom');
  APP_DATA.places = [...nonRestroom, ...liveRestrooms];
};

APP_DATA.updatePlacesWithLiveTourism = function(liveTourism) {
  const nonTourism = APP_DATA.places.filter(p => p.type !== 'tourism');
  APP_DATA.places = [...nonTourism, ...liveTourism];
};

window.APP_DATA = APP_DATA;
