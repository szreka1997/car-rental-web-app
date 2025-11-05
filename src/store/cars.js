import Car from "../models/car";

const carsModule = {
  namespaced: true,
  state() {
    return {
      cars: [
        new Car(
          "car1",
          "Tesla",
          "Model 3",
          2023,
          35000,
          "A Tesla Model 3 egy teljesen elektromos prémium szedán, amely ötvözi a lenyűgöző gyorsulást, a hosszú hatótávot és a csúcstechnológiás felszereltséget. A minimalista belső térben hatalmas érintőképernyő uralja a középkonzolt, amelyen keresztül minden funkció vezérelhető. A Model 3 ideális választás azoknak, akik egy modern, fenntartható és mégis sportos autót keresnek mindennapi használatra.",
          "https://upload.wikimedia.org/wikipedia/commons/a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg"
        ),
        new Car(
          "car2",
          "Renault",
          "Clio",
          2020,
          9500,
          "A Renault Clio egy kis méretű, de annál praktikusabb városi autó, amely a stílust és a funkcionalitást remekül ötvözi. Gazdaságos motorjai, kényelmes futóműve és könnyű kezelhetősége miatt ideális mindennapi közlekedésre. A belső tér modern, jól felszerelt, és a kategóriában kimagasló biztonsági felszereltséget kínál.",
          "https://upload.wikimedia.org/wikipedia/commons/2/2d/Renault_Clio_V_IMG_2530.jpg"
        ),
        new Car(
          "car3",
          "Toyota",
          "Corolla",
          2022,
          12000,
          "A Toyota Corolla világszerte az egyik legnépszerűbb és legmegbízhatóbb családi autó. Kiváló üzemanyag-hatékonyságot, kényelmes utasteret és hosszú élettartamot kínál. Az új generációs Corolla modern formavilágával és fejlett biztonsági rendszereivel ideális választás városi közlekedéshez és hosszabb utakhoz is.",
          "https://upload.wikimedia.org/wikipedia/commons/f/f6/Toyota_Corolla_Limousine_Hybrid_Genf_2019_1Y7A5576.jpg"
        ),
        new Car(
          "car4",
          "Ford",
          "Focus",
          2021,
          11000,
          "A Ford Focus egy dinamikus, kényelmes és jól vezethető kompakt autó, amelyet modern technológiák és fejlett vezetéstámogató rendszerek tesznek különlegessé. A tágas utastér és a precíz futómű sportos, mégis praktikus vezetési élményt biztosít, akár városban, akár autópályán.",
          "https://upload.wikimedia.org/wikipedia/commons/c/ca/2018_Ford_Focus_Titanium_EcoBoost_1.0_Front.jpg"
        ),
        new Car(
          "car5",
          "Volkswagen",
          "Golf",
          2020,
          13000,
          "A Volkswagen Golf a kompakt kategória etalonja, amely évtizedek óta a minőség és megbízhatóság szimbóluma. Letisztult dizájn, kifinomult vezetési élmény és kiváló ergonómia jellemzi. A belső tér magas színvonalú anyaghasználata és a modern infotainment rendszer minden utazást élvezetessé tesz.",
          "https://upload.wikimedia.org/wikipedia/commons/8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg"
        ),
        new Car(
          "car6",
          "Skoda",
          "Octavia",
          2023,
          14000,
          "A Skoda Octavia egy tágas és kényelmes szedán, amely ideális választás családok és üzletemberek számára egyaránt. Nagy csomagtere, kifinomult motorjai és modern biztonsági rendszerei kiemelik a kategóriájából. Az új generációs modell digitális műszerfallal és prémium hatású belsővel érkezik.",
          "https://upload.wikimedia.org/wikipedia/commons/5/5a/Skoda_Octavia_1.9_TDi_Ambiente_2004_%2814305660567%29.jpg"
        ),
        new Car(
          "car7",
          "Hyundai",
          "i30",
          2022,
          11500,
          "A Hyundai i30 egy megbízható és modern kompakt autó, amely a gazdaságos üzemeltetést és a fejlett biztonsági technológiákat ötvözi. Letisztult formaterve és jól átgondolt belső tere kényelmes utazást biztosít mind a vezetőnek, mind az utasoknak. Kiváló ár-érték arányával az egyik legjobb választás a kategóriájában.",
          "https://upload.wikimedia.org/wikipedia/commons/7/75/2018_Hyundai_i30_SE_Nav_T-GDi_1.3_Front.jpg"
        ),
        new Car(
          "car8",
          "Kia",
          "Ceed",
          2021,
          10500,
          "A Kia Ceed egy sokoldalú, kompakt ferdehátú, amely kiválóan egyesíti a modern dizájnt, a kényelmet és a megbízhatóságot. Fejlett biztonsági rendszerei és gazdaságos motorjai révén ideális mindennapi használatra. A minőségi anyaghasználat és a letisztult kezelőfelület prémium érzetet kelt a belső térben.",
          "https://upload.wikimedia.org/wikipedia/commons/c/c6/2018_Kia_Ceed_First_Edition_1.4_Front.jpg"
        ),
        new Car(
          "car9",
          "BMW",
          "320i",
          2023,
          22000,
          "A BMW 320i a sportos elegancia megtestesítője, prémium kivitelben és lenyűgöző vezetési élménnyel. Erős, mégis hatékony motorja, hátsókerék-hajtása és kifinomult futóműve dinamikus, precíz irányíthatóságot biztosít. A belső tér luxus szintű kidolgozottsága és technológiai felszereltsége páratlan komfortot nyújt.",
          "https://upload.wikimedia.org/wikipedia/commons/0/03/2019_BMW_320d_xDrive_M_Sport_2.0_Front.jpg"
        ),
        new Car(
          "car10",
          "Mercedes-Benz",
          "A200",
          2022,
          23000,
          "A Mercedes-Benz A200 egy prémium kompakt autó, amely ötvözi a sportos megjelenést a luxus kényelmével. Fejlett infotainment rendszere, kifinomult futóműve és prémium anyaghasználata igazi nagyautós élményt kínál egy kisebb méretben. Ideális azok számára, akik stílusosan szeretnének közlekedni a városban.",
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/2018_Mercedes-Benz_A200_AMG_Line_Premium_Automatic_1.3_Front.jpg"
        ),
        new Car(
          "car11",
          "Audi",
          "A3",
          2021,
          21000,
          "Az Audi A3 egy kompakt prémium modell, amely elegáns megjelenésével és kifinomult technológiáival tűnik ki. A pontos irányíthatóság, a kényelmes belső tér és a modern digitális kijelzők tökéletes harmóniát teremtenek a vezetés élménye és a kényelem között. Az A3 ideális választás azoknak, akik szeretik a letisztult, mégis dinamikus stílust.",
          "https://upload.wikimedia.org/wikipedia/commons/0/03/A3_rot_S-Line.jpg"
        ),
        new Car(
          "car12",
          "Nissan",
          "Qashqai",
          2022,
          16000,
          "A Nissan Qashqai a crossover kategória úttörője, amely ötvözi az SUV-k magas üléspozícióját a kompakt autók könnyedségével. Tágas belső tere, modern infotainment rendszere és gazdaságos motorjai ideálissá teszik a mindennapi használatra és hosszabb utazásokra is. Kényelmes, praktikus és stílusos választás a családok számára.",
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/2024_Nissan_Qashqai_e-Power_IMG_2187.jpg"
        ),
      ],
    };
  },
  getters: {
    cars(state) {
      return [...state.cars];
    },
  },
};

export default carsModule;
