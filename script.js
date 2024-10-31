function scanProperties(obj, searchText, buildId) {
  // Base case: if the object is not an object, return false
  if (typeof obj !== 'object' || obj === null) {
    return null;
  }

  // Iterate through each property of the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // If the value is a string, check if it includes the searchText
      if (typeof value === 'string' && value.includes(searchText)) {
        return buildId;
      }

      // If the value is an object, recurse into it
      if (typeof value === 'object') {
        const res = this.scanProperties(value, searchText, obj.id ?? buildId)
        if (res) return res;
      }
    }
  }

  // If no matches found, return false
  return null;
}

block = Object.entries(window.UPEZ_BUILDER_DATA)
  .flatMap(([templateKey, templateVal]) => {
    return templateVal[0].data.blocks.map((blocks) => ({
      ...blocks,
    }));
  });

const customElement = document.querySelector('builder-inspector');

customElement.settings.forEach((setting) => {
  if (setting.id) {
    const buildId = scanProperties(block, setting.id)
    setting.highlightingElem = `.${buildId}`
  }
})