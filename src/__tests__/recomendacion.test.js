import { expect, test, vi } from 'vitest';


const generateRecommendations = () => {
  return [
    'Recomendación 1: Mejora tu productividad con herramientas de gestión de tareas.',
    'Recomendación 2: Aprende sobre desarrollo backend para mejorar tus habilidades.',
    'Recomendación 3: Prueba un enfoque basado en microservicios para tus proyectos.',
  ];
};

test('debería generar recomendaciones correctamente', () => {

  const recommendations = generateRecommendations();


  expect(recommendations.length).toBe(3);

  expect(recommendations[0]).toBe('Recomendación 1: Mejora tu productividad con herramientas de gestión de tareas.');
  expect(recommendations[1]).toBe('Recomendación 2: Aprende sobre desarrollo backend para mejorar tus habilidades.');
  expect(recommendations[2]).toBe('Recomendación 3: Prueba un enfoque basado en microservicios para tus proyectos.');
});
