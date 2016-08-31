

export default class InputFilterDirective {
    constructor() {
        this.restrict = 'A';
        this.scope = { 
          //cartItem : '=cartItem'
        };
    }

    link(scope, element, attrs){

      var ele = element[0];
      var regex = RegExp(attrs.inputFilter);
      var value = ele.value;

      ele.addEventListener('input',function(e){
          if (regex.test(ele.value)){
              value = ele.value;
          }else{
              ele.value = value;
          }
      });

    }
}
