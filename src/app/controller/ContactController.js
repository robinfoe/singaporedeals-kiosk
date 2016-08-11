class ContactController{
  constructor($scope){
    this.$scope = $scope
    this.$scope.message = 'Contact Page';
  }
}


ContactController.$inject=['$scope'];
export default ContactController;
