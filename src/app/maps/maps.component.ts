import {
  Component,
  OnInit
} from '@angular/core';

import { google } from '@google/maps';
import {
  ApicallService
} from "../components/apicall.service"
import {
  VehiclesInfo
} from '../pojo/VehiclesInfo'
import {
  MyService
} from '../Services/MyService'
import {
  map
} from 'jquery';
import { Beacons } from 'app/pojo/Beacons';
declare const google: any;

declare const googledirec: any;
var origin = {
  lat: 29.8174782,
  lng: -95.6814757
};
var destination = {
  lat: 40.6976637,
  lng: -74.119764
};
var waypoints = [{
    location: {
      lat: 39.0921167,
      lng: -94.8559005
    }
  },
  {
    location: {
      lat: 41.8339037,
      lng: -87.8720468
    }
  }
];
var  mapp: google.maps.Map;
var myLatlng = new google.maps.LatLng(13.1169877, 80.2878786);
var myLatlng1 = new google.maps.LatLng(13.1153264, 80.2914406);
var mapOptions = {
  zoom: 13,
  center: myLatlng,
  scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
  styles: [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
          "color": "#7c93a3"
        },
        {
          "lightness": "-10"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#a0a4a5"
      }]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#62838e"
      }]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#dde3e3"
      }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
          "color": "#3f4a51"
        },
        {
          "weight": "0.30"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
          "saturation": "-100"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#bbcacf"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
          "lightness": "0"
        },
        {
          "color": "#bbcacf"
        },
        {
          "weight": "0.50"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffffff"
      }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#a9b4b8"
      }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{
          "invert_lightness": true
        },
        {
          "saturation": "-7"
        },
        {
          "lightness": "3"
        },
        {
          "gamma": "1.80"
        },
        {
          "weight": "0.01"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#a3c7df"
      }]
    }
  ]

};









interface Marker {
  lat: number;
  lng: number;
  label ? : string;
  draggable ? : boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  vehiclesinfo: VehiclesInfo[];
  beaconinfo : Beacons[];
  vehiclepathdata: VehiclesInfo[];
  private directionsRenderer: any;


  constructor(private apiservice: ApicallService, private myService: MyService) {}

  ngOnInit() {
  this.getAllVehicles();


    mapp = new google.maps.Map(document.getElementById("map"), mapOptions);


    this.myService.myEventEmiter.subscribe(data => {


      this.apiservice.getThisVehicle(data).subscribe((data: any) => {

        this.vehiclepathdata = data;

        console.log(this.vehiclepathdata)
        console.log("here");



        this.directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: false
        });
        const directionsService = new google.maps.DirectionsService;
        this.directionsRenderer.setMap(mapp);
        directionsService.route({
          origin: {
            lat: this.vehiclepathdata['origin_latitude'],
            lng: this.vehiclepathdata['origin_longitude']
          },
          destination: {
            lat: this.vehiclepathdata['destination_latitude'],
            lng: this.vehiclepathdata['destination_longitude']
          },
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
console.log("done");

          } else {
            console.log('Directions request failed due to ' + status);
          }
        });


      })




    });




  }
  getAllVehicles() 
  {

    const myLatLng = {
        lat: 13.0827,
        lng: 80.2707
      };




       mapp = new google.maps.Map(
        document.getElementById("map") as HTMLElement, {
          zoom: 7,
          center: myLatLng,
        }
      );
this.apiservice.getAllBeacons().subscribe((data:any)=>{


  this.beaconinfo = data;
  console.log(this.beaconinfo);


for(var index in this.beaconinfo)
{

  console.log(this.beaconinfo[index]['name']);
  console.log(this.beaconinfo[index]['latitude']);
  console.log(this.beaconinfo[index]['longitude']);





  const beacon = {
    lat:Number(this.beaconinfo[index]['latitude']),
    lng:Number(this.beaconinfo[index]['longitude'])
  };
 




  var marker_beacon = new google.maps.Marker({
    position: beacon,
    animation: google.maps.Animation.Bounce,
    title: this.beaconinfo[index]['name']
  });

  var circle_beacon = new google.maps.Circle({
    map: mapp,
    radius: 1000, // 10 miles in metres
    fillColor: '#00FF00'
  });
  circle_beacon.bindTo('center', marker_beacon, 'position');
  marker_beacon.setMap(mapp);





}



}


)
    this.apiservice.getAllVechiles().subscribe((data: any) =>
    {
      
      this.vehiclesinfo = data;



//13.0776978,80.2085346



      // new google.maps.Marker({
      //   position: myLatLng,
      //   map,
      //   title: "Hello World!",
      // });


      // var marker = new google.maps.Marker({
      //     position: myLatlng,
      //     animation:google.maps.Animation.Bounce,
      //     title: "Hello World!"
      // });
     // console.log(this.vehiclesinfo);






      for (var index in this.vehiclesinfo)
      {
        //console.log(index); // prints indexes: 0, 1, 2, 3

     //   console.log(this.vehiclesinfo[index]['latitude']); // prints elements: 10, 20, 30, 40



        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.vehiclesinfo[index]['latitude'], this.vehiclesinfo[index]['longitude']),
          animation: google.maps.Animation.Bounce,
          title: this.vehiclesinfo[index]['name']
        });

        var circle = new google.maps.Circle({
          map: mapp,
          radius: 1000, // 10 miles in metres
          fillColor: '#AA0000'
        });
        circle.bindTo('center', marker, 'position');
        marker.setMap(mapp);


      }






    })

  }
}
