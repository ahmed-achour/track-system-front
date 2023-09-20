import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouteService } from '@private/admin/services/route.service';
import { ToastrService } from 'ngx-toastr';
import { GA, Chromosome } from './genetic-algorithm'; // Adjust the import path as needed

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss'],
})
export class CarteComponent implements OnInit {
  routeList: any[] = [];
  locationList: any[] = [];
  solutions: any[] = [];
  public page: number = 1;
  public pageSize: number = 5;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  private fixedLocation: google.maps.LatLng | null = null;
  private fixedMarker: google.maps.Marker | null = null;
  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private drawnPolygons: google.maps.Polygon[] = [];
  public depot: any;
  constructor(
    private _toastr: ToastrService,
    private _routeService: RouteService,
    private ngZone: NgZone
  ) {}
  ngOnInit() {
    this.getRouteList();
  }

  ngAfterViewInit() {
    this.initMap();
    this.addFixedLocation();
  }

  private initMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 35.634248030523736, lng: 10.897816587606265 }, // Initial map center
      zoom: 16, // Initial zoom level
    };

    // Create a new Google Map instance
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Add a click event listener to the map
    this.map.addListener('click', (event: any) => {
      this.ngZone.run(() => {
        this.addMarker(event.latLng); // Call a function to add a marker at the clicked location
      });
    });
  }

  private addFixedLocation() {
    this.depot = {
      id: Math.random().toString(),
      lat: 35.634248030523736,
      lng: 10.897816587606265,
    };
    if (!this.fixedLocation) {
      this.fixedLocation = new google.maps.LatLng(
        35.634248030523736,
        10.897816587606265
      ); // Replace with your fixed location coordinates
      this.fixedMarker = new google.maps.Marker({
        position: this.fixedLocation,
        map: this.map,
        title: 'Depot Location',
        icon: {
          url: 'assets/images/location.png', // Replace with the path to your custom marker icon
          scaledSize: new google.maps.Size(30, 30), // Adjust the size as needed
        },
        draggable: false, // Disable marker dragging
      });
    }
  }

  private addMarker(latLng: google.maps.LatLng) {
    // Create a new marker
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Clicked Location',
    });

    // Add the marker to the markers array
    this.markers.push(marker);
    this.locationList.push({
      id: Math.random().toString(),
      lat: marker.getPosition()?.lat(),
      lng: marker.getPosition()?.lng(),
    });
    console.log(this.locationList);
    marker.addListener('click', () => {
      this.removeMarker(marker);
    });

    // You can add additional logic here, like displaying an info window, etc.
    //this.markers.forEach((m, index) => {
    //console.log(
    //    `Marker ${index + 1}: Lat: ${m.getPosition()?.lat()}, Lng: ${m
    //      .getPosition()
    //      ?.lng()}`
    //  );
    //});
  }

  private removeMarker(marker: google.maps.Marker) {
    let locationIndex = 0;

    // Find the index of the marker in the markers array
    const markerIndex = this.markers.indexOf(marker);
    const lnglat = marker.getPosition();
    locationIndex = this.locationList.findIndex(
      (location: any) =>
        location.lat == lnglat?.lat() && location.lng == lnglat?.lng()
    );

    // Remove the marker from the map
    marker.setMap(null);
    // Remove the marker from the markers array
    if (markerIndex !== -1) {
      this.markers.splice(markerIndex, 1);
      this.locationList.splice(locationIndex, 1);
    }
  }

  getRouteList() {
    this._routeService.allRoute().subscribe({
      next: (res) => {
        this.routeList = res.route ?? [];
        for (let i = 0; i < this.routeList.length; i++) {
          const locations = this.routeList[i].routeLocation;
          if(locations ){
          for (let j = 0; j < locations.length; j++) {
            const location = locations[j];
            if (
              location.lat != 35.634248030523736 &&
              location.lng != 10.897816587606265
            ) {
              this.locationList.push({
                id: Math.random().toString(),
                lat: locations[j].lat,
                lng: locations[j].lng,
              });
              const latlng = new google.maps.LatLng(location.lat, location.lng); // Replace with Leaflet equivalent if using Leaflet

              // Create a marker for the location
              const marker = new google.maps.Marker({
                position: latlng,
                map: this.map, // Add the marker to the map
                title: 'Location ' + (j + 1), // Title for the marker (you can customize this)
              });
              marker.addListener('click', () => {
                this.removeMarker(marker);
              });
              // Store the marker in your markers array if you need to manage them later
              this.markers.push(marker);
            }
          }
        }
          const polygon = this.drawPolygon(this.routeList[i].routeLocation);
          this.drawnPolygons.push(polygon);
        }
      },
    });
  }
  updatetheTable() {
    this._routeService.allRoute().subscribe({
      next: (res) => {
        this.routeList = res.route ?? [];
      },
    });
  }

  updateRouteStatus(id: string) {
    let data = this.routeList.find((driver: any) => driver._id === id);
    let state = {};
    if (data.state == 'available') state = { state: 'unavailable' };
    else state = { state: 'available' };
    this._routeService.updateRouteStatus(id, state).subscribe({
      next: (res) => {
        this.getRouteList();
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }

  delete(id: string, index: number) {
    this._routeService.deleteRoute(id).subscribe({
      next: (res) => {
        this._toastr.success('Le chauffeur est supprimé');
      },
      error: (err) => {},
      complete: () => {
        let i = this.routeList.findIndex((obj) => obj._id == id);
        this.routeList.splice(i, 1);
      },
    });
  }

  sloveGA() {
    let availableRoutes = this.routeList.filter(
      (route) => route.state == 'available'
    );
    let numberOfRoutes = availableRoutes.length;
    this.clearDrawnPolygons();
    this.solutions = [];
    for (let i = 0; i < numberOfRoutes; i++) {
      const range = Math.floor(this.locationList.length / numberOfRoutes);
      let pool = this.locationList.slice(range * i, (i + 1) * range);

      if (i + 1 == numberOfRoutes) {
        pool = this.locationList.slice(range * i);
      }

      let ga = new GA(pool, this.depot, 1, 1, 1000, 100);
      this.solutions.push(ga.go().pop());
    }
    console.log(this.solutions);
    for (let i = 0; i < this.solutions.length; i++) {
      // Your GA calculations...

      let areaPoints = [];
      for (let j = 0; j < this.solutions[i].genes.length; j++) {
        //const origin = new google.maps.LatLng(this.solutions[i].genes[j].lat, this.solutions[i].genes[j].lng); // Replace with your origin coordinates
        //const destination = new google.maps.LatLng(this.solutions[i].genes[j+1].lat, this.solutions[i].genes[j+1].lng); // Replace with your destination coordinates
        //this.drawRoute(origin, destination);
        areaPoints.push(
          new google.maps.LatLng(
            this.solutions[i].genes[j].lat,
            this.solutions[i].genes[j].lng
          )
        );
      }
      for (let i = 0; i < availableRoutes.length; i++) {
        let binsNumber = {
          binsNumber: this.solutions[i].genes.filter(
            (item: any) =>
              item.lat != 35.634248030523736 && item.lng != 10.897816587606265
          ).length,
          routeLocation: this.solutions[i].genes,
        };
        this._routeService
          .updateRoute(availableRoutes[i]._id, binsNumber)
          .subscribe({
            next: (res) => {
              this.updatetheTable()
            },
            error: (err) => {},
          });
      }
      // Draw the polygon inside the loop and store its reference in the array
      const polygon = this.drawPolygon(areaPoints);
      this.drawnPolygons.push(polygon);
    }
  }

  // private drawRoute(origin: google.maps.LatLng, destination: google.maps.LatLng) {
  //  const directionsService = new google.maps.DirectionsService();
  // const directionsDisplay = new google.maps.DirectionsRenderer();
  // directionsDisplay.setMap(this.map);
  //
  // const request = {
  //   origin: origin,
  //   destination: destination,
  //   travelMode: google.maps.TravelMode.DRIVING, // You can change the travel mode as needed
  // };
  //
  // directionsService.route(request, (response, status) => {
  //   if (status === google.maps.DirectionsStatus.OK) {
  //     directionsDisplay.setDirections(response);
  //   } else {
  //     console.error('Error:', status);
  //    }
  //  });
  //}

  private drawPolygon(vertices: google.maps.LatLng[]): google.maps.Polygon {
    // Generate a random color
    const randomColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);

    const polygon = new google.maps.Polygon({
      paths: vertices,
      strokeColor: randomColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: randomColor,
      fillOpacity: 0.35,
    });

    polygon.setMap(this.map);

    return polygon; // Return the polygon reference
  }

  private clearDrawnPolygons() {
    // Loop through the drawn polygons and remove them from the map
    for (const polygon of this.drawnPolygons) {
      polygon.setMap(null);
    }

    // Clear the array of drawn polygons
    this.drawnPolygons = [];
  }
}
