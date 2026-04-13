const fs = require('fs');
const path = require('path');

const baseDir = path.join('c:', 'Users', 'Sumit Pujari', 'Desktop', 'SP_Website', 'SP-Events', 'public', 'assets', 'cover_images');

const mapping = {
  '1.webp': 'development_dialogue_2024.webp',
  '2.webp': 'hubballi_ugadi_utsava_2023.webp',
  '3.webp': 'volvo_c40_promotional_event_2024.webp',
  '4.webp': 'pm_narendra_modi_visit_bailhongal_2023.webp',
  '5.webp': 'king_stonish_paul_1st_birthday_celebration_2024.webp',
  '6.webp': 'ballys_casino_event_2024.webp',
  '7.webp': 'kle_mr_sakhare_state_school_annual_day_2019.webp',
  '8.webp': 'startup_gravity_deshpande_foundation_2023.webp',
  '9.webp': 'namo_drone_didi_event_pm_narendra_modi_2024.webp',
  '10.webp': 'tiecon_hubballi_event_2023.webp',
  '11.webp': 'vijayvani_education_expo_2024.webp',
  '12.webp': 'eskay_silk_sarees_launch_event_2023.webp',
  '13.webp': 'kle_mr_sakhare_state_school_annual_day_2024.webp',
  '14.webp': 'startup_dialogue_event_2023.webp',
  '15.webp': 'kaleidorhythm_2024_kle_school_rayapur.webp',
  '16.webp': 'bis_world_standards_day_celebration_2024.webp',
  '17.webp': 'bis_stakeholders_conclave_2024.webp',
  '18.webp': 'bis_manak_mahotsav_2024.webp',
  '19.webp': 'kle_school_manjunath_nagar_annual_day_2024.webp',
  '20.webp': 'karnataka_spice_buyer_seller_meet_2024.webp',
  '21.webp': 'iiit_dharwad_hr_conclave_2024.webp',
  '22.webp': 'arogya_habba_samyukta_karnataka_2024.webp',
  '23.webp': 'kle_mr_sakhare_cbse_annual_day_2024.webp',
  '24.webp': 'corteva_agriscience_event_2024.webp',
  '25.webp': 'hp_telecom_samwad_2025.webp',
  '26.webp': 'iiit_dharwad_sangeet_2025.webp',
  '27.webp': 'bn_khot_international_school_annual_day_2025.webp',
  '28.webp': 'kala_sourabh_event_2025.webp',
  '29.webp': 'samhiti_kle_bba_hubli_2025.webp',
  '30.webp': 'sulthan_diamonds_gold_14th_launch_2025.webp',
  '31.webp': 'kapicon_2025_api_karnataka.webp',
  '32.webp': 'hodek_plant_3_grand_launch_2025.webp',
  '35.webp': 'development_dialogue_15th_edition_2025.webp',
  '36.webp': 'elutu_mutha_audio_launch_2025.webp',
  '37.webp': 'bn_khot_u16_cricket_tournament_2025.webp',
  '38.webp': 'corteva_deladaxin_launch_2025.webp',
  '39.webp': 'nirmala_sitharaman_dharti_bionest_2025.webp',
  '40.webp': 'rajeshwari_orian_park_launch_2025.webp',
  '41.webp': 'karnataka_agnihotra_world_record_2025.webp',
  '42.webp': 'altiora_tejas_school_annual_day_2026.webp',
  '43.webp': 'sulthan_diamonds_gold_20th_launch_2026.webp',
  '44.webp': 'kalparva_mrn_ayurvedic_college_2026.webp',
  '45.webp': 'kalakriti_it_fest_kle_bca_2026.webp'
};

Object.entries(mapping).forEach(([oldName, newName]) => {
  const oldPath = path.join(baseDir, oldName);
  const newPath = path.join(baseDir, newName);

  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.warn(`File not found: ${oldName}`);
  }
});

console.log('Renaming complete.');
