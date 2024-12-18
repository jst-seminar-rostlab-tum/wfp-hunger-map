export class AccessibilityOperations {
  /**
   * Adds aria-labels and styles to the map markers.
   * Use to make the map markers more accessible.
   * By adding space around the markers, it makes it easier for users to click on them.
   * And also adds aria-labels to the markers.
   *
   * relevant docu see below:
   * https://dequeuniversity.com/rules/axe/4.9/aria-command-name
   * https://dequeuniversity.com/rules/axe/4.9/target-size
   */
  static addAriaLabelsAndStyles(): void {
    const markers = document.querySelectorAll('.leaflet-marker-icon.leaflet-zoom-hide');
    markers.forEach((marker) => {
      if (!marker.getAttribute('aria-label')) {
        marker.setAttribute('aria-label', 'Map Marker');
      }
      marker.setAttribute('role', 'button');
      marker.setAttribute('tabindex', '0');

      marker.classList.add('map-marker-with-margin');
    });

    const animatedMarkers = document.querySelectorAll('.leaflet-marker-icon.leaflet-zoom-animated');
    animatedMarkers.forEach((marker) => {
      if (!marker.getAttribute('aria-label')) {
        marker.setAttribute('aria-label', 'Map Animated Marker');
      }
    });

    const containers = document.querySelectorAll('.leaflet-container');
    containers.forEach((container) => {
      if (!container.getAttribute('aria-label')) {
        container.setAttribute('aria-label', 'leaflet container');
      }
    });
  }
}
