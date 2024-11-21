/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Eres una IA experta en análisis de imágenes de suelos. A partir del resultado de un modelo de selección de imágenes que te proporcionará un porcentaje de probabilidad para cada tipo de suelo, debes realizar las siguientes tareas:\n\nDeterminar el tipo de suelo según el porcentaje proporcionado.\nDescribir las características del suelo identificado (pH, textura, retención de agua, nutrientes, etc.).\nGenerar una lista de cultivos óptimos que pueden ser sembrados en ese tipo de suelo, considerando el porcentaje como un factor de relevancia.\nLa información generada debe estar en el siguiente formato JSON:\n\njson\nCopiar código\n{\n  \"tipo_de_suelo\": \"Nombre del tipo de suelo\",\n  \"descripcion\": \"Descripción detallada de las características del suelo (textura, nutrientes, pH, retención de agua, etc.)\",\n  \"porcentaje_probabilidad\": \"Porcentaje proporcionado por el modelo de imagen\",\n  \"cultivos_recomendados\": [\n    \"Cultivo 1\",\n    \"Cultivo 2\",\n    \"Cultivo 3\",\n    \"... (otros cultivos)\"\n  ]\n}",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Análisis de la imagen:\nRed soil: 0.00%, Clay soil: 0.00%, Black Soil: 99.98%, Alluvial soil: 0.01%"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Análisis de Suelo\": {\n    \"Tipo de Suelo\": \""},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Análisis de la imagen:\nRed soil: 0.00%, Clay soil: 0.00%, Black Soil: 99.98%, Alluvial soil: 0.01%"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"Análisis de Suelo\": {\"Tipo de Suelo\": \"Black Soil\", \"Porcentaje\": \"99.98%\", \"Información\": \"El suelo\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Análisis de la imagen:\nRed soil: 0.00%, Clay soil: 0.00%, Black Soil: 99.98%, Alluvial soil: 0.01%"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"Análisis de Suelo\": {\"Tipo de Suelo\": \"Black Soil\", \"Porcentaje\": \"\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Análisis de la imagen:\nRed soil: 0.00%, Clay soil: 0.00%, Black Soil: 100.00%, Alluvial soil: 0.00%"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"Análisis de Suelo\": {\"Tipo de Suelo\": \"Black Soil\", \"Descripción\": \"El\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Análisis de la imagen:\nRed soil: 0.00%, Clay soil: 0.00%, Black Soil: 100.00%, Alluvial soil: 0.00%"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"tipo_de_suelo\": \"Black Soil\",\n  \"descripcion\": \"Conocido por su color oscuro rico debido a su alto contenido de materia orgánica y arcilla, el Black Soil es altamente fértil y excelente para la agricultura. Generalmente tiene un pH neutro a ligeramente alcalino, una textura arcillosa que retiene bien el agua y es rico en nutrientes esenciales como nitrógeno, fósforo y potasio.\",\n  \"porcentaje_probabilidad\": \"100.00%\",\n  \"cultivos_recomendados\": [\n    \"Algodón\",\n    \"Trigo\",\n    \"Caña de azúcar\",\n    \"Girasol\",\n    \"Sorgo\",\n    \"Legumbres\"\n  ]\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Análisis de la imagen:\nRed soil: 0.01%, Clay soil: 0.17%, Black Soil: 0.00%, Alluvial soil: 99.82%"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"tipo_de_suelo\": \"Alluvial soil\",\n  \"descripcion\": \"El suelo aluvial se forma por la deposición de sedimentos arrastrados por ríos y arroyos, generalmente en llanuras aluviales y deltas. Es muy fértil debido a su contenido equilibrado de arena, limo y arcilla, lo que le confiere una buena estructura y drenaje. Rico en nutrientes como potasio, fósforo y nitrógeno, suele tener un pH neutro a ligeramente ácido, aunque puede variar. Su capacidad de retención de agua es buena.\",\n  \"porcentaje_probabilidad\": \"99.82%\",\n  \"cultivos_recomendados\": [\n    \"Arroz\",\n    \"Trigo\",\n    \"Maíz\",\n    \"Caña de azúcar\",\n    \"Legumbres\",\n    \"Hortalizas\"\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();