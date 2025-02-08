 // Format the Variant names for display to user
 const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
};

export {formatLabel}