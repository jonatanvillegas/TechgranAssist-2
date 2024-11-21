import { expect, test } from 'vitest';


const getWeatherInfo = (city) => {

  if (!city) {
    throw new Error('La ciudad es requerida');
  }


  const weatherData = {
    'Madrid': { temperature: 20, description: 'Soleado' },
    'Londres': { temperature: 15, description: 'Nublado' },
    'París': { temperature: 18, description: 'Parcialmente nublado' },
  };


  if (!weatherData[city]) {
    throw new Error('Ciudad no encontrada');
  }


  return weatherData[city];
};


test('debería devolver la información climática para una ciudad válida', () => {
  const city = 'Madrid';
  const weather = getWeatherInfo(city);


  expect(weather.temperature).toBe(20);
  expect(weather.description).toBe('Soleado');
});

test('debería lanzar un error si no se proporciona una ciudad', () => {
  const city = '';
  

  expect(() => getWeatherInfo(city)).toThrow('La ciudad es requerida');
});

test('debería lanzar un error si la ciudad no es válida o no está en los datos', () => {
  const city = 'Berlin';
  

  expect(() => getWeatherInfo(city)).toThrow('Ciudad no encontrada');
});

test('debería devolver la información climática para otra ciudad válida', () => {
  const city = 'Londres';
  const weather = getWeatherInfo(city);


  expect(weather.temperature).toBe(15);
  expect(weather.description).toBe('Nublado');
});
