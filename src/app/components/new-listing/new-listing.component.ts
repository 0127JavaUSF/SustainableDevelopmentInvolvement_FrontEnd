import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ListingService } from 'src/app/services/listing.service';
import { ImageUrl } from 'src/app/models/image-url';
import { Listing } from 'src/app/models/listing';
import { VideoUrl } from 'src/app/models/video-url';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {

  about: string;
  address: string;
  age: any;
  city: string;
  color: any;
  fixed: any;
  imageFiles: any[] = [];
  name: string;
  newVideo: string = "";
  sex: any;
  species: string;
  state: string;
  type: any;
  videoUrls: string[] = [];
  weight: any;
  zip: string;

  constructor(
    private listingService: ListingService,
    private shared: SharedService) { }

  ngOnInit() {

  }

  onClearImages() {

    this.imageFiles = [];
  }

  onLinkVideo() {

    //if not empty
    this.newVideo = this.newVideo.trim();
    if (this.newVideo) {

      //save
      this.videoUrls.push(this.newVideo);

      //reset
      this.newVideo = "";
    }
  }

  onPicInput(element, index) {

    if(element.target.files.length > 0) {
      //save the file in the images array
      this.imageFiles.push(element.target.files);
    }
  }

  onReplacePic(element, index) {

    if(element.target.files.length > 0) {
      this.imageFiles[index] = element.target.files;
    }
  }

  onSubmit() {

    //create listing object
    let listing = new Listing();

    listing.about = this.about;
    listing.age = this.age;
    listing.city = this.city;
    listing.color = this.shared.colorToNumber(this.color);
    listing.fixed = this.shared.fixedToNumber(this.fixed);
    listing.name = this.name;
    listing.sex = this.shared.sexToNumber(this.sex);
    listing.species = this.species;
    listing.state = this.state;
    listing.type = this.shared.typeToNumber(this.type);
    listing.weight = this.weight;
    listing.zipCode = this.zip;

    //copy image names to server
    //images need to be uploaded to S3 bucket, NOT our server
    //but our server still needs to know how many images will be uploaded
    //so it can retreive the correct presigned url
    for(let file of this.imageFiles) {
      let img = new ImageUrl();
      img.url = file[0].name; //this is ONLY the name, not the actual file

      listing.imageUrls.push(img);
    }

    //if form not empty
    this.newVideo = this.newVideo.trim();
    if (this.newVideo) {

      let video = new VideoUrl();
      video.url = this.newVideo;

      listing.videoUrls.push(video);
    }

    //copy video urls to listing object
    for(let url of this.videoUrls) {
      let video = new VideoUrl();
      video.url = url;

      listing.videoUrls.push(video);
    }

    //do post call
    this.listingService.createListing(listing).subscribe((data: any) => {

      const newListing = data; //data is new listing returned by server

      //user should be routed to view-past-listings component
    },
      error => {
        const test = 0;
      });
  }
}