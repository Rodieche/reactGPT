import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string ) => {
    setIsLoading(true);
    setMessages( (prev) => [ ...prev, { text, isGpt: false } ] );

    const { ok, content } = await prosConsUseCase( text );

    setIsLoading(false);

    if(!ok) return;

    setMessages((prev) => [ ...prev, { text: content, isGpt: true } ])
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Hola, puede lo que sea que quieres que compare y te de mi punto de vista" />

          {
            messages.map((message, index) => (
              message.isGpt
              ? (
                <GptMessage key={index} text={ message.text } />
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
