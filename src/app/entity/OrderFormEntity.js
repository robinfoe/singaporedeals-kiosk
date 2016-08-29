

export default class OrderFormEntity{
	constructor() {
		const ElectronSettings = require('electron-settings');
	    this.settings = new ElectronSettings({
	      configDirPath : process.env.SETUP_PATH
	    });

	    this.kioskCode = this.settings.get("PROPERTIES")["KIOSK_CODE"];
	    this.hotelDetail = {
	    	firstName : '',
	    	lastName : '',
	    	roomNumber : '',
	    	email : '',
	    	hotelLocation : this.settings.get("PROPERTIES")["KIOSK_LOCATION"]
	    }
	    this.deliveryType="FR" // "FR - Free EX - Express"
	    this.deliveryTime="";
	    this.carts = [];
	    this.payment = {
	    	method : 'CC', // CC - Credit Cart CO - Cash on Delivery
	    	cardInfo : {
	    		number : '',
	    		type : '',
	    		expireMonth : '',
	    		expireYear : '',
	    		cvv2 : '',
	    		firstName : '',
	    		lastName : ''
	    	},
	    	billingAddress : {
	    		address01 : '',
	    		address02 : '',
	    		city : '',
	    		state : '',
	    		postalCode : '',
	    		countryCode : ''
	    	}

	    }



	}
	
}