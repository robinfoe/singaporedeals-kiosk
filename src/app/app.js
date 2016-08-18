'use strict';

import angular from 'angular';
//import moment from "moment";
//import * as moment from 'moment';
import * as momentpicker from "angular-moment-picker";


//import angular-bootstrap-datetimepicker from 'angular-bootstrap-datetimepicker';
import HomeController from './controller/HomeController.js';
import ProductController from './controller/ProductController';
import ContactController from './controller/ContactController.js';
import BookingController from './controller/BookingController.js';
import CartController from './controller/CartController.js';
import ProductDetailModalController from './controller/ProductDetailModalController.js';




import ProductService from './service/ProductService.js';
import ProductReviewService from './service/ProductReviewService.js';
import CartService from './service/CartService.js';



import ProductDeckDirective from './directive/ProductDeckDirective.js';
import SwipeSnapDirective from './directive/SwipeSnapDirective.js';
import TouchSpinDirective from './directive/TouchSpinDirective.js';
import TourDateDirective from './directive/TourDateDirective.js';



import WEBUTIL from './lib/util/WebUtil.js'

import DbSchema from './lib/dal/Schema.js';
import SystemSetup from './lib/setup/SystemSetup.js';
var _ = require('underscore');

var mainApp = {

	STATIC : {
		SYSTEM_SETUP : null,
		SCHEMA : null
	},

	bootstrapApp : function(){

		var moduleName = 'myApp';
		var myApp =  angular.module(moduleName, [
			require('angular-route'),
			require('angular-sanitize'),
			require('angular-ui-bootstrap'),
			'moment-picker'
			//'ui.bootstrap.datetimepicker'
			
		]);


		myApp
			.controller('HomeController', HomeController)
			.controller('ProductController', ProductController)
			.controller('ContactController', ContactController)
			.controller('BookingController',BookingController)
			.controller('CartController',CartController)
			.controller('ProductDetailModalController' , ProductDetailModalController)
			.filter('showVotedIcon',[ '$sce' , ( $sce) => { return (item) => {
				try{
					//console.log(item);
					var score = 0;
					if(item.review){
						var totalScore = item.review['REVIEW_COUNT'] * 10;
						score = (item.review['REVIEW_SCORE'] / totalScore );
						score = (score * 10) / 2;
					}

					//console.log(score);
					var icons = [];
					for(var i = 0 ; i < 5 ; i++){
						var styles = (score >= ( parseInt(i) + 0.5)) ? ' voted' : '' ;
						icons.push('<i class="icon-smile '+styles+'" ></i>');
					//	console.log('looping');
					}
					//console.log(icons);
					return $sce.trustAsHtml(icons.join(' '));
					//  <i class="icon-smile voted"></i><i class="icon-smile" ></i>

				}catch(e){
					console.log(e);
				}


				return '';

			}}])
			.filter('showEticket',  () => { return (item) =>  {

				return (item && WEBUTIL.isEticketAvailable(item.category_id , item.d_option) ) ? 'E-Ticket' : '';
				//WEBUTIL.isEticketAvailable(catId, deliveryOption){


			}})
			.filter('toAbsoluteValue' ,() => { return (value)=>{ return WEBUTIL.roundUp(value,0);  }  })
			.filter('toSaveHtml',['$sce', ($sce)=> { return (value)=>{
				var decoded = _.unescape(value);
				decoded = decoded.replace('&trade;','™');
				return $sce.trustAsHtml(decoded);
			}}])
			.filter('generateFeaturedItems' , ()=>{ return (item)  => {
					var featuredItems = [
						{key : 'museum' , value : 'icon_set_1_icon-4', text : 'Museum'},
						{key : 'hours' , value : 'icon_set_1_icon-83', text : item.hours + 'hours'},
						{key : 'accessibiliy' , value : 'icon_set_1_icon-13', text : 'Accessibiliy'},
						{key : 'attraction' , value : 'icon_set_1_icon-81', text : 'Attraction'},
						{key : 'pet_allowed' , value : 'icon-users', text : 'Family'},
						{key : 'audio_guide' , value : 'icon-user-pair', text : 'Couple'},
						{key : 'tour_guide' , value : 'icon-ok', text : 'Tour guide'},
						{key : 'wildlife' , value : 'icon-plus-squared-small', text : 'Wildlife'},
						{key : 'park' , value : 'icon-ok', text : 'Park'},
						{key : 'garden' , value : 'icon-garden', text : 'Garden'},
						{key : 'adventure' , value : 'icon-plus-squared-small', text : 'Adventure'},
						{key : 'free_entry' , value : 'icon-ok', text : 'Free Entry'},
						{key : 'nature' , value : 'icon-plus-squared-small', text : 'Nature'},
						{key : 'scenic' , value : 'icon-ok', text : 'Scenic'},
						{key : 'culture' , value : 'icon-food-1', text : 'Culture'},
						{key : 'food' , value : 'icon-plus-squared-small', text : 'Food'},
						{key : 'relaxing' , value : 'icon-ok', text : 'Relaxing'},
						{key : 'activity' , value : 'icon-plus-squared-small', text : 'Activity'},
						{key : 'one_way_transfer' , value : 'icon-ok', text : 'One way transfer'},
						{key : 'two_way_transfer' , value : 'icon-plus-squared-small', text : 'Two way transfer'},
						{key : 'free_and_easy' , value : 'icon-ok', text : 'Free and Easy'},
					];

					var availableFeatures = [];
					featuredItems.forEach((feature) => {
						if(item[feature.key] == 1)
							availableFeatures.push('<li ><i class="'+feature.value+'"></i>'+feature.text+'</li>');
					});

					if(availableFeatures.length > 0)
						return '<ul class="featured_items">' + (availableFeatures.join(' ')) + '</ul> <br/><br/> ' ;

					return '';

				}
			
			}) // TODO :: generate feature icons ?? 
			.filter('computeTotal' , ($filter) => {return(product, adultCount, childCount) => {
				var total = 0;
				total += $filter('computePrice')(product,'adult',adultCount);
				total += $filter('computePrice')(product,'child',childCount);
				return total;
			}})
			.filter('computePrice' , ($filter) => { return (product,type,count) => {
				var price = $filter('getActualPrice')(product,type);
				return price * count;
			}})
			.filter('getActualPrice', () => {return (product,type) => {
				var price = (product['promo_'+type+'_price'] > 0) ? product['promo_'+type+'_price'] : product[type+'_price'];
				return price+0.00;
			}})
			.directive('productDeck' , ['$uibModal' ,'sharedParamService', '$location', ($uibModal, sharedParamService , $location) => new ProductDeckDirective($uibModal,sharedParamService, $location) ]  )
			.directive('swipeAndSnap', () => new SwipeSnapDirective)
			.directive('touchSpin' , () => new TouchSpinDirective)
			.directive('tourDate' , () => new TourDateDirective)
			.factory("dbSchema" , function(){return mainApp.STATIC.SCHEMA;})
			.service('productService' , ProductService)
			.service('productReviewService' , ProductReviewService)
			.service('cartService', CartService)
			.service('sharedParamService' , () => {
				var parameter = null;
				return { 
					getParameter : () => {return parameter;},
					setParameter :(param) => {parameter = param;}
				}


			});

		myApp.config(function($routeProvider){
			$routeProvider
				.when('/home',{
					templateUrl : './partial/home.html',
					controller : 'HomeController',
					controllerAs:'vm'
				})
				.when('/product',{
					templateUrl : './partial/product.html',
					controller : 'ProductController',
					controllerAs:'vm'
				})
				.when('/contact',{
					templateUrl : './partial/contact.html',
					controller : 'ContactController',
					controllerAs:'vm'
				})
				.when('/book',{
					templateUrl : './partial/book.html',
					controller : 'BookingController',
					controllerAs:'vm'
				})
				.otherwise({redirectTo:'/home'});

		});

		angular.bootstrap(document, [moduleName]);


	},


	init: function(){
		mainApp.STATIC.SYSTEM_SETUP = new SystemSetup();
		console.log(mainApp.STATIC.SYSTEM_SETUP);
		mainApp.STATIC.SYSTEM_SETUP.preloadDB().then(function(extractedData){
			console.log(extractedData);
			mainApp.STATIC.SCHEMA = new DbSchema();
			mainApp.STATIC.SCHEMA.init().then(() => {
				mainApp.STATIC.SCHEMA.populateDb(extractedData).then(function(){
					mainApp.bootstrapApp();
				});
			});


		});
	}

};

mainApp.init();



/*





*/
