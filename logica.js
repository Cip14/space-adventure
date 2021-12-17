function calcular() {
  let pa = document.querySelector('#pontoA');
  let pb = document.querySelector('#pontoB');
  let pc = document.querySelector('#pontoC');
  let dAC = document.querySelector('#distAC');

  const regex = /-?(\d+\.\d+)/g;

  let paMatches = pa.value.matchAll(regex);
  let pbMatches = pb.value.matchAll(regex);
  let paCoordinates = new Array(3);
  let pbCoordinates = new Array(3);
  
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

  let vetorDir = [pbCoordinates[0] - paCoordinates[0], pbCoordinates[1] - paCoordinates[1], pbCoordinates[2] - paCoordinates[2]];
  let dAB = Math.sqrt(Math.pow(pbCoordinates[0] - paCoordinates[0], 2) + Math.pow(pbCoordinates[1] - paCoordinates[1], 2) + Math.pow(pbCoordinates[2] - paCoordinates[2], 2));
  let lambda = (dAC.value*1000)/dAB;
  let pcCoordinates = [(paCoordinates[0]+lambda*vetorDir[0]), (paCoordinates[1]+lambda*vetorDir[1]), (paCoordinates[2]+lambda*vetorDir[2])];

  pc.value = "GPS:Target:" + pcCoordinates[0] + ":" + pcCoordinates[1] + ":" + pcCoordinates[2] + ":#45E6D5:"
}
