function calcular() {
  var pa = document.querySelector('#pontoA');
  var pb = document.querySelector('#pontoB');
  var pc = document.querySelector('#pontoC');
  var dAC = document.querySelector('#distAC');

  const regex = /-?(\d+\.\d+)/g;

  var paMatches = pa.value.matchAll(regex);
  var pbMatches = pb.value.matchAll(regex);
  var paCoordinates = new Array(3);
  var pbCoordinates = new Array(3);
  let i = 0;
  for (match of paMatches){
    paCoordinates[i] = Number(match[0]);
    i++;
  }
  i = 0;
  for (match of pbMatches){
    pbCoordinates[i] = Number(match[0]);
    i++;
  }

  var vetorDir = [pbCoordinates[0] - paCoordinates[0], pbCoordinates[1] - paCoordinates[1], pbCoordinates[2] - paCoordinates[2]];
  var dAB = Math.sqrt(Math.pow(pbCoordinates[0] - paCoordinates[0], 2) + Math.pow(pbCoordinates[1] - paCoordinates[1], 2) + Math.pow(pbCoordinates[2] - paCoordinates[2], 2));
  var lambda = dAC.value/dAB;
  var pcCoordinates = [(paCoordinates[0]+lambda*vetorDir[0]), (paCoordinates[1]+lambda*vetorDir[1]), (paCoordinates[2]+lambda*vetorDir[2])];

  pc.value = "GPS:Target:" + pcCoordinates[0] + ":" + pcCoordinates[1] + ":" + pcCoordinates[2] + ":#45E6D5:"
}
