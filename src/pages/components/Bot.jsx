import React, { useState } from "react";

const ChatbotWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Clave API de Gemini
  const apiKey = "AIzaSyBDSmQgTV4Q0f3dtU-UHvYa6NYQ2vjSTzA";

  // Función para obtener respuesta de Gemini
  const getAIResponse = async (userInput) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const prompt = `
        Eres AgroBot, un chatbot especializado en los tipos de suelo y en los cultivos que se pueden sembrar, con un enfoque específico en el analisis de los suelos en Nicaragua.
        Tu conocimiento abarca teorías, prácticas tradicionales.
        Si recibes preguntas o información no relacionada con cultivos  en Nicaragua, responde con: "No tengo información sobre ese tema. Solo puedo ayudarte con cultivos e informacion relevante." 
        Si alguien te pregunta quién te creó, responde: "Fui creado por Jonatan Villegas"
        Tu objetivo es proporcionar respuestas claras y útiles sobre este campo, manteniéndote dentro de tu área de especialización.
        El usuario ha dicho: "${userInput}". 
        Responde de manera detallada y coherente a la consulta del usuario.
    `;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo obtener respuesta.";
    } catch (error) {
      console.error("Error al obtener respuesta de Gemini:", error);
      return "Lo siento, hubo un problema al conectarme.";
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages((prev) => [...prev, { text: inputMessage, sender: "user" }]);
    setInputMessage("");

    const botResponse = await getAIResponse(inputMessage);
    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
  };

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative h-screen">
      <div
        className="fixed bottom-5 right-5 bg-white p-4 rounded-full shadow-lg cursor-pointer z-10"
        onClick={toggleChatbot}
      >
        <img src="/iconoBot.png" alt="Chatbot Icon" className="w-12 h-12" />
      </div>

      {/* Ventana del chatbot */}
      {isVisible && (
        <div className="fixed bottom-28 right-5 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col p-4 z-9">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Chatbot</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleChatbot}
            >
              X
            </button>
          </div>

          {/* Mostrar mensajes */}
          <div className="flex flex-col overflow-y-auto mb-4 space-y-2 p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="/iconoBot.png"
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`max-w-xs p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input de mensaje */}
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full p-2 border rounded-l-lg border-gray-300"
              placeholder="Escribe tu mensaje..."
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white p-2 rounded-r-lg ml-2"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWindow;
