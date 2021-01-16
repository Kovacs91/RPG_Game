let stats = {
    "life": 100,
    "strength": 10,
    "endurance": 10,
    "deffense": 10,
    "experience": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Egy mennyei megyei futbbalista vagy aki mindenhéten szüretibálba jár ", "profile_lvl0.jpg"],
    ["Két szüret között fefigyelt rád a fradi és leigazolt így már NB1-es futbalista vagy!","profile_lvl1.jpg"],
    ["Felérétél a csúcsra megnyertél mindent amit klubcsapattal meg lehet! Élvezd ki míg ki nem öregedsz:)","profile_lvl2.jpg"],
    ["Kiöregedtél szép karierrt futottál itt az ideje élvezni az öregfiúk tornákat! ", "medicine.jpg"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}

/* ADVENTURE */

let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function kaszalas(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.deffense;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        // story.innerHTML += "Megsebződtél (-1 élet)<br>";
        // stats.life -= 1;
        fight("Mókus", 5, 100);
        refreshProfileStats();
    }else{
        story.innerHTML += "Tapasztalatot szereztél! (+1)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function fight(e_name, e_damage, e_life){
    story.innerHTML += "Edzés közben megtámadott téged egy " + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            // ellenfél támad
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.deffense;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Ellenfeled rád ront! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
                refreshProfileStats();
            }else{
                story.innerHTML += "Sikeresen elfutottál "+ e_name+" csapását!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.endurance;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Rátámadsz ellenfeledre! ("+e_name+" -"+stats.strength+" élet)<br>";
                e_life -= stats.strength;
                story.innerHTML += e_name + "-nek maradt " + e_life;
                refreshProfileStats();
            }else{
                story.innerHTML += "Ellenfeled sikeresen kikerül a csapásodat!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}
function  Edzés()
{
    let a =Math.floor(Math.random() * 6);
    if(a%2==0)
    {
        story.innerHTML+="Nyertél a partiban! Tapasztalatot szereztél! (+2)<br>"
        stats.experience+=2;
        refreshProfileStats();
    }
    else
    {
        story.innerHTML+="Elveszted a kártya partit! Próbálkozz tovább kitartást szereztél (+2) <br>"
        stats.endurance+=2;
        refreshProfileStats();
    }
}
function Mérkőzés()
{
    let q=Math.floor(Math.random() * 10);
    if(q==6)
    {
        story.innerHTML+="A súlyzó a lábadra esett. Komoly sérülést okozz így az élet és az erőd is csökkent (-10,-5) <br>";
        stats.life-=10;
        stats.strength-=5;
        stats.experience-=1;
        refreshProfileStats();
    }
    else
    {
        story.innerHTML+="Nagyon jól sikerült az edzés. Nagyon ki vagy pattintva (+5) <br>"
        stats.strength+=5;
        stats.experience+=5;
        refreshProfileStats();
    }
}
