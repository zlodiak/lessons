/**
 * @fileoverview Blank V1 layout javascript.
 */

// Lazy initialization of ad.
function ensureInit() {
  if (!window.theAd) {
    theAd = new Ad();
  }
}

function onAdData(adData) {
  ensureInit();
  processAdData(adData);
}

var Ad = function() {
  // Any loading layout action should be done here.
  loadTemplateContainer([
    {
      type: 'click-url-area',
      layout_id: 'ad-content'
    },
    {
      type: 'background',
      layout_id: 'background-color',
      template_color_ids: ['backgroundColor']
    },
    {
      type: 'image',
      layout_id: 'background-image',
      template_id: 'backgroundImage',
      is_customizable: false
    },
    {
      type: 'custom-text',
      template_id: 'CUSTOM_TEXT_0_'
    },
    {
      type: 'custom-text',
      template_id: 'CUSTOM_TEXT_1_'
    },
    {
      type: 'custom-text',
      template_id: 'CUSTOM_TEXT_2_'
    },
    {
      type: 'custom-text',
      template_id: 'CUSTOM_TEXT_3_'
    },
    {
      type: 'custom-text',
      template_id: 'CUSTOM_TEXT_4_'
    },
    {
      type: 'custom-image',
      template_id: 'CUSTOM_IMAGE_0_'
    },
    {
      type: 'custom-image',
      template_id: 'CUSTOM_IMAGE_1_'
    },
    {
      type: 'custom-image',
      template_id: 'CUSTOM_IMAGE_2_'
    },
    {
      type: 'custom-button',
      template_id: 'CUSTOM_BUTTON_0_'
    }
  ]);
};
