/* FarmConnect Voice Assistant
 * - Floating microphone on every page (7 languages)
 * - Speak a command to open pages, change theme or language, or read the page aloud
 * - Every card, heading and form field gets a 🔊 "listen" button; text boxes get a 🎤 "speak to fill" button
 * - Works with the browser's built-in speech engines (best in Chrome / Edge / Android Chrome)
 * Keeps the older global helpers speak(), startVoice(), handleVoiceCommand() for existing pages.
 */
(function(){
"use strict";
var LANGS=["en","hi","mr","gu","pa","bn","te"];
var LOCALE={en:"en-IN",hi:"hi-IN",mr:"mr-IN",gu:"gu-IN",pa:"pa-IN",bn:"bn-IN",te:"te-IN"};

/* ---------- messages ---------- */
var M={
 hello:{en:"Hello! I am your FarmConnect helper. Tap the microphone and say what you want, for example: sell crop, orders, marketplace or help. Tap read page to hear this page.",
  hi:"नमस्ते! मैं आपका फार्मकनेक्ट सहायक हूँ। माइक दबाकर बोलिए, जैसे: फसल बेचें, ऑर्डर, मार्केटप्लेस या मदद। इस पेज को सुनने के लिए पेज पढ़ें दबाइए।",
  mr:"नमस्कार! मी तुमचा फार्मकनेक्ट मदतनीस आहे. माइक दाबून बोला, जसे: पीक विका, ऑर्डर, मार्केटप्लेस किंवा मदत. हे पान ऐकण्यासाठी पान वाचा दाबा.",
  gu:"નમસ્તે! હું તમારો ફાર્મકનેક્ટ સહાયક છું. માઇક દબાવીને બોલો, જેમ કે: પાક વેચો, ઓર્ડર, માર્કેટપ્લેસ અથવા મદદ. આ પાનું સાંભળવા પાનું વાંચો દબાવો.",
  pa:"ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਫਾਰਮਕਨੈਕਟ ਸਹਾਇਕ ਹਾਂ। ਮਾਈਕ ਦਬਾ ਕੇ ਬੋਲੋ, ਜਿਵੇਂ: ਫਸਲ ਵੇਚੋ, ਆਰਡਰ, ਮਾਰਕੀਟਪਲੇਸ ਜਾਂ ਮਦਦ। ਇਹ ਪੰਨਾ ਸੁਣਨ ਲਈ ਪੰਨਾ ਪੜ੍ਹੋ ਦਬਾਓ।",
  bn:"নমস্কার! আমি আপনার ফার্মকানেক্ট সহায়ক। মাইক চেপে বলুন, যেমন: ফসল বিক্রি, অর্ডার, মার্কেটপ্লেস বা সহায়তা। এই পাতা শুনতে পাতা পড়ুন চাপুন।",
  te:"నమస్కారం! నేను మీ ఫార్మ్‌కనెక్ట్ సహాయకుడిని. మైక్ నొక్కి చెప్పండి, ఉదాహరణకు: పంట అమ్మండి, ఆర్డర్లు, మార్కెట్‌ప్లేస్ లేదా సహాయం. ఈ పేజీ వినడానికి పేజీ చదవండి నొక్కండి."},
 listening:{en:"Listening… speak now",hi:"सुन रहा हूँ… बोलिए",mr:"ऐकत आहे… बोला",gu:"સાંભળી રહ્યો છું… બોલો",pa:"ਸੁਣ ਰਿਹਾ ਹਾਂ… ਬੋਲੋ",bn:"শুনছি… বলুন",te:"వింటున్నాను… చెప్పండి"},
 retry:{en:"Sorry, I did not understand. Please try again.",hi:"माफ़ कीजिए, समझ नहीं आया। कृपया फिर बोलिए।",mr:"माफ करा, समजले नाही. कृपया पुन्हा बोला.",gu:"માફ કરશો, સમજાયું નહીં. કૃપા કરીને ફરી બોલો.",pa:"ਮਾਫ਼ ਕਰਨਾ, ਸਮਝ ਨਹੀਂ ਆਇਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਬੋਲੋ।",bn:"দুঃখিত, বুঝতে পারিনি। আবার বলুন।",te:"క్షమించండి, అర్థం కాలేదు. దయచేసి మళ్లీ చెప్పండి."},
 opening:{en:"Opening",hi:"खोल रहा हूँ",mr:"उघडत आहे",gu:"ખોલી રહ્યો છું",pa:"ਖੋਲ੍ਹ ਰਿਹਾ ਹਾਂ",bn:"খুলছি",te:"తెరుస్తున్నాను"},
 reading:{en:"Reading this page",hi:"यह पेज पढ़ रहा हूँ",mr:"हे पान वाचत आहे",gu:"આ પાનું વાંચી રહ્યો છું",pa:"ਇਹ ਪੰਨਾ ਪੜ੍ਹ ਰਿਹਾ ਹਾਂ",bn:"এই পাতা পড়ছি",te:"ఈ పేజీ చదువుతున్నాను"},
 done:{en:"Done",hi:"हो गया",mr:"झाले",gu:"થઈ ગયું",pa:"ਹੋ ਗਿਆ",bn:"হয়ে গেছে",te:"అయింది"},
 stopped:{en:"Stopped",hi:"रुक गया",mr:"थांबले",gu:"અટક્યું",pa:"ਰੁਕ ਗਿਆ",bn:"থেমেছে",te:"ఆగింది"},
 readBtn:{en:"Read page",hi:"पेज पढ़ें",mr:"पान वाचा",gu:"પાનું વાંચો",pa:"ਪੰਨਾ ਪੜ੍ਹੋ",bn:"পাতা পড়ুন",te:"పేజీ చదవండి"},
 speakBtn:{en:"Speak",hi:"बोलिए",mr:"बोला",gu:"બોલો",pa:"ਬੋਲੋ",bn:"বলুন",te:"చెప్పండి"},
 stopBtn:{en:"Stop",hi:"रुकें",mr:"थांबा",gu:"અટકો",pa:"ਰੁਕੋ",bn:"থামুন",te:"ఆపండి"},
 themeBtn:{en:"Theme",hi:"थीम",mr:"थीम",gu:"થીમ",pa:"ਥੀਮ",bn:"থিম",te:"థీమ్"},
 guideBtn:{en:"Guide",hi:"गाइड",mr:"मार्गदर्शक",gu:"માર્ગદર્શક",pa:"ਗਾਈਡ",bn:"গাইড",te:"గైడ్"},
 listen:{en:"Listen",hi:"सुनें",mr:"ऐका",gu:"સાંભળો",pa:"ਸੁਣੋ",bn:"শুনুন",te:"వినండి"},
 on:{en:"On",hi:"चालू",mr:"चालू",gu:"ચાલુ",pa:"ਚਾਲੂ",bn:"চালু",te:"ఆన్"},
 off:{en:"Off",hi:"बंद",mr:"बंद",gu:"બંધ",pa:"ਬੰਦ",bn:"বন্ধ",te:"ఆఫ్"},
 nomic:{en:"Voice input is not supported in this browser. Please use Chrome or Edge, or tap the big buttons.",hi:"इस ब्राउज़र में आवाज़ से बोलना काम नहीं करता। कृपया Chrome या Edge इस्तेमाल करें, या बड़े बटन दबाएँ।",mr:"या ब्राउझरमध्ये आवाजाने बोलणे चालत नाही. कृपया Chrome किंवा Edge वापरा किंवा मोठी बटणे दाबा.",gu:"આ બ્રાઉઝરમાં અવાજથી બોલવું કામ કરતું નથી. કૃપા કરીને Chrome અથવા Edge વાપરો અથવા મોટા બટનો દબાવો.",pa:"ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਆਵਾਜ਼ ਨਾਲ ਬੋਲਣਾ ਕੰਮ ਨਹੀਂ ਕਰਦਾ। ਕਿਰਪਾ ਕਰਕੇ Chrome ਜਾਂ Edge ਵਰਤੋ, ਜਾਂ ਵੱਡੇ ਬਟਨ ਦਬਾਓ।",bn:"এই ব্রাউজারে ভয়েস ইনপুট কাজ করে না। অনুগ্রহ করে Chrome বা Edge ব্যবহার করুন, অথবা বড় বোতাম চাপুন।",te:"ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ పనిచేయదు. దయచేసి Chrome లేదా Edge ఉపయోగించండి, లేదా పెద్ద బటన్లను నొక్కండి."},
 novoice:{en:"No voice is available for this language on this device. Please connect to the internet or install the language voice in your device settings.",hi:"इस डिवाइस पर इस भाषा की आवाज़ उपलब्ध नहीं है। कृपया इंटरनेट जोड़ें या डिवाइस सेटिंग में भाषा की आवाज़ इंस्टॉल करें।",mr:"या डिव्हाइसवर या भाषेचा आवाज उपलब्ध नाही. कृपया इंटरनेट जोडा किंवा सेटिंगमध्ये भाषेचा आवाज इन्स्टॉल करा.",gu:"આ ડિવાઇસ પર આ ભાષાનો અવાજ ઉપલબ્ધ નથી. કૃપા કરીને ઇન્ટરનેટ જોડો અથવા સેટિંગમાં ભાષાનો અવાજ ઇન્સ્ટોલ કરો.",pa:"ਇਸ ਡਿਵਾਈਸ ਤੇ ਇਸ ਭਾਸ਼ਾ ਦੀ ਆਵਾਜ਼ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਇੰਟਰਨੈੱਟ ਜੋੜੋ ਜਾਂ ਸੈਟਿੰਗ ਵਿੱਚ ਭਾਸ਼ਾ ਦੀ ਆਵਾਜ਼ ਇੰਸਟਾਲ ਕਰੋ।",bn:"এই ডিভাইসে এই ভাষার ভয়েস নেই। অনুগ্রহ করে ইন্টারনেট সংযোগ করুন বা সেটিংসে ভাষার ভয়েস ইনস্টল করুন।",te:"ఈ పరికరంలో ఈ భాష వాయిస్ అందుబాటులో లేదు. దయచేసి ఇంటర్నెట్ కలపండి లేదా సెట్టింగ్స్‌లో భాష వాయిస్ ఇన్‌స్టాల్ చేయండి."},
 blocked:{en:"Microphone is blocked. Please allow the microphone in your browser and try again.",hi:"माइक बंद है। कृपया ब्राउज़र में माइक की अनुमति दें और फिर कोशिश करें।",mr:"माइक बंद आहे. कृपया ब्राउझरमध्ये माइकची परवानगी द्या आणि पुन्हा प्रयत्न करा.",gu:"માઇક બંધ છે. કૃપા કરીને બ્રાઉઝરમાં માઇકની મંજૂરી આપો અને ફરી પ્રયાસ કરો.",pa:"ਮਾਈਕ ਬੰਦ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਮਾਈਕ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",bn:"মাইক বন্ধ আছে। অনুগ্রহ করে ব্রাউজারে মাইকের অনুমতি দিন এবং আবার চেষ্টা করুন।",te:"మైక్ బ్లాక్ చేయబడింది. దయచేసి బ్రౌజర్‌లో మైక్ అనుమతి ఇచ్చి మళ్లీ ప్రయత్నించండి."}
};
function lang(){return (typeof currentLang==="function"?currentLang():"en")||"en"}
function m(k){var o=M[k]||{};return o[lang()]||o.en||""}
function tt(k){return (typeof t==="function")?t(k):k}

/* ---------- site root (so voice navigation works from any folder) ---------- */
var ROOT=(function(){
  var s=[].slice.call(document.scripts).filter(function(x){return /js\/voice\.js/.test(x.src)})[0];
  try{return new URL("../",s.src).href}catch(e){return ""}
})();
function inFolder(f){return location.pathname.indexOf("/"+f+"/")>-1}
function roleFolder(){return inFolder("retailer")?"retailer":inFolder("admin")?"admin":"farmer"}

/* ---------- speech output ---------- */
var token=0, session=0, speakingEl=null, lastLang=lang(), voiceCache=[];

/* Fixed English phrases used by buttons / data-speak attributes, translated so the audio matches the page language */
var SAY={
 "Welcome to FarmConnect. You can sell farm products or buy products from farmers.":["फार्मकनेक्ट में आपका स्वागत है। आप खेती के उत्पाद बेच सकते हैं या किसानों से खरीद सकते हैं।","फार्मकनेक्टमध्ये आपले स्वागत आहे. तुम्ही शेतमाल विकू शकता किंवा शेतकऱ्यांकडून खरेदी करू शकता.","ફાર્મકનેક્ટમાં આપનું સ્વાગત છે. તમે ખેતીની પેદાશો વેચી શકો છો અથવા ખેડૂતો પાસેથી ખરીદી શકો છો.","ਫਾਰਮਕਨੈਕਟ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ। ਤੁਸੀਂ ਖੇਤੀ ਦੀਆਂ ਉਪਜਾਂ ਵੇਚ ਸਕਦੇ ਹੋ ਜਾਂ ਕਿਸਾਨਾਂ ਤੋਂ ਖਰੀਦ ਸਕਦੇ ਹੋ।","ফার্মকানেক্টে স্বাগতম। আপনি কৃষিপণ্য বিক্রি করতে পারেন বা কৃষকদের কাছ থেকে কিনতে পারেন।","ఫార్మ్‌కనెక్ట్‌కు స్వాగతం. మీరు వ్యవసాయ ఉత్పత్తులను అమ్మవచ్చు లేదా రైతుల నుండి కొనవచ్చు."],
 "Please choose Sell Crop, My Products, My Orders, My Earnings or Help.":["कृपया फसल बेचें, मेरे उत्पाद, मेरे ऑर्डर, मेरी कमाई या मदद चुनिए।","कृपया पीक विका, माझी उत्पादने, माझे ऑर्डर, माझी कमाई किंवा मदत निवडा.","કૃપા કરીને પાક વેચો, મારા ઉત્પાદનો, મારા ઓર્ડર, મારી કમાણી અથવા મદદ પસંદ કરો.","ਕਿਰਪਾ ਕਰਕੇ ਫਸਲ ਵੇਚੋ, ਮੇਰੇ ਉਤਪਾਦ, ਮੇਰੇ ਆਰਡਰ, ਮੇਰੀ ਕਮਾਈ ਜਾਂ ਮਦਦ ਚੁਣੋ।","অনুগ্রহ করে ফসল বিক্রি, আমার পণ্য, আমার অর্ডার, আমার আয় বা সহায়তা বেছে নিন।","దయచేసి పంట అమ్మండి, నా ఉత్పత్తులు, నా ఆర్డర్లు, నా ఆదాయం లేదా సహాయం ఎంచుకోండి."],
 "How to sell my crop":["मैं अपनी फसल कैसे बेचूँ","मी माझे पीक कसे विकू","હું મારો પાક કેવી રીતે વેચું","ਮੈਂ ਆਪਣੀ ਫਸਲ ਕਿਵੇਂ ਵੇਚਾਂ","আমি কীভাবে আমার ফসল বিক্রি করব","నా పంటను ఎలా అమ్మాలి"],
 "How to check my order":["मैं अपना ऑर्डर कैसे देखूँ","मी माझी ऑर्डर कशी पाहू","હું મારો ઓર્ડર કેવી રીતે જોઉં","ਮੈਂ ਆਪਣਾ ਆਰਡਰ ਕਿਵੇਂ ਵੇਖਾਂ","আমি কীভাবে আমার অর্ডার দেখব","నా ఆర్డర్‌ను ఎలా చూడాలి"],
 "Payment help":["भुगतान में मदद","पेमेंटसाठी मदत","ચુકવણી માટે મદદ","ਭੁਗਤਾਨ ਲਈ ਮਦਦ","পেমেন্টে সহায়তা","చెల్లింపు సహాయం"],
 "Account help":["खाते में मदद","खात्यासाठी मदत","એકાઉન્ટ માટે મદદ","ਖਾਤੇ ਲਈ ਮਦਦ","অ্যাকাউন্টে সহায়তা","ఖాతా సహాయం"],
 "Voice help":["आवाज़ में मदद","आवाजासाठी मदत","અવાજ માટે મદદ","ਆਵਾਜ਼ ਲਈ ਮਦਦ","ভয়েসে সহায়তা","వాయిస్ సహాయం"],
 "Language help":["भाषा में मदद","भाषेसाठी मदत","ભાષા માટે મદદ","ਭਾਸ਼ਾ ਲਈ ਮਦਦ","ভাষায় সহায়তা","భాష సహాయం"],
 "Selected":["चुना गया","निवडले","પસંદ કર્યું","ਚੁਣਿਆ","নির্বাচিত","ఎంచుకున్నారు"]
};
function sayTr(text){
  var l=lang();if(l==="en")return text;
  var i=LANGS.indexOf(l)-1,k=text.trim();
  if(SAY[k]&&SAY[k][i])return SAY[k][i];
  if(k.indexOf("Selected ")===0){var rest=k.slice(9);return SAY["Selected"][i]+" "+((typeof fcTr==="function"?fcTr(rest,l):rest)||rest)}
  return (typeof fcTr==="function")?fcTr(text,l):text;
}

/* Work out which language a piece of text is really written in, so the right voice is always used */
var SCRIPTS=[["hi",/[\u0900-\u097F]/g],["gu",/[\u0A80-\u0AFF]/g],["pa",/[\u0A00-\u0A7F]/g],["bn",/[\u0980-\u09FF]/g],["te",/[\u0C00-\u0C7F]/g],["en",/[A-Za-z]/g]];
function detectLang(text){
  var best="",max=0;
  SCRIPTS.forEach(function(s){var n=(text.match(s[1])||[]).length;if(n>max){max=n;best=s[0]}});
  if(!best)return lang();
  if(best==="hi"){var c=lang();return (c==="mr"||c==="hi")?c:"hi"}
  return best;
}

/* ---------- smooth speech engine ----------
 * One queue-based engine for everything the assistant says:
 *  - text is split into sentence-sized segments; each segment gets the voice that matches its own script
 *  - installed (offline) voices are used whole and queued ahead of time -> no gaps between sentences
 *  - when no voice is installed (e.g. Punjabi, Telugu) the online voice is used, with the next sentences preloaded
 *  - no pause/resume tricks: long text is simply cut into short pieces, so nothing stalls or stutters
 */
function loadVoices(){if(window.speechSynthesis){var v=speechSynthesis.getVoices();if(v&&v.length)voiceCache=v}}
function normLang(x){return (x.lang||"").toLowerCase().replace("_","-")}
function pickVoice(l){
  if(!window.speechSynthesis)return null;
  loadVoices();
  var tries=[l];if(l==="mr")tries.push("hi");        // Marathi uses Devanagari: a Hindi voice is the closest installed fallback
  for(var i=0;i<tries.length;i++){
    var code=(LOCALE[tries[i]]||"en-IN").toLowerCase(),short=code.split("-")[0];
    var exact=voiceCache.filter(function(x){return normLang(x)===code});
    var same=voiceCache.filter(function(x){return normLang(x).split("-")[0]===short});
    var pool=exact.length?exact:same;
    if(pool.length){                                   // prefer installed (local) voices: instant start, no network hiccups
      return pool.filter(function(x){return x.localService})[0]||pool[0];
    }
  }
  return null;
}
function chunks(text,max){
  var parts=text.match(/[^.!?।॥\n;:]+[.!?।॥;:]*/g)||[text],out=[],cur="";
  parts.forEach(function(p){
    p=p.trim();if(!p)return;
    while(p.length>max){                               // very long sentence: cut at a comma/space
      var cut=p.lastIndexOf(",",max);if(cut<max*.4)cut=p.lastIndexOf(" ",max);if(cut<1)cut=max;
      if(cur){out.push(cur);cur=""}
      out.push(p.slice(0,cut+1).trim());p=p.slice(cut+1).trim();
    }
    if(cur&&(cur+" "+p).length>max){out.push(cur);cur=p}else cur=cur?cur+" "+p:p;
  });
  if(cur)out.push(cur);
  return out;
}
/* a sentence that mixes English words with a local language is cut where the script changes, so each part gets its own voice */
function scriptRuns(c){
  var INDIC=/[\u0900-\u0DFF]/,LATIN=/[A-Za-z]/;
  if(!(INDIC.test(c)&&LATIN.test(c)))return [c];
  var out=[],cur="",curType="";
  c.split(/\s+/).forEach(function(w){
    var t=INDIC.test(w)?"i":LATIN.test(w)?"l":curType||"i";
    if(cur&&t!==curType){out.push(cur);cur=w}else cur=cur?cur+" "+w:w;
    curType=t;
  });
  if(cur)out.push(cur);
  return out;
}
function prep(text){
  return sayTr(String(text||"")).replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF\uFE0F]/gu," ").replace(/\s+/g," ").trim();
}

var liveAudio=[], sharedAudio=null;
var SILENT="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
/* ONE audio element is reused for every online sentence. Browsers (Safari / iOS / Chrome Android) only let an element play after a tap,
   and a brand-new element per sentence gets blocked -> the voice stopped after the first sentence. Reusing an unlocked one fixes that. */
function getAudio(){if(!sharedAudio){sharedAudio=new Audio();sharedAudio.preload="auto";sharedAudio.setAttribute("referrerpolicy","no-referrer")}return sharedAudio}
function unlockAudio(){try{var a=getAudio();if(!a.paused||a.src)return;a.src=SILENT;var p=a.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
["pointerdown","touchstart","keydown","click"].forEach(function(ev){
  document.addEventListener(ev,function once(){unlockAudio();document.removeEventListener(ev,once,true)},true);
});
function audioUrl(seg){return "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl="+seg.lang+"&q="+encodeURIComponent(seg.text)}
function stopOnline(){
  liveAudio.forEach(function(a){try{a.onended=a.onerror=a.onplaying=null;a.pause();a.removeAttribute("src");a.load()}catch(e){}});liveAudio=[];
  if(sharedAudio){try{sharedAudio.onended=sharedAudio.onerror=sharedAudio.onplaying=null;sharedAudio.pause();sharedAudio.removeAttribute("src");sharedAudio.load()}catch(e){}}
}
function makeAudio(seg){          // pre-download only (fills the browser cache so the shared player starts instantly)
  if(seg.audio)return seg.audio;
  var a=new Audio();a.preload="auto";a.src=audioUrl(seg);
  seg.audio=a;liveAudio.push(a);return a;
}

function speakQueue(items,onend){
  var hasTTS=("speechSynthesis" in window);
  if(!hasTTS&&!window.Audio){showToast("Text-to-speech is not supported in this browser.");if(onend)onend();return}
  var my=++token;
  if(hasTTS){speechSynthesis.cancel();try{speechSynthesis.resume()}catch(e){}}
  stopOnline();

  var segs=[];
  items.forEach(function(it){
    var tx=prep(it.text);if(!tx)return;
    var k=0;
    chunks(tx,150).forEach(function(c){
      scriptRuns(c).forEach(function(r){
        var l=detectLang(r),v=hasTTS?pickVoice(l):null;
        segs.push({text:r,lang:l,voice:v,item:it,first:k++===0});
      });
    });
  });
  if(!segs.length){if(onend)onend();return}

  var AHEAD=2,warned=false;
  function mark(s){if(my===token&&s.first&&s.item.onstart)s.item.onstart()}
  function finish(){if(my!==token)return;if(onend)onend()}
  function after(s){                                   // a segment ended -> move on
    if(my!==token||s.done)return;s.done=true;
    activate(segs.indexOf(s)+1);
  }
  function nativeQueue(s){
    if(s.queued)return;s.queued=true;
    var u=new SpeechSynthesisUtterance(s.text);
    u.lang=s.voice.lang;u.voice=s.voice;u.rate=.9;
    u.onstart=function(){s.started=true;mark(s)};
    u.onend=function(){after(s)};
    u.onerror=function(e){if(e&&(e.error==="canceled"||e.error==="interrupted"))return;after(s)};
    speechSynthesis.speak(u);
  }
  function onlinePlay(s){
    if(s.queued)return;s.queued=true;
    var a=getAudio(),tries=0,att=0,wd=null;
    function arm(){clearTimeout(wd);wd=setTimeout(function(){if(my===token&&!s.done&&!s.started)fail()},7000)}
    function start(url){
      var id=++att;
      a.onplaying=function(){if(id!==att)return;clearTimeout(wd);s.started=true;mark(s)};
      a.onended=function(){if(id!==att)return;clearTimeout(wd);after(s)};
      a.onerror=function(){if(id===att)fail()};
      a.src=url;arm();
      var pr=a.play();if(pr&&pr.catch)pr.catch(function(){if(id===att)fail()});
    }
    function fail(){
      if(s.done||my!==token)return;
      clearTimeout(wd);
      if(tries<2){tries++;start(audioUrl(s)+"&_r="+Date.now());return}      // transient network error: retry before giving up
      att++;                                                                // ignore any late events from the failed attempt
      var hiV=(hasTTS&&(s.lang==="mr"||s.lang==="gu"||s.lang==="pa"))?pickVoice("hi"):null;
      if(hiV){s.voice=hiV;s.queued=false;nativeQueue(s)}
      else{if(!warned){warned=true;showToast((M.novoice&&M.novoice[lang()])||M.novoice.en)}after(s)}
    }
    start(audioUrl(s));
  }
  /* if the browser's speech engine never starts (a known Chrome/Android glitch), switch to the online voice instead of staying silent */
  function watchNative(i){
    var s=segs[i];
    setTimeout(function(){
      if(my!==token||!s||s.started||s.done)return;
      try{speechSynthesis.cancel()}catch(e){}
      for(var k=i;k<segs.length;k++){if(!segs[k].done){segs[k].voice=null;segs[k].queued=false}}
      activate(i);
    },5000);
  }
  function activate(i){
    if(my!==token)return;
    if(i>=segs.length){finish();return}
    var cur=segs[i],j,s;
    if(cur.voice){nativeQueue(cur);watchNative(i)}else onlinePlay(cur);
    for(j=i+1;j<=i+AHEAD&&j<segs.length;j++){          // look ahead so the next sentence is ready before this one ends
      s=segs[j];
      if(!s.voice)makeAudio(s);                         // online: preload the audio
      else if(cur.voice)nativeQueue(s);                 // offline: queue right behind the current one
    }
  }
  // Chrome drops speech queued in the same tick as cancel(): only wait when something was actually playing
  var busy=hasTTS&&(speechSynthesis.speaking||speechSynthesis.pending);
  if(busy)setTimeout(function(){activate(0)},70);else activate(0);
}
function speakNow(text,onend){speakQueue([{text:text}],onend)}
function stopSpeaking(){
  token++;session++;stopOnline();
  if("speechSynthesis" in window)speechSynthesis.cancel();
  clearHighlight();
  document.querySelectorAll(".va-say.speaking").forEach(function(e){e.classList.remove("speaking")});
}
window.speak=function(text){speakNow(text)};
function clearHighlight(){if(speakingEl){speakingEl.classList.remove("va-speaking-outline");speakingEl=null}}

/* read many blocks continuously (whole page), highlighting each while it is spoken */
function readList(items){
  stopSpeaking();
  speakQueue(items.map(function(it){return {text:it.text,onstart:function(){
    clearHighlight();
    if(it.el){speakingEl=it.el;it.el.classList.add("va-speaking-outline");try{it.el.scrollIntoView({block:"center",behavior:"smooth"})}catch(e){}}
  }}}),clearHighlight);
}

/* ---------- reading the page ---------- */
var SEL="h1,h2,h3,h4,p,label,li,.btn,th,td,button";
function visible(el){return !!(el.offsetWidth||el.offsetHeight||el.getClientRects().length)}
function clean(s){return (s||"").replace(/\s*\n+\s*/g,". ").replace(/\s+/g," ").replace(/[🔊🎤]/g,"").trim()}
function pageItems(){
  var root=document.querySelector("main")||document.body, out=[], last="";
  root.querySelectorAll(SEL).forEach(function(el){
    if(el.closest("nav,footer,.va-panel,.va-fab,.topbar,.toast,.admin-sidebar,script,style"))return;
    if(el.querySelector(SEL))return;               // read the innermost element only
    if(!visible(el))return;
    var tx=clean(el.innerText);
    if(tx.length<2||tx===last)return;
    last=tx;out.push({el:el,text:tx});
  });
  return out;
}
function readPage(){
  var items=pageItems();
  if(!items.length){speakNow(m("done"));return}
  setStatus("🔊 "+m("reading"));
  readList([{el:null,text:m("reading")}].concat(items));
}
function textOfBlock(el){
  return clean(el.innerText);
}

/* ---------- speech input ---------- */
var rec=null, listening=false;
function SR(){return window.SpeechRecognition||window.webkitSpeechRecognition}
function makeRec(){
  var R=SR();if(!R)return null;
  var r=new R();r.lang=LOCALE[lang()]||"en-IN";r.interimResults=false;r.maxAlternatives=3;return r;
}
function listen(){
  if(!SR()){setStatus(m("nomic"));speakNow(m("nomic"));return}
  stopSpeaking();
  if(rec){try{rec.abort()}catch(e){}rec=null}
  rec=makeRec();listening=true;
  micState(true);setStatus("🎤 "+m("listening"));
  var heard=false;
  rec.onresult=function(e){
    heard=true;
    var alts=[];for(var i=0;i<e.results[0].length;i++)alts.push(e.results[0][i].transcript);
    var cmd=alts[0];
    setStatus("✓ “"+cmd+"”");
    var ok=false;
    for(var j=0;j<alts.length&&!ok;j++)ok=runCommand(alts[j].toLowerCase());
    if(!ok){setStatus("✗ “"+cmd+"”\n"+m("retry"));speakNow(m("retry"))}
  };
  rec.onerror=function(e){
    heard=true;
    var msg=(e&&(e.error==="not-allowed"||e.error==="service-not-allowed"))?m("blocked"):m("retry");
    setStatus(msg);speakNow(msg);
  };
  rec.onend=function(){listening=false;micState(false);if(!heard)setStatus(m("retry"))};
  try{rec.start()}catch(e){listening=false;micState(false)}
}
window.startVoice=function(){openPanel(true);listen()};

/* ---------- commands ---------- */
function tr(key){var o=[];LANGS.forEach(function(l){var v=(typeof translations!=="undefined"&&translations[l]&&translations[l][key])||"";if(v)o.push(v.toLowerCase())});return o}
function lc(a){return a.map(function(x){return x.toLowerCase()})}
function go(path,labelKey){
  var label=labelKey?tt(labelKey):"";
  var msg=m("opening")+" "+label;
  setStatus("➡️ "+msg);
  speakNow(msg);
  setTimeout(function(){location.href=ROOT+path},900);
  return true;
}
function langIntent(code,words){return {w:words,run:function(){
  if(typeof setLanguage==="function")setLanguage(code);
  refreshLabels();setStatus(m("done"));speakNow(m("hello"));return true}}}
function themeIntent(name,words){return {w:words,run:function(){
  if(window.setTheme)setTheme(name);setStatus("🎨 "+name);speakNow(m("done"));return true}}}
var INTENTS=null;
function buildIntents(){
  INTENTS=[
   {w:["stop","quiet","silence","रुक","बंद करो","चुप","थांब","अटक","ਰੁਕ","থাম","ఆపు","ఆపండి"],run:function(){stopSpeaking();setStatus(m("stopped"));return true}},
   {w:["read","पढ़","पढ","वाच","વાંચ","ਪੜ੍ਹ","পড়","చదవ"],run:function(){readPage();return true}},
   {w:["help","मदद","मदत","મદદ","ਮਦਦ","সহায","সাহায্য","సహాయ"],run:function(){setStatus("❓ "+m("hello"));speakNow(m("hello"));return true}},
   themeIntent("contrast",["contrast","कॉन्ट्रास्ट","કોન્ટ્રાસ્ટ","ਕੰਟ੍ਰਾਸਟ","কনট্রাস্ট","కాంట్రాస్ట్"]),
   themeIntent("dark",["dark","night","डार्क","अंधेरा","ડાર્ક","ਡਾਰਕ","ডার্ক","డార్క్"]),
   themeIntent("harvest",["harvest","हार्वेस्ट"]),
   themeIntent("green",["light","bright","green","लाइट","उजाला","લાઇટ","ਲਾਈਟ","লাইট","లైట్"]),
   {w:["theme","थीम","થીમ","ਥੀਮ","থিম","థీమ్"],run:function(){cycleTheme();speakNow(m("done"));return true}},
   langIntent("en",["english","अंग्रेज","इंग्लिश","इंग्रजी","અંગ્રેજી","ਅੰਗਰੇਜ਼ੀ","ইংরেজি","ఇంగ్లీష్"]),
   langIntent("hi",["hindi","हिंदी","हिन्दी","હિન્દી","ਹਿੰਦੀ","হিন্দি","హిందీ"]),
   langIntent("mr",["marathi","मराठी","મરાઠી","ਮਰਾਠੀ","মারাঠি","మరాఠీ"]),
   langIntent("gu",["gujarati","गुजराती","ગુજરાતી","ਗੁਜਰਾਤੀ","গুজরাটি","గుజరాతీ"]),
   langIntent("pa",["punjabi","पंजाबी","ਪੰਜਾਬੀ","પંજાબી","পাঞ্জাবি","పంజాబీ"]),
   langIntent("bn",["bengali","bangla","बंगाली","বাংলা","বাঙালি","બંગાળી","ਬੰਗਾਲੀ","బెంగాలీ"]),
   langIntent("te",["telugu","तेलुगु","తెలుగు","તેલુગુ","ਤੇਲਗੂ","তেলুগু"]),
   {w:["sell","बेच","विका","વેચ","ਵੇਚ","বিক্রি","అమ్మ"].concat(lc(tr("sellCrop"))),run:function(){return go("farmer/add-product.html","sellCrop")}},
   {w:["earn","money","कमाई","કમાણી","ਕਮਾਈ","আয়","ఆదాయ"].concat(lc(tr("earnings"))),run:function(){return go("farmer/dashboard.html#earnings","earnings")}},
   {w:["checkout","check out"].concat(lc(tr("checkout"))),run:function(){return go("retailer/checkout.html","checkout")}},
   {w:["cart","कार्ट","કાર્ટ","ਕਾਰਟ","কার্ট","కార్ట్"].concat(lc(tr("cart"))),run:function(){return go("retailer/cart.html","cart")}},
   {w:["order","ऑर्डर","ઓર્ડર","ਆਰਡਰ","অর্ডার","ఆర్డర్"].concat(lc(tr("orders"))),run:function(){return go((inFolder("retailer")?"retailer":"farmer")+"/orders.html","orders")}},
   {w:["dashboard","डैशबोर्ड","ડેશબોર્ડ","ਡੈਸ਼ਬੋਰਡ","ড্যাশবোর্ড","డ్యాష్‌బోర్డ్"],run:function(){return go(roleFolder()+"/dashboard.html","farmer")}},
   {w:["profile","प्रोफाइल","પ્રોફાઇલ","ਪ੍ਰੋਫਾਈਲ","প্রোফাইল","ప్రొఫైల్"].concat(lc(tr("profile"))),run:function(){return go((inFolder("retailer")?"retailer":"farmer")+"/profile.html","profile")}},
   {w:["register","sign up","रजिस्टर","नोंदणी","રજીસ્ટર","ਰਜਿਸਟਰ","রেজিস্টার","రిజిస్టర్"].concat(lc(tr("register"))),run:function(){return go("register.html","register")}},
   {w:["login","log in","sign in","लॉगिन","લોગિન","ਲੌਗਇਨ","লগইন","లాగిన్"].concat(lc(tr("login"))),run:function(){return go("login.html","login")}},
   {w:["how it works","कैसे काम","कसे काम","કેવી રીતે","ਕਿਵੇਂ","কীভাবে","ఎలా పని"].concat(lc(tr("howItWorks"))),run:function(){return go("how-it-works.html","howItWorks")}},
   {w:["market","मार्केट","बाजार","બજાર","ਬਾਜ਼ਾਰ","বাজার","మార్కెట్"].concat(lc(tr("marketplace"))),run:function(){return go("marketplace.html","marketplace")}},
   {w:["product","crop","फसल","उत्पाद","पीक","પાક","ਫਸਲ","ফসল","పంట"].concat(lc(tr("products")),lc(tr("myProducts"))),run:function(){return go((inFolder("farmer")?"farmer":"retailer")+"/products.html","products")}},
   {w:["farmers","for farmers","किसान","शेतकरी","ખેડૂત","ਕਿਸਾਨ","কৃষক","రైతు"].concat(lc(tr("forFarmers"))),run:function(){return go("farmers.html","forFarmers")}},
   {w:["about","हमारे बारे","आमच्याबद्दल","અમારા વિશે","ਸਾਡੇ ਬਾਰੇ","আমাদের সম্পর্কে","మా గురించి"].concat(lc(tr("about"))),run:function(){return go("about.html","about")}},
   {w:["contact","संपर्क","સંપર્ક","ਸੰਪਰਕ","যোগাযোগ","సంప్రదించండి"].concat(lc(tr("contact"))),run:function(){return go("contact.html","contact")}},
   {w:["home","होम","मुख्यपृष्ठ","હોમ","ਹੋਮ","হোম","హోమ్"].concat(lc(tr("home"))),run:function(){return go("index.html","home")}}
  ];
}
function runCommand(cmd){
  if(!INTENTS)buildIntents();
  for(var i=0;i<INTENTS.length;i++){
    var w=INTENTS[i].w;
    for(var j=0;j<w.length;j++){if(w[j]&&cmd.indexOf(w[j])>-1)return INTENTS[i].run()}
  }
  return false;
}
window.handleVoiceCommand=function(cmd){if(!runCommand((cmd||"").toLowerCase())){speakNow(m("retry"))}};

/* ---------- theme helper ---------- */
function cycleTheme(){
  var order=["green","dark","harvest","contrast"];
  var cur=window.currentTheme?currentTheme():"green";
  var next=order[(order.indexOf(cur)+1)%order.length];
  if(window.setTheme)setTheme(next);
  setStatus("🎨 "+next);
}

/* ---------- UI ---------- */
var fab,panel,statusEl,micBtn,opened=false;
function setStatus(s){if(statusEl)statusEl.textContent=s}
function micState(on){if(!micBtn)return;micBtn.classList.toggle("listening",on)}
function guideOn(){try{return localStorage.getItem("fcGuide")==="1"}catch(e){return false}}
function openPanel(open){
  if(!panel)return;
  var show=open===undefined?!panel.classList.contains("open"):open;
  panel.classList.toggle("open",show);
  fab.setAttribute("aria-expanded",show);
  if(show&&!opened){opened=true;setStatus(m("hello"));speakNow(m("hello"))}
  if(!show){stopSpeaking();if(rec){try{rec.abort()}catch(e){}}}
}
function act(id,icon,key,fn){return '<button class="va-act" data-act="'+id+'" type="button"><span>'+icon+'</span><b data-k="'+key+'"></b></button>'}
function buildUI(){
  fab=document.createElement("button");fab.type="button";fab.className="va-fab";
  fab.setAttribute("aria-label","Voice assistant");
  fab.innerHTML='<span class="va-fab-circle">🎤</span><span class="va-fab-label"></span>';
  panel=document.createElement("div");panel.className="va-panel";panel.setAttribute("role","dialog");panel.setAttribute("aria-label","Voice assistant");
  panel.innerHTML=
   '<div class="va-head"><h3>🎤 <span class="va-title"></span></h3><button class="va-close" type="button" aria-label="Close">✕</button></div>'+
   '<div class="va-status" aria-live="polite"></div>'+
   '<button class="va-mic" type="button">🎤 <span class="va-mic-text"></span></button>'+
   '<div class="va-grid">'+
    act("read","🔊","readBtn")+act("stop","⏹️","stopBtn")+act("help","❓","help")+
    act("home","🏠","home")+act("sell","➕","sellCrop")+act("orders","📦","orders")+
    act("market","🛒","marketplace")+act("guide","👂","guideBtn")+act("theme","🎨","themeBtn")+
   '</div><p class="va-hint"></p>';
  document.body.appendChild(fab);document.body.appendChild(panel);
  statusEl=panel.querySelector(".va-status");micBtn=panel.querySelector(".va-mic");
  fab.addEventListener("click",function(){openPanel()});
  panel.querySelector(".va-close").addEventListener("click",function(){openPanel(false)});
  micBtn.addEventListener("click",function(){listening?(rec&&rec.stop()):listen()});
  panel.querySelectorAll(".va-act").forEach(function(b){b.addEventListener("click",function(){
    var a=b.dataset.act;
    if(a==="read")readPage();
    else if(a==="stop"){stopSpeaking();setStatus(m("stopped"))}
    else if(a==="help"){setStatus(m("hello"));speakNow(m("hello"))}
    else if(a==="home")go("index.html","home");
    else if(a==="sell")go("farmer/add-product.html","sellCrop");
    else if(a==="orders")go((inFolder("retailer")?"retailer":"farmer")+"/orders.html","orders");
    else if(a==="market")go("marketplace.html","marketplace");
    else if(a==="theme"){cycleTheme();speakNow(m("done"))}
    else if(a==="guide"){try{localStorage.setItem("fcGuide",guideOn()?"0":"1")}catch(e){}refreshLabels();speakNow(m(guideOn()?"on":"off"))}
  })});
  refreshLabels();
}
function refreshLabels(){
  if(!panel)return;
  fab.querySelector(".va-fab-label").textContent=tt("voice");
  panel.querySelector(".va-title").textContent=tt("voice");
  panel.querySelector(".va-mic-text").textContent=m("speakBtn");
  panel.querySelectorAll("[data-k]").forEach(function(b){
    var k=b.dataset.k,txt=M[k]?m(k):tt(k);
    if(k==="guideBtn")txt+=": "+m(guideOn()?"on":"off");
    b.textContent=txt;
  });
  panel.querySelector(".va-hint").textContent=({en:"Say: sell crop · orders · marketplace · dark theme · read page · help",hi:"बोलिए: फसल बेचें · ऑर्डर · मार्केटप्लेस · डार्क थीम · पेज पढ़ें · मदद",mr:"बोला: पीक विका · ऑर्डर · मार्केटप्लेस · डार्क थीम · पान वाचा · मदत",gu:"બોલો: પાક વેચો · ઓર્ડર · માર્કેટપ્લેસ · ડાર્ક થીમ · પાનું વાંચો · મદદ",pa:"ਬੋਲੋ: ਫਸਲ ਵੇਚੋ · ਆਰਡਰ · ਮਾਰਕੀਟਪਲੇਸ · ਡਾਰਕ ਥੀਮ · ਪੰਨਾ ਪੜ੍ਹੋ · ਮਦਦ",bn:"বলুন: ফসল বিক্রি · অর্ডার · মার্কেটপ্লেস · ডার্ক থিম · পাতা পড়ুন · সহায়তা",te:"చెప్పండి: పంట అమ్మండి · ఆర్డర్లు · మార్కెట్‌ప్లేస్ · డార్క్ థీమ్ · పేజీ చదవండి · సహాయం"})[lang()]||"Say: sell crop · orders · marketplace · dark theme · read page · help";
  document.querySelectorAll(".va-say").forEach(function(s){s.title=m("listen");s.setAttribute("aria-label",m("listen"))});
  INTENTS=null;
}

/* ---------- 🔊 listen / 🎤 dictate buttons on every card, heading and field ---------- */
function mkSay(cls){
  var s=document.createElement("span");
  s.className="va-say "+(cls||"");s.setAttribute("role","button");s.tabIndex=0;
  s.title=m("listen");s.setAttribute("aria-label",m("listen"));return s;
}
function bindSay(btn,getText,target){
  function fire(e){
    e.preventDefault();e.stopPropagation();
    var tx=getText();if(!tx)return;
    stopSpeaking();btn.classList.add("speaking");
    speakNow(tx,function(){btn.classList.remove("speaking")});
  }
  btn.addEventListener("click",fire);
  btn.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" ")fire(e)});
}
function decorate(root){
  root=root||document;
  // cards and tiles
  root.querySelectorAll(".card,.how-step,.catalog-card,.dashboard-card").forEach(function(el){
    if(el.closest(".va-panel")||el.dataset.vaDone)return;el.dataset.vaDone="1";
    var b=mkSay("va-card-say");el.appendChild(b);
    bindSay(b,function(){return textOfBlock(el)});
  });
  // page titles
  root.querySelectorAll(".page-head h1,.hero h1,.admin-main h1").forEach(function(h){
    if(h.dataset.vaDone)return;h.dataset.vaDone="1";
    var b=mkSay();h.appendChild(b);
    bindSay(b,function(){var p=h.parentElement.querySelector("p");return clean(h.innerText)+". "+(p?clean(p.innerText):"")});
  });
  // form fields: listen to the label, dictate into the box
  root.querySelectorAll(".field").forEach(function(f){
    if(f.dataset.vaDone)return;f.dataset.vaDone="1";
    var label=f.querySelector("label"),input=f.querySelector("input,select,textarea");
    if(!label||!input)return;
    var b=mkSay();label.appendChild(b);
    bindSay(b,function(){
      var ph=input.getAttribute("placeholder")||"";
      return clean(label.innerText)+(ph?". "+ph:"");
    });
    var type=(input.getAttribute("type")||"text").toLowerCase();
    if(input.tagName==="TEXTAREA"||["text","tel","number","email","search"].indexOf(type)>-1){
      var d=mkSay("va-dictate");d.title="🎤";d.classList.add("mic");d.setAttribute("aria-label","Speak to fill");
      d.dataset.mic="1";label.appendChild(d);
      d.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();dictate(input,d)});
    }
  });
}
function dictate(input,btn){
  var r=makeRec();
  if(!r){speakNow(m("nomic"));showToast(m("nomic"));return}
  stopSpeaking();btn.classList.add("speaking");
  r.onresult=function(e){
    var tx=e.results[0][0].transcript, type=(input.getAttribute("type")||"text").toLowerCase();
    if(type==="tel")tx=tx.replace(/\D/g,"");
    else if(type==="number")tx=tx.replace(/[^\d.]/g,"");
    else if(type==="email")tx=tx.replace(/\s+/g,"").replace(/\bat\b/g,"@").toLowerCase();
    input.value=tx;input.dispatchEvent(new Event("input",{bubbles:true}));input.dispatchEvent(new Event("change",{bubbles:true}));
    showToast("✓ "+tx);
  };
  r.onerror=function(){showToast(m("retry"));speakNow(m("retry"))};
  r.onend=function(){btn.classList.remove("speaking")};
  try{r.start();showToast("🎤 "+m("listening"))}catch(e){btn.classList.remove("speaking")}
}
/* Guide mode: when switched on, focusing a field or button reads its name aloud */
function setupGuide(){
  document.addEventListener("focusin",function(e){
    if(!guideOn())return;
    var el=e.target;
    if(el.closest&&el.closest(".va-panel,.va-fab"))return;
    var tx="";
    if(el.matches("input,select,textarea")){
      var lab=el.closest(".field")&&el.closest(".field").querySelector("label");
      tx=(lab?clean(lab.innerText):"")||el.getAttribute("placeholder")||el.getAttribute("aria-label")||"";
    }else if(el.matches("button,a,.btn")){tx=clean(el.innerText)||el.getAttribute("aria-label")||""}
    if(tx)speakNow(tx);
  });
}
function showToast(msg){if(typeof window.showToast==="function")window.showToast(msg)}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded",function(){
  buildUI();decorate();setupGuide();
  if("speechSynthesis" in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices}
  // re-decorate content that pages add dynamically (marketplace cards etc.)
  var timer=null;
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(function(){decorate()},250)})
    .observe(document.body,{childList:true,subtree:true});
  // keyboard shortcut: press "V" (outside text boxes) to open the assistant
  document.addEventListener("keydown",function(e){
    if((e.key==="v"||e.key==="V")&&!e.ctrlKey&&!e.metaKey&&!/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||""))openPanel();
  });
});
document.addEventListener("languageChanged",function(){
  var now=lang();
  refreshLabels();
  if(now!==lastLang){          // language really changed: drop old-language audio, confirm in the new voice (unless something newer starts)
    lastLang=now;stopSpeaking();
    setStatus(m("done"));
    var mine=token;
    setTimeout(function(){if(token===mine)speakNow(m("done"))},200);
  }
});
})();
