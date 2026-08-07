import Intent from '../../../models/Intent.model.js';

export const fetchMemory = async (sessionId) => {
  let intentDoc = await Intent.findOne({ sessionId });
  
  if (!intentDoc) {
    intentDoc = new Intent({ sessionId });
  }
  
  return intentDoc;
};
