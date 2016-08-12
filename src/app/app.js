'use strict';

import angular from 'angular';
import HomeController from './controller/HomeController.js';
import ProductController from './controller/ProductController';
import ContactController from './controller/ContactController.js';
import ProductService from './service/ProductService.js';
import ProductReviewService from './service/ProductReviewService.js';

import ProductDeckDirective from './directive/ProductDeckDirective.js';
import SwipeSnapDirective from './directive/SwipeSnapDirective.js';
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
			require('angular-sanitize')
		]);


		myApp
			.controller('HomeController', HomeController)
			.controller('ProductController', ProductController)
			.controller('ContactController', ContactController)
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
			.directive('productDeck' , () => new ProductDeckDirective)
			.directive('swipeAndSnap', () => new SwipeSnapDirective)
			.factory("dbSchema" , function(){return mainApp.STATIC.SCHEMA;})
			.service('productService' , ProductService)
			.service('productReviewService' , ProductReviewService);

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
