const celestialBody = document.querySelector('#origin')
celestialBody.addEventListener('change', () => {
  const pontoA = document.querySelector('#ponto-A')
  if (celestialBody.value === 'customGPS') {
    pontoA.removeAttribute('readonly')
    pontoA.classList.remove('read-only')
    document.querySelector('.dist-comuns').classList.add('hidden')
  } else {
    pontoA.value = getCelestialBodyData(celestialBody.value).gps;
    pontoA.setAttribute('readonly', 'true')
    pontoA.classList.add('read-only')
    document.querySelector('.dist-comuns').classList.remove('hidden')
  }
})

selectRefB()
document.querySelector('#sel-refB').addEventListener('change', selectRefB)
function selectRefB() {
  document.querySelectorAll('.refB').forEach(e => {
    if (e.classList.contains(document.querySelector('#sel-refB').value)) {
      e.classList.remove('hidden')
    } else {
      e.classList.add('hidden')
    }
  })
}

document.querySelector('#superficie').addEventListener('click', () => {
  const dist = document.querySelector('#dist-A-C')
  dist.value = getCelestialBodyData(celestialBody.value).diameter / 2
})

document.querySelector('#alcance-gravidade').addEventListener('click', () => {
  const dist = document.querySelector('#dist-A-C')
  dist.value = (getCelestialBodyData(celestialBody.value).diameter / 2) * (1.7182)
})

document.querySelector('#calcular').addEventListener('click', () => {
  const gpsName = document.querySelector('#gpsName').value;
  const gpsColor = document.querySelector('#gpsColor').value;
  const pc = document.querySelector('#destino')
  const paCoord = getCoord('#ponto-A')
  const option = document.querySelector('#sel-refB').value
  const dist = document.querySelector('#dist-A-C').value

  if (option === "lat-lon") {
    const lat = document.querySelector('#latitude').value
    const lon = document.querySelector('#longitude').value
    const pcCoord = calcularAngular(paCoord, lat, lon, dist)
    pc.value = `GPS:${gpsName}:${pcCoord[0].toFixed(2)}:${pcCoord[1].toFixed(2)}:${pcCoord[2].toFixed(2)}:${gpsColor}:`;
  } else {
    const pbCoord = getCoord('#ponto-B')
    const pcCoord = calculoReta(paCoord, pbCoord, dist)
    pc.value = `GPS:${gpsName}:${pcCoord[0].toFixed(2)}:${pcCoord[1].toFixed(2)}:${pcCoord[2].toFixed(2)}:${gpsColor}:`;
  }
})

function calculoReta(paCoord, pbCoord, dAC) {
  let vetorDir = [
    pbCoord[0] - paCoord[0],
    pbCoord[1] - paCoord[1],
    pbCoord[2] - paCoord[2]
  ];
  let dAB = Math.sqrt(
    Math.pow(pbCoord[0] - paCoord[0], 2) +
    Math.pow(pbCoord[1] - paCoord[1], 2) +
    Math.pow(pbCoord[2] - paCoord[2], 2)
  );
  let lambda = (dAC * 1000) / dAB;
  return [
    (paCoord[0] + lambda * vetorDir[0]),
    (paCoord[1] + lambda * vetorDir[1]),
    (paCoord[2] + lambda * vetorDir[2])
  ];
}

function calcularAngular(origin, latDeg, lonDeg, raio) {
  let latRad = latDeg * Math.PI / 180;
  let lonRad = lonDeg * Math.PI / 180;
  return [
    origin[0] + raio * 1000 * Math.cos(latRad) * Math.cos(lonRad),
    origin[1] + raio * 1000 * Math.sin(latRad),
    origin[2] + raio * 1000 * Math.cos(latRad) * Math.sin(lonRad)
  ]
}

function getCoord(id) {
  let p = document.querySelector(id);
  const regex = /-?(\d+\.\d+)/g;
  let pMatches = p.value.matchAll(regex);
  let pCoord = new Array(3);
  let i = 0;
  for (match of pMatches) {
    pCoord[i] = Number(match[0]);
    i++;
  }
  return pCoord;
}

function getCelestialBodyData(body) {
  switch (body) {
    case "EarthLike":
      return {
        diameter: 120.00,
        gps: "GPS:EarthLike:0.50:0.50:0.50:"
      }
    case "Moon":
      return {
        diameter: 19.00,
        gps: "GPS:Moon:16384.50:136384.50:-113615.50:"
      };
    case "Mars":
      return {
        diameter: 120.00,
        gps: "GPS:Mars:1031072.50:131072.50:1631072.50:"
      };
    case "Europa":
      return {
        diameter: 19.00,
        gps: "GPS:Europa:916384.50:16384.50:1616384.50:"
      };
    case "Triton":
      return {
        diameter: 80.25,
        gps: "GPS:Triton:-284463.50:-2434463.50:365536.50:"
      };
    case "Pertam":
      return {
        diameter: 60.00,
        gps: "GPS:Pertam:-3967231.50:-32231.50:-767231.50:"
      };
    case "Alien":
      return {
        diameter: 120.00,
        gps: "GPS:Alien:131072.50:131072.50:5731072.50:"
      };
    case "Titan":
      return {
        diameter: 19.00,
        gps: "GPS:Titan:36384.50:226384.50:5796384.50:"
      };
    default:
      return null
  }
}