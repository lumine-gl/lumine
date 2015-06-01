var l = new Lumine();

describe('Lumine library', function(){

  it('should have certain keys', function(){

    return l.should.have.property('Canvas') &&
           l.should.have.property('Composer') &&
           l.should.have.property('Passes') &&
           l.should.have.property('Shaders');

  });

});