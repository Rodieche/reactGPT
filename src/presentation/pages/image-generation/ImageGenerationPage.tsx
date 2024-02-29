import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptMessagImage } from "../../components";
import { imageGenerationtUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string,
    alt: string
  }
}

export const ImageGenerationPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string ) => {
    setIsLoading(true);
    setMessages( (prev) => [ ...prev, { text, isGpt: false } ] );

    // TODO: UseCase
    const imageInfo = await imageGenerationtUseCase(text);

    setIsLoading(false);

    if(!imageInfo) return setMessages((prev) => [ ...prev, { text: 'No se pudo generar la imagen', isGpt: true } ]);

    // TODO: Add message is Gpt as True
    setMessages((prev) => [...prev, {
      text: text,
      isGpt: true,
      info: {
        imageUrl: imageInfo.url,
        alt: imageInfo.alt
      }
    }])
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="¿Que imagen deseas generar hoy?" />

          {
            messages.map((message, index) => (
              message.isGpt
              ? (
                <GptMessagImage key={ index } text={ message.text } imageUrl={ message.info?.imageUrl! } alt={ message.info?.alt! } />
              )
              : (
                <MyMessage key={index} text={ message.text } />
              )
            ))
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }



        </div>
      </div>

        <TextMessageBox
          onSendMessage={ handlePost }
          placeholder="Escribe aqui lo que deseas"
          disableCorrections 
        
        />
    
    </div>
  )
}

