exports.handler = function(context, event, callback) {
  // get configured twilio client
  const client = context.getTwilioClient();
 
  // setup an empty success response
  let response = new Twilio.Response();
  response.setStatusCode(200);

  console.log(JSON.stringify(event));
  console.log(`Event is ${event.EventType}`);
 

  let taskSid = event.TaskSid;
  let taskAttributes = JSON.parse(event.TaskAttributes);
  let callSid = taskAttributes.call_sid;

  let domain = context.DOMAIN_NAME !== 'localhost:3000' ? context.DOMAIN_NAME : '<your-ngrok-code>.ngrok.io'

  // switch on the event type
  switch(event.EventType) {
      // handle 'task.canceled'
      case 'task.canceled':
  

          // console.log(`Task ID: ${event.TaskSid}  Call SID: ${taskAttributes.call_sid}`)

          // // Set up the TwiML to play the Unavailable file (
          // let twimlStr = `<Response><Say>Sorry No available agents to take your call</Say></Response>`;
 
          // // redirect call play twiml content
          // client.calls(callSid).update({
          //     twiml: twimlStr
          // }).then(() => {
          //     return callback(null, response)
          // }).catch(err => {
          //     response.setStatusCode(500);
          //     return callback(err, response)
          // });
          return callback(null, response)
      break;
      case 'task-queue.entered':
          console.log(`Task ID: ${event.TaskSid}  Call SID: ${taskAttributes.call_sid} TaskQueueName: ${event.TaskQueueName}`)
          // ignore events that are not entering the Voicemail TaskQueue
          if (event.TaskQueueName !== 'Voicemail') {
              return callback(null, response);
          }
  
          let url = `https://${domain}/voicemail?taskSid=${taskSid}`;
  
          // redirect call to voicemail
          client.calls(callSid).update({
              method: 'POST',
              url: encodeURI(url)
          }).then(() => {
              return callback(null, response)
          }).catch(err => {
              response.setStatusCode(500);
              console.log(err)
              return callback(err, response)
          });
      break;
      default:
          callback(null, response);
      break;
  }
};