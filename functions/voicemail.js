exports.handler = function(context, event, callback) {
  let domain = context.DOMAIN_NAME !== 'localhost:3000' ? context.DOMAIN_NAME : 'dawong.au.ngrok.io'
  let taskSid = event.taskSid;
  let actionUrl = `https://${domain}/voicemail-complete?taskSid=${taskSid}`;
    
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say("Sorry, no one is available to take your call. Please leave a message at the beep. When you're done, press pound or just hang-up.");
  twiml.record({
    action: encodeURI(actionUrl),
    finishOnKey: '#',
    playBeep: true,
    transcribe: true
  });
  callback(null, twiml);
};