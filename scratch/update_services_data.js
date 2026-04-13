const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Sumit Pujari', 'Desktop', 'SP_Website', 'SP-Events', 'src', 'data', 'servicesData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const mapping = [
    { title: "12 Vijayavani Eductaion Expo 2024", image: "vijayvani_education_expo_2024.webp" },
    { title: "16 Startup Gravity 2023", image: "startup_gravity_deshpande_foundation_2023.webp" },
    { title: "aROGYA HABBA", image: "arogya_habba_samyukta_karnataka_2024.webp" },
    { title: "BIS MANOK MAHOSTAV", image: "bis_manak_mahotsav_2024.webp" },
    { title: "BIS STAKEHOLDERS CONCLAVE", image: "bis_stakeholders_conclave_2024.webp" },
    { title: "CORTEVA AGRISCIENCE HOSPET", image: "corteva_agriscience_event_2024.webp" },
    { title: "Corteva Agriscience Sindhanur", image: "corteva_deladaxin_launch_2025.webp" },
    { title: "Deveopment dailgue 2024", image: "development_dialogue_2024.webp" },
    { title: "Hodek plant 3", image: "hodek_plant_3_grand_launch_2025.webp" },
    { title: "HP TELECOM SAMWAAD", image: "hp_telecom_samwad_2025.webp" },
    { title: "IIIT DHARWAD HR CONCLAVE", image: "iiit_dharwad_hr_conclave_2024.webp" },
    { title: "IIT Dharwad nirmala sitharaman", image: "nirmala_sitharaman_dharti_bionest_2025.webp" },
    { title: "Kapicon doctore conference", image: "kapicon_2025_api_karnataka.webp" },
    { title: "KARNATAKA STATE SPICE DEVEOPMENT", image: "karnataka_spice_buyer_seller_meet_2024.webp" },
    { title: "kle bba samhiti 2k25", image: "samhiti_kle_bba_hubli_2025.webp" },
    { title: "Startup Dailogue 2024", image: "startup_dialogue_event_2023.webp" }, // Closest match
    { title: "Tiecon hubli 2023", image: "tiecon_hubballi_event_2023.webp" },
    { title: "15 Stonish Paul Birthday Party (Paul's Group) 2024", image: "king_stonish_paul_1st_birthday_celebration_2024.webp" },
    { title: "KARNATAKA SPECTUALAR AGNIHOTRA", image: "karnataka_agnihotra_world_record_2025.webp" },
    { title: "kle bca kalakrithi", image: "kalakriti_it_fest_kle_bca_2026.webp" },
    { title: "NaMo Drone DiDi", image: "namo_drone_didi_event_pm_narendra_modi_2024.webp" },
    { title: "PM NARENDRA MODI VISIT TO BAILHONGAL", image: "pm_narendra_modi_visit_bailhongal_2023.webp" },
    { title: "Rajeshwary orion park", image: "rajeshwari_orian_park_launch_2025.webp" },
    { title: "Eltu Mutha Film Audio launch", image: "elutu_mutha_audio_launch_2025.webp" },
    { title: "Eskay Silk N Sarees", image: "eskay_silk_sarees_launch_event_2023.webp" },
    { title: "sulthan daimonds & gold bijapur", image: "sulthan_diamonds_gold_20th_launch_2026.webp" },
    { title: "Sulthan Daimonds & Gold hubli", image: "sulthan_diamonds_gold_14th_launch_2025.webp" },
    { title: "vOLVO C40 LAUNCH & PROMO EVENT", image: "volvo_c40_promotional_event_2024.webp" },
    { title: "Hubballi Ugadi Utsava", image: "hubballi_ugadi_utsava_2023.webp" },
    { title: "IIT DHARWAD SANGEET EVENT", image: "iiit_dharwad_sangeet_2025.webp" },
    { title: "KLE M R SAKHARE CBSE ANNUAL DAY", image: "kle_mr_sakhare_cbse_annual_day_2024.webp" },
    { title: "KLE M R SAKHARE STATE ANNUAL DAY", image: "kle_mr_sakhare_state_school_annual_day_2024.webp" },
    { title: "KLE MANJUNATH NAGAR ANNUAL DAY", image: "kle_school_manjunath_nagar_annual_day_2024.webp" },
    { title: "KLE RAYAPUR ANNUAL DAY", image: "kaleidorhythm_2024_kle_school_rayapur.webp" },
    { title: "tejas international school annual day", image: "altiora_tejas_school_annual_day_2026.webp" },
    { title: "B N KHOT SPORTS UTSAVA", image: "bn_khot_u16_cricket_tournament_2025.webp" },
    { title: "BIS WALKATHON", image: "bis_world_standards_day_celebration_2024.webp" },
    { title: "B N KHOT SCHOOL", image: "bn_khot_international_school_annual_day_2025.webp" },
    { title: "BALLYS CASINO", image: "ballys_casino_event_2024.webp" },
    { title: "KLE M R Sakhare Annual Day Event", image: "kle_mr_sakhare_state_school_annual_day_2019.webp" }, // 2019 is image 7
    { title: "B N KHOT SCHOOL", image: "bn_khot_international_school_annual_day_2025.webp" },
    { title: "KLE MR SAKHARE SPORTS EVENT", image: "bn_khot_u16_cricket_tournament_2025.webp" } // Defaulting to this
];

mapping.forEach(m => {
    // Find the object block for this title and update its image field
    // Regex matches the title and the following "image": "..." line
    const regex = new RegExp(`("title":\\s*"${m.title}",\\s*"image":\\s*")[^"]+(")`, 'g');
    content = content.replace(regex, `$1/assets/cover_images/${m.image}$2`);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated servicesData.ts with new image paths.');
