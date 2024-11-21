import { expect, test } from 'vitest';


const analyzeSoilImage = (image) => {
  if (!image) {
    throw new Error('No image provided');
  }


  if (image.includes('arcilloso')) {
    return {
      soilType: 'Arcilloso',
      quality: 'Alta',
      nutrients: ['Fósforo', 'Potasio', 'Magnesio'],
    };
  } else if (image.includes('arenoso')) {
    return {
      soilType: 'Arenoso',
      quality: 'Baja',
      nutrients: ['Nitrógeno', 'Calcio', 'Azufre'],
    };
  } else {
    return {
      soilType: 'Desconocido',
      quality: 'Desconocida',
      nutrients: [],
    };
  }
};

test('debería analizar correctamente una imagen de suelo arcilloso', () => {
  const soilImage = 'suelo_arcilloso.jpg'; 

  const result = analyzeSoilImage(soilImage);

  expect(result.soilType).toBe('Arcilloso');

  expect(result.quality).toBe('Alta');

  expect(result.nutrients).toContain('Fósforo');
  expect(result.nutrients).toContain('Potasio');
  expect(result.nutrients).toContain('Magnesio');
});

test('debería analizar correctamente una imagen de suelo arenoso', () => {
  const soilImage = 'suelo_arenoso.png';


  const result = analyzeSoilImage(soilImage);


  expect(result.soilType).toBe('Arenoso');

  expect(result.quality).toBe('Baja');

  expect(result.nutrients).toContain('Nitrógeno');
  expect(result.nutrients).toContain('Calcio');
  expect(result.nutrients).toContain('Azufre');
});

test('debería retornar tipo de suelo desconocido si no coincide con los tipos predefinidos', () => {
  const soilImage = 'suelo_desconocido.jpeg'; 


  const result = analyzeSoilImage(soilImage);


  expect(result.soilType).toBe('Desconocido');

  expect(result.quality).toBe('Desconocida');

  expect(result.nutrients.length).toBe(0);
});

test('debería lanzar un error si no se proporciona una imagen', () => {
 
  expect(() => analyzeSoilImage()).toThrow('No image provided');
});
