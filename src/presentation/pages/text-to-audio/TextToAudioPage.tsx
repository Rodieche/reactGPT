import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const disclaimer = `¿Que audio quieres generar hoy?
* Todo el audio generado es por AI`

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text';
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string, selectedVoice: string ) => {
    setIsLoading(true);
    setMessages( (prev) => [ ...prev, { text, isGpt: false, type: 'text' } ] );

    // TODO: UseCase
    const { ok, message, audioUrl } = await textToAudioUseCase( text, selectedVoice );
    setIsLoading(false);

    if(!ok) return;

    setMessages( (prev) => [ ...prev, { text: message, isGpt: true, type: "audio", audio: audioUrl! } ] );


    // TODO: Add message is Gpt as True
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text={ disclaimer } />

          {
            messages.map((message, index) => (
              message.isGpt
              ? (
                message.type === 'audio'
                ? ( <GptMessageAudio key={ index } text={ message.text } audio={ message.audio } /> )
                : ( <GptMessage key={ index } text={ message.text } /> )
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

        <TextMessageBoxSelect
          onSendMessage={ handlePost }
          placeholder="Escribe aqui lo que deseas convertir a audio"
          options={ voices } 
        
        />
    
    </div>
  )
}
