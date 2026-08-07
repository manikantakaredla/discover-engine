export const expandQuery = (query) => {
  // Mocking semantic query expansion.
  // In production, this might use word2vec or a fast local LLM/rules dictionary.
  const expansions = {
    'laptop accessories': ['laptop bag', 'cooling pad', 'wireless mouse', 'usb hub', 'dock'],
    'gaming setup': ['monitor', 'rgb keyboard', 'gaming chair', 'gaming mouse', 'headset'],
    'fitness': ['dumbbells', 'protein', 'yoga mat', 'running shoes']
  };

  return expansions[query.toLowerCase()] || [];
};
