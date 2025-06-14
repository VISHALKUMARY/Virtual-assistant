
  let btn = document.querySelector("#btn");
  let content = document.querySelector("#content");
  let voice = document.querySelector("#voice");

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
  }

  function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
      speak("Good Afternoon Sir");
    } else {
      speak("Good Evening Sir");
    }
  }

  window.addEventListener("load", () => {
    wishMe();
  });

  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  recognition.continuous = false;

  recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.trim().toLowerCase());
  };

  btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
  });

  function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "inline-block";

    if (message.includes("hello") || message.includes("hey")) {
      speak("Hello sir, what can I help you with?");
    } else if (message.includes("how are you")) {
      speak("I am fine sir, how can I help you today?");
    } else if (message.includes("thank you")) {
      speak("You're welcome sir!");
    } else if (message.includes("what is your name")) {
      speak("My name is Vishal's assistant");
    } else if (message.includes("what can you do")) {
      speak("I can open websites, tell time and date, and answer simple questions.");
    } else if (message.includes("open github")) {
      speak("Opening GitHub...");
      window.open("https://github.com/", "_blank");
    } else if (message.includes("open linkedin vishal")) {
      speak("Opening Vishal's LinkedIn...");
      window.open("https://www.linkedin.com/in/vishal-kumar-71a2a5251/", "_blank");
    } else if (message.includes("open linkedin")) {
      speak("Opening LinkedIn...");
      window.open("https://linkedin.com/", "_blank");
    } else if (message.includes("open gmail")) {
      speak("Opening Gmail...");
      window.open("https://mail.google.com/", "_blank");
    } else if (message.includes("play music")) {
      speak("Playing music on YouTube...");
      window.open("https://www.youtube.com/results?search_query=play+music", "_blank");
    } else if (message.includes("weather")) {
      speak("Here's the weather forecast...");
      window.open("https://www.google.com/search?q=weather", "_blank");
    } else if (message.includes("news")) {
      speak("Opening latest news...");
      window.open("https://news.google.com", "_blank");
    } else if (message.includes("stop") || message.includes("bye")) {
      speak("Goodbye Sir, have a nice day!");
      window.speechSynthesis.cancel();
    } else if (message.includes("time")) {
      let time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      speak("The time is " + time);
    } else if (message.includes("date")) {
      let date = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      speak("Today's date is " + date);
    } else {
      let cleanedMessage = message.replace(/shipra|shifra/gi, "").trim();
      let finalText = "This is what I found on the internet regarding " + cleanedMessage;
      speak(finalText);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(cleanedMessage)}`, "_blank");
    }
  }
