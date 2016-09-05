if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    registrations.forEach(function (registration) {
      registration.unregister().then(function (success) {
        if (success) console.log('ServiceWorker unregistered');
      });
    })
  });
}
