// Arxiu unificat amb totes les dades de les preguntes
const questionsData = {
    "SA1": {
        "title": "CAIGUDA DE L'IMPERI ROMÀ",
        "questions": [
            {
                "type": "multiopcio",
                "text": "Quin dels següents factors va ser una causa política de la crisi de l'Imperi Romà d'Occident?",
                "options": [
                    "La pèrdua de terres cultivables per l'erosió.",
                    "La inestabilitat i les guerres civils per la successió imperial.",
                    "La importació massiva de seda de la Xina.",
                    "L'aparició de noves tecnologies militars."
                ],
                "correct": 1,
                "feedback": "És correcte. Les lluites pel poder i la manca d'un sistema clar de successió van afeblir l'imperi."
            },
            {
                "type": "vertader-fals",
                "text": "La divisió de l'Imperi Romà en Orient i Occident va afeblir considerablement l'Imperi d'Occident.",
                "correct": true,
                "feedback": "Exacte. L'Imperi d'Orient era més ric i estabilitzat, mentre que l'Occident va quedar més exposat a les invasions i amb menys recursos."
            },
            {
                "type": "desenvolupament",
                "text": "Explica com les invasions germàniques van contribuir a la caiguda de l'Imperi Romà d'Occident.",
                "expectedElements": [
                    "Pressió militar constant als límits",
                    "Pèrdua de territoris",
                    "Establiment de regnes germànics",
                    "Debilitat econòmica i política"
                ],
                "feedback": "Molta feina! Has entès la relació entre les invasions i la debilitat de l'imperi."
            },
            {
                "type": "emplenar-buits",
                "text": "L'Imperi Romà d'Occident es va dividir en dos l'any ______. Entre les causes de la seva caiguda hi ha les ______ civils, les invasions ______ i la crisi ______.",
                "answers": ["476", "guerres", "germàniques", "econòmica"],
                "feedback": "Perfecte. Has recordat les causes principals i la data clau de la caiguda."
            }
        ]
    },
    "SA2": {
        "title": "IMPERI BIZANTÍ",
        "questions": [
            {
                "type": "multiopcio",
                "text": "Quina va ser la capital de l'Imperi Bizantí?",
                "options": [
                    "Roma",
                    "Atenes",
                    "Constantinoble",
                    "Alexandria"
                ],
                "correct": 2,
                "feedback": "Correcte. Constantinoble va ser el centre polític, econòmic i cultural de l'Imperi Romà d'Orient."
            },
            {
                "type": "vertader-fals",
                "text": "L'Imperi Bizantí va mantenir la religió romana com a religió oficial durant tota la seva existència.",
                "correct": false,
                "feedback": "És fals. La religió predominant va ser la catòlica, i més tard l'ortodoxa, no la romana pagana."
            },
            {
                "type": "desenvolupament",
                "text": "Explica la importància de l'Imperi Bizantí com a pont entre l'antiguitat clàssica i l'edat mitjana.",
                "expectedElements": [
                    "Preservació del saber clàssic",
                    "Transmissió cultural",
                    "Desenvolupament del dret romà",
                    "Defensa d'Europa"
                ],
                "feedback": "Excel·lent. Has destacat el seu paper clau en la conservació i transmissió de la cultura clàssic."
            },
            {
                "type": "emplenar-buits",
                "text": "L'Imperi Bizantí es va originar amb la divisió de l'Imperi Romà l'any ______. El seu emperador més important va ser ______, qui va compilar les lleis en el ______.",
                "answers": ["476", "Justinià", "Codi de Justinià"],
                "feedback": "Molt bé. Has identificat correctament l'any, la figura clau i la seva obra més important."
            }
        ]
    },
    "SA3": {
        "title": "IMPERI ISLÀMIC",
        "questions": [
            {
                "type": "multiopcio",
                "text": "On va néixer Mahoma, fundador de l'islam?",
                "options": [
                    "Medina",
                    "Damasc",
                    "La Meca",
                    "Bagdad"
                ],
                "correct": 2,
                "feedback": "Correcte. Mahoma va néixer a La Meca, ciutat sagrada de l'islam."
            },
            {
                "type": "vertader-fals",
                "text": "L'expansió de l'Imperi Islàmic va ser sobretot militar i no va incloure aspectes culturals o comercials.",
                "correct": false,
                "feedback": "És fals. L'expansió va incloure també comerç, cultura, llengua i religió, no només conquestes militars."
            },
            {
                "type": "desenvolupament",
                "text": "Explica els factors que van permetre la ràpida expansió de l'Imperi Islàmic durant els segles VII i VIII i a quins continents es va extendre.",
                "expectedElements": [
                    "Unificació de tribus àrabs",
                    "Comerç",
                    "Religió",
                    "Poder militar",
                    "Idioma i cultura",
                    "Àfrica, Àsia i Europa"
                ],
                "feedback": "Molt bé. Has assenyalat tant els factors interns com l'abast geogràfic de l'expansió."
            },
            {
                "type": "emplenar-buits",
                "text": "L'any de la Hègira, quan Mahoma va fugir de La Meca a Medina, va ser l'any ______. Aquest any és considerat l'inici del ______ Musulmà. El profeta Mahoma predicava la paraula del déu ______ i està recollit al llibre anomenat ______.",
                "answers": ["622", "calendari", "Al·là", "Alcorà"],
                "feedback": "Perfecte. Has recordat les dades fonamentals de l'origen de l'islam."
            }
        ]
    },
    "SA4": {
        "title": "IMPERI CAROLINGI",
        "questions": [
            {
                "type": "multiopcio",
                "text": "Quin papa va coronar Carlemany com a emperador?",
                "options": [
                    "Gregori I",
                    "Lleó III",
                    "Esteve II",
                    "Nicolau I"
                ],
                "correct": 1,
                "feedback": "Correcte. El papa Lleó III el va coronar l'any 800, simbolitzant la restauració de l'Imperi a Occident."
            },
            {
                "type": "vertader-fals",
                "text": "L'Imperi Carolingi va durar més de 500 anys després de la mort de Carlemany.",
                "correct": false,
                "feedback": "És fals. Es va dividir amb el Tractat de Verdun (843), poc després de la seva mort."
            },
            {
                "type": "desenvolupament",
                "text": "Explica en què va consistir el 'Renaixement Carolingi' i la seva importància.",
                "expectedElements": [
                    "Reforma educativa",
                    "Preservació de textos clàssics",
                    "Desenvolupament de l'escriptura",
                    "Arquitectura i art",
                    "Reforma religiosa"
                ],
                "feedback": "Excel·lent. Has captat l'essència d'aquest renaixement cultural i intel·lectual."
            },
            {
                "type": "emplenar-buits",
                "text": "Carlemany va ser coronat emperador l'any ______. El seu imperi es va dividir amb el tractat de ______ l'any 843. Els seus tres nets van repartir-se l'imperi: ______ va obtenir la part oriental, ______ la part occidental, i ______ la part central.",
                "answers": ["800", "Verdun", "Lluís el Germànic", "Carles el Calb", "Lotari"],
                "feedback": "Molt bé. Has recordat les dades clau de la coronació i la divisió de l'imperi."
            }
        ]
    }
};

// Funció per obtenir les dades de les preguntes (per si es vol utilitzar en un futur)
function getQuestionData(section, questionIndex) {
    if (questionsData[section] && questionsData[section].questions[questionIndex]) {
        return questionsData[section].questions[questionIndex];
    }
    return null;
}