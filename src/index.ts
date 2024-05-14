function applyStyles(image, shapeOptions) {
  const commonStyles = {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
    border: 'var(--nrh-media--border-width-primary) solid var(--border-color--border-primary)',
  };

  const shapeSpecificStyles = {
    'Shape-RoundRects': { borderRadius: '20px', aspectRatio: '1 / 1' },
    'Shape-Squares': { aspectRatio: '1 / 1' },
    'Shape-Circles': { borderRadius: '50%', aspectRatio: '1 / 1' },
    'Full-16x9': { aspectRatio: '16 / 9' },
    'Full-16x9-RoundRects': { borderRadius: '20px', aspectRatio: '16 / 9' },
    'Inline-RoundRects': { borderRadius: '20px', aspectRatio: '1 / 1' },
    'Inline-Squares': { aspectRatio: '1 / 1' },
    'Inline-Circles': { borderRadius: '50%', aspectRatio: '1 / 1' },
  };

  Object.assign(image.style, commonStyles, shapeSpecificStyles[shapeOptions]);

  // Target the closest figure element
  const figureElement = image.closest('figure');

  if (figureElement && shapeOptions.includes('Inline')) {
    Object.assign(figureElement.style, {
      float: 'left',
      width: '25%', // Adjust this value as needed
      marginRight: '20px', // Space between the image and text
      marginBottom: '20px', // Space between the image and text
      height: 'auto',
    });
  }

  if (shapeOptions.includes('Full')) {
    const writtenContentStyle = document.createElement('style');
    writtenContentStyle.innerHTML = `
          [image-crop="true"] * {
              width: 100% !important;
              max-width: none !important;
          }
      `;
    document.head.appendChild(writtenContentStyle);
  }
}

const selectorElement = document.querySelector('[image-crop="selector"]');
const shapeOption = selectorElement ? selectorElement.textContent : 'default-value';
const postImages = document.querySelectorAll('[image-crop="true"] img, [image-crop="true"] * img');

for (let i = 0; i < postImages.length; i++) {
  applyStyles(postImages[i], shapeOption);
}
