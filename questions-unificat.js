// QÜESTIONARI UNIFICAT - TOTES LES SA
const allQuestions = [
    // SA1.1 - Crisi de Roma i regnes germànics (5 preguntes)
    {
        id: 1,
        sa: "SA1.1",
        type: 'multiple-choice',
        question: "Quin dels següents factors va ser una causa política de la crisi de l'Imperi Romà d'Occident?",
        options: [
            "La pèrdua de terres cultivables per l'erosió.",
            "La inestabilitat i les guerres civils per la successió imperial.",
            "La importació massiva de seda de la Xina.",
            "L'aparició de noves tecnologies militars."
        ],
        correctAnswer: 1,
        feedback: "✅ <strong>Resposta Correcta: La inestabilitat i les guerres civils per la successió imperial.</strong><br><br>📚 <strong>Explicació:</strong> Durant el segle III, l'Imperi va viure una forta inestabilitat política amb múltiples emperadors en pocs anys, molts d'ells imposats pels exèrcits, i guerres civils que van debilitar l'estat romà."
    },
    {
        id: 2,
        sa: "SA1.1", 
        type: 'true-false',
        question: "Els pobles germànics que van entrar a l'Imperi Romà eren nòmades sense coneixements d'agricultura.",
        correctAnswer: false,
        feedback: "✅ <strong>Resposta Correcta: Fals</strong><br><br>📚 <strong>Explicació:</strong> És un error comú. La majoria de pobles germànics tenien una economia agrícola i ramadera assentada. El que els impulsava a moure's era la pressió d'altres pobles (com els huns) i la cerca de terres més fèrtils i la seguretat de l'Imperi."
    },
    {
        id: 3,
        sa: "SA1.1",
        type: 'fill-blank', 
        question: "Completeu la següent oració: L'esdeveniment del ______, quan els ______ van saquejar la ciutat de Roma, va commocionar el món antic i va mostrar la gran debilitat de l'Imperi.",
        correctAnswer: ["any 410", "visigots"],
        feedback: "✅ <strong>Resposta Correcta: any 410 / visigots</strong><br><br>📚 <strong>Explicació:</strong> El saqueig de Roma l'any 410 per part dels visigots d'Alaric I va ser un xoc psicològic immens. Era la primera vegada que la ciutat era saquejada per un exèrcit estranger en gairebé 800 anys, i va demostrar que Roma ja no era invulnerable."
    },
    {
        id: 4,
        sa: "SA1.1",
        type: 'short-answer',
        question: "Explica breument dues causes econòmiques que van afeblir l'Imperi Romà.",
        modelAnswer: "Dues causes econòmiques clau van ser: 1. La crisi del sistema esclavista: Les guerres de conquesta es van acabar i, per tant, la font principal d'esclaus. Això va encarir la producció agrícola i va provocar una crisi als grers latifundis. 2. La inflació i la pujada d'impostos: L'estat encunyava monedes amb menys metall preciós per fer front a les despeses, la qual cosa va provocar una forta inflació. Per compensar, pujava els impostos, afeblint encara més l'economia i la població.",
        feedback: ""
    },
    {
        id: 5,
        sa: "SA1.1",
        type: 'long-answer',
        question: "Desenvolupa de manera extensa com es va produir la transició de l'Imperi Romà als regnes germànics a la península Ibèrica.",
        modelAnswer: "Fases de la transició: Entrada dels pobles: Al segle V, sueus, vàndals i alans creuen els Pirineus i s'estableixen a Hispània, fora del control efectiu de Roma. Intervenció visigoda com a federats: L'Imperi demana ajuda als visigots (pobles federats) per expulsar aquests pobles. Els visigots derroten els vàndals i alans (que marxen al nord d'Àfrica) i acaben controlant gran part del territori. Formació del Regne: Inicialment, la seva capital és Tolosa (a la Gàl·lia). Després de ser derrotats pels francs, es traslladen a la Península i estableixen la capital a Toledo.",
        feedback: ""
    },

    // SA1.2 - Imperi Bizantí i Justinà (5 preguntes)
    {
        id: 6,
        sa: "SA1.2",
        type: 'multiple-choice',
        question: "Quin va ser el principal objectiu del Codi de Justinià?",
        options: [
            "Expandir l'Imperi cap a Occident",
            "Recopilar i sistematizar el dret romà",
            "Promoure l'art hel·lenístic", 
            "Establir el cristianisme ortodox"
        ],
        correctAnswer: 1,
        feedback: "✅ <strong>Resposta Correcta: Recopilar i sistematizar el dret romà</strong><br><br>📚 <strong>Explicació:</strong> El Codi de Justinià (Corpus Juris Civilis) va ser una recopilació i sistematització de tot el dret romà existent, que va servir de base per al dret europeu posterior."
    },
    {
        id: 7,
        sa: "SA1.2",
        type: 'true-false',
        question: "Santa Sofia va ser inicialment construïda com a mesquita.",
        correctAnswer: false,
        feedback: "✅ <strong>Resposta Correcta: Fals</strong><br><br>📚 <strong>Explicació:</strong> Santa Sofia va ser construïda com a basílica cristiana ortodoxa durant el regnat de Justinià I. No va ser convertida en mesquita fins després de la conquesta otomana de Constantinoble el 1453."
    },
    {
        id: 8,
        sa: "SA1.2",
        type: 'fill-blank',
        question: "La capital de l'Imperi Bizantí era ______, situada estratègicament entre ______ i ______.",
        correctAnswer: ["Constantinoble", "Europa", "Àsia"],
        feedback: "✅ <strong>Resposta Correcta: Constantinoble / Europa / Àsia</strong><br><br>📚 <strong>Explicació:</strong> Constantinoble (actual Istanbul) estava situada en una posició estratègica entre Europa i Àsia, controlant les rutes comercials entre els dos continents."
    },
    {
        id: 9,
        sa: "SA1.2", 
        type: 'short-answer',
        question: "Explica la importància dels mosaics bizantins com el de Justinià a San Vitale.",
        modelAnswer: "Els mosaics bizantins com el de Justinià a Ravenna tenien una doble funció: religiosa i política. Religiosament, servien per educar en la fe als fidels analfabets. Políticament, representaven el poder de l'emperador i la seva relació amb Déu, mostrant la unió entre el poder temporal i l'espiritual.",
        feedback: ""
    },
    {
        id: 10,
        sa: "SA1.2",
        type: 'long-answer', 
        question: "Desenvolupa les principals innovacions i continuïtats de l'Imperi Bizantí respecte a l'Imperi Romà.",
        modelAnswer: "Continuïtats: Manteniment del dret romà, l'administració imperial, l'ús del llatí i el grec, i les tècniques arquitectòniques romanes. Innovacions: Adopció del cristianisme com a religió oficial, desenvolupament de l'art i arquitectura bizantina (cúpules, mosaics), fusió de cultures gregues i orientals, i un major paper de l'emperador en assumptes religioss.",
        feedback: ""
    },

    // SA1.3 - Món Islàmic (5 preguntes)
    {
        id: 11,
        sa: "SA1.3",
        type: 'multiple-choice',
        question: "Quin esdeveniment marca l'inici del calendari islàmic?",
        options: [
            "El naixement de Mahoma",
            "La revelació de l'Alcorà",
            "L'Hègira de la Meca a Medina",
            "La conquesta de la Meca"
        ],
        correctAnswer: 2,
        feedback: "✅ <strong>Resposta Correcta: L'Hègira de la Meca a Medina</strong><br><br>📚 <strong>Explicació:</strong> L'Hègira, la fugida de Mahoma i els seus seguidors de la Meca a Medina el 622 d.C., marca l'inici del calendari islàmic."
    },
    {
        id: 12,
        sa: "SA1.3",
        type: 'true-false', 
        question: "Els cinc pilars de l'Islam inclouen el pelegrinatge a Jerusalem.",
        correctAnswer: false,
        feedback: "✅ <strong>Resposta Correcta: Fals</strong><br><br>📚 <strong>Explicació:</strong> Els cinc pilars són: professió de fe, pregària, almoina, dejuni durant el Ramadà i pelegrinatge a la Meca (no a Jerusalem)."
    },
    {
        id: 13,
        sa: "SA1.3",
        type: 'fill-blank',
        question: "La ______ era el centre religiós de les ciutats islàmiques, mentre que el ______ era el centre comercial.",
        correctAnswer: ["mesquita", "zoc"],
        feedback: "✅ <strong>Resposta Correcta: mesquita / zoc</strong><br><br>📚 <strong>Explicació:</strong> La mesquita era el nucli de la vida religiosa i comunitària, mentre que el zoc (mercado) era el centre de l'activitat comercial i artesanal."
    },
    {
        id: 14,
        sa: "SA1.3",
        type: 'short-answer',
        question: "Explica dos factors que van facilitar la ràpida expansió de l'Islam.",
        modelAnswer: "Dos factors clau van ser: 1. La debilitat dels imperis veïns (Bizantí i Persa) després de guerres prolongades. 2. La tolerança cap als 'Pobles del Llibre' (jueus i cristians), que permetia la continuïtat de les seves religions amb certes condicions.",
        feedback: ""
    },
    {
        id: 15,
        sa: "SA1.3",
        type: 'long-answer',
        question: "Desenvolupa les principals contribucions del món islàmic a la cultura i la ciència medieval.",
        modelAnswer: "El món islàmic va contribuir significativament en: Matemàtiques (introducció dels numerals aràbics, àlgebra), Medicina (obres d'Avicenna, hospitals), Astronomia (observatoris, millores en astrolabis), Filosofia (preservació d'obres gregues, Averrois), i Arquitectura (arcs de ferradura, decoració geomètrica). A més, van ser transmisors del coneixement clàssic grec a Europa.",
        feedback: ""
    },

    // SA1.4 - Imperi Carolingi (5 preguntes)
    {
        id: 16,
        sa: "SA1.4", 
        type: 'multiple-choice',
        question: "Quin esdeveniment va marcar la coronació de Carlemany com a emperador?",
        options: [
            "El Tractat de Verdun",
            "La coronació pel Papa Lleó III el Nadal de l'any 800",
            "La victòria sobre els saxons",
            "La fundació de l'Escola Palatina"
        ],
        correctAnswer: 1,
        feedback: "✅ <strong>Resposta Correcta: La coronació pel Papa Lleó III el Nadal de l'any 800</strong><br><br>📚 <strong>Explicació:</strong> El 25 de desembre de l'any 800, el Papa Lleó III va coronar Carlemany com a emperador, restablint així el títol imperial a Occident."
    },
    {
        id: 17,
        sa: "SA1.4",
        type: 'true-false',
        question: "El Tractat de Verdun va dividir l'Imperi Carolingi entre els fills de Carlemany.",
        correctAnswer: false, 
        feedback: "✅ <strong>Resposta Correcta: Fals</strong><br><br>📚 <strong>Explicació:</strong> El Tractat de Verdun (843) va dividir l'Imperi entre els nets de Carlemany: Lluís el Germànic, Carles el Calb i Lotari I."
    },
    {
        id: 18,
        sa: "SA1.4",
        type: 'fill-blank',
        question: "La ______ carolíngia va ser un renaixement cultural que va promoure l'______ i la preservació del coneixement.",
        correctAnswer: ["renaixença", "educació"],
        feedback: "✅ <strong>Resposta Correcta: renaixença / educació</strong><br><br>📚 <strong>Explicació:</strong> La Renaixença carolíngia va ser un període de revifament cultural i educatiu promogut per Carlemany, amb la creació d'escoles i la còpia de manuscrits antics."
    },
    {
        id: 19,
        sa: "SA1.4",
        type: 'short-answer',
        question: "Explica la relació entre el poder polític i religiós en l'Imperi Carolingi.",
        modelAnswer: "En l'Imperi Carolingi es va establir una estreta aliança entre el poder polític i el religiós. Carlemany es va presentar com a protector de l'Església i el Papa el va coronar emperador, legitimant el seu poder. A canvi, Carlemany defensava els interessos de l'Església i promovia la cristianització.",
        feedback: ""
    },
    {
        id: 20,
        sa: "SA1.4",
        type: 'long-answer',
        question: "Desenvolupa com la fragmentació de l'Imperi Carolingi va contribuir a l'origen del feudalisme.",
        modelAnswer: "La divisió de l'Imperi Carolingi després del Tractat de Verdun va afeblir el poder central. Sense una autoritat forta, la població va buscar protecció en senyors locals, donant lloc a relacions de vassallatge. Els nobles oferien protecció i terres (feus) a canvi de lleialtat i serveis militars, establint les bases del sistema feudal que caracteritzaria l'alta edat mitjana.",
        feedback: ""
    }
];