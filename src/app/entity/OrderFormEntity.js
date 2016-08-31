import WEBUTIL from '../lib/util/WebUtil'

export default class OrderFormEntity{
	constructor() {
		const ElectronSettings = require('electron-settings');
	    this.settings = new ElectronSettings({
	      configDirPath : process.env.SETUP_PATH
	    });

	    this.kioskCode = this.settings.get("PROPERTIES")["KIOSK_CODE"];
	    this.hotelDetail = {
	    	firstName : 'Robin',
	    	lastName : 'Foe',
	    	roomNumber : '888',
	    	email : 'robin.foe@gmail.com',
	    	hotelLocation : this.settings.get("PROPERTIES")["KIOSK_LOCATION"]
	    }
	    this.deliveryType="FR" // "FR - Free EX - Express"
	    this.deliveryTime="";
	    this.deliveryDate=null;
	    this.carts = [];
	    this.payment = {
	    	method : 'CC', // CC - Credit Cart CO - Cash on Delivery
	    	cardInfo : {
	    		number : '',
	    		type : '',
	    		typeMask : WEBUTIL.getUnknownCardType(),
	    		expireMonth : '',
	    		expireYear : '',
	    		expiryMonthYear : moment(),
	    		cvv2 : '',
	    		name : ''
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

	

	setCardType(cardType){
		this.payment.cardInfo.typeMask = cardType;
		this.payment.cardInfo.type = (cardType.card == 'unknown') ? '' : cardType.card;
	}

	isDeliveryTypeFree(){
		return this.deliveryType == 'FR';
	}

	isPaymentCreditCart(){
		return this.payment.method == "CC";
	}
	
}