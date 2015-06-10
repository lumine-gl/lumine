describe('Lumine library', function(){

  it('should have certain keys', function(){

    return Lumine.should.have.property('Canvas') &&
           Lumine.should.have.property('Composer') &&
           Lumine.should.have.property('Passes') &&
           Lumine.should.have.property('Shaders');

  });

});