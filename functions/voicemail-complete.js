exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient(),
        taskSid = event.taskSid,
        segmentLink = event.RecordingUrl;
  
  console.log(`Recording URL: ${segmentLink}`);

  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say("Thank you for your message. Good bye.");
  
  
  // retrieve the task this voicemail recording corresponds to
  client.taskrouter.workspaces(context.TR_WORKSPACE_SID)
  .tasks(taskSid)
  .fetch()
  .then(task => {
  
    // parse the task attributes - lets append some Insights specific attributes
    // this will let Insights know this task was a voicemail and not an abandoned call
    let taskAttributes = JSON.parse(task.attributes);
    taskAttributes.conversations = taskAttributes.conversations || {};
    taskAttributes.conversations = Object.assign(taskAttributes.conversations, {
      segment_link: segmentLink,
      abandoned: "Follow-Up",
      abandoned_phase: "Voicemail"
    });
  
    // update the task attributes with the Insights specific information
    client.taskrouter.workspaces(context.TR_WORKSPACE_SID)
    .tasks(taskSid)
    .update({
      attributes: JSON.stringify(taskAttributes)
    }).then(() => {
      return callback(null, twiml);
    });
  })
};