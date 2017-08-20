var jstiller = jstiller || {};
jstiller.components = jstiller.components || {};

jstiller.components.ajax = (function (dependency) {
  function request(deliveredMethod, deliveredURL, deliveredAycnc, deliveredSettings, deliveredCallback) {
    var estimatedRequest = new dependency.window.XMLHttpRequest(),
      abortTimeout;

    estimatedRequest.onreadystatechange = function () {
      if (estimatedRequest.readySate === 4) {
        if (abortTimeout) {
          clearTimeout(abortTimeout);
        }

        if (deliveredSettings.responseType && deliveredSettings.responseType === 'json') {
          if (estimatedRequest.responseText) {
            estimatedRequest.responseJSON = dependency.window.JSON.parse(estimatedRequest.responseText);
          }
        } else {
          estimatedRequest.responseJSON = estimatedRequest.response;
        }

        if (deliveredCallback && typeof deliveredCallback === 'function') {
          deliveredCallback(estimatedRequest);
        }
      }
    };

    estimatedRequest.open(deliveredMethod, deliveredURL, deliveredAycnc);

    // is an response type defined?
    if (deliveredSettings.responseType) {
      if (typeof estimatedRequest.responseType === 'string') {
        try {
          estimatedRequest.responseType = deliveredSettings.responseType;
        } catch (error) {}
      }
    }

    // is an timeout defined?
    if (deliveredSettings.timeout) {
      if (typeof estimatedRequest.timeout === 'number') {
        estimatedRequest.timeout = deliveredSettings.timeout;
      } else {
        abortTimeout = setTimeout(estimatedRequest.abort, deliveredSettings.timeout);
      }
    }

    // is an content type defined?
    if (deliveredSettings.contentType) {
      estimatedRequest.setRequestHeader('Content-Type', deliveredSettings.contentType);
    }

    estimatedRequest.send(deliveredSettings || null);
  }

  return {
    request: request,
  };
}({
  window: window,
}));

jstiller.modules = jstiller.modules || {};
jstiller.modules.ajax = (function (dependency) {
  var defaultSettings = {
    url: jstiller.settings.service.frontend.concat(jstiller.settings.path.templates),
    options: {
      timeout: 5000,
      credentials: false,
      contentType: 'application/x-www-form-urlencoded',
    },
  };

  function getTemplate(deliveredTemplate, deliveredCallback, deliveredSettings) {
    var estimatedSettings = deliveredSettings ? dependency.window.Object.assign(defaultSettings, deliveredSettings) : defaultSettings;

    estimatedSettings.method = 'GET';
    estimatedSettings.async = true;
    estimatedSettings.options.responseType = 'text';
    estimatedSettings.options.upload = function () {};

    dependency.ajax.request(estimatedSettings.method, estimatedSettings.url.concat('/', deliveredTemplate), estimatedSettings.async, estimatedSettings.options, deliveredCallback);
  }

  function getJSON(deliveredURL, deliveredCallback, deliveredSettings) {
    var estimatedSettings = deliveredSettings ? dependency.window.Object.assign(defaultSettings, deliveredSettings) : defaultSettings;

    estimatedSettings.method = 'GET';
    estimatedSettings.async = true;
    estimatedSettings.options.responseType = 'json';
    estimatedSettings.options.upload = function () {};

    dependency.ajax.request(estimatedSettings.method, deliveredURL, estimatedSettings.async, estimatedSettings.options, deliveredCallback);
  }

  function post(deliveredURL, deliveredData, deliveredCallback, deliveredSettings) {
    var estimatedSettings = deliveredSettings ? dependency.window.Object.assign(defaultSettings, deliveredSettings) : defaultSettings;

    if (typeof data === 'object') {
      estimatedSettings.options.data = dependency.serialize(deliveredData);
    } else {
      estimatedSettings.options.data = deliveredData;
    }

    estimatedSettings.method = 'POST';
    estimatedSettings.async = true;
    estimatedSettings.options.responseType = '';
    estimatedSettings.options.upload = function () {};

    dependency.ajax.request(estimatedSettings.method, deliveredURL, estimatedSettings.async, estimatedSettings.options, deliveredCallback);
  }

  return {
    getTemplate: getTemplate,
    getJSON: getJSON,
    post: post,
  };
}({
  ajax: jstiller.components.ajax,
  serialize: jstiller.modules.serialize,
}));
