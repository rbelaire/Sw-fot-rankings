// Map a week number to a film or a text ranking.
//
// Rankings (used instead of a video):
//   1: { rankings: [{ name: "Chalupa", note: "def not fot" }] }
// An item may include subs: [{ name, note }, ...], rendered indented under it.
// An item may include image: "images/file.jpg", shown below the note.
// A week may include intro: "line above the list".
//
// A string entry is a URL. It is used instead of a file in videos/:
//   YouTube  — watch, youtu.be, shorts, embed
//   Vimeo    — vimeo.com/ID or player.vimeo.com/video/ID
//   Drive    — drive.google.com/file/d/ID/view or open?id=ID
//   File     — any .mp4, .webm, or .mov URL, including a path such as videos/my-cut.mp4
// Weeks 4 through 9 are self-hosted .mov files.
// Do not ship videos/week-04.mp4.
//
// A file named videos/week-09.mp4 (week-01 … week-14) is a fallback for a week
// with no rankings list and no URL, once its filename is listed in WEEK_FILES.
// .mp4 wins when both are listed. Video files are not in git.
//
// Weeks with no list, no URL, and no listed file show "Coming soon".
window.WEEK_FILES = [];

window.WEEK_VIDEOS = {
  1: {
    rankings: [
      { name: "Chalupa", note: "def not fot" },
      { name: "Bucket", note: "new to not being fot" },
      { name: "Peck", note: "not fot but get rid of fannin cuz he some fot" },
      { name: "A1/Ak", note: "whoever loses is on fot alert" },
      { name: "Bel", note: "not fot right now but who are we kidding will probably and most likely be fot" },
      { name: "City", note: "Not fot but if anybody gets hurt you may be fot" },
      { name: "H", note: "can't tell if you fot but you drafted a kicker in the 2nd round so you should be fot" },
      { name: "Slowby", note: "you only winning cuz I'm fot but you kinda fot" },
      { name: "Lane, me g", note: "we hot fot. Whether we stay hot fot us up to us" },
      { name: "Jv", note: "you deserve to be fot and are fot" },
      { name: "Nick", note: "don't deserve to be fot but you some hot fot" },
    ],
  },
  2: {
    rankings: [
      // Placeholder until the real first line is written. Replace name and note.
      { name: "#1", note: "…fantasizing about it" },
      { name: "Chow", note: "you still not fot, you just ran into lane who is probably still backed up from his wife being out of commission. He had to take it out on somebody" },
      { name: "City", note: "you’ll never be fot as long as you got Allen and JSN so don’t be stupid (I smell some fot coming from you though. that’s probably pitts, it’s burnt throw it out)" },
      { name: "Lane", note: "(and I’m hopeful, yes I am hopeful for today) I told you not to be fot no moe…  he went on to not be fot no moe" },
      { name: "Ak", note: "you good gamed Aman ra. not a fan of that. Keep it up I’ll drop you down on this fot list so fast ya fots will spin." },
      { name: "Bucket", note: "you flew to close to the sun and it made you smell like fot. A humble fot never hurt nobody let’s see how you handle it." },
      { name: "H", note: "good news you a victim.. it’s not your fault. Bad news you got lupa this week. Life’s tough get a helmet" },
      { name: "Peck", note: "fuck davante Adams" },
      { name: "Me", note: "I clawed my way out of the stinky corner but I still need a Showa. Somebody come to my window or I may be back in the fot corner 👇🏽" },
      {
        name: "THE FOT CORNER:",
        subs: [
          { name: "Slowby", note: "you some fot but you keep on winning. Life ain’t fair sometimes. You win again I’ll take you out the corner, but I’m not prepared to make that call yet (fair and unbiased like I would be as a ref)" },
          { name: "G", note: "you in the 7 stages of fot grief right now. Leaving denial and entering anger. Looking forward to bargaining when you start selling assets like mc hammer." },
          { name: "Al", note: "I’m not gonna pile on too heavy but you smell like Williams pampers right now. And if it’s anything like his daddy, puhhhh. Need you to have that same performance against me this week." },
          { name: "Jv/Nick", note: "yall rock paper scissors for who’s cooking so we can establish that early. Fot fot fott-ta tot fott" }
        ],
      },
    ],
  },
  3: {
    intro: "So whopped week 3 fot power rankings:",
    rankings: [
      { name: "Chow", note: "commissioner and somehow top of the fot food chain… seems like this war in Iran is a big distraction from some dirty shit going on down river rd." },
      { name: "Bel", note: "current mood:", image: "images/week03-bel.jpg" },
      { name: "City", note: "a victim to Jose jalepeno and his bullshit tush push. You remain in not fot status, but you playing Russian fot-let with them TE’s. Come see poppa I got a mid sized pre owned TE I can get you in for no money down and no credit check." },
      { name: "Me", image: "images/week03-me.jpg" },
      { name: "Ak/Lane", note: "yall had a good ol fashioned fot off and with 2 seconds left lane hit you with a Dutch oven. HE BOOPED YOU!" },
      { name: "Peck", note: "it’s still fuck davante Adams… unless you wanna give him to me then it’s most definitely not fuck davante Adams" },
      { name: "Jv", note: "I’m taking you out the fot corner but you gotta promise me you not gonna do anyth…." },
      {
        name: "THE FOT CORNER:",
        subs: [
          { name: "Steve", note: "that injury fot fairy doing a number on you. Pains me to put a man that sacrificed his life for this country in this corner. Hang on soldier, reinforcements are on the way.", image: "images/week03-steve.jpg" },
          { name: "Slowby", note: "you some fucking fot bruh… but you probably found a Etsy fot witch or some shit and paid god knows how much to keep this bullshit going. You staying here idgaf" },
          { name: "G", note: "7 stages (cont) and we have definitely entered anger. I can’t wait to witness 7 hours of uninterrupted bullshit between you and JV today." },
          { name: "H", note: "I told you life was tough, get a helmet… the helmet in question :", image: "images/week03-h.jpg" },
          { name: "Al", note: "you good game me and that’s what happens. Blue belt.. I got a belt for you. And everytime you flinch it’s one more", image: "images/week03-al.jpg" },
          { name: "Nick", image: "images/week03-nick.jpg" }
        ],
      },
    ],
  },
  4: "https://pub-672c007bafa4410aa4cca01e646121a9.r2.dev/78731A6A-ADA5-41A4-A761-A913D4321A2E.mov",
  5: "https://pub-672c007bafa4410aa4cca01e646121a9.r2.dev/Week%205.mov",
  6: "https://pub-672c007bafa4410aa4cca01e646121a9.r2.dev/Week%206.mov",
  7: "https://pub-672c007bafa4410aa4cca01e646121a9.r2.dev/Week%207.mov",
  8: "https://pub-672c007bafa4410aa4cca01e646121a9.r2.dev/Week%208.mov",
  9: "https://pub-672c007bafa4410aa4cca01e646121a9.r2.dev/Week%209.mov",
};
